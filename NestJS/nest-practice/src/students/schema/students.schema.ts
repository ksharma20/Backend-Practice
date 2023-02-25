import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SDocument = Student & Document;

@Schema()
export class Student {
  @Prop({ required: true, unique: true })
  rollNo: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  batch: number;

  @Prop()
  group: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
