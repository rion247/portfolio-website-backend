import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';
import { UserRoleForEnum, UserStatusForEnum } from './user.constant';

const userSchema = new Schema<TUser, UserModel>(
  {
    name: { type: String, required: [true, 'Name is required!!!'] },
    email: {
      type: String,
      unique: true,
      required: [true, 'User Email is required!!!'],
    },
    password: {
      type: String,
      required: [true, 'Password is required!!!'],
      select: 0,
    },
    role: {
      type: String,
      enum: {
        values: [...UserRoleForEnum],
        message: '{VALUE} is not supported',
      },
      default: 'user',
    },
    status: {
      type: String,
      enum: {
        values: [...UserStatusForEnum],
        message: '{VALUE} is not supported',
      },
      default: 'active',
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExist = async function (email: string) {
  const userInfo = await User.findOne({ email }).select('+password');

  return userInfo;
};

userSchema.statics.isUserPasswordMatched = async function (
  plainText: string,
  hashText: string,
) {
  return await bcrypt.compare(plainText, hashText);
};

export const User = model<TUser, UserModel>('User', userSchema);
