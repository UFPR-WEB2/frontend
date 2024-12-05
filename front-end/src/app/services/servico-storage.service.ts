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

  savePerfis(perfis: any[]): void {
    localStorage.setItem(this.perfisStorageKey, JSON.stringify(perfis));
  }

  // Adiciona um novo serviço
  addServico(novoServico: any): void {
    const servicos = this.getServicos();
    servicos.push(novoServico);
    this.saveServicos(servicos);
  }

  addCliente(novoCliente: any): void {
    const clientes = this.getPerfis();
    clientes.push(novoCliente);
    this.savePerfis(clientes);
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

  deleteServico(id: string): void {
    const servicos = this.getServicos();
    const index = servicos.findIndex(servico => servico.id === id);
    if (index !== -1) {
      servicos.splice(index, 1);
      this.saveServicos(servicos);
    }
  }

  updateCliente(id: number, clienteModificado: object): void {
    const clientes = this.getPerfis();
    const index = clientes.findIndex(cliente => cliente.id === id);
    if (index !== -1) {
      clientes[index] = { ...clientes[index], ...clienteModificado };
      this.savePerfis(clientes);
    }
  }

  deleteCliente(id: string): void {
    const clientes = this.getPerfis();
    const index = clientes.findIndex(cliente => cliente.id === id);
    if (index !== -1) {
      clientes.splice(index, 1);
      this.savePerfis(clientes);
    }
  }

  getPerfis(): any[] {
    const perfisString = localStorage.getItem(this.perfisStorageKey);
    return perfisString ? JSON.parse(perfisString) : [];
  }

  getCategorias(): string[] {
    const categoriasString = localStorage.getItem('categorias');
    return categoriasString ? JSON.parse(categoriasString) : [];
  }

  saveCategorias(categorias: string[]): void {
    localStorage.setItem('categorias', JSON.stringify(categorias));
  }

  addCategoria(novaCategoria: string): void {
    const categorias = this.getCategorias();
    categorias.push(novaCategoria);
    this.saveCategorias(categorias);
  }

  updateCategoria(categoriaAntiga: string, categoriaNova: string): void {
    const categorias = this.getCategorias();
    const index = categorias.indexOf(categoriaAntiga);
    if (index !== -1) {
      categorias[index] = categoriaNova;
      this.saveCategorias(categorias);
    }
  }

  deleteCategoria(categoria: string): void {
    const categorias = this.getCategorias();
    const index = categorias.indexOf(categoria);
    if (index !== -1) {
      categorias.splice(index, 1);
      this.saveCategorias(categorias);
    }
  }

}
