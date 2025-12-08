import jwt, { SignOptions } from "jsonwebtoken";

export interface JwtPayload {
  userId: string;
}

function getJwtSecret(): string {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is required in environment variables");
  }
  return process.env.JWT_SECRET;
}

function getJwtExpiresIn(): string {
  return process.env.JWT_EXPIRES_IN || "7d";
}

export function createToken(userId: string): string {
  const payload: JwtPayload = { userId };
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: getJwtExpiresIn(),
  } as SignOptions);
}

export function verifyToken(token: string): JwtPayload {
  try {
    return jwt.verify(token, getJwtSecret()) as JwtPayload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}
