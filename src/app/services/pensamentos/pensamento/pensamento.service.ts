import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pensamento } from '../../../interfaces/pensamento.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PensamentoService {
  // TODO: Mudar para alguma constante
  private readonly API = 'http://localhost:3000/pensamentos';
  // Definindo o header
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json', // definindo o tipo de conteúdo como JSON
  });
  // Injeção de dependencias do http client
  constructor(private http: HttpClient) {}

  listar(pagina: number): Observable<Pensamento[]> {
    // TODO: Pegar a API de alguma constante
    const itensPorPagina = 6;
    let params = new HttpParams()
      .set('_page', pagina)
      .set('_limit', itensPorPagina);

    // const url = `${this.API}?_page=${pagina}&_limit=${itensPorPagina}`;
    // return this.http.get<Pensamento[]>(url);
    return this.http.get<Pensamento[]>(this.API, {
      params: params,
      headers: this.headers,
    });
  }

  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.API, pensamento, {
      headers: this.headers,
    });
  }

  editar(pensamento: Pensamento): Observable<Pensamento> {
    const URL = `${this.API}/${pensamento.id}`;
    return this.http.put<Pensamento>(URL, pensamento);
  }

  excluir(id: number): Observable<Pensamento> {
    const URL = `${this.API}/${id}`;
    return this.http.delete<Pensamento>(URL);
  }

  buscarPorId(id: number): Observable<Pensamento> {
    const URL = `${this.API}/${id}`;
    return this.http.get<Pensamento>(URL);
  }
}
