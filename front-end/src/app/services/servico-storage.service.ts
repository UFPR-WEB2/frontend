import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicoStorageService {
  /* 
  estado ABERTA -> apos a abertura do cliente
  estado ORÇADA -> apos func adicionar o orcamento
  estado REJEITADA -> apos cliente aprovar/refeitar
  estado APROVADA -> apos cliente aprovar/refeitar
  estado REDIRECIONADA -> apos func redirecionar
  estado AGUARDANDO PAGAMENTO -> apos func finalizar
  estado ARRUMADA -> apos func finalizar
  estado PAGA -> apos o cliente pagar
  estado FINALIZADA -> apos o func finalizar ela
  */
  //Parte para incializacao do localStorage
  listaInicial = [
    { id: '001', data: '15/09/24 10:00', descricaoEquipamento: 'Descricao Equipamento A', descricaoErro: 'Equipamento A com falha...', status: 'ORÇADA', categoria: 'Notebook', cliente: 'João', funcionario: 'Maria', preco: '150,00', motivoRejeicao: '', dataOrcamento: '18/9/24 08:45', dataRecuperacao: '', dataConserto: '', dataFinalizacao: '' },
    { id: '002', data: '14/09/24 09:30', descricaoEquipamento: 'Descricao Equipamento A', descricaoErro: 'Equipamento B com defeito...', status: 'APROVADA', categoria: 'Notebook', cliente: 'João', funcionario: 'Maria', preco: '250,00', motivoRejeicao: '', dataOrcamento: '18/9/24 08:45', dataRecuperacao: '', dataConserto: '', dataFinalizacao: '' },
    { id: '003', data: '13/09/24 08:45', descricaoEquipamento: 'Descricao Equipamento A', descricaoErro: 'Equipamento C reiniciando...', status: 'REJEITADA', categoria: 'Notebook', cliente: 'João', funcionario: 'Maria', preco: '350,00', motivoRejeicao: 'Rejeitado pelo motivo X e pelo preco caro', dataOrcamento: '18/9/24 08:45', dataRecuperacao: '', dataConserto: '', dataFinalizacao: '' },
    { id: '004', data: '12/09/24 11:15', descricaoEquipamento: 'Descricao Equipamento A', descricaoErro: 'Equipamento D sem energia...', status: 'ARRUMADA', categoria: 'Desktop', cliente: 'José', funcionario: 'Maria', preco: '450,00', motivoRejeicao: '', dataOrcamento: '18/9/24 08:45', dataRecuperacao: '', dataConserto: '20/9/24 08:45', dataFinalizacao: '' },
    { id: '005', data: '13/09/24 08:45', descricaoEquipamento: 'Descricao Equipamento A', descricaoErro: 'Equipamento E reiniciando...', status: 'ORÇADA', categoria: 'Desktop', cliente: 'José', funcionario: 'Maria', preco: '250,00', motivoRejeicao: '', dataOrcamento: '18/9/24 08:45', dataRecuperacao: '', dataConserto: '', dataFinalizacao: '' },
    { id: '006', data: '13/09/24 08:45', descricaoEquipamento: 'Descricao Equipamento A', descricaoErro: 'Equipamento F reiniciando...', status: 'REJEITADA', categoria: 'Desktop', cliente: 'José', funcionario: 'Maria', preco: '350,00', motivoRejeicao: 'Rejeitado pelo motivo X e pelo preco caro', dataOrcamento: '18/9/24 08:45', dataRecuperacao: '', dataConserto: '', dataFinalizacao: '' },
    { id: '007', data: '13/09/24 08:45', descricaoEquipamento: 'Descricao Equipamento A', descricaoErro: 'Equipamento G reiniciando...', status: 'ORÇADA', categoria: 'Impressora', cliente: 'Joana', funcionario: 'Mário', preco: '450,00', motivoRejeicao: '', dataOrcamento: '18/9/24 08:45', dataRecuperacao: '', dataConserto: '', dataFinalizacao: '' },
    { id: '008', data: '13/09/24 08:45', descricaoEquipamento: 'Descricao Equipamento A', descricaoErro: 'Equipamento H reiniciando...', status: 'APROVADA', categoria: 'Impressora', cliente: 'Joana', funcionario: 'Mário', preco: '550,00', motivoRejeicao: '', dataOrcamento: '18/9/24 08:45', dataRecuperacao: '', dataConserto: '', dataFinalizacao: '' },
    { id: '009', data: '13/09/24 08:45', descricaoEquipamento: 'Descricao Equipamento A', descricaoErro: 'Equipamento I reiniciando...', status: 'ARRUMADA', categoria: 'Mouse', cliente: 'Joana', funcionario: 'Mário', preco: '650,00', motivoRejeicao: '', dataOrcamento: '18/9/24 08:45', dataRecuperacao: '', dataConserto: '24/9/24 08:45', dataFinalizacao: '' },
    { id: '010', data: '13/09/24 08:45', descricaoEquipamento: 'Descricao Equipamento A', descricaoErro: 'Equipamento J reiniciando...', status: 'REJEITADA', categoria: 'Mouse', cliente: 'Joaquina', funcionario: 'Mário', preco: '250,00', motivoRejeicao: 'Rejeitado pelo motivo X e pelo preco caro', dataOrcamento: '18/9/24 08:45', dataRecuperacao: '', dataConserto: '', dataFinalizacao: '' },
    { id: '011', data: '13/09/24 08:45', descricaoEquipamento: 'Descricao Equipamento A', descricaoErro: 'Equipamento K reiniciando...', status: 'ORÇADA', categoria: 'Teclado', cliente: 'Joaquina', funcionario: 'Mário', preco: '250,00', motivoRejeicao: '', dataOrcamento: '18/9/24 08:45', dataRecuperacao: '', dataConserto: '', dataFinalizacao: '' },
    { id: '012', data: '13/09/24 08:45', descricaoEquipamento: 'Descricao Equipamento A', descricaoErro: 'Equipamento C reiniciando...', status: 'ARRUMADA', categoria: 'Teclado', cliente: 'Joaquina', funcionario: 'Mário', preco: '250,00', motivoRejeicao: '', dataOrcamento: '18/9/24 08:45', dataRecuperacao: '', dataConserto: '21/9/24 08:45', dataFinalizacao: '' },
  ];

  listaUsuarios = [
    { email: 'emailCliente@gmail.com', senha: 'cliente', nome: 'João', funcao: 'cliente', status: 'ativo' },
    { email: 'emailFuncionario@gmail.com', senha: 'funcionario', nome: 'Maria', funcao: 'funcionario', status: 'ativo' },
    { email: 'emailCliente2@gmail.com', senha: 'cliente', nome: 'José', funcao: 'cliente', status: 'ativo' },
    { email: 'emailFuncionario2@gmail.com', senha: 'funcionario', nome: 'Mario', funcao: 'funcionario', status: 'ativo' }
  ];

  constructor() {
    this.initializeServicos();
    this.initializePerfis();
  }

  initializeServicos(): void {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.listaInicial));
    }
  }

  initializePerfis(): void {
    if (!localStorage.getItem(this.perfisStorageKey)) {
      localStorage.setItem(this.perfisStorageKey, JSON.stringify(this.listaUsuarios));
    }
  }

  //--------------------------------------------------------------------------------------------------------------------------------
  private storageKey = 'servicos';
  private perfisStorageKey = 'perfis';


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

  // Retorna a lista de perfis do localStorage
  getPerfis(): any[] {
    const perfisString = localStorage.getItem(this.perfisStorageKey);
    return perfisString ? JSON.parse(perfisString) : [];
  }

}
