import { Injectable, NotFoundException } from '@nestjs/common';
import * as mockData from '../data/MOCK_DATA.json';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';

@Injectable()
export class UsersService {
  private usersData = mockData;

  findAll(role?: string) {
    if (role) {
      const data = this.usersData.filter((user) => user.role === role);
      if (!data.length) throw new NotFoundException('User Not Found');
      return data;
    }
    return this.usersData;
  }

  findOne(id: number) {
    const user = this.usersData.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }

  create(user: CreateUsersDto) {
    const usersByHighestId = [...this.usersData].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };
    this.usersData.push(newUser);
    return newUser;
  }

  update(id: number, updatedUser: UpdateUsersDto) {
    this.usersData = this.usersData.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.usersData = this.usersData.filter((user) => user.id !== id);
    return removedUser;
  }
}
