import { ICustomer } from './customer.model';
import { ICategory } from './category.model';
import { IStatus } from './status.model';

export interface IMaintenance {
  id: number;
  descricao_equipamento: string;
  descricao_defeito: string;
  data_criacao: string;
  data_finalizacao: string;
  cliente: ICustomer;
  categoria: ICategory;
  status: IStatus;
}
