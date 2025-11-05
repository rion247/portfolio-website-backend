import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProjectService } from './project.service';

const createProject = catchAsync(async (req, res) => {
  const { userEmail } = req.user;
  const projectData = req.body;
  const result = await ProjectService.createProjectIntoDB(
    userEmail,
    projectData,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Congrats!!! Project created succesfully!!!',
    data: result,
  });
});

const getAllProject = catchAsync(async (req, res) => {
  const result = await ProjectService.getAllProjectFromDB();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Projects retrieved successfully!!!',
    data: result,
  });
});

const getSingleProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProjectService.getSingleProjectFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Project retrieved successfully!!!',
    data: result,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const { userEmail } = req.user;
  const { id } = req.params;
  const result = await ProjectService.updateProjectDataIntoDB(
    userEmail,
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Project updated successfully!!!',
    data: result,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { userEmail } = req.user;
  const result = await ProjectService.deleteProjectFromDB(userEmail, id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Project deleted successfully!!!',
    data: result,
  });
});

export const ProjectController = {
  createProject,
  getAllProject,
  getSingleProject,
  updateProject,
  deleteProject,
};
