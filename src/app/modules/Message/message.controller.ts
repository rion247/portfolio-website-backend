import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { MessageService } from './message.service';

const createMessage = catchAsync(async (req, res) => {
  const { userEmail } = req.user;

  const result = await MessageService.createMessageIntoDB(userEmail, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Congrats!!! Message sent succesfully!!!',
    data: result,
  });
});

export const MessageController = {
  createMessage,
};
