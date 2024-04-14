import { Component, Inject } from '@angular/core';
import { Pensamento } from '../../../interfaces/pensamento.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { PensamentoService } from '../../../services/pensamentos/pensamento/pensamento.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-excluir-pensamento-modal',
  templateUrl: './excluir-pensamento-modal.component.html',
  styleUrl: './excluir-pensamento-modal.component.css',
})
export class ExcluirPensamentoModalComponent {
  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
  };
  constructor(
    private service: PensamentoService,
    // private router: Router,
    // tem que usar ActivatedRoute para pegar dados da rota (parametros)
    // private route: ActivatedRoute,
    private snackBar: MatSnackBar, // Injete o MatSnackBar
    public dialogRef: MatDialogRef<ExcluirPensamentoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.pensamento = data.pensamento; // Recebendo o objeto pensamento do componente pensamento.ts através do método abrirModal()
  }

  ngOnInit() {
    // // pegar o id do pensamento para poder excluir
    // const id = this.route.snapshot.paramMap.get('id');
    // this.service.buscarPorId(parseInt(id!)).subscribe((obj) => {
    //   this.pensamento = obj;
    // });
  }

  excluirPensamento() {
    console.log(this.pensamento.id);
    if (this.pensamento.id == null) {
      return;
    }
    this.service.excluir(this.pensamento.id).subscribe(
      () => {
        this.dialogRef.close();
        location.reload();
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
            this.dialogRef.close();
            // this.router.navigate(['listar-pensamento']);
          });
      }
    );
  }

  cancelar() {
    this.dialogRef.close();
    // this.router.navigate(['/listar-pensamento']);
  }
}
