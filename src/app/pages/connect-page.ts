import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PreferencesService } from '../core/preferences.service';
import { SOCIAL_LINKS } from '../core/content.data';

@Component({
  selector: 'app-connect-page',
  standalone: true,
  imports: [RouterLink],
  template: `
  <main class="screen-page" id="main" tabindex="-1">
    <section class="page-intro-hero"><p class="eyebrow"><span></span> {{ isFrench ? 'RESTEZ CONNECT\u00c9S' : 'STAY CONNECTED' }}</p><h1>{{ isFrench ? 'Retrouvez-nous' : 'Find Us' }}<br><em>{{ isFrench ? 'partout' : 'Everywhere' }}</em></h1><p>{{ isFrench ? 'Suivez BRAAM Family sur toutes les plates-formes \u2013 ne manquez jamais un enseignement, un t\u00e9moignage ou un moment de notre communaut\u00e9.' : 'Follow BRAAM Family across all platforms \u2014 never miss a teaching, a testimony, or a moment from our community.' }}</p></section>
    <section class="content-section"><div class="three-cards connect-cards">
      @for (s of socialLinks; track s.name) {
        <a [class]="'info-panel social-card ' + s.class" [href]="s.href" target="_blank" rel="noopener"><span class="social-icon">{{ s.icon }}</span><b>\u2197</b><h3>{{ s.name }}</h3><small>{{ s.handle }}</small><p>{{ isFrench ? s.textFr || s.text : s.text }}</p></a>
      }
    </div></section>
    <section class="center-cta live-cta"><span class="live-badge">{{ isFrench ? 'CHA\u00ceNES OFFICIELLES' : 'OFFICIAL CHANNELS' }}</span><h2>{{ isFrench ? 'Regardez Vision du Lundi' : 'Watch Vision Monday' }} <em>{{ isFrench ? 'en direct' : 'Live' }}</em></h2><p>{{ isFrench ? 'Suivez les pages officielles Facebook et YouTube de BRAAM Family pour les annonces et les diffusions en direct.' : 'Follow BRAAM Family\u2019s official Facebook and YouTube pages for announcements and live-stream updates.' }}</p><a class="outline-button" href="https://www.facebook.com/BraamFamily7/" target="_blank" rel="noopener">f &nbsp; {{ isFrench ? 'Facebook En direct' : 'Facebook Live' }}</a><a class="gradient-button" routerLink="/schedule">{{ isFrench ? 'Nous rejoindre en personne' : 'Join In Person' }} <span>\u2197</span></a></section>
  </main>
  `
})
export class ConnectPage {
  private readonly prefs = inject(PreferencesService);
  readonly socialLinks = SOCIAL_LINKS;
  get isFrench() { return this.prefs.isFrench(); }
}
