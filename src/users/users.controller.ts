import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Users } from './model/user.model';
import { LoginUserDto } from './dto/login_user.dto';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { UserGuard } from '../guards/user.guard';
import { FindUserDto } from './dto/find_user.dto';
import { PhoneUserDto } from '../bot/dto/phone-user.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@ApiTags('Users') // Tags the controller with 'Users' for Swagger documentation
@Controller('users') // Defines the base route for this controller
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Endpoint for user registration
  @ApiOperation({ summary: 'Register a new user' }) // Description for Swagger documentation
  @ApiResponse({ status: 201, type: Users }) // Response definition for Swagger documentation
  @Post('signup') // Defines HTTP POST method and endpoint route
  async registration(
    @Body() createUserDto: CreateUserDto, // Request body containing user data
    @Res({ passthrough: true }) res: Response, // Express Response object for setting cookies
  ) {
    return this.usersService.registration(createUserDto, res); // Calls the registration method from the service
  }

  // Endpoint for creating a new user
  @Post() // Defines HTTP POST method and endpoint route
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto); // Calls the create method from the service
  }

  @HttpCode(200)
  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.login(loginUserDto, res);
  }

  @UseGuards(UserGuard)
  @HttpCode(200)
  @Post('logout')
  async logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.logout(refreshToken, res);
  }

  @HttpCode(200)
  @Post(':id/refresh')
  async refresh(
    @Param('id') id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.refreshToken(+id, refreshToken, res);
  }
  @Get('activate/:link')
  async activate(@Param('link') link: string) {
    return this.usersService.activate(link);
  }

  @HttpCode(200)
  @Post('find')
  async findUser(@Body() findUserDto: FindUserDto) {
    return this.usersService.findUser(findUserDto);
  }

  // Endpoint for retrieving all users
  @Get() // Defines HTTP GET method and endpoint route
  async findAll() {
    return this.usersService.findAll(); // Calls the findAll method from the service
  }

  // Endpoint for retrieving a user by ID
  @Get(':id') // Defines HTTP GET method and endpoint route with a parameter
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id); // Calls the findOne method from the service
  }

  // @HttpCode(200)
  // @Post('new_otp')
  // async newOtp(@Body() phoneUserDto: PhoneUserDto) {
  //   return this.usersService.newOTP(phoneUserDto);
  // }

  // @HttpCode(200)
  // @Post('verify_otp')
  // async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
  //   return this.usersService.verifyOtp(verifyOtpDto);
  // }

  // Endpoint for updating a user by ID
  @Patch(':id') // Defines HTTP PATCH method and endpoint route with a parameter
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto); // Calls the update method from the service
  }

  // Endpoint for deleting a user by ID
  @Delete(':id') // Defines HTTP DELETE method and endpoint route with a parameter
  async remove(@Param('id') id: string) {
    return this.usersService.remove(+id); // Calls the remove method from the service
  }
}
