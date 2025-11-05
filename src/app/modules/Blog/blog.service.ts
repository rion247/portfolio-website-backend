import status from 'http-status';
import AppError from '../../errors/AppError';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import { User } from '../User/user.model';

const createBlogIntoDB = async (email: string, payload: TBlog) => {
  const userData = await User.findOne({ email });

  if (!userData) {
    throw new AppError(status.NOT_FOUND, 'Sorry! This user is not found!!!');
  }

  if (userData?.status === 'deactive') {
    throw new AppError(
      status.BAD_REQUEST,
      'Sorry! This user is already deactivated!!!',
    );
  }

  const blogAlreadyExist = await Blog.findOne({
    title: payload?.title,
    content: payload?.content,
  });

  if (blogAlreadyExist) {
    throw new AppError(status.BAD_REQUEST, 'Blog already exist!!!');
  }

  const modifiedData = { ...payload, user: userData?._id };

  const result = await Blog.create(modifiedData);

  if (!result) {
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      'Failed to create blog. Please try again!',
    );
  }
  return result;
};

const getAllBlogFromDB = async () => {
  const result = await Blog.find().populate('user');
  return result;
};

const getSingleBlogFromDB = async (id: string) => {
  const result = await Blog.findById(id).populate('user');
  return result;
};

const updateBlogDataIntoDB = async (
  userEmail: string,
  id: string,
  payload: Partial<TBlog>,
) => {
  const blogData = await Blog.isBlogExist(id);

  if (!blogData) {
    throw new AppError(status.BAD_REQUEST, 'Blog not found!!!');
  }

  const userData = await User.findById(blogData?.user);

  if (!userData) {
    throw new AppError(status.NOT_FOUND, 'Sorry! This user is not found!!!');
  }

  if (userData?.status === 'deactive') {
    throw new AppError(
      status.BAD_REQUEST,
      'Sorry! This user is already deactivated!!!',
    );
  }

  const authorEmail = userData?.email;

  if (authorEmail !== userEmail) {
    throw new AppError(
      status.UNAUTHORIZED,
      'Sorry!!! You are not authorized!!!',
    );
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

const deleteBlogFromDB = async (userEmail: string, id: string) => {
  const blogData = await Blog.isBlogExist(id);

  if (!blogData) {
    throw new AppError(status.BAD_REQUEST, 'Blog not found!!!');
  }

  const userData = await User.findById(blogData?.user);

  if (!userData) {
    throw new AppError(status.NOT_FOUND, 'Sorry! This user is not found!!!');
  }

  if (userData?.status === 'deactive') {
    throw new AppError(
      status.BAD_REQUEST,
      'Sorry! This user is already deactivated!!!',
    );
  }

  const authorEmail = userData?.email;

  if (authorEmail !== userEmail) {
    throw new AppError(
      status.UNAUTHORIZED,
      'Sorry!!! You are not authorized!!!',
    );
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
