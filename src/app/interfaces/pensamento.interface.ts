export interface Pensamento {
  // id é opcional, pois o backend já vai gerar ele ao criar o novo pensamento
  id?: number;
  conteudo: string;
  autoria: string;
  modelo: string;
  favorito: boolean;
}
