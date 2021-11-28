import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rol } from '../_model/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private url: string = "http://localhost:8881/roles";

  constructor(private http:HttpClient) { }

  listarRoles(){
    return this.http.get<Rol[]>(this.url);
  }


}
