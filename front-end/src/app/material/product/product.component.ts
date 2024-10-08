import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  animations: [
    trigger('toggleContent', [
      state(
        'open',
        style({
          height: '*',
          opacity: 1,
          overflow: 'hidden',
        })
      ),
      state(
        'closed',
        style({
          height: '0px',
          opacity: 0,
          overflow: 'hidden',
        })
      ),
      transition('open <=> closed', [animate('300ms ease-in-out')]),
    ]),
  ],
})

export class ProductComponent {
  @Input() product: any;

  isDropdownOpen: boolean = false;

  constructor(private router: Router) {}

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  redirectToLink(): void {
    if (this.product.link) {
      if (this.product.link.startsWith('http')) {
        window.open(this.product.link, '_blank');
      } else {
        this.router.navigate([this.product.link]);
      }
    }
  }
}
