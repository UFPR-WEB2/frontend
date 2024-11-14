import { CanActivateFn, Router } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginComponent);
  const router = inject(Router);
  const usuarioLogado = localStorage.getItem('usuarioLogado');
  let url = state.url;
  if (usuarioLogado) {
    const usuario = JSON.parse(usuarioLogado);
    if (route.data?.['role'] && route.data?.['role'].indexOf(usuario.perfil) === -1) {
      // Se o perfil do usuário não está no perfil da rota
      // vai para login
      router.navigate(['/../pages/login/login.component'], { queryParams: { error: "Proibido o acesso a " + url } });
      return false;
    }
    // em qualquer outro caso, permite o acesso
    return true;
  }
  // Se não está logado, vai para login
  router.navigate(['/../pages/login/login.component'], {
    queryParams: {
      error: "Deve fazer o login antes de acessar " + url
    }
  });
  return false;
};
