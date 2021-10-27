import { Component, OnInit } from '@angular/core';
import { Classroom } from '../common/model/classroom';
import { ClaseService } from './service/dashboard.service';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.css']
})
export class ClaseComponent implements OnInit {

  classrooms: Classroom[] = [];

  constructor(private service: ClaseService) { }

  ngOnInit(): void {
    window.scroll(0,0);
    this.getClassrooms();
  }

  getClassrooms(){
    this.service.getClassroom().subscribe(res => {
      this.classrooms = res;
      //console.log(res);              
    })
  }
}
