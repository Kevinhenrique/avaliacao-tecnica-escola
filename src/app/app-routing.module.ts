import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ListarComponent } from './listar/listar.component';
import { ModalExcluirComponent } from './componentes/modal-excluir/modal-excluir.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'listar',
  },
  {
    path: 'cadastro/:id',
    component: CadastroComponent
  },
  {
    path: 'listar',
    component: ListarComponent
  },
  {
    path: 'novo-cadastro',
    component: CadastroComponent
  },
  {
    path: 'excluir/:id',
    component: ModalExcluirComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
