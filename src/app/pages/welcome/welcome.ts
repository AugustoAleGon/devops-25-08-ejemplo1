// Componente de bienvenida - Bohío
import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss'
})
export class WelcomeComponent {
  // Datos dummy para mostrar en la página de bienvenida
  appName = 'Bohío';
  appDescription = 'Plataforma Financiera Inclusiva para República Dominicana';
  targetUsers = [
    'Migrantes en proceso de regularización',
    'Personas con baja alfabetización digital',
    'Trabajadores informales',
    'Residentes de zonas rurales',
    'Adultos mayores',
    'Personas con discapacidades visuales'
  ];

  constructor(private router: Router) {}

  // Navegar al módulo de educación con filtro por categoría
  navigateToEducation(category: string): void {
    this.router.navigate(['/educacion'], {
      queryParams: { categoria: category }
    });
  }
}
