import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Attendance } from 'src/app/common/model/attendance';
import { Lesson } from 'src/app/common/model/lesson';
import { Student } from 'src/app/common/model/student';
declare var $:any; 

@Component({
  selector: 'app-asistencia-alumnos',
  templateUrl: './asistencia-alumnos.component.html',
  styleUrls: ['./asistencia-alumnos.component.css']
})
export class AsistenciaAlumnosComponent implements OnInit, OnChanges {

  @Input() students: Student[] = [];
  @Input() session!: Lesson;
  @Output() markAttentanceEmitter = new EventEmitter<Lesson>();
  attendances: Attendance[] = [];
  selectedAttendance: Attendance = new Attendance(new Student);
  myControl = new FormControl();
  faPen = faPen; 

  constructor() { }

  ngOnInit(): void {
    this.clear();
  }

  ngOnChanges(): void {
    this.clear();
  }

  checkState(event: any, el: any, attendance: Attendance) {
    event.preventDefault();
      if (el.checked === true) {
        el.checked = false;
        attendance.presentInClass = null;
      } else {
        el.checked = true;
        if (el.value === true) attendance.presentInClass = true;
        else attendance.presentInClass = false;
      }    
  }

  clear(){
    console.log(this.session);
    this.attendances = this.session.attendances;
    if (this.attendances.length < this.students.length){      
      const studentIds: number[] = []; 
      for (var attendance of this.attendances) studentIds.push(attendance.student.id);
      for (var student of this.students) {
        if (!studentIds.includes(student.id))
        this.attendances.push(new Attendance(student));
      }
    }    
  }

  markAttentance() {
    this.session.attendances = this.attendances;
    this.markAttentanceEmitter.emit(this.session);
    this.closeModal();
  }

  closeModal(){
    $('#modal').modal('hide');    
  }

  openReport(attendance: Attendance){
    this.selectedAttendance = attendance;    
    $('#modal').modal('show');
  }

}
