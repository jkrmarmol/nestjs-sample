import { ParseIntPipe } from '@nestjs/common';
import { IsString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateUsersDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(
    [
      'Project Manager',
      'Surveyor',
      'Engineer',
      'Subcontractor',
      'Construction Worker',
      'Architect',
      'Electrician',
      'Estimator',
      'Construction Expeditor',
      'Construction Foreman',
    ],
    { message: 'valid role is required' },
  )
  role: string;
}
