/*
 * BRAAM Family Church website
 * Coded by Lulamile Mkhungela — https://github.com/LulamileMkhungela
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
  toggleDropdown(name: string) { this.openDropdown = this.openDropdown === name ? null : name; }
  closeNav() { this.menuOpen = false; this.openDropdown = null; }
}
