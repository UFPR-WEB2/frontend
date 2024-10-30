import { Routes } from '@angular/router';


export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'login/register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },
  { path: 'cliente/home', loadComponent: () => import('./pages/customer/home-cliente/home-cliente.component').then(m => m.HomeClienteComponent) },
  { path: 'cliente/home/solicitarManutencao', loadComponent: () => import('./pages/customer/solic-manutencao-cliente/solic-manutencao-cliente.component').then(m => m.SolicManutencaoClienteComponent) },
  { path: 'cliente/home/orcamento/:id', loadComponent: () => import('./pages/customer/orcamento-cliente/orcamento-cliente.component').then(m => m.OrcamentoClienteComponent) },
  { path: 'cliente/home/pagamento/:id', loadComponent: () => import('./pages/customer/payment/payment.component').then(m => m.PaymentComponent) },
  { path: 'cliente/home/servico/:id', loadComponent: () => import('./pages/customer/view-solicitacao/view-solicitacao.component').then(m => m.ViewSolicitacaoComponent) },
  { path: 'funcionario/home', loadComponent: ()=> import('./pages/employee/home-funcionario/home-funcionario.component').then(m=> m.HomeFuncionarioComponent)},
  { path: 'funcionario/home/efetuar-orcamento/:id', loadComponent: ()=> import('./pages/employee/efetuar-orcamento/efetuar-orcamento.component').then(m=> m.EfetuarOrcamentoComponent)},
  { path: 'funcionario/home/efetuar-manutencao/:id', loadComponent: ()=> import('./pages/employee/efetuar-manutencao/efetuar-manutencao.component').then(m=> m.EfetuarManutencaoComponent)},
  { path: 'funcionario/home/visualizacao-solicitacoes', loadComponent: ()=> import('./pages/employee/visualizacao-solicitacoes/visualizacao-solicitacoes.component').then(m=> m.VisualizacaoSolicitacoesComponent)},
  { path: 'funcionario/home/crud-funcionario', loadComponent: ()=> import('./pages/employee/crud-funcionario/crud-funcionario.component').then(m=> m.CrudFuncionarioComponent)},
  { path: 'funcionario/home/crud-categoria', loadComponent: ()=> import('./pages/employee/crud-categoria/crud-categoria.component').then(m=> m.CrudCategoriaComponent)},
  { path: 'funcionario/home/relatorio-receitas', loadComponent: ()=> import('./pages/employee/relatorio-receitas/relatorio-receitas.component').then(m=> m.RelatorioReceitasComponent)},
  { path: 'funcionario/home/relatorio-categorias', loadComponent: ()=> import('./pages/employee/relatorio-categorias/relatorio-categorias.component').then(m=> m.RelatorioCategoriasComponent)},
  { path: '**', redirectTo: '' }
];
