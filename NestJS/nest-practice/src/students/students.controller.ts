import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('students')
@ApiTags('Students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':rollno')
  findOne(@Param('rollno') rollno: number) {
    return this.studentsService.findOne(rollno);
  }

  @Patch(':rollno')
  update(
    @Param('rollno') rollno: number,
    @Body() updateStudentDto: CreateStudentDto,
  ) {
    return this.studentsService.update(rollno, updateStudentDto);
  }

  @Delete(':rollno')
  remove(@Param('rollno') rollno: number) {
    return this.studentsService.remove(rollno);
  }
}
