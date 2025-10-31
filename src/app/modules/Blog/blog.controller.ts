import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogService } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const result = await BlogService.createBlogIntoDB(req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Congrats!!! Blog created succesfully!!!',
    data: result,
  });
});

const getAllBlog = catchAsync(async (req, res) => {
  const result = await BlogService.getAllBlogFromDB();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Blogs retrieved successfully!!!',
    data: result,
  });
});

const getSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogService.getSingleBlogFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Blog retrieved successfully!!!',
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogService.updateBlogDataIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Blog updated successfully!!!',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogService.deleteBlogFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Blog deleted successfully!!!',
    data: result,
  });
});

export const BlogController = {
  createBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
