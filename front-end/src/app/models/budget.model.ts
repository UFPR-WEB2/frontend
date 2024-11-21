import { IMaintenance } from './maintenance.model';

export interface IBudget {
  id: number;
  precoOrcado: number; // Utilize `number` para BigDecimal
  descricao: string;
  dataCriacao: string; // Formato ISO de data
  dataAtualizacao: string; // Formato ISO de data
  maintenance: IMaintenance;
}
