import { model, Schema } from 'mongoose';
import { TMessage } from './message.interface';

const messageSchema = new Schema<TMessage>(
  {
    name: {
      type: String,
      required: [true, 'Name is required!!!'],
    },
    email: {
      type: String,
      required: [true, 'Email is required!!!'],
    },
    message: {
      type: String,
      required: [true, 'Message is required!!!'],
    },
  },
  { timestamps: true },
);

export const Message = model<TMessage>('Message', messageSchema);
