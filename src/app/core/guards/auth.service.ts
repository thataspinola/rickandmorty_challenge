import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Sinalizador para rastrear o estado de autenticação
  private isAuthenticated: boolean = false;

  //Injeta o serviço Angular Router para navegação
  constructor(private router: Router) {}

  // Método para lidar com o login do usuário
  login(email: string, password: string): void {
    //Verifica se as credenciais fornecidas são válidas
    const isValidCredentials = email === 'ricksanchez@rick.com' && password === '123';

    // Se válido, defina isAuthenticated como true e navegue até a rota '/home/list-characters'
    // Se não for válido, defina isAuthenticated como false
    if (isValidCredentials) {
      this.isAuthenticated = true;
      this.router.navigate(['/home/list-characters']);
    } else {
      this.isAuthenticated = false;
    }
  }

  // Método para lidar com o logout do usuário
  logout(): void {
    // Defina isAuthenticated como false e navegue até a rota '/login'
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  //Método para verificar o status de autenticação atual
  // Retorna verdadeiro se autenticado, falso caso contrário
  Authenticated(): boolean {
    return this.isAuthenticated;
  }
}
