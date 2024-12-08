import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

class AuthService {
  async register(data: { name: string; email: string; password: string }) {
    const { name, email, password } = data;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error("Email already in use");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error("Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const accessToken = this.generateAccessToken(user.id);
    const refreshToken = this.generateRefreshToken(user.id);

    return { accessToken, refreshToken };
  }

  async refreshToken(token: string) {
    try {
      const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);

      const newAccessToken = this.generateAccessToken((payload as any).id);
      const newRefreshToken = this.generateRefreshToken((payload as any).id);

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
  }

  async logout(refreshToken: string) {
    // TODO:Placeholder logic; implement token blacklist if needed
    return;
  }

  generateAccessToken(userId: string) {
    return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET! || "my_secret_key", {
      expiresIn: "15m",
    });
  }

  generateRefreshToken(userId: string) {
    return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET! || "my_secret_key", {
      expiresIn: "7d",
    });
  }
}

export default new AuthService();
