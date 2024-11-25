export interface ICustomer {
  id?: number;
  nome: string;
  email: string;
  cpf: string,
  telefone: string;
  cep: string;
  pais: string;
  estado: string;
  cidade: string;
  rua: string;
  numero: string;
  complemento?: string;
  ativo?: boolean;
}
