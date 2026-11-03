/*
 * BRAAM Family Church website
 */
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PreferencesService } from './core/preferences.service';
import { ErrorNotifierService } from './core/error-notifier.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly prefs = inject(PreferencesService);
  readonly errors = inject(ErrorNotifierService);
  menuOpen = false;
  openDropdown: string | null = null;

  get isLight() {
    return this.prefs.isLight();
  }
  get isFrench() {
    return this.prefs.isFrench();
  }

  toggleTheme() {
    this.prefs.toggleTheme();
  }

  toggleLanguage() {
    this.prefs.toggleLanguage();
  }

  toggleDropdown(name: string) { this.openDropdown = this.openDropdown === name ? null : name; }
  closeNav() { this.menuOpen = false; this.openDropdown = null; }
}
