import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-root',
  templateUrl: './home-root.component.html',
  styleUrls: ['./home-root.component.scss']
})
export class HomeRootComponent {
  // Usando 'inject' para obter uma instância do BreakpointObserver
  private breakpointObserver = inject(BreakpointObserver);

  constructor(private router: Router) {}

  // Função para navegar até a página de login quando o botão é clicado
  onClick(): void {
    this.router.navigate(['/login']);
  }

  // Observável para rastrear se a tela está no modo 'Telefone' (telas pequenas, por exemplo, celular)
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
}
