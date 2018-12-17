import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { Module } from '@nestjs/common';
import { User } from './../../data/entities/user';
import { FileService } from './file.service';

// @Module({
//   imports: [TypeOrmModule.forFeature([User])],
//   providers: [UsersService, FileService],
//   exports: [UsersService, FileService],
// })

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  exports: [UsersService],
})
export class CoreModule { }
