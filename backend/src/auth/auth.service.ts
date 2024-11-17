import { Injectable } from '@nestjs/common';
import { AuthLoginPayloadDto, AuthRegisterPayloadDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  public ErrUserNotFound = new Error('User not found');
  public ErrInvalidPass = new Error('Invalid password');

  async validateUser({ email, password }: AuthLoginPayloadDto): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw this.ErrUserNotFound;
    }

    const isPasswordValid = await this.usersService.validateUserPassword(
      user.id,
      password,
    );
    if (!isPasswordValid) {
      throw this.ErrInvalidPass;
    }

    return { id: user.id, email: user.email, name: user.name };
  }

  async registerUser({
    email,
    name,
    password,
  }: AuthRegisterPayloadDto): Promise<any> {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = await this.usersService.create({ email, name });
    await this.usersService.storePassword(user.id, password);
    await this.usersService.sendVerificationEmail(user.id);
  }

  async generateJwtToken(user: any): Promise<string> {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  }
}
