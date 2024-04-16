import { Component } from '@angular/core';
import { Pensamento } from '../../../interfaces/pensamento.interface';
import { PensamentoService } from '../../../services/pensamentos/pensamento/pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrl: './editar-pensamento.component.css',
})
export class EditarPensamentoComponent {
  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
    favorito: false,
  };
  // Formulário reativo do Angular
  formulario!: FormGroup;
  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    // Formulário reativo do Angular
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.buscarPorId(parseInt(id!)).subscribe((obj) => {
      this.pensamento = obj;
    });

    // Formulário reativo do Angular
    this.formulario = this.formBuilder.group({
      conteudo: [
        this.pensamento.conteudo,
        Validators.compose([
          Validators.required,
          // regex pra não deixar espaço vazio
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
          Validators.minLength(10),
        ]),
      ],
      autoria: [
        this.pensamento.autoria,
        Validators.compose([
          Validators.required,
          // regex pra não deixar espaço vazio
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
          Validators.minLength(3),
        ]),
      ],
      modelo: [this.pensamento.modelo, [Validators.required]],
      favorito: [this.pensamento.favorito],
    });
  }

  editarPensamento() {
    this.service
      .editar(this.pensamento)
      .subscribe(() => this.router.navigate(['/listar-pensamento']));
  }

  cancelar() {
    this.router.navigate(['/listar-pensamento']);
  }

  habilitarBotao(): string {
    if (!this.formulario.valid) {
      return 'botao__desabilitado';
    }
    return 'botao';
  }
}
