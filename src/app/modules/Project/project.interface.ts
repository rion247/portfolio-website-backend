import { Model, Types } from 'mongoose';

export type TProject = {
  title: string;
  description: string;
  image: string;
  liveLink: string;
  githubLink: string;
  technologies: string[];
  user: Types.ObjectId;
};

export interface ProjectModel extends Model<TProject> {
  // eslint-disable-next-line no-unused-vars
  isProjectAlreadyExist(id: string): Promise<TProject | null>;
}
