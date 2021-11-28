import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Rol } from 'src/app/_model/rol';
import { Usuario } from 'src/app/_model/Usuario';
import { RolService } from 'src/app/_service/rol.service';
import { UsuarioService } from 'src/app/_service/usuario.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  roles$: Observable<Rol[]>;
  nombre:string;
  activo:string;
  rol:Rol;

  constructor(
    private rolService:RolService,
    private usuarioService:UsuarioService,
    private dialogRef: MatDialogRef<RegistrarUsuarioComponent>) { }

  ngOnInit(): void {
    this.roles$ = this.rolService.listarRoles();
  }
  registrarUsuario(){
    let usuario = new Usuario();
    usuario.nombre = this.nombre;
    usuario.activo = this.activo;
    usuario.rol = this.rol;

    this.usuarioService.registrarUsuario(usuario).subscribe(() =>{
      this.usuarioService.listarUsuarios().subscribe(data => {
        this.usuarioService.setPacienteCambio(data);
        this.usuarioService.setMensajeCambio('Usuario registrado');
        this.dialogRef.close();
      })
    });
  }

  cerrar(){
    this.dialogRef.close();
  }

}
