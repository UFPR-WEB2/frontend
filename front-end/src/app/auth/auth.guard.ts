import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const usuarioLogado = localStorage.getItem('user');
  let url = state.url;
  if (usuarioLogado) {
    const usuario = JSON.parse(usuarioLogado);
    if (route.data?.['role'] && route.data?.['role'].indexOf(usuario.role) === -1) {
      // Se a função do usuário não está na função da rota
      // vai para login
      router.navigate(['/login'], { queryParams: { error: "Proibido o acesso a " + url } });
      return false;
    }
    // em qualquer outro caso, permite o acesso
    return true;
  }
  // Se não está logado, vai para login
  router.navigate(['/login'], {
    queryParams: {
      error: "Deve fazer o login antes de acessar " + url
    }
  });

  return false;
};
