import { Aluno } from './../modelo/aluno';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Classe } from '../modelo/classe';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  private readonly API = 'https://localhost:44379/aluno';
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  listar() {
    return this.http.get<Aluno[]>(this.API);
  }

  cadastrar(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.API, aluno).pipe(
      catchError((error: any) => {
        console.log(error)
        this.toastr.warning(error?.message, 'Error', {
          timeOut: 3000
        })
        return throwError(() => new Error(error))
      })
    )
  }

  excluir(id: number) {
    let params = new HttpParams().set("id", id);
    return this.http.delete<boolean>(this.API, {params});
  }

  buscarPorId(id: string) {
    const url = `${this.API}/${id}`
    return this.http.get<Aluno>(url);
  }

  editar(aluno : Aluno) {
    return this.http.put<Aluno>(this.API, aluno);
  }

  listarTurmaClasse(){
    return this.http.get<Classe[]>(this.API);
  }
}
