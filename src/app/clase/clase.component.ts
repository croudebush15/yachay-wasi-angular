import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Classroom } from '../common/model/classroom';
import { ClaseService } from './service/dashboard.service';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.css']
})
export class ClaseComponent implements OnInit {

  classModules = ["Lista", "Asistencia", "Reportes"];
  public id: string = "";

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    window.scroll(0,0);
    this.id = this.route.snapshot.paramMap.get('id') || "";
    if(this.id === "") this.router.navigate(['dashboard']); 
  }

  ir(module: string){
    this.router.navigate([module.toLowerCase() + '/' + this.id]);
  }
}
