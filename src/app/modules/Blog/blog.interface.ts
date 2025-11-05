import { Model, Types } from 'mongoose';

export type TBlog = {
  title: string;
  content: string;
  image: string;
  category: string;
  user: Types.ObjectId;
};

export interface BlogModel extends Model<TBlog> {
  // eslint-disable-next-line no-unused-vars
  isBlogExist(id: string): Promise<TBlog | null>;
}
