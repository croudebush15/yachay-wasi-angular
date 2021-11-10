import { Course } from "./course";
import { Teacher } from "./teacher";

export class Classroom {
    id!: number;
    name!: string;
    numberOfStudents!: number;
    dayOfWeek!: string;
    course!: Course;
    horaI!: string;
    durationHours!: number;
    teacher!: Teacher;
}