import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Teacher } from '../common/model/teacher';
import { User } from '../common/model/user';
import { MantProfesorService } from './service/mant-profesor.service';
declare var $:any; 

@Component({
  selector: 'app-mant-profesor',
  templateUrl: './mant-profesor.component.html',
  styleUrls: ['./mant-profesor.component.css']
})
export class MantProfesorComponent implements OnInit {

  
  @ViewChild('modal') myModal: any;

  faTimes = faTimes;
  faPen = faPen; 

  newUserForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    firstName: new FormControl()
  })

  isError: boolean = false;
  editModal: boolean = false;
  headers = ["Nombre", "Apellido", "Usuario", "Rol", "Número Documento", "Fecha de Nacimiento", "Teléfono", "Correo", "Dirección","Editar","Eliminar"];
  users: User[] = [];
  newUser: User = new User();


  constructor(private service: MantProfesorService) { }

  ngOnInit(): void {
    window.scroll(0,0);
    this.newUser.teacher = new Teacher();
    this.getUsers();
  }

  getUsers(){
    this.service.getUsers().subscribe(res => {
      this.users = res;
    });
  }

  submit(){
    if(this.editModal) this.editUser();
    else this.createUser();
  }

  createUser(){
    this.service.createUser(this.newUser).subscribe(res => {
      if (res.status !== 200)
        this.isError = true;       
      else {
        this.getUsers();
        this.closeModal();
      } 
    });
    this.newUser = new User();
    this.newUser.teacher = new Teacher();
  }

  editUser(){
    this.service.editUser(this.newUser).subscribe(res => {
      if (res.status !== 200)
        this.isError = true;       
      else {
        this.getUsers();
        this.closeModal();
      } 
    });
    this.newUser = new User();
    this.newUser.teacher = new Teacher();
  }

  eliminar(user: User){
    if(confirm("¿Eliminar usuario " + user.username + "?")) {
      this.service.removeUser(user).subscribe(res => {
        if (res.status !== 200) alert("Usuario no se ha eliminado correctamente.");
        else this.getUsers();
      });
    }    
  }

  agregarModal(){
    this.editModal = false;
    $('#modal').modal('show');
  }

  closeModal() {
    $('#modal').modal('hide');
    this.isError = false;
  }

  editarModal(user: User){
    this.newUser = user;
    this.editModal = true;
    $('#modal').modal('show');
  }
}
