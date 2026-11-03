import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PreferencesService } from '../core/preferences.service';
import { PREACHING_CATEGORIES } from '../core/content.data';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [RouterLink],
  template: `
  <main class="screen-page">
    <section class="page-intro-hero"><p class="eyebrow"><span></span> {{ isFrench ? 'LA PAROLE' : 'THE WORD' }}</p><h1>{{ isFrench ? 'Enseignements et' : 'Teachings &amp;' }}<br><em>{{ isFrench ? 'M\u00e9ditations' : 'Reflections' }}</em></h1><p>{{ isFrench ? 'D\u00e9couvrez les archives officielles des enseignements et ressources de BRAAM Family. Le contenu est li\u00e9 directement \u00e0 la source pour que les articles et t\u00e9l\u00e9chargements actuels restent \u00e0 jour.' : 'Explore the official BRAAM Family teaching archives and resources. Content is linked directly to the source so that current articles and downloads remain accurate.' }}</p></section>
    <section class="content-section"><article class="featured-sermon"><img src="https://www.braamfamily.co.za/wp-content/uploads/2026/01/Untitled-design-2026-01-06T151154.063-585x306.png" width="585" height="306" loading="lazy" decoding="async" alt="Official Day 1 – Vision and Mission teaching cover"><div><span class="gold-label">{{ isFrench ? 'ENSEIGNEMENT OFFICIEL DES OUVRIERS · 6 JANVIER 2026' : 'OFFICIAL WORKERS TEACHING · JANUARY 6, 2026' }}</span><h2>{{ isFrench ? 'Jour 1 – Vision et Mission' : 'Day 1 – Vision & Mission' }}</h2><p>{{ isFrench ? 'L\u2019enseignement officiel des ouvriers inclut une ressource t\u00e9l\u00e9chargeable sur le site officiel de BRAAM Family.' : 'The published Workers Teaching includes a downloadable resource on the official BRAAM Family website.' }}</p><a class="listen-link" href="https://www.braamfamily.co.za/day-1-vision-mission/" target="_blank" rel="noopener noreferrer">{{ isFrench ? "Lire l'article officiel" : 'Read the official post' }} <span>↗</span></a></div></article>
      <div class="three-cards sermon-grid">
        @for (category of categories; track category.url) {
          <a class="info-panel media-card official-category-card" [href]="category.url" target="_blank" rel="noopener noreferrer"><small class="gold-label">{{ isFrench ? 'ARCHIVE OFFICIELLE' : 'OFFICIAL ARCHIVE' }}</small><h3>{{ category.name }}</h3><p>{{ isFrench ? 'Parcourez les enseignements et m\u00e9ditations publi\u00e9s de BRAAM Family.' : 'Browse published BRAAM Family teachings and reflections.' }}</p><span class="text-link">{{ isFrench ? 'Ouvrir l\u2019archive' : 'Open archive' }} ↗</span></a>
        }
      </div>
    </section>
    <section class="center-cta"><h2>{{ isFrench ? 'Restez' : 'Stay' }} <em>{{ isFrench ? 'connect\u00e9s' : 'Connected' }}</em></h2><p>{{ isFrench ? 'Suivez les cha\u00eenes officielles de BRAAM Family pour les nouvelles et les ressources d\u2019enseignement.' : 'Follow BRAAM Family\u2019s official channels for updates and new teaching resources.' }}</p><a class="gradient-button" routerLink="/connect">{{ isFrench ? 'Nous rejoindre' : 'Connect With Us' }} <span>↗</span></a></section>
  </main>
  `
})
export class BlogPage {
  private readonly prefs = inject(PreferencesService);
  readonly categories = PREACHING_CATEGORIES;
  get isFrench() { return this.prefs.isFrench(); }
}
