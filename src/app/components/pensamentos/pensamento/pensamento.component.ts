import { Component, Input } from '@angular/core';
import { Pensamento } from '../../../interfaces/pensamento.interface';
import { MatDialog } from '@angular/material/dialog';
import { ExcluirPensamentoModalComponent } from '../excluir-pensamento-modal/excluir-pensamento-modal.component';
import { PensamentoService } from '../../../services/pensamentos/pensamento/pensamento.service';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrl: './pensamento.component.css',
})
export class PensamentoComponent {
  // essa anotação quer dizer que o objeto vai receber informações do componente pai, no caso, listaPensamento.ts
  @Input() pensamento: Pensamento = {
    // id: 1,
    conteudo: '',
    autoria: '',
    modelo: '',
    favorito: false,
  };

  @Input() listaFavoritos: Pensamento[] = [];

  constructor(public dialog: MatDialog, private service: PensamentoService) {}

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

  mudarIconeFavorito(): string {
    if (!this.pensamento.favorito) return 'inativo';
    return 'ativo';
  }

  atualizarFavoritos() {
    this.service.mudarFavorito(this.pensamento).subscribe(() => {
      // remover da lista de favoritos o pensamento que foi desmarcado
      this.listaFavoritos.splice(
        this.listaFavoritos.indexOf(this.pensamento),
        1
      );
    });
  }
}
