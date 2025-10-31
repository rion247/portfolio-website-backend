import status from "http-status";
import AppError from "../../errors/AppError";
import { TUser, TUserInformationForJWT } from "./user.interface";
import { User } from "./user.model";
import { tokenGenerator } from "../Auth/auth.utils";
import config from "../../config";
import { SignOptions } from "jsonwebtoken";

const registerUserIntoDB = async (payload: TUser) => {
  if (await User.isUserExist(payload?.email)) {
    throw new AppError(
      status.BAD_REQUEST,
      "Sorry!!! This user already exist!!!"
    );
  }

  const modifiedUserData = { ...payload, role: "user", status: "active" };

  const registerUser = await User.create(modifiedUserData);

  if (!registerUser) {
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      "Failed to create user. Please try again!"
    );
  }

  const userInformationForJWT: TUserInformationForJWT = {
    userEmail: registerUser?.email,
    role: registerUser?.role,
  };

  const accessToken = tokenGenerator(
    userInformationForJWT,
    config.jwt_access_secret as string,
    config.jwt_access_expiresIn as SignOptions["expiresIn"]
  );

  return { registerUser, accessToken };
};

const getAllUserFromDB = async () => {
  const result = await User.find({ role: "user" });
  return result;
};

const getMeFromDB = async (email: string) => {
  const result = await User.findOne({ email });

  return result;
};

export const UserService = {
  getMeFromDB,
  getAllUserFromDB,
  registerUserIntoDB,
};
