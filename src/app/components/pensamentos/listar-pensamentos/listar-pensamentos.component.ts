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

  // Injetar as dependencias do serviço na classe ListarPensamentos
  constructor(private service: PensamentoService) {}
  // esse método vai ser executado sempre que iniciar o componente
  ngOnInit() {
    // vamos dar subscribe no Observable que está retornando do service.
    // após isso, vamos atribuir para a listaPensamento os objetos que estão sendo retornados
    // a arrow function é como se fosse o '.then()'
    this.service.listar().subscribe((listaObjetos) => {
      this.listaPensamentos = listaObjetos;
    });
  }
}
