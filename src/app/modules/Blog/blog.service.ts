import status from 'http-status';
import AppError from '../../errors/AppError';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: TBlog) => {
  const blogAlreadyExist = await Blog.findOne({
    title: payload?.title,
    content: payload?.content,
  });

  if (blogAlreadyExist) {
    throw new AppError(status.BAD_REQUEST, 'Blog already exist!!!');
  }

  const result = await Blog.create(payload);

  if (!result) {
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      'Failed to create blog. Please try again!',
    );
  }
  return result;
};

const getAllBlogFromDB = async () => {
  const result = await Blog.find();
  return result;
};

const getSingleBlogFromDB = async (id: string) => {
  const result = await Blog.findById(id);
  return result;
};

const updateBlogDataIntoDB = async (id: string, payload: Partial<TBlog>) => {
  if (!(await Blog.isBlogExist(id))) {
    throw new AppError(status.BAD_REQUEST, 'Blog not found!!!');
  }

  const modifiedData = { ...payload };

  const result = await Blog.findByIdAndUpdate(id, modifiedData, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      'Sorry! Update Process Failed!!!',
    );
  }
  return result;
};

const deleteBlogFromDB = async (id: string) => {
  if (!(await Blog.findById(id))) {
    throw new AppError(status.BAD_REQUEST, 'Blog not found!!!');
  }

  const result = await Blog.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      'Failed to delete the blog. Please try again!',
    );
  }
  return result;
};

export const BlogService = {
  deleteBlogFromDB,
  updateBlogDataIntoDB,
  getSingleBlogFromDB,
  getAllBlogFromDB,
  createBlogIntoDB,
};
