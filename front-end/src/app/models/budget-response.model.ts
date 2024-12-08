import { IMaintenance } from './maintenance.model';

export interface IBudgetResponse {
  id: number;
  precoOrcado: number;
  dataOrcamento?: string;
  justificativaRejeicao: string;
  dataRejeicao?: string;
  dataRecuperacao?: string;
  status: boolean;
  maintenance: IMaintenance;
}
