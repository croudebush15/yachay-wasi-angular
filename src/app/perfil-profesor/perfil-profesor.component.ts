import { Component, OnInit } from '@angular/core';
import { faUser, faIdCard,faBirthdayCake, faPhone, faEnvelope, faLocationArrow, faFire, faBuilding} from '@fortawesome/free-solid-svg-icons';

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


  constructor() { }

  ngOnInit(): void {
  }

}
