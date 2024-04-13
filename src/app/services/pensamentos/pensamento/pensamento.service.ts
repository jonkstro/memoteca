import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pensamento } from '../../../interfaces/pensamento.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PensamentoService {
  // TODO: Mudar para alguma constante
  private readonly API = 'http://localhost:3000/pensamentos';
  // Injeção de dependencias do http client
  constructor(private http: HttpClient) {}

  listar(): Observable<Pensamento[]> {
    // TODO: Pegar a API de alguma constante
    return this.http.get<Pensamento[]>(this.API);
  }

  criar(pensamento: Pensamento): Observable<Pensamento> {
    // Definindo o header
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // definindo o tipo de conteúdo como JSON
    });
    return this.http.post<Pensamento>(this.API, pensamento, {
      headers: headers,
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
