import status from 'http-status';
import AppError from '../../errors/AppError';
import { TProject } from './project.interface';
import { Project } from './project.model';
import { User } from '../User/user.model';

const createProjectIntoDB = async (email: string, payload: TProject) => {
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

  const projectAlreadyExist = await Project.findOne({
    title: payload?.title,
    description: payload?.description,
  });

  if (projectAlreadyExist) {
    throw new AppError(status.BAD_REQUEST, 'Project already exist!!!');
  }

  const modifiedData = { ...payload, user: userData?._id };

  const result = await Project.create(modifiedData);

  if (!result) {
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      'Failed to create project. Please try again!',
    );
  }
  return result;
};

const getAllProjectFromDB = async () => {
  const result = await Project.find().populate('user');
  return result;
};

const getSingleProjectFromDB = async (id: string) => {
  const result = await Project.findById(id).populate('user');
  return result;
};

const updateProjectDataIntoDB = async (
  userEmail: string,
  id: string,
  payload: Partial<TProject>,
) => {
  const { technologies, ...remainingData } = payload;

  const projectData = await Project.findById(id);

  if (!projectData) {
    throw new AppError(status.BAD_REQUEST, 'Project not found!!!');
  }

  const userData = await User.findById(projectData?.user);

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
      status.BAD_REQUEST,
      'Sorry!!! You are not authorized!!!',
    );
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

const deleteProjectFromDB = async (userEmail: string, id: string) => {
  const projectData = await Project.findById(id);

  if (!projectData) {
    throw new AppError(status.BAD_REQUEST, 'Project not found!!!');
  }

  const userData = await User.findById(projectData?.user);

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
      status.BAD_REQUEST,
      'Sorry!!! You are not authorized!!!',
    );
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
