import { Component, inject } from '@angular/core';
import { PreferencesService } from '../core/preferences.service';

@Component({
  selector: 'app-organigram-page',
  standalone: true,
  template: `
  <main class="screen-page">
    <section class="page-intro-hero"><p class="eyebrow"><span></span> {{ isFrench ? 'NOTRE ORGANISATION' : 'HOW WE ARE STRUCTURED' }}</p><h1>{{ isFrench ? 'Organigramme de' : 'BRAAM Family' }}<br><em>{{ isFrench ? 'la Famille BRAAM' : 'Organigram' }}</em></h1><p>{{ isFrench ? 'Consultez la structure organisationnelle publiée par BRAAM Family. La page officielle contient son document intégré et reste la source de référence pour les rôles et équipes actuels.' : 'View the organizational structure published by BRAAM Family. The official page contains its embedded document and remains the source of truth for current roles and teams.' }}</p></section>
    <section class="content-section org-section"><article class="info-panel official-document-card"><span class="small-icon">▤</span><h2>{{ isFrench ? 'Organigramme officiel de BRAAM Family' : 'Official BRAAM Family Organigram' }}</h2><p>{{ isFrench ? 'Ouvrez la page officielle de l\u2019organigramme pour consulter le document intégré complet. La direction, les équipes et les rôles y sont maintenus à jour.' : 'Open the official organigram page to view the full embedded document. Leadership, teams, and roles are maintained there.' }}</p><a class="gradient-button" href="https://www.braamfamily.co.za/braam-family-organigram/" target="_blank" rel="noopener noreferrer">{{ isFrench ? 'Voir l\u2019organigramme officiel' : 'View official organigram' }} <span>↗</span></a></article></section><section class="center-cta"><h2>{{ isFrench ? 'Des questions sur' : 'Questions about' }} <em>{{ isFrench ? 'le service ?' : 'Serving?' }}</em></h2><p>{{ isFrench ? 'Contactez BRAAM Family directement pour des informations actuelles sur les équipes ministérielles et les opportunités.' : 'Contact BRAAM Family directly for current information about ministry teams and opportunities.' }}</p><a class="outline-button" href="https://www.braamfamily.co.za/contact-us/" target="_blank" rel="noopener noreferrer">{{ isFrench ? 'Contacter BRAAM Family' : 'Contact BRAAM Family' }} <span>↗</span></a></section>
  </main>
  `
})
export class OrganigramPage {
  private readonly prefs = inject(PreferencesService);
  get isFrench() { return this.prefs.isFrench(); }
}
