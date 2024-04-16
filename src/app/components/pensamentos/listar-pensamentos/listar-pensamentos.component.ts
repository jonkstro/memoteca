import { PensamentoService } from '../../../services/pensamentos/pensamento/pensamento.service';
import { Pensamento } from './../../../interfaces/pensamento.interface';
import { Component } from '@angular/core';

@Component({
  selector: 'app-listar-pensamentos',
  templateUrl: './listar-pensamentos.component.html',
  styleUrl: './listar-pensamentos.component.css',
})
export class ListarPensamentosComponent {
  listaPensamentos: Pensamento[] = [
    // A lista dos pensamentos virão do backend
  ];
  paginaAtual = 1;

  haMaisPensamentos: boolean = true;

  filtro: string = '';

  // Injetar as dependencias do serviço na classe ListarPensamentos
  constructor(private service: PensamentoService) {}
  // esse método vai ser executado sempre que iniciar o componente
  ngOnInit() {
    // vamos dar subscribe no Observable que está retornando do service.
    // após isso, vamos atribuir para a listaPensamento os objetos que estão sendo retornados pela requisição http (pegando do backend os objetos)
    // a arrow function é como se fosse o '.then()'
    this.service
      .listar(this.paginaAtual, this.filtro)
      .subscribe((listaObjetos) => {
        this.listaPensamentos = listaObjetos;
      });
  }

  carregarMaisPensamentos() {
    this.service.listar(++this.paginaAtual, this.filtro).subscribe((lista) => {
      // '...' quer dizer que vai adicionar na lista existente
      this.listaPensamentos.push(...lista);
      if (!lista.length) {
        this.haMaisPensamentos = false;
      }
    });
  }

  pesquisarPensamentos() {
    this.paginaAtual = 1;
    this.haMaisPensamentos = true;

    this.service.listar(this.paginaAtual, this.filtro).subscribe((lista) => {
      this.listaPensamentos = lista;
    });
  }
}
