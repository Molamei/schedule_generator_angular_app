
import { Component, HostListener } from '@angular/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isSticky = false;

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isSticky = window.pageYOffset === 0; // Only sticky when at the top
  }
}
