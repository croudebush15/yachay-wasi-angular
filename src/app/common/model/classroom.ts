import { Course } from "./course";

export class Classroom {
    id!: number;
    name!: string;
    numberOfStudents!: number;
    dayOfWeek!: string;
    course!: Course;
    horaF!: string;
    horaI!: string;
}