import { Component, OnInit, ViewChild } from '@angular/core';
import { faPen, faTimes, faTrashRestore } from '@fortawesome/free-solid-svg-icons';
import { modalType } from '../common/model/modal';
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
  faTrashRestore = faTrashRestore;

  isLoading: boolean = false;
  isError: boolean = false;
  //editModal: boolean = false;
  modal: modalType = modalType.create;
  allModalTypes = modalType;
  selectedButton: boolean = true;
  headers = ["Nombre", "Apellido", "Usuario", "Rol", "Número Documento", "Fecha de Nacimiento", "Teléfono", "Correo", "Dirección","Editar"];
  users: User[] = [];
  newUser: User = new User();


  constructor(private service: MantProfesorService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.selectedButton = true;
    window.scroll(0,0);
    this.newUser.teacher = new Teacher();
    this.getUsers();
  }

  getUsers(){
    this.isLoading = true;
    setTimeout(() => {
      this.service.getUsers(this.selectedButton).subscribe(res => {
        this.users = res;
        this.isLoading = false;
      });
    }, 500);    
  }

  submit(){
    switch(this.modal){
      case modalType.create:
        this.createUser();
        break;
      case modalType.edit:
        this.editUser();
        break;
      case modalType.restore:
        this.retoreUser();
        break;
      default:
        alert("Error: Tipo de formulario invalido.")
    }
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
    },
    error => {
      this.isError = true;
    });
    this.newUser = new User();
    this.newUser.teacher = new Teacher();
  }

  retoreUser(){
    this.service.restoreUser(this.newUser).subscribe(res => {
      if (res.status !== 200)
        this.isError = true;       
      else {
        this.getUsers();
        this.closeModal();
      } 
    },
    error => {
      this.isError = true;
    });
    this.newUser = new User();
    this.newUser.teacher = new Teacher();
  }


  delete(user: User){
    if(confirm("¿Desactivar usuario " + user.username + "?")) {
      this.service.removeUser(user).subscribe(res => {
        if (res.status !== 200) alert("Usuario no se ha eliminado correctamente.");       
      });
      this.getUsers();
    }    
  }

  restore(user: User){
    this.newUser = user;
    this.modal = modalType.restore;
    $('#modal').modal('show');
  }

  agregarModal(){
    this.modal = modalType.create;
    $('#modal').modal('show');
  }

  closeModal() {
    $('#modal').modal('hide');
    this.isError = false;
  }

  editarModal(user: User){
    this.newUser = user;
    this.modal = modalType.edit;
    $('#modal').modal('show');
  }

  public onValChange(status: boolean) {
    this.selectedButton = status;
    this.getUsers();
  }
}
