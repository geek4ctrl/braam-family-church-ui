import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PreferencesService } from '../core/preferences.service';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
  <main class="screen-page">
    <section class="page-intro-hero"><p class="eyebrow"><span></span> {{ isFrench ? 'RESTEZ EN CONTACT' : 'GET IN TOUCH' }}</p><h1>{{ isFrench ? 'Nous aimerions' : 'We\u2019d Love to' }}<br><em>{{ isFrench ? 'avoir de vos nouvelles' : 'Hear From You' }}</em></h1><p>{{ isFrench ? 'Que vous ayez une question, souhaitiez en savoir plus ou soyez prêt à nous rendre visite — écrivez-nous et un membre de notre famille vous répondra.' : 'Whether you have a question, want to know more, or are ready to visit — reach out and someone from our family will get back to you.' }}</p></section>
    <section class="content-section contact-layout"><div class="contact-info"><article class="info-panel contact-tile"><span class="small-icon">\u2316</span><small>{{ isFrench ? 'ADRESSE DE RENCONTRE' : 'MEETING ADDRESS' }}</small><b>286 Weltevreden Rd, Blackheath, Cresta, Randburg, 2195</b><span>{{ isFrench ? 'Cultes du dimanche et du lundi' : 'Sunday & Monday Services' }}</span></article><article class="info-panel contact-tile"><span class="small-icon">\u2709</span><small>EMAIL</small><a href="mailto:info@braamfamily.co.za">info&#64;braamfamily.co.za</a><span>{{ isFrench ? 'Pour demandes et assistance' : 'For enquiries and support' }}</span></article><article class="info-panel contact-tile"><span class="small-icon">\u2315</span><small>{{ isFrench ? 'T\u00c9L\u00c9PHONE' : 'PHONE' }}</small><a href="tel:+27782291246">+27 78 229 1246</a><span>{{ isFrench ? 'Contacter l\u2019\u00e9glise aux heures habituelles' : 'Contact the church during normal hours' }}</span></article><article class="info-panel contact-tile"><span class="small-icon">\u25f7</span><small>{{ isFrench ? 'HEURES DE RASSEMBLEMENT' : 'GATHERING TIMES' }}</small><b>{{ isFrench ? 'Dimanche 10h00\u201312h30 \u00b7 Lundi 18h00\u201320h30' : 'Sunday 10:00\u201312:30 \u00b7 Monday 18:00\u201320:30' }}</b><span>{{ isFrench ? 'Tous sont bienvenus' : 'All are welcome' }}</span></article><a class="contact-map" href="https://maps.google.com/?q=286+Weltevreden+Rd+Randburg" target="_blank" rel="noopener" aria-label="Open BRAAM Family\u2019s location in Google Maps"></a><article class="info-panel follow-panel"><small>{{ isFrench ? 'SUIVEZ-NOUS' : 'FOLLOW US' }}</small><a routerLink="/connect">f &nbsp; {{ isFrench ? 'BRAAM Family sur Facebook' : 'BRAAM Family on Facebook' }}</a></article></div>
      <article class="info-panel message-form-panel">
        @if (!contactSent) {
          <h2>{{ isFrench ? 'Envoyez-nous un message' : 'Send Us a Message' }}</h2><p>{{ isFrench ? 'Tous les champs marqu\u00e9s * sont obligatoires' : 'All fields marked * are required' }}</p>
          <form (ngSubmit)="sendContact()"><div class="form-two"><label>{{ isFrench ? 'NOM COMPLET *' : 'FULL NAME *' }}<input name="contactName" [(ngModel)]="contact.name" [placeholder]="isFrench ? 'Votre nom' : 'Your name'" required></label><label>EMAIL *<input name="contactEmail" [(ngModel)]="contact.email" type="email" [placeholder]="isFrench ? 'votre@email.com' : 'your@email.com'" required></label><label>{{ isFrench ? 'T\u00c9L\u00c9PHONE' : 'PHONE' }}<input name="contactPhone" [(ngModel)]="contact.phone" placeholder="+27..."></label><label>{{ isFrench ? 'SUJET *' : 'SUBJECT *' }}<select name="contactSubject" [(ngModel)]="contact.subject" required><option value="">{{ isFrench ? 'Choisir un sujet' : 'Select a subject' }}</option><option>{{ isFrench ? 'Demande de pri\u00e8re' : 'Prayer request' }}</option><option>{{ isFrench ? 'Visiter BRAAM Family' : 'Visiting BRAAM Family' }}</option><option>{{ isFrench ? 'Demande g\u00e9n\u00e9rale' : 'General enquiry' }}</option><option>{{ isFrench ? 'Service et b\u00e9n\u00e9volat' : 'Serving and volunteering' }}</option></select></label></div><label>{{ isFrench ? 'MESSAGE *' : 'MESSAGE *' }}<textarea name="contactMessage" [(ngModel)]="contact.message" [placeholder]="isFrench ? '\u00c9crivez votre message ici...' : 'Write your message here...'" required rows="5"></textarea></label><button class="gradient-button form-submit" type="submit">{{ isFrench ? 'Envoyer le message' : 'Send Message' }} <span>\u2197</span></button></form>
        } @else {
          <div class="success-state"><span>\u2713</span><h2>{{ isFrench ? 'Brouillon d\u2019email pr\u00e9par\u00e9.' : 'Email draft prepared.' }}</h2><p>{{ isFrench ? 'Votre application de messagerie devrait s\u2019ouvrir avec ce message adress\u00e9 \u00e0 BRAAM Family. Envoyez l\u2019email pour finaliser votre demande.' : 'Your email app should open with this message addressed to BRAAM Family. Send the email there to complete your enquiry.' }}</p><button class="outline-button" (click)="contactSent = false">{{ isFrench ? 'Envoyer un autre message' : 'Send another message' }}</button></div>
        }
      </article>
    </section>
    <section class="center-cta"><h2>{{ isFrench ? 'La meilleure fa\u00e7on de connecter est' : 'The Best Way to Connect Is' }} <em>{{ isFrench ? 'en personne' : 'In Person' }}</em></h2><p>{{ isFrench ? 'Rejoignez une rencontre du dimanche ou du lundi \u00e0 l\u2019adresse publi\u00e9e.' : 'Join a Sunday or Monday gathering at the published meeting address.' }}</p><div class="connect-chips"><span>\ud83d\udccd 286 Weltevreden Rd, Blackheath, Cresta, Randburg</span><span>\u25f7 {{ isFrench ? 'Dimanche 10h00\u201312h30 \u00b7 Lundi 18h00\u201320h30' : 'Sunday 10:00\u201312:30 \u00b7 Monday 18:00\u201320:30' }}</span></div></section>
  </main>
  `
})
export class ContactPage {
  private readonly prefs = inject(PreferencesService);
  contact = { name: '', email: '', phone: '', subject: '', message: '' };
  contactSent = false;

  get isFrench() { return this.prefs.isFrench(); }

  sendContact() {
    const subject = encodeURIComponent(this.contact.subject || 'Website enquiry');
    const body = encodeURIComponent(
      `Name: ${this.contact.name}\nEmail: ${this.contact.email}\nPhone: ${this.contact.phone}\n\n${this.contact.message}`
    );
    window.location.href = `mailto:info@braamfamily.co.za?subject=${subject}&body=${body}`;
    this.contactSent = true;
  }
}
