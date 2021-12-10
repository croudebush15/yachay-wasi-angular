import { Attendance } from "./attendance";

export class Lesson {
    id!: number;
    date!: Date; 
    attendances!: Attendance[];
    lesson!: Lesson;
    lessonNumber!: number;   
}