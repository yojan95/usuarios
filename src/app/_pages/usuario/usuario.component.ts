import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/_model/Usuario';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { UsuarioEdicionComponent } from './usuario-edicion/usuario-edicion.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  displayedColumns: string[] = ['idUsuario', 'nombres', 'activo', 'Rol' ,'acciones'];
  consulta:string;

  constructor(
    private usuarioService:UsuarioService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
 ) { }
    usuarios:Usuario[]=[];

  ngOnInit(): void {
    this.usuarioService.listarUsuarios().subscribe(data => 
     this.dataSource = new MatTableDataSource(data));

     this.usuarioService.getMensajeCambio().subscribe(mensaje =>{
       this.snackBar.open(mensaje,'AVISO', { duration: 5000, horizontalPosition: "right", verticalPosition: "top" })
     });

     this.usuarioService.getUsuarioCambio().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
     });

    
  }

  abrirDialogo(usuario:Usuario){
    this.dialog.open(UsuarioEdicionComponent,{
      width: '250px',
      data:usuario
    });
  }

  abrirDialogoRegistrar(){
    this.dialog.open(RegistrarUsuarioComponent,{
      width:'250px'
    });
  }

  filtrar(e?:any){
   // this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  filtrarPorNombre(){
   if(this.consulta === ""){
      this.ngOnInit();
   }else{
    this.usuarioService.filtroPorNombre(this.consulta).subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
    });
   } 
   
  }

  limpiarConsultaBtn(){
    this.consulta = "";
  }
  
}
