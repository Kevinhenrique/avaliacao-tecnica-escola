import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlunoService } from '../service/aluno.service';
import { Aluno } from '../modelo/aluno';
import { Classe } from '../modelo/classe';
import { ClasseService } from '../service/classe.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  @ViewChild('content', { static: false }) el!: ElementRef;

  listar: Aluno[] = [];
  turma: Classe[] = [];
  loading: boolean = true;

  constructor(private router: Router, private alunoService: AlunoService, private classeService: ClasseService) { }

  ngOnInit(): void {
    this.listarAlunos();
  }

  pesquisar(event: any) {
    const TABELA_ALUNO = document.getElementById('informacao-aluno');
    let linhas = TABELA_ALUNO?.getElementsByTagName('tr');

    for (let posicao in linhas) {
      if (true === isNaN(Number(posicao))) {
        continue;
      }

      let conteudoDaLinha = linhas[Number(posicao)].innerHTML;

      if (true === conteudoDaLinha.toLocaleLowerCase().includes(event.target.value)) {
        linhas[Number(posicao)].style.display = '';
      } else {
        linhas[Number(posicao)].style.display = 'none';
      }
    }

  }

  listarAlunos() {
    this.loading = true;
    this.alunoService.listar().subscribe(alunos => {
      this.listarClasse();
      this.listar = alunos;
    })
  }

  baixarRelatorio(aluno: Aluno) {
    this.loading = true;
    let documento = new jsPDF('p', 'pt', 'a4');

    // Header
    documento.setFont("Courier");
    documento.setFont("bold");
    documento.setFontSize(20);
    documento.text("Ficha do Aluno", 250, 15);
    documento.setDrawColor(0, 47, 82);
    documento.setLineWidth(1.5);
    documento.line(65, 25, 530, 25);

    // Primeiro Bloco Dados Escolares
    documento.setFontSize(20);
    documento.setTextColor(235, 155, 0);
    documento.text("Dados Escolares", 65, 50);
    documento.setFontSize(12);
    documento.setTextColor(0, 0, 0);
    documento.text("Turma: " + this.apresentarTurmaTabela(aluno.id_Classe), 65, 80);
    documento.text("Matricula: " + aluno.id, 65, 100);

    documento.setDrawColor(0, 47, 82);
    documento.setLineWidth(1.5);
    documento.line(65, 110, 530, 110);

    // Primeiro Bloco Dados Pessoais
    documento.setFontSize(20);
    documento.setTextColor(235, 155, 0);
    documento.text("Dados Pessoais", 65, 145);

    documento.setFontSize(12);
    documento.setTextColor(0, 0, 0);
    documento.text("Aluno: " + aluno.nome, 65, 180);
    documento.text("CPF: " + aluno.cpf, 65, 200)
    documento.text("Data de Nascimento: " + aluno.data_Nascimento, 65, 220)
    documento.text("Telefone: " + aluno.telefone, 65, 240)
    documento.text("E-mail: " + aluno.email, 65, 260)

    documento.setDrawColor(0, 47, 82);
    documento.setLineWidth(1.5);
    documento.line(65, 270, 530, 270);

    //Segundo Bloco Endereço
    documento.setFontSize(20);
    documento.setTextColor(235, 155, 0);
    documento.text("Endereço", 65, 300);

    documento.setFontSize(12);
    documento.setTextColor(0, 0, 0);
    documento.text("Estado: " + aluno.estado, 65, 340)
    documento.text("Cidade: " + aluno.cidade, 65, 360)
    documento.text("Bairro: " + aluno.bairro, 65, 380)
    documento.text("Rua: " + aluno.rua, 65, 400)
    documento.text("Complemento: " + aluno.complemento, 65, 420)

    documento.save(aluno.id + "_" + aluno.nome + ".pdf");
    this.loading = false;
  }

  listarClasse() {
    this.classeService.listarTurmaClasse().subscribe(turma => {
      this.turma = turma;
      this.loading = false;
    })
  }

  apresentarTurmaTabela(id: number) {
    return this?.turma?.find(x => x.id === id)?.classe;
  }
}
