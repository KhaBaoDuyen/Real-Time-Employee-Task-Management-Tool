import jwt from "jsonwebtoken";

export interface IUserPayload {
  id: string;
  phone: string;
}

export const createAccessToken = (user: IUserPayload) => {
  return jwt.sign(user, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = (user: IUserPayload) => {
  return jwt.sign(user, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  });
};
