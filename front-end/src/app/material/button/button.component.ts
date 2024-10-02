import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importar CommonModule
import { Router } from '@angular/router';

@Component({
  selector: 'button-material',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})

export class ButtonComponent {
  @Input() navigateUrl?: string;
  @Input() text: string = 'Registrar'; 

  constructor(private router: Router) {}

  goToUrl(event: Event) {
    event.preventDefault(); 
    if (this.navigateUrl) { 
      this.router.navigate([this.navigateUrl]); 
    }
  }
}
