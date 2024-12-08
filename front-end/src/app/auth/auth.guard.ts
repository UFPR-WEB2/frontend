import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/api/auth.service';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const url = state.url;

  return new Observable<boolean>((observer) => {
    authService.getSession().subscribe({
      next: (response: any) => {
        const usuarioLogado = response.body;
        const role = usuarioLogado?.role;

        if (usuarioLogado) {
          // Verifica se a role do usuário está permitida
          if (
            route.data?.['role'] &&
            route.data?.['role'].indexOf(role) === -1
          ) {
            router.navigate(['/login'], {
              queryParams: { error: 'Proibido o acesso a ' + url },
            });
            observer.next(false);
          } else {
            observer.next(true);
          }
        } else {
          router.navigate(['/login'], {
            queryParams: {
              error: 'Deve fazer o login antes de acessar ' + url,
            },
          });
          observer.next(false);
        }
      },
      error: (error) => {
        console.error('Erro ao obter sessão:', error);
        router.navigate(['/login'], {
          queryParams: { error: 'Deve fazer o login antes de acessar ' + url },
        });
        observer.next(false);
      },
    });
  });
};
