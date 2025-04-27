import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Classe } from '../modelo/classe';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  private readonly API = 'https://localhost:44379/classe';
  constructor(private http: HttpClient) { }

  listarTurmaClasse() {
    return this.http.get<Classe[]>(this.API);
  }
}
