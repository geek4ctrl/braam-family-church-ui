import { Component, inject } from '@angular/core';
import { PreferencesService } from '../core/preferences.service';
import { TESTIMONIES } from '../core/content.data';

@Component({
  selector: 'app-testimonies-page',
  standalone: true,
  template: `
  <main class="screen-page" id="main" tabindex="-1">
    <section class="page-intro-hero"><p class="eyebrow"><span></span> {{ isFrench ? 'DIEU EST \u00c0 L\u2019\u0152UVRE' : 'GOD IS MOVING' }}</p><h1>{{ isFrench ? 'T\u00e9moignages' : 'Testimonies' }}</h1><p>{{ isFrench ? 'Des histoires v\u00e9ridiques de transformation r\u00e9elle. Dieu agit encore, se meut encore, restaure encore. Voici les t\u00e9moignages de la famille BRAAM.' : 'Real stories of real transformation. God is still working, still moving, still restoring. These are the testimonies of the BRAAM Family.' }}</p></section>
    <section class="content-section testimonies-section">
      <article class="featured-sermon testimony-feature"><img src="https://www.braamfamily.co.za/wp-content/uploads/2023/01/God-is-Present-Willing-and-Able-1-585x585.png" width="585" height="585" loading="lazy" decoding="async" alt="BRAAM Family testimony"><div><span class="gold-label">{{ isFrench ? 'HISTOIRE \u00c0 LA UNE' : 'FEATURED STORY' }}</span><h2>{{ isFrench ? 'Pas de retour en arri\u00e8re, Dieu restaure ce qui \u00e9tait perdu' : 'No Turning Back, God Restores What Was Lost' }}</h2><p>{{ isFrench ? '\u00ab Il y a deux ans, tout s\u2019est effondr\u00e9. J\u2019ai perdu des contrats, eu des conflits avec mon p\u00e8re, et m\u00eame perdu une propri\u00e9t\u00e9. Puis mon compte bancaire a \u00e9t\u00e9 bloqu\u00e9. Je me sentais abandonn\u00e9, mais Dieu me pr\u00e9parait. \u00bb' : '\u201cTwo years ago, everything crumbled. I lost business deals, had conflicts with my father, and even lost a property. Then my bank account was blocked. I felt abandoned, but God was preparing me.\u201d' }}</p><small><b>Kai Mutombo</b><br>{{ isFrench ? 'T\u00e9moignage BRAAM Family' : 'BRAAM Family testimony' }}</small><a class="listen-link" href="https://www.braamfamily.co.za/kai-mutombo-testimony/" target="_blank" rel="noopener noreferrer">{{ isFrench ? 'Lire le t\u00e9moignage complet' : 'Read the full testimony' }} <span>\u2197</span></a></div></article>
      <div class="three-cards sermon-grid">
        @for (t of testimonies; track t.url) {
          <article class="media-card"><div class="media-photo"><img [src]="t.image" [alt]="t.name" loading="lazy" decoding="async"></div><small class="media-meta">{{ isFrench ? 'T\u00c9MOIGNAGE OFFICIEL' : 'OFFICIAL TESTIMONY' }}</small><h3>{{ t.title }}</h3><p>{{ t.text }}</p><div class="quote-byline"><span class="avatar">{{ t.name[0] }}</span><small><b>{{ t.name }}</b><br>BRAAM Family</small></div><a class="text-link testimony-source-link" [href]="t.url" target="_blank" rel="noopener noreferrer">{{ isFrench ? 'Lire le t\u00e9moignage original' : 'Read original testimony' }} <span>\u2197</span></a></article>
        }
      </div>
    </section>
    <section class="center-cta"><h2>{{ isFrench ? 'Partagez votre' : 'Share Your' }} <em>{{ isFrench ? 't\u00e9moignage' : 'Testimony' }}</em></h2><p>{{ isFrench ? 'Votre histoire compte. Les t\u00e9moignages fortifient la foi, encouragent le corps de Christ et glorifient Dieu. Si Dieu a fait quelque chose dans votre vie, nous voulons l\u2019entendre.' : 'Your story matters. Testimonies build faith, encourage the body of Christ, and glorify God. If God has done something in your life, we want to hear it.' }}</p><a class="gradient-button" href="https://www.braamfamily.co.za/testimonies/" target="_blank" rel="noopener noreferrer">{{ isFrench ? 'Soumettre votre t\u00e9moignage sur le site officiel' : 'Submit Your Testimony on the official site' }} <span>\u2197</span></a></section>
  </main>
  `
})
export class TestimoniesPage {
  private readonly prefs = inject(PreferencesService);
  readonly testimonies = TESTIMONIES;
  get isFrench() { return this.prefs.isFrench(); }
}
