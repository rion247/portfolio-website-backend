import status from 'http-status';
import AppError from '../../errors/AppError';
import { TMessage } from './message.interface';
import { Message } from './message.model';
import { User } from './../User/user.model';
import sendEmail from '../../utils/sendEmail';

const createMessageIntoDB = async (email: string, payload: TMessage) => {
  const userData = await User.isUserExist(email);

  if (!userData) {
    throw new AppError(status.NOT_FOUND, 'Sorry! This user is not found!!!');
  }

  if (userData?.status === 'deactive') {
    throw new AppError(
      status.BAD_REQUEST,
      'Sorry! This user is already deactivated!!!',
    );
  }

  const modifiedData = {
    ...payload,
    name: userData?.name,
    email: userData?.email,
  };

  const result = await Message.create(modifiedData);

  if (!result) {
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      'Failed to give message. Please try again!',
    );
  }

  sendEmail(userData?.email, userData?.name, payload?.message);

  return result;
};

export const MessageService = { createMessageIntoDB };
