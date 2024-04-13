import { Component } from '@angular/core';
import { Pensamento } from '../../../interfaces/pensamento.interface';
import { PensamentoService } from '../../../services/pensamentos/pensamento/pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  };

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.buscarPorId(parseInt(id!)).subscribe((obj) => {
      this.pensamento = obj;
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
}
