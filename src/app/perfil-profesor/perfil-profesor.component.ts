import { Component, OnInit } from '@angular/core';
import { faUser, faIdCard,faBirthdayCake, faPhone, faEnvelope, faLocationArrow, faFire, faBuilding} from '@fortawesome/free-solid-svg-icons';
import { Teacher } from '../common/model/teacher';
import { PerfilService } from './service/perfil.service';

@Component({
  selector: 'app-perfil-profesor',
  templateUrl: './perfil-profesor.component.html',
  styleUrls: ['./perfil-profesor.component.css']
})
export class PerfilProfesorComponent implements OnInit {

  faUser = faUser;
  faIdCard = faIdCard;
  faBirthdayCake = faBirthdayCake;
  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faLocationArrow = faLocationArrow;
  faFire = faFire;
  faBuilding = faBuilding;

  user: Teacher = new Teacher;


  constructor(private service: PerfilService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.service.getUser().subscribe(res => {
      this.user = res.body;
    });
  }

}
