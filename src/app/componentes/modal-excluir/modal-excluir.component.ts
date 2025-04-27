import { Component, OnInit } from '@angular/core';
import { AlunoService } from '../../service/aluno.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-excluir',
  templateUrl: './modal-excluir.component.html',
  styleUrls: ['./modal-excluir.component.css']
})
export class ModalExcluirComponent implements OnInit {

  id: any;
  constructor(private alunoService: AlunoService, private router: Router, private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  excluir() {
    this.alunoService.excluir(this.id).subscribe(() => {
      this.toastr.success('O Aluno da matricula: ' + this.id + ' foi excluído com sucesso!', 'Exclusão', {
        timeOut: 3000
      })
      this.router.navigate(['/listar'])
    })
  }

}
