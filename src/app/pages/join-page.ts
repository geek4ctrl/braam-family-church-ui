import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PreferencesService } from '../core/preferences.service';
import type { Member } from '../core/types';

@Component({
  selector: 'app-join-page',
  standalone: true,
  imports: [FormsModule],
  template: `
  <main class="screen-page">
    <section class="page-intro-hero join-intro"><p class="eyebrow"><span></span> {{ isFrench ? 'BIENVENUE \u00c0 LA MAISON' : 'WELCOME HOME' }}</p><h1>{{ isFrench ? 'Rejoignez la' : 'Join the' }}<br><em>{{ isFrench ? 'famille BRAAM' : 'BRAAM Family' }}</em></h1><p>{{ isFrench ? 'Inscrivez-vous comme membre de la famille BRAAM. Nous aimerions savoir qui vous \u00eates et comment nous pouvons vous accompagner sur votre chemin.' : 'Register as a member of the BRAAM Family. We\u2019d love to know who you are and how we can serve you on your journey.' }}</p></section>
    <section class="join-flow content-section"><div class="stepper">
      @for (label of joinLabels; track label; let i = $index) {
        <div [class.current]="joinStep === i + 1" [class.completed]="joinStep > i + 1"><span>{{ joinStep > i + 1 ? '\u2713' : i + 1 }}</span><small>{{ isFrench ? joinLabelsFr[i] : label }}</small></div>
      }
    </div>
      @if (!joinSent && joinStep === 1) {
        <form class="info-panel join-form" #personalForm="ngForm" (ngSubmit)="personalForm.valid && nextJoin()"><h2>{{ isFrench ? 'Informations personnelles' : 'Personal Information' }}</h2><div class="form-two"><label>{{ isFrench ? 'PR\u00c9NOM *' : 'FIRST NAME *' }}<input name="firstName" [(ngModel)]="member.firstName" [placeholder]="isFrench ? 'Votre pr\u00e9nom' : 'Your first name'" required></label><label>{{ isFrench ? 'NOM *' : 'LAST NAME *' }}<input name="lastName" [(ngModel)]="member.lastName" [placeholder]="isFrench ? 'Votre nom' : 'Your last name'" required></label><label>EMAIL *<input name="email" [(ngModel)]="member.email" type="email" [placeholder]="isFrench ? 'votre@email.com' : 'your@email.com'" required></label><label>{{ isFrench ? 'T\u00c9L\u00c9PHONE *' : 'PHONE *' }}<input name="phone" [(ngModel)]="member.phone" placeholder="+27..." required></label><label>{{ isFrench ? 'DATE DE NAISSANCE' : 'DATE OF BIRTH' }}<input name="dob" [(ngModel)]="member.dob" type="date"></label><label>{{ isFrench ? 'GENRE' : 'GENDER' }}<select name="gender" [(ngModel)]="member.gender"><option value="">{{ isFrench ? 'Choisir' : 'Select' }}</option><option>{{ isFrench ? 'Femme' : 'Female' }}</option><option>{{ isFrench ? 'Homme' : 'Male' }}</option><option>{{ isFrench ? 'Pr\u00e9f\u00e8re ne pas dire' : 'Prefer not to say' }}</option></select></label></div><button class="gradient-button form-submit" type="submit" [disabled]="!personalForm.valid">{{ isFrench ? 'Suivant \u2014 Parcours' : 'Next \u2014 Background' }} <span>\u2192</span></button></form>
      }
      @if (!joinSent && joinStep === 2) {
        <form class="info-panel join-form" #backgroundForm="ngForm" (ngSubmit)="backgroundForm.valid && nextJoin()"><h2>{{ isFrench ? 'Votre parcours' : 'Your Background' }}</h2><label>{{ isFrench ? 'OCCUPATION' : 'OCCUPATION' }}<input name="occupation" [(ngModel)]="member.occupation" [placeholder]="isFrench ? '\u00c9tudiant / Professionnel / etc.' : 'Student / Professional / etc.'"></label><label>{{ isFrench ? 'VILLE / QUARTIER' : 'CITY / AREA' }}<input name="area" [(ngModel)]="member.area" [placeholder]="isFrench ? 'ex. Braamfontein, Sandton...' : 'e.g. Braamfontein, Sandton...'"></label><label>{{ isFrench ? '\u00c9TAT CIVIL' : 'MARITAL STATUS' }}<select name="marital" [(ngModel)]="member.marital"><option value="">{{ isFrench ? 'Choisir' : 'Select' }}</option><option>{{ isFrench ? 'C\u00e9libataire' : 'Single' }}</option><option>{{ isFrench ? 'Mari\u00e9(e)' : 'Married' }}</option><option>{{ isFrench ? 'Autre' : 'Other' }}</option></select></label><label>{{ isFrench ? '\u00caTES-VOUS N\u00c9(E) DE NOUVEAU ?' : 'ARE YOU BORN AGAIN?' }}<select name="bornAgain" [(ngModel)]="member.bornAgain"><option value="">{{ isFrench ? 'Choisir' : 'Select' }}</option><option>{{ isFrench ? 'Oui' : 'Yes' }}</option><option>{{ isFrench ? 'Pas encore' : 'Not yet' }}</option><option>{{ isFrench ? 'Je voudrais en discuter' : 'I would like to talk about it' }}</option></select></label><label>{{ isFrench ? 'COMMENT NOUS AVEZ-VOUS TROUV\u00c9S ?' : 'HOW DID YOU FIND US?' }}<select name="foundUs" [(ngModel)]="member.foundUs"><option value="">{{ isFrench ? 'Choisir' : 'Select' }}</option><option>{{ isFrench ? 'Ami ou famille' : 'Friend or family' }}</option><option>{{ isFrench ? 'R\u00e9seaux sociaux' : 'Social media' }}</option><option>{{ isFrench ? 'Recherche en ligne' : 'Online search' }}</option><option>{{ isFrench ? '\u00c9v\u00e9nement communautaire' : 'Community event' }}</option></select></label><label>{{ isFrench ? 'TYPE D\u2019ADH\u00c9SION' : 'MEMBERSHIP TYPE' }}<select name="membership" [(ngModel)]="member.membership"><option value="">{{ isFrench ? 'Choisir' : 'Select' }}</option><option>{{ isFrench ? 'Membre' : 'Member' }}</option><option>{{ isFrench ? 'Visiteur r\u00e9gulier' : 'Regular visitor' }}</option><option>{{ isFrench ? 'Nouveau \u00e0 BRAAM' : 'New to BRAAM' }}</option></select></label><div class="join-actions"><button class="outline-button" type="button" (click)="joinStep = 1">{{ isFrench ? 'Retour' : 'Back' }}</button><button class="gradient-button" type="submit">{{ isFrench ? 'Suivant \u2014 Implication' : 'Next \u2014 Involvement' }} <span>\u2192</span></button></div></form>
      }
      @if (!joinSent && joinStep === 3) {
        <form class="info-panel join-form" (ngSubmit)="submitJoin()"><h2>{{ isFrench ? 'Domaines d\u2019int\u00e9r\u00eat' : 'Areas of Interest' }}</h2><p>{{ isFrench ? 'Où souhaitez-vous servir ou vous impliquer ? (S\u00e9lectionnez tout ce qui s\u2019applique)' : 'Where would you like to serve or get involved? (Select all that apply)' }}</p><div class="interest-grid">
          @for (area of interestAreas; track area; let i = $index) {
            <label><input type="checkbox" [(ngModel)]="interests[area]" [name]="'interest' + area"><span>{{ isFrench ? interestAreasFr[i] : area }}</span></label>
          }
        </div><label>{{ isFrench ? 'NOTES COMPL\u00c9MENTAIRES' : 'ADDITIONAL NOTES' }}<textarea name="notes" [(ngModel)]="member.notes" [placeholder]="isFrench ? 'Ce que vous aimeriez que nous sachions...' : 'Anything you\u2019d like us to know...'" rows="4"></textarea></label><div class="join-actions"><button class="outline-button" type="button" (click)="joinStep = 2">{{ isFrench ? 'Retour' : 'Back' }}</button><button class="gradient-button" type="submit">{{ isFrench ? 'Compl\u00e9ter l\u2019inscription' : 'Complete Registration' }} <span>\u2197</span></button></div></form>
      }
      @if (joinSent) {
        <div class="info-panel join-success"><span class="success-mark">\u2713</span><h2>{{ isFrench ? 'Bienvenue dans la famille !' : 'Welcome to the Family!' }}</h2><p>{{ isFrench ? 'Merci de votre inscription, ' + member.firstName + '. Un membre de notre \u00e9quipe pastorale vous contactera bient\u00f4t pour vous accueillir personnellement. Nous avons h\u00e2te de vivre la vie ensemble.' : 'Thank you for registering, ' + member.firstName + '. Someone from our pastoral team will reach out to you soon to welcome you personally. We look forward to doing life together.' }}</p></div>
      }
    </section>
  </main>
  `
})
export class JoinPage {
  private readonly prefs = inject(PreferencesService);
  joinStep = 1;
  joinSent = false;
  joinLabels = ['PERSONAL INFO', 'BACKGROUND', 'INVOLVEMENT'];
  joinLabelsFr = ['INFOS PERSONNELLES', 'PARCOURS', 'IMPLICATION'];
  member: Member = {
    firstName: '', lastName: '', email: '', phone: '', dob: '', gender: '',
    occupation: '', area: '', marital: '', bornAgain: '', foundUs: '', membership: '', notes: '',
  };
  interestAreas = ['Worship Team', 'Ushering', 'Media & Audio', 'Youth Ministry', 'Outreach', 'Intercession', 'Hospitality', 'Administration'];
  interestAreasFr = ['\u00c9quipe de louange', 'Accueil', 'M\u00e9dia et audio', 'Minist\u00e8re des jeunes', 'Solidarit\u00e9', 'Intercession', 'Hospitalit\u00e9', 'Administration'];
  interests: Record<string, boolean> = {};

  get isFrench() { return this.prefs.isFrench(); }

  nextJoin() { this.joinStep++; }
  submitJoin() { this.joinSent = true; }
}
