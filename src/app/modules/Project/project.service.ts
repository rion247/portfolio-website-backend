import status from 'http-status';
import AppError from '../../errors/AppError';
import { TProject } from './project.interface';
import { Project } from './project.model';

const createProjectIntoDB = async (payload: TProject) => {
  const projectAlreadyExist = await Project.findOne({
    title: payload?.title,
    description: payload?.description,
  });

  if (projectAlreadyExist) {
    throw new AppError(status.BAD_REQUEST, 'Project already exist!!!');
  }

  const result = await Project.create(payload);

  if (!result) {
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      'Failed to create project. Please try again!',
    );
  }
  return result;
};

const getAllProjectFromDB = async () => {
  const result = await Project.find();
  return result;
};

const getSingleProjectFromDB = async (id: string) => {
  const result = await Project.findById(id);
  return result;
};

const updateProjectDataIntoDB = async (
  id: string,
  payload: Partial<TProject>,
) => {
  const { technologies, ...remainingData } = payload;

  const projectData = await Project.findById(id);

  if (!projectData) {
    throw new AppError(status.BAD_REQUEST, 'Project not found!!!');
  }

  const modifiedData: Record<string, unknown> = { ...remainingData };

  if (technologies && technologies?.length) {
    modifiedData.technologies = [...projectData.technologies, ...technologies];
  }

  const result = await Project.findByIdAndUpdate(
    projectData?._id,
    modifiedData,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!result) {
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      'Sorry! Update Process Failed!!!',
    );
  }
  return result;
};

const deleteProjectFromDB = async (id: string) => {
  if (!(await Project.findById(id))) {
    throw new AppError(status.BAD_REQUEST, 'Project not found!!!');
  }

  const result = await Project.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      'Failed to delete the project. Please try again!',
    );
  }
  return result;
};

export const ProjectService = {
  getAllProjectFromDB,
  createProjectIntoDB,
  getSingleProjectFromDB,
  updateProjectDataIntoDB,
  deleteProjectFromDB,
};
