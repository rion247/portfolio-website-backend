import { model, Schema } from 'mongoose';
import { BlogModel, TBlog } from './blog.interface';

const blogSchema = new Schema<TBlog, BlogModel>(
  {
    title: { type: String, required: [true, 'Blog Title is required!!!'] },
    content: {
      type: String,
      required: [true, 'Blog Content is required!!!'],
    },
    image: {
      type: String,
      required: [true, 'Blog Image is required!!!'],
    },
    category: {
      type: String,
      required: [true, 'Blog Category is required!!!'],
    },
  },
  { timestamps: true },
);

blogSchema.statics.isBlogExist = async function (id: string) {
  const blogInfo = await Blog.findById(id);
  return blogInfo;
};

export const Blog = model<TBlog, BlogModel>('Blog', blogSchema);
