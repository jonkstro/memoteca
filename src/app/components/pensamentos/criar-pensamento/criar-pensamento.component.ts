import { Component } from '@angular/core';
import { PensamentoService } from '../../../services/pensamentos/pensamento/pensamento.service';
import { Pensamento } from '../../../interfaces/pensamento.interface';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrl: './criar-pensamento.component.css',
})
export class CriarPensamentoComponent {
  // NÃO VAI SER MAIS USADO, VAMOS USAR O FORMULARIO REATIVO
  // pensamento: Pensamento = {
  //   conteudo: '',
  //   autoria: '',
  //   modelo: 'modelo1',
  // };

  // Formulário reativo do Angular
  formulario!: FormGroup;

  // injetar as dependencias
  constructor(
    private service: PensamentoService,
    private router: Router,
    // Formulário reativo do Angular
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    // Formulário reativo do Angular
    this.formulario = this.formBuilder.group({
      conteudo: [
        '',
        Validators.compose([
          Validators.required,
          // regex pra não deixar espaço vazio
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
          Validators.minLength(10),
        ]),
      ],
      autoria: [
        '',
        Validators.compose([
          Validators.required,
          // regex pra não deixar espaço vazio
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
          Validators.minLength(3),
        ]),
      ],
      modelo: ['modelo1', [Validators.required]],
      favorito: [false],
    });
  }

  // bota se quiser o tipo do retorno
  criarPensamento() {
    // se o formulário não for válido, vai fazer nada
    if (!this.formulario.valid) return;
    // a arrow function é como se fosse o '.then()'
    this.service.criar(this.formulario.value).subscribe(() => {
      alert(
        `Pensamento do autor ${
          this.formulario.get('autoria')?.value
        } foi cadastrado com sucesso!`
      );
      this.router.navigate(['/listar-pensamento']);
    });
  }

  cancelar(): void {
    this.router.navigate(['/listar-pensamento']);
  }

  habilitarBotao(): string {
    if (!this.formulario.valid) {
      return 'botao__desabilitado';
    }
    return 'botao';
  }
}
