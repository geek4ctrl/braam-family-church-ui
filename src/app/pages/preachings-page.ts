import { Component, inject } from '@angular/core';
import { PreferencesService } from '../core/preferences.service';
import { PREACHING_CATEGORIES } from '../core/content.data';

@Component({
  selector: 'app-preachings-page',
  standalone: true,
  template: `
  <main class="screen-page">
    <section class="page-intro-hero textured-hero"><p class="eyebrow"><span></span> {{ isFrench ? 'LA PAROLE PRÊCHÉE' : 'THE WORD PREACHED' }}</p><h1>{{ isFrench ? 'Prédications' : 'Preachings' }}</h1><p>{{ isFrench ? 'Parcourez les catégories de prédications publiées sur le site officiel de BRAAM Family. Les nouveaux messages et disponibilités sont maintenus dans l\u2019archive en ligne.' : 'Browse the preaching categories published on the official BRAAM Family website. New messages and availability are maintained in the live archive.' }}</p></section>
    <section class="content-section"><div class="three-cards sermon-grid">
      @for (category of categories; track category.url) {
        <a class="info-panel media-card official-category-card" [href]="category.url" target="_blank" rel="noopener noreferrer"><small class="gold-label">{{ isFrench ? 'CATÉGORIE OFFICIELLE DE PRÉDICATION' : 'OFFICIAL PREACHING CATEGORY' }}</small><h3>{{ category.name }}</h3><p>{{ isFrench ? 'Parcourez les messages de cette catégorie sur le site de BRAAM Family.' : 'Browse messages in this category on the BRAAM Family website.' }}</p><span class="text-link">{{ isFrench ? 'Ouvrir la catégorie' : 'Open category' }} ↗</span></a>
      }
    </div></section>
    <section class="center-cta"><h2>{{ isFrench ? 'Enseignements des' : 'Workers' }} <em>{{ isFrench ? 'ouvriers' : 'Teachings' }}</em></h2><p>{{ isFrench ? 'Retrouvez l\u2019article officiel des enseignements pour les ouvriers et la ressource téléchargeable.' : 'Find the official Workers Teachings post and downloadable resource.' }}</p><a class="gradient-button" href="https://www.braamfamily.co.za/day-1-vision-mission/" target="_blank" rel="noopener noreferrer">{{ isFrench ? 'Jour 1 – Vision et Mission' : 'Day 1 – Vision & Mission' }} <span>↗</span></a></section>
  </main>
  `
})
export class PreachingsPage {
  private readonly prefs = inject(PreferencesService);
  readonly categories = PREACHING_CATEGORIES;
  get isFrench() { return this.prefs.isFrench(); }
}
