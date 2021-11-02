import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Classroom } from '../common/model/classroom';
import { DashboardService } from './service/dashboard.service';
declare var $:any; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  classrooms: Classroom[] = [];

  constructor(private service: DashboardService,
    private router: Router) { }

  ngOnInit(): void {
    window.scroll(0,0);
    this.getClassrooms();
  }

  getClassrooms(){
    this.service.getClassroom().subscribe(res => {
      this.classrooms = res;            
    })
  }

  irClase(classroom: Classroom){
    this.router.navigate(['clase']); 
  }

}
