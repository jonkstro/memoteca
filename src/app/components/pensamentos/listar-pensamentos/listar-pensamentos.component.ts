import { Router } from '@angular/router';
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
  listaFavoritos: Pensamento[] = [];

  paginaAtual = 1;

  haMaisPensamentos: boolean = true;

  titulo: string = 'Meu mural';
  filtro: string = '';
  favoritos: boolean = false;

  // Injetar as dependencias do serviço na classe ListarPensamentos
  constructor(private service: PensamentoService, private router: Router) {}
  // esse método vai ser executado sempre que iniciar o componente
  ngOnInit() {
    // vamos dar subscribe no Observable que está retornando do service.
    // após isso, vamos atribuir para a listaPensamento os objetos que estão sendo retornados pela requisição http (pegando do backend os objetos)
    // a arrow function é como se fosse o '.then()'
    this.service
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((listaObjetos) => {
        this.listaPensamentos = listaObjetos;
      });
  }

  carregarMaisPensamentos() {
    this.service
      .listar(++this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((lista) => {
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

    this.service
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((lista) => {
        this.listaPensamentos = lista;
      });
  }

  listarFavoritos() {
    this.titulo = 'Meus favoritos';
    // setar favoritos igual a true para ver só os favoritos no service.listar
    this.favoritos = true;
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.service
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((lista) => {
        this.listaPensamentos = lista;
        this.listaFavoritos = lista;
      });
  }

  // RECARREGAR COMPONENTE ANGULAR SEM RECARREGAR TODA PAGINA
  recarregarComponente() {
    this.favoritos = false;
    this.paginaAtual = 1;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }
}
