import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Router } from '@angular/router';


@Component({
  selector: 'app-footer',
  imports: [MaterialModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  selectedLink: string = '';

  constructor(private router: Router) {}
  scrollToTop(): void {
    this.router.navigate(['/', ]);
    window.scrollTo({ top: 300, behavior: 'smooth' });
    }

  navigateTo(page: string) {
    this.router.navigate(['/footer', page]);
  }
}
