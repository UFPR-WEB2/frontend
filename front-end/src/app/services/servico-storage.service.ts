import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicoStorageService {

  //Parte para incializacao do localStorage
  listaInicial = [
    { id: '001', data: '15/09/24 10:00', descricao: 'Equipamento A com falha...', status: 'ORÇADA', categoria: 'Notebook', acao: 'aprovar', cliente: 'João', funcionario: 'Maria' },
    { id: '002', data: '14/09/24 09:30', descricao: 'Equipamento B com defeito...', status: 'APROVADA', categoria: 'Notebook', acao: 'visualizar', cliente: 'João', funcionario: 'Maria' },
    { id: '003', data: '13/09/24 08:45', descricao: 'Equipamento C reiniciando...', status: 'REJEITADA', categoria: 'Notebook', acao: 'resgatar', cliente: 'João', funcionario: 'Maria' },
    { id: '004', data: '12/09/24 11:15', descricao: 'Equipamento D sem energia...', status: 'ARRUMADA', categoria: 'Desktop', acao: 'pagar', cliente: 'José', funcionario: 'Maria' },
    { id: '005', data: '13/09/24 08:45', descricao: 'Equipamento E reiniciando...', status: 'ORÇADA', categoria: 'Desktop', acao: 'aprovar', cliente: 'José', funcionario: 'Maria' },
    { id: '006', data: '13/09/24 08:45', descricao: 'Equipamento F reiniciando...', status: 'REJEITADA', categoria: 'Desktop', acao: 'resgatar', cliente: 'José', funcionario: 'Maria' },
    { id: '007', data: '13/09/24 08:45', descricao: 'Equipamento G reiniciando...', status: 'ORÇADA', categoria: 'Impressora', acao: 'aprovar', cliente: 'Joana', funcionario: 'Mário' },
    { id: '008', data: '13/09/24 08:45', descricao: 'Equipamento H reiniciando...', status: 'APROVADA', categoria: 'Impressora', acao: 'resgatar', cliente: 'Joana', funcionario: 'Mário' },
    { id: '009', data: '13/09/24 08:45', descricao: 'Equipamento I reiniciando...', status: 'ARRUMADA', categoria: 'Mouse', acao: 'resgatar', cliente: 'Joana', funcionario: 'Mário' },
    { id: '010', data: '13/09/24 08:45', descricao: 'Equipamento J reiniciando...', status: 'REJEITADA', categoria: 'Mouse', acao: 'resgatar', cliente: 'Joaquina', funcionario: 'Mário' },
    { id: '011', data: '13/09/24 08:45', descricao: 'Equipamento K reiniciando...', status: 'ORÇADA', categoria: 'Teclado', acao: 'resgatar', cliente: 'Joaquina', funcionario: 'Mário' },
    { id: '012', data: '13/09/24 08:45', descricao: 'Equipamento C reiniciando...', status: 'ARRUMADA', categoria: 'Teclado', acao: 'resgatar', cliente: 'Joaquina', funcionario: 'Mário' },
  ];

  constructor() {
    this.initializeServicos();
  }

  initializeServicos(): void {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.listaInicial));
    }
  }

  //--------------------------------------------------------------------------------------------------------------------------------
  private storageKey = 'servicos';


  // Retorna a lista de serviços do localStorage
  getServicos(): any[] {
    const servicosString = localStorage.getItem(this.storageKey);
    return servicosString ? JSON.parse(servicosString) : [];
  }

  // Salva a lista de serviços no localStorage
  saveServicos(servicos: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(servicos));
  }

  // Adiciona um novo serviço
  addServico(novoServico: any): void {
    const servicos = this.getServicos();
    servicos.push(novoServico);
    this.saveServicos(servicos);
  }

  // Modifica um serviço existente pelo ID
  updateServico(id: string, servicoModificado: any): void {
    const servicos = this.getServicos();
    const index = servicos.findIndex(servico => servico.id === id);
    if (index !== -1) {
      servicos[index] = { ...servicos[index], ...servicoModificado }; // Atualiza o serviço
      this.saveServicos(servicos); // Salva as mudanças no localStorage
    }
  }
}
