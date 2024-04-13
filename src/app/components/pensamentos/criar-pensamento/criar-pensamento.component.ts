import { Component } from '@angular/core';
import { PensamentoService } from '../../../services/pensamentos/pensamento/pensamento.service';
import { Pensamento } from '../../../interfaces/pensamento.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrl: './criar-pensamento.component.css',
})
export class CriarPensamentoComponent {
  pensamento: Pensamento = {
    // id: 0,
    conteudo: '',
    autoria: '',
    modelo: 'modelo1',
  };

  // injetar as dependencias
  constructor(private service: PensamentoService, private router: Router) {}
  ngOnInit() {}

  // bota se quiser o tipo do retorno
  criarPensamento() {
    // a arrow function é como se fosse o '.then()'
    this.service.criar(this.pensamento).subscribe(() => {
      alert(
        `Pensamento do autor ${this.pensamento.autoria} foi cadastrado com sucesso!`
      );
      this.router.navigate(['/listar-pensamento']);
    });
  }

  cancelar(): void {
    this.router.navigate(['/listar-pensamento']);
  }
}
