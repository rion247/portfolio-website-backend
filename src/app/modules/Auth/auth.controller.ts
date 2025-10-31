import status from 'http-status';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const userInformation = req?.body;

  const accessToken = await AuthService.loginUserIntoDB(userInformation);

  res.cookie('accessToken', accessToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User Login Successful!!!',
    data: accessToken,
  });
});

export const AuthController = {
  loginUser,
};
