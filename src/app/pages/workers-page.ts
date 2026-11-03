import { Component, inject } from '@angular/core';
import { PreferencesService } from '../core/preferences.service';

@Component({
  selector: 'app-workers-page',
  standalone: true,
  template: `
  <main class="screen-page">
    <section class="page-intro-hero textured-hero workers-hero"><p class="eyebrow"><span></span> {{ isFrench ? 'ÉQUIPER L\u2019ÉQUIPE' : 'EQUIPPING THE TEAM' }}</p><h1>{{ isFrench ? 'Enseignements' : 'Workers' }}<br>{{ isFrench ? 'des ' : '' }}<em>{{ isFrench ? 'ouvriers' : 'Teachings' }}</em></h1><p>{{ isFrench ? 'Le site officiel de BRAAM Family partage des ressources d\u2019enseignement pour les ouvriers en ministère. Découvrez l\u2019enseignement publié ci-dessous et suivez l\u2019archive officielle pour les ajouts.' : 'The official BRAAM Family website shares teaching resources for ministry workers. Explore the published teaching below and follow the official archive for additions.' }}</p></section>
    <section class="content-section recent-sessions"><article class="featured-sermon"><div class="media-photo"><img src="https://www.braamfamily.co.za/wp-content/uploads/2026/01/Untitled-design-2026-01-06T151154.063-585x306.png" alt="Official Day 1 – Vision and Mission teaching cover"></div><div><span class="gold-label">{{ isFrench ? 'ENSEIGNEMENT OFFICIEL DES OUVRIERS · 6 JANVIER 2026' : 'OFFICIAL WORKERS TEACHING · JANUARY 6, 2026' }}</span><h2>{{ isFrench ? 'Jour 1 – Vision et Mission' : 'Day 1 – Vision & Mission' }}</h2><p>{{ isFrench ? 'Premier article publié dans l\u2019archive des enseignements pour les ouvriers, avec une ressource téléchargeable sur la page officielle.' : 'The first published entry in the Workers Teachings archive, with a downloadable resource on the official post.' }}</p><a class="gradient-button" href="https://www.braamfamily.co.za/day-1-vision-mission/" target="_blank" rel="noopener noreferrer">{{ isFrench ? 'Lire l\u2019enseignement officiel' : 'Read the official teaching' }} <span>↗</span></a></div></article></section>
    <section class="content-section serve-panel"><div><p class="eyebrow"><span></span> {{ isFrench ? 'CONNEXION' : 'CONNECT' }}</p><h2>{{ isFrench ? 'Intéressé à' : 'Interested in' }} <em>{{ isFrench ? 'servir ?' : 'Serving?' }}</em></h2><p>{{ isFrench ? 'Pour des informations ministérielles actuelles et vos demandes, contactez directement BRAAM Family via sa page de contact officielle.' : 'For current ministry information and enquiries, contact BRAAM Family directly through its official contact page.' }}</p><a class="gradient-button" href="https://www.braamfamily.co.za/contact-us/" target="_blank" rel="noopener noreferrer">{{ isFrench ? 'Contacter BRAAM Family' : 'Contact BRAAM Family' }} <span>↗</span></a></div><img src="/images/official-family-gathering.jpg" alt="BRAAM Family gathering"></section>
  </main>
  `
})
export class WorkersPage {
  private readonly prefs = inject(PreferencesService);
  get isFrench() { return this.prefs.isFrench(); }
}
