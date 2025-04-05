import jwt from "jsonwebtoken";

export class JwtService {
  createToken = (id: string) => {
    const jwtToken = jwt.sign({ id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    return jwtToken;
  };

  verifyToken = (token: string) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

      return decoded;
    } catch (error) {
      const err = error as jwt.JsonWebTokenError;

      return err.message.includes("expired")
        ? { message: "Token expired" }
        : { message: "Invalid token" };
    }
  };
}
