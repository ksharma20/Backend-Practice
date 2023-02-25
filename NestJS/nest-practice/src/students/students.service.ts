import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
import { SDocument, Student } from './schema/students.schema';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private StudentModel: Model<SDocument>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const nStu = new this.StudentModel(createStudentDto);
    return nStu.save();
  }

  async findAll() {
    const allStu = await this.StudentModel.find({});
    return allStu;
  }

  async findOne(id: number) {
    const stu = await this.StudentModel.find({
      rollNo: id,
    });
    console.log(stu);
    if (!stu.length) {
      return 'No User Found';
    }
    return stu;
  }

  async update(id: number, updateStudentDto: CreateStudentDto) {
    const uStu = await this.StudentModel.findOneAndUpdate(
      { rollNo: id },
      updateStudentDto,
      { new: true },
    );
    return uStu;
  }

  async remove(id: number) {
    return await this.StudentModel.findOneAndDelete({
      rollNo: id,
    });
  }
}
