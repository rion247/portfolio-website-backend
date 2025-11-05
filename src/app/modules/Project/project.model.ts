import { model, Schema } from 'mongoose';
import { ProjectModel, TProject } from './project.interface';

const projectSchema = new Schema<TProject, ProjectModel>(
  {
    title: {
      type: String,
      required: [true, 'Project Title is required!!!'],
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Project Description is required!!!'],
    },
    image: {
      type: String,
      required: [true, 'Image is required!!!'],
    },
    liveLink: {
      type: String,
      required: [true, 'Project Live Link is required!!!'],
    },
    githubLink: {
      type: String,
      required: [true, 'GitHub Link is required!!!'],
    },
    technologies: {
      type: [String],
      required: [true, 'Project Technologies is required!!!'],
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User Information is required!!!'],
    },
  },
  { timestamps: true },
);

projectSchema.statics.isProjectAlreadyExist = async function (id: string) {
  const projectInfo = await Project.findById(id);

  return projectInfo;
};

export const Project = model<TProject, ProjectModel>('Project', projectSchema);
