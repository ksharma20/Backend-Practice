import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './schema/students.schema';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-practice'),
    MongooseModule.forFeature([
      {
        name: Student.name,
        schema: StudentSchema,
      },
    ]),
  ],
})
export class StudentsModule {}
