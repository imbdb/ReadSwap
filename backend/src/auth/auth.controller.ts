import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { AuthLoginPayloadDto, AuthRegisterPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

class UserNotFound extends HttpException {
  constructor() {
    super('User Not Found', HttpStatus.NOT_FOUND);
  }
}

class InvalidPassword extends HttpException {
  constructor() {
    super('Invalid Password', HttpStatus.BAD_REQUEST);
  }
}

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(@Body() authPayload: AuthLoginPayloadDto) {
    try {
      const validatedUser = await this.authService.validateUser(authPayload);
      const token = await this.authService.generateJwtToken(validatedUser);
      return {
        status: 'success',
        user: { ...validatedUser, token },
      };
    } catch (e) {
      if (e === this.authService.ErrUserNotFound) {
        throw new UserNotFound();
      } else if (e === this.authService.ErrInvalidPass) {
        throw new InvalidPassword();
      } else {
        this.logger.error(e);
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Post('register')
  async register(@Body() authPayload: AuthRegisterPayloadDto) {
    return this.authService.registerUser(authPayload);
  }
}
