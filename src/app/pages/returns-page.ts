import { Component, inject } from '@angular/core';
import { PreferencesService } from '../core/preferences.service';

@Component({
  selector: 'app-returns-page',
  standalone: true,
  template: `
  <main class="screen-page">
    @if (isFrench) {
      <section class="page-intro-hero"><p class="eyebrow"><span></span> INFORMATIONS D'ACHAT</p><h1>Politique de <em>Retour</em></h1><p>Informations de retour et de remboursement issues de la politique officielle de la boutique BRAAM Family.</p></section>
      <section class="content-section legal-page"><article class="info-panel"><h2>Retour des produits standard</h2><p>Les produits standard peuvent être retournés dans les <strong>5 jours suivant la livraison</strong>. Les articles doivent être inutilisés et dans leur emballage d'origine, ou solidement remballés pour éviter tout dommage pendant le transport.</p><p>Pour entamer un retour, envoyez un email à <a href="mailto:info@braamfamily.co.za">info&#64;braamfamily.co.za</a> avec votre numéro de commande et les instructions de retour. Envoyez le retour en utilisant un transporteur de votre choix.</p><h3>Frais de retour</h3><p>Le client est responsable des frais d'expédition de retour ; ceux-ci sont déduits du remboursement. Si un article est endommagé pendant le retour en raison d'un emballage inadéquat, le remboursement ne peut être traité et l'article vous sera retourné.</p><h3>Articles spéciaux</h3><p>Les retours ne sont pas acceptés pour les produits personnalisés avec des tailles sur mesure, des motifs personnalisés ou des couleurs spécifiques.</p><h3>Remboursements</h3><p>Les remboursements approuvés sont effectués sur le mode de paiement d'origine après réception et inspection du retour. BRAAM Family vous notifiera par email. Si le remboursement n'est pas apparu dans les <strong>14 jours</strong> suivant l'email de confirmation, contactez votre banque.</p><p>Des questions ? Contactez <a href="mailto:info@braamfamily.co.za">info&#64;braamfamily.co.za</a>.</p><a class="outline-button" href="https://www.braamfamily.co.za/return-policy/" target="_blank" rel="noopener noreferrer">Voir la politique de retour officielle <span>↗</span></a></article></section>
    } @else {
      <section class="page-intro-hero"><p class="eyebrow"><span></span> SHOPPING INFORMATION</p><h1>Return <em>Policy</em></h1><p>Return and refund information from BRAAM Family's official store policy.</p></section>
      <section class="content-section legal-page"><article class="info-panel"><h2>Return of standard products</h2><p>Standard products may be returned within <strong>5 days from delivery</strong>. Items must be unused and in their original packaging, or securely repackaged to prevent damage in transit.</p><p>To start a return, email <a href="mailto:info@braamfamily.co.za">info&#64;braamfamily.co.za</a> for your order number and return instructions. Send the return using a courier of your choice.</p><h3>Return shipping</h3><p>The customer is responsible for return shipping costs; these are deducted from the refund. If an item is damaged during return shipping because it was inadequately packaged, the refund cannot be processed and the item will be returned to you.</p><h3>Special items</h3><p>Returns are not accepted for products customized with personalized sizes, custom patterns, or colors.</p><h3>Refunds</h3><p>Approved refunds are made to the original payment method after the return is received and inspected. BRAAM Family will notify you by email. If the refund has not appeared within <strong>14 days</strong> of the confirmation email, contact your bank.</p><p>Questions? Contact <a href="mailto:info@braamfamily.co.za">info&#64;braamfamily.co.za</a>.</p><a class="outline-button" href="https://www.braamfamily.co.za/return-policy/" target="_blank" rel="noopener noreferrer">View official Return Policy <span>↗</span></a></article></section>
    }
  </main>
  `
})
export class ReturnsPage {
  private readonly prefs = inject(PreferencesService);
  get isFrench() { return this.prefs.isFrench(); }
}
