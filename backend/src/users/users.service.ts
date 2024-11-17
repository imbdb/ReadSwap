import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { sendEmail } from 'src/util';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  create(createUserDto: Prisma.UserCreateInput) {
    return this.db.user.create({ data: createUserDto });
  }

  findAll() {
    return this.db.user.findMany();
  }

  findOne(id: number) {
    return this.db.user.findUnique({ where: { id } });
  }

  findByEmail(email: string) {
    return this.db.user.findFirst({ where: { email } });
  }

  update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.db.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.db.user.delete({ where: { id } });
  }

  async validateUserPassword(userId: number, token: string): Promise<boolean> {
    const user = await this.db.user.findUnique({
      where: { id: userId },
      include: { passwordHashes: { orderBy: { createdAt: 'desc' }, take: 1 } },
    });

    if (!user || user.passwordHashes.length === 0) {
      return false;
    }
    const latestHash = user.passwordHashes[0].hash;
    return bcrypt.compare(token, latestHash);
  }

  async storePassword(userId: number, password: string): Promise<void> {
    const existingHashes = await this.db.passwordHashes.findMany({
      where: { userId },
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    for (const hashRecord of existingHashes) {
      const isMatch = await bcrypt.compare(hashedPassword, hashRecord.hash);
      if (isMatch) {
        throw new Error('password_already_used');
      }
    }

    await this.db.passwordHashes.create({
      data: {
        userId,
        hash: hashedPassword,
      },
    });
  }

  async sendVerificationEmail(userId: number): Promise<void> {
    const user = await this.db.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error('user_not_found');
    }
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: '48h',
    });

    await sendEmail(
      user.email,
      'Email Verification',
      `Please verify your email by clicking on the following link: ${process.env.FRONTEND_URL}/verify-email?token=${token}`,
      `<strong>Please verify your email by clicking on the following link: <a href="${process.env.FRONTEND_URL}/verify-email?token=${token}">Verify Email</a></strong>`,
    );
  }

  async verifyEmail(token: string): Promise<void> {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;

      await this.db.user.update({
        where: { id: userId },
        data: { emailVerified: true },
      });
    } catch (error) {
      throw new Error('invalid_token');
    }
  }
}
