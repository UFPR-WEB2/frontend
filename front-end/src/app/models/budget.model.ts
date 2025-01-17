import { IMaintenance } from './maintenance.model';

export interface IBudget {
  id: number;
  precoOrcado: number;
  descricao: string;
  dataCriacao: string;
  dataAtualizacao: string; 
  maintenance: IMaintenance;
}
