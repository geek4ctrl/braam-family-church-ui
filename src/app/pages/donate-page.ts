import { Component, inject } from '@angular/core';
import { PreferencesService } from '../core/preferences.service';

@Component({
  selector: 'app-donate-page',
  standalone: true,
  template: `
  <main class="screen-page" id="main" tabindex="-1">
    <section class="page-intro-hero donate-hero"><p class="eyebrow"><span></span> {{ isFrench ? 'DONNER ET SOUTENIR' : 'GIVE & PARTNER' }}</p><h1>{{ isFrench ? 'Semer dans le' : 'Sow Into the' }}<br><em>{{ isFrench ? 'Royaume' : 'Kingdom' }}</em></h1><p>{{ isFrench ? '« Donnez, et l’on vous donnera. » — Luc 6:38. Votre générosité soutient nos rencontres, nos actions solidaires, nos enseignements et l’œuvre de BRAAM Family.' : '“Give, and it will be given to you.” — Luke 6:38. Your generosity fuels Vision Monday, outreach, media production, and the expansion of God’s Kingdom through BRAAM Family.' }}</p></section>
    <section class="content-section giving-layout"><div class="giving-side"><article class="info-panel"><h3>{{ isFrench ? 'Partenaires de la mission' : 'Partner with the ministry' }}</h3><p>{{ isFrench ? 'Le don est une pratique encouragée par Jésus. Votre contribution soutient le Corps du Christ et l’œuvre de BRAAM Family.' : 'Giving is a practice Jesus encouraged and engaged in from a compassionate heart. Every contribution helps support the Body of Christ. Partner with BRAAM Family or make a financial contribution to the ministry.' }}</p><p>{{ isFrench ? 'Merci pour votre acte d’amour et d’obéissance. Que Dieu vous bénisse abondamment.' : 'Thank you for your act of love and obedience as you sow into this ministry. Be richly blessed!' }}</p></article><article class="info-panel bank-panel"><h3>{{ isFrench ? 'Virement bancaire (EFT)' : 'Bank Transfer (EFT)' }}</h3><div><span>Bank</span><b>First National Bank (FNB)</b></div><div><span>{{ isFrench ? 'Titulaire du compte' : 'Account Name' }}</span><b>Braam Family NPC</b></div><div><span>{{ isFrench ? 'N° de compte' : 'Account Number' }}</span><b>62886055873</b></div><div><span>{{ isFrench ? 'Référence' : 'Reference' }}</span><b>{{ isFrench ? 'Votre nom + don' : 'Your name + donation' }}</b></div></article></div>
      <article class="info-panel give-online"><div class="give-online-title"><span>♡</span><div><h3>{{ isFrench ? 'Donner en ligne avec Yoco' : 'Give Online via Yoco' }}</h3><small>Secure · Fast · South African</small></div></div><p>BRAAM Family uses <b>Yoco</b> — South Africa’s trusted payment platform — for all online giving. Click below to give securely using your card.</p><small class="gold-label">SUGGESTED AMOUNTS</small><div class="amount-chips">
        @for (amount of amounts; track amount) {
          <button [class.selected]="donationAmount === amount" (click)="selectAmount(amount)">R{{ amount }}</button>
        }
      </div><a class="gradient-button give-now" href="https://pay.yoco.com/BRAAMFAMILY" target="_blank" rel="noopener noreferrer">▱ &nbsp; Continue to Yoco secure checkout <span>↗</span></a><small class="secure-text">This is the official BRAAM Family Yoco payment page. Enter your gift amount on Yoco; the suggested amounts above do not prefill the checkout.</small><div class="demo-payment-box"><div><b>{{ isFrench ? 'Don rapide (démo)' : 'Quick demo payment' }}</b><small>{{ isFrench ? 'Un clic · données test · aucun débit' : 'One tap · test data only · no charge' }}</small></div><button type="button" class="gradient-button" (click)="quickDemoDonation()">{{ isFrench ? 'Donner' : 'Give' }} R{{ donationAmount }} {{ isFrench ? 'en démo' : 'in demo' }} <span>↗</span></button><small>{{ isFrench ? 'Donateur test' : 'Demo payer' }} : {{ demoPayer.name }} · {{ isFrench ? 'carte test se terminant par' : 'test card ending' }} {{ demoPayer.cardLast4 }}. {{ isFrench ? 'Aucune donnée n’est vérifiée et aucun paiement réel ne sera effectué.' : 'No details are checked and no money moves.' }}</small></div>
        @if (demoDonationReceipt) {
          <div class="demo-receipt" role="status"><b>{{ isFrench ? 'Don démo effectué' : 'Demo donation complete' }} ✓</b><span>R{{ donationAmount }} · {{ demoDonationReceipt }}</span><small>{{ isFrench ? 'Paiement simulé uniquement. Aucun don réel effectué.' : 'This is a simulated payment only. No real donation was made.' }}</small></div>
        }
      <div class="give-quote">“Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.”<small>— 2 Corinthians 9:7</small></div></article></section>
    <section class="scripture-band"><p>“It is more blessed to give than to receive.”<small>ACTS 20:35</small></p></section>
  </main>
  `
})
export class DonatePage {
  private readonly prefs = inject(PreferencesService);
  readonly amounts = [50, 100, 200, 500, 1000];
  donationAmount = 100;
  demoDonationReceipt = '';
  demoPayer = { name: 'Alex Test', cardLast4: '4242' };

  get isFrench() {
    return this.prefs.isFrench();
  }

  selectAmount(amount: number) {
    this.donationAmount = amount;
    this.demoDonationReceipt = '';
  }

  quickDemoDonation() {
    this.demoDonationReceipt = `DEMO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  }
}
