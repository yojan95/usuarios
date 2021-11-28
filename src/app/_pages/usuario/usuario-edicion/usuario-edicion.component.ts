import { Component,Inject, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/_model/Usuario';
import { Rol } from 'src/app/_model/rol';
import { RolService } from 'src/app/_service/rol.service';
import { RegistrarUsuarioComponent } from '../registrar-usuario/registrar-usuario.component';

@Component({
  selector: 'app-usuario-edicion',
  templateUrl: './usuario-edicion.component.html',
  styleUrls: ['./usuario-edicion.component.css']
})
export class UsuarioEdicionComponent implements OnInit {


  usuario:Usuario;
  roles:Rol[] = [];
  constructor(
    private usuarioService:UsuarioService,
    private rolService:RolService,
    private dialogRef: MatDialogRef<UsuarioEdicionComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: Usuario,
    ) { }

  ngOnInit(): void {
  this.rolService.listarRoles().subscribe(data => {
    this.roles = data;
  });    
   
    this.usuario = {...this.data};
  }

  editarUsuario(){
    this.usuarioService.modificarUsuario(this.usuario).subscribe(() =>{
      this.usuarioService.listarUsuarios().subscribe(data =>{
        this.usuarioService.setPacienteCambio(data);
        this.usuarioService.setMensajeCambio("Usuario Actualizado");
        this.cerrar();
      })
    })
  }

  cerrar(){
    this.dialogRef.close();
  }

  eliminarUsuario(id:number){
    this.usuarioService.eliminarUsuarioPorid(id).subscribe(()=>{
      this.usuarioService.listarUsuarios().subscribe(data =>{
        this.usuarioService.setPacienteCambio(data);
        this.usuarioService.setMensajeCambio("Usuario eliminado");
        this.cerrar();
      })
    })
  }

  openNuevoUsuario(){
    this.dialog.open(RegistrarUsuarioComponent,{
      width: '250px'
    });
    this.cerrar();
  }
}
