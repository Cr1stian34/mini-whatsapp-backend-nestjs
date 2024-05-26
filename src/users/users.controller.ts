import {
  Body,
  Controller,
  Get,
  Patch,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getProfile(@Req() req) {
    const userId = req.user.userId;
    console.log('req', req.user);
    if (userId) {
      return this.userService.findUserById(userId);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUsers(@Req() req) {
    const userId = req.user.userId;
    console.log('req', req.user);
    if (userId) {
      return this.userService.findAllUsers();
    }
  }

  // @Put('/me')
  // updateProfile(@Req() req, @Body() updateProfile: UpdateProfileDto) {
  //   return this.userService.updateProfile(req.user.userId, updateProfile);
  // }

  @UseGuards(JwtAuthGuard)
  @Put('/me')
  updateProfile(@Req() req, @Body() updateProfile: UpdateProfileDto) {
    const userId = req.user.userId;
    console.log('req', req.user);
    if (userId) {
      return this.userService.updateProfile(userId, updateProfile);
    }
  }
}
