/*
ESSA CLASSE NÃO SERÁ MAIS UTILIZADA!!! VAMOS USAR MODAL
*/
import { Component } from '@angular/core';
import { Pensamento } from '../../../interfaces/pensamento.interface';
import { PensamentoService } from '../../../services/pensamentos/pensamento/pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-excluir-pensamento',
  templateUrl: './excluir-pensamento.component.html',
  styleUrl: './excluir-pensamento.component.css',
})
export class ExcluirPensamentoComponent {
  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
  };
  constructor(
    private service: PensamentoService,
    private router: Router,
    // tem que usar ActivatedRoute para pegar dados da rota (parametros)
    private route: ActivatedRoute,
    private snackBar: MatSnackBar // Injete o MatSnackBar
  ) {}

  ngOnInit() {
    // pegar o id do pensamento para poder excluir
    const id = this.route.snapshot.paramMap.get('id');
    this.service.buscarPorId(parseInt(id!)).subscribe((obj) => {
      this.pensamento = obj;
    });
  }

  excluirPensamento() {
    if (this.pensamento.id == null) {
      return;
    }
    this.service.excluir(this.pensamento.id).subscribe(
      () => {
        this.router.navigate(['/listar-pensamento']);
      },
      (error) => {
        // Aqui você trata o erro
        console.error('Erro ao excluir o pensamento:', error);
        this.snackBar
          .open(
            'Erro ao excluir o pensamento. Por favor, tente novamente.',
            'Fechar',
            {
              duration: 5000, // Define a duração do Snackbar em milissegundos
            }
          )
          // quando apertar em fechar, vai ser redirecionado
          .onAction()
          .subscribe(() => {
            this.router.navigate(['listar-pensamento']);
          });
      }
    );
  }

  cancelar() {
    this.router.navigate(['/listar-pensamento']);
  }
}
