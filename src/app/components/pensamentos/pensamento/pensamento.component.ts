import { Component, Input } from '@angular/core';
import { Pensamento } from '../../../interfaces/pensamento.interface';
import { MatDialog } from '@angular/material/dialog';
import { ExcluirPensamentoModalComponent } from '../excluir-pensamento-modal/excluir-pensamento-modal.component';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrl: './pensamento.component.css',
})
export class PensamentoComponent {
  // essa anotação quer dizer que o objeto vai receber informações do componente pai
  @Input() pensamento: Pensamento = {
    // id: 1,
    conteudo: '',
    autoria: '',
    modelo: '',
  };

  constructor(public dialog: MatDialog) {}

  larguraPensamento(): string {
    if (this.pensamento.conteudo.length >= 256) {
      return 'pensamento-g';
    }
    return 'pensamento-p';
  }

  abrirModal() {
    const dialogRef = this.dialog.open(ExcluirPensamentoModalComponent, {
      data: { pensamento: this.pensamento }, // Passando o objeto pensamento para o modal
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('O modal foi fechado');
    });
  }
}
