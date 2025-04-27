import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultaCepService } from '../service/consulta-cep.service';
import { AlunoService } from '../service/aluno.service';
import { ClasseService } from '../service/classe.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Classe } from '../modelo/classe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  formulario!: FormGroup;
  idAtualizacaoCadastroRota: any;
  turma: Classe[] = [];
  campoDesabilitado: boolean = true;
  loading: boolean = true;

  constructor(private cepService: ConsultaCepService, private alunoService: AlunoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private classeService: ClasseService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.idAtualizacaoCadastroRota = this.route.snapshot.paramMap.get('id');
    this.campoDesabilitado = this.idAtualizacaoCadastroRota === '' || this.idAtualizacaoCadastroRota === undefined ? false : true;

    this.listarClasse();

    if (this.idAtualizacaoCadastroRota) {
      this.alunoService.buscarPorId(this.idAtualizacaoCadastroRota).subscribe(aluno => {
        this.formulario = this.formBuilder.group({
          id: [aluno.id],
          nome: [aluno.nome],
          cpf: [aluno.cpf],
          sexo: [aluno.sexo],
          data_Nascimento: [aluno.data_Nascimento],
          telefone: [aluno.telefone],
          id_Classe: [aluno.id_Classe],
          email: [aluno.email],
          endereco: [aluno.endereco],
          rua: [aluno.rua],
          complemento: [aluno.complemento],
          bairro: [aluno.bairro],
          cidade: [aluno.cidade],
          estado: [aluno.estado]
        })
      })
    } else {
      this.formulario = this.formBuilder.group({
        nome: ['', Validators.compose([Validators.required, Validators.pattern(/(.|\s)*\S(.|\s)*/), Validators.minLength(3)])],
        cpf: ['', [Validators.required]],
        sexo: ['', [Validators.required]],
        data_Nascimento: ['', [Validators.required]],
        telefone: ['', [Validators.required]],
        id_Classe: [''],
        email: ['', [Validators.required]],
        endereco: [''],
        rua: [''],
        complemento: [''],
        bairro: [''],
        cidade: [''],
        estado: ['']
      })
    }
  }

  listarClasse() {
    this.classeService.listarTurmaClasse().subscribe(turma => {
      this.turma = turma;
      this.loading = false;
    })
  }

  criarCadastroAluno() {
    this.loading = true;
    if (!this.idAtualizacaoCadastroRota) {
      if (this.formulario.valid) {
        if (this.ValidaCpf(this.formulario.get('cpf')?.value)) {
          this.alunoService.cadastrar(this.formulario.value).subscribe( () => {
            this.sucesso('O cadastro do Aluno: ' + this.formulario.get('nome')?.value + ' foi criado com sucesso!', 'Cadastro')
          }, (err) => {
            this.loading = false;
            console.log(err)
          })
        }
      } else {
        this.loading = false;
        this.alerta('O formulario ainda não foi preenchido!', 'Alerta');
      }
    } else {
      this.alunoService.editar(this.formulario.value).subscribe(() => {
        this.sucesso('Os dados do Aluno: ' + this.formulario.get('nome')?.value + ' foram atualuzados com sucesso!', 'Atualização');
      })
    }
  }

  consultaCEP(event: any) {
    const cep = event.target.value;
    if (cep !== '') {
      this.cepService.getConsultaCep(cep).subscribe(
        (resultado: any) => {
          this.formulario.get('rua')?.setValue(resultado.logradouro)
          this.formulario.get('complemento')?.setValue(resultado.complemento)
          this.formulario.get('bairro')?.setValue(resultado.bairro)
          this.formulario.get('cidade')?.setValue(resultado.localidade)
          this.formulario.get('estado')?.setValue(resultado.uf)
        }
      )
    }
  }

  navegar() {
    this.router.navigate(['/listar'])
  }

  sucesso(mensagem: string, titulo: string) {
    debugger
    this.toastr.success(mensagem, titulo, {
      timeOut: 3000
    })
    this.router.navigate(['/listar'])
  }


  alerta(mensagem: string, titulo: string) {
    this.toastr.warning(mensagem, titulo, {
      timeOut: 3000
    })
  }

  ValidaCpf(cpf: string): boolean {
    if (cpf == null) {
      this.alerta('CPF não foi preenchido', 'Alerta');
      this.loading = false;
      return false;
    }
    if (cpf.length != 11) {
      this.alerta('CPF invalido', 'Alerta');
      this.loading = false;
      return false;
    }
    if ((cpf == '00000000000') || (cpf == '11111111111') || (cpf == '22222222222') || (cpf == '33333333333') || (cpf == '44444444444') || (cpf == '55555555555') || (cpf == '66666666666') || (cpf == '77777777777') || (cpf == '88888888888') || (cpf == '99999999999')) {
      this.alerta('CPF invalido', 'Alerta');
      this.loading = false;
      return false;
    }
    let numero: number = 0;
    let caracter: string = '';
    let numeros: string = '0123456789';
    let j: number = 10;
    let somatorio: number = 0;
    let resto: number = 0;
    let digito1: number = 0;
    let digito2: number = 0;
    let cpfAux: string = '';
    cpfAux = cpf.substring(0, 9);
    for (let i: number = 0; i < 9; i++) {
      caracter = cpfAux.charAt(i);
      if (numeros.search(caracter) == -1) {
        return false;
      }
      numero = Number(caracter);
      somatorio = somatorio + (numero * j);
      j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
      digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i: number = 0; i < 10; i++) {
      caracter = cpfAux.charAt(i);
      numero = Number(caracter);
      somatorio = somatorio + (numero * j);
      j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
      digito2 = 0;
    }
    cpfAux = cpfAux + digito2;
    if (cpf != cpfAux) {
      this.alerta('CPF invalido', 'Alerta');
      this.loading = false;
      return false;
    }
    else {
      return true;
    }
  }
}
