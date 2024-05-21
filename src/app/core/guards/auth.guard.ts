import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // Este método é chamado para determinar se uma rota pode ser ativada
  canActivate(): boolean {
    // Verifica se o usuário está autenticado usando o AuthService
    if (this.authService.Authenticated()) {
      // Se autenticado, permite acesso à rota
      return true;
    } else {
      // Se não estiver autenticado, redireciona para a página de login
      this.router.navigate(['/login']);
      // Nega acesso à rota
      return false;
    }
  }
}
