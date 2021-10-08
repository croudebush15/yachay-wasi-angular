import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-logo-perfil',
  templateUrl: './logo-perfil.component.html',
  styleUrls: ['./logo-perfil.component.css']
})
export class LogoPerfilComponent implements OnInit {

  faSearch = faSearch;

  constructor() { }

  ngOnInit(): void {
  }

}
