/*
 * BRAAM Family Church website
 */
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  menuOpen = false;
  openDropdown: string | null = null;
  isLight = localStorage.getItem('braam-theme') === 'light';
  isFrench = localStorage.getItem('braam-language') === 'fr';

  constructor() {
    document.body.classList.toggle('light-theme', this.isLight);
    document.documentElement.lang = this.isFrench ? 'fr' : 'en';
    window.dispatchEvent(new CustomEvent('braam-preferences', { detail: { language: this.isFrench ? 'fr' : 'en' } }));
  }

  toggleTheme() {
    this.isLight = !this.isLight;
    localStorage.setItem('braam-theme', this.isLight ? 'light' : 'dark');
    document.body.classList.toggle('light-theme', this.isLight);
  }

  toggleLanguage() {
    this.isFrench = !this.isFrench;
    localStorage.setItem('braam-language', this.isFrench ? 'fr' : 'en');
    document.documentElement.lang = this.isFrench ? 'fr' : 'en';
    window.dispatchEvent(new CustomEvent('braam-preferences', { detail: { language: this.isFrench ? 'fr' : 'en' } }));
  }

  toggleDropdown(name: string) { this.openDropdown = this.openDropdown === name ? null : name; }
  closeNav() { this.menuOpen = false; this.openDropdown = null; }
}
