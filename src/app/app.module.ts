import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MensagemComponent } from './componentes/mensagem/mensagem.component';
import { LoaderComponent } from "./componentes/loader/loader.component";
import { ListarComponent } from './listar/listar.component';
import { NgxLoadingModule } from "ngx-loading";
import { ModalExcluirComponent } from './componentes/modal-excluir/modal-excluir.component';
import { HeaderComponent } from './componentes/header/header.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    MensagemComponent,
    ListarComponent,
    LoaderComponent,
    ModalExcluirComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({
      fullScreenBackdrop: true
    }),
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
