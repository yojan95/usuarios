import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { UsuarioComponent } from './_pages/usuario/usuario.component';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioEdicionComponent } from './_pages/usuario/usuario-edicion/usuario-edicion.component';
import { FormsModule } from '@angular/forms';
import { RegistrarUsuarioComponent } from './_pages/usuario/registrar-usuario/registrar-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    UsuarioEdicionComponent,
    RegistrarUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
