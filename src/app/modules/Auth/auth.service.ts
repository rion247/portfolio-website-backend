import status from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import { TUserInformationForJWT } from '../User/user.interface';
import { tokenGenerator } from './auth.utils';
import config from '../../config';
import { SignOptions } from 'jsonwebtoken';

const loginUserIntoDB = async (payload: TLoginUser) => {
  const userData = await User.isUserExist(payload?.email);

  if (!userData) {
    throw new AppError(status.NOT_FOUND, 'Sorry! This user is not found!!!');
  }

  if (userData?.status === 'deactive') {
    throw new AppError(
      status.BAD_REQUEST,
      'Sorry! This user is already deactivated!!!',
    );
  }

  if (
    !(await User.isUserPasswordMatched(payload?.password, userData?.password))
  ) {
    throw new AppError(status.BAD_REQUEST, 'Sorry! Wrong Password!!!');
  }

  const userInformationForJWT: TUserInformationForJWT = {
    userEmail: userData?.email,
    role: userData?.role,
  };

  const accessToken = tokenGenerator(
    userInformationForJWT,
    config.jwt_access_secret as string,
    config.jwt_access_expiresIn as SignOptions['expiresIn'],
  );

  return accessToken;
};

export const AuthService = { loginUserIntoDB };
