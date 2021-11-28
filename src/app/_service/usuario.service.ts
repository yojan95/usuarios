import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../_model/Usuario';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = "http://localhost:8881/usuarios";
  private pacienteCambio: Subject<Usuario[]> = new Subject<Usuario[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();

  constructor(private http:HttpClient) { }

  listarUsuarios(){
    return this.http.get<Usuario[]>(this.url);
  }

  registrarUsuario(usuario:Usuario){
    return this.http.post(this.url,usuario);
  }

  modificarUsuario(usuario:Usuario){
    return this.http.put(this.url,usuario);
  }

  eliminarUsuarioPorid(id:number){
    return this.http.delete(this.url+"/"+id);
  }

  filtroPorNombre(filtro:string){
    return this.http.get<Usuario[]>(this.url+"/buscar/filtro?filtro="+filtro);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(texto: string){
    this.mensajeCambio.next(texto);
  }

  getUsuarioCambio(){
    return this.pacienteCambio.asObservable();
  }

  setPacienteCambio(lista: Usuario[]){
    this.pacienteCambio.next(lista);
  }
}
