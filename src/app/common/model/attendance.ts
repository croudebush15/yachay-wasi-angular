import { Student } from "./student";

export class Attendance {
    id!: number;
    presentInClass!: boolean | null;
    student!: Student;
    report!: string | null;
    constructor(student: Student){
        this.student = student;
      }
}