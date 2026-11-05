import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PreferencesService } from '../core/preferences.service';
import { PRODUCTS, type Product, type CartLine } from '../core/content.data';

@Component({
  selector: 'app-shop-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <main class="screen-page" id="main" tabindex="-1">
    <section class="page-intro-hero shop-intro"><p class="eyebrow"><span></span> {{ isFrench ? 'BOUTIQUE OFFICIELLE BRAAM FAMILY' : 'OFFICIAL BRAAM FAMILY STORE' }}</p><h1>{{ isFrench ? 'La Boutique' : 'The Shop' }}</h1><p>{{ isFrench ? 'D\u00e9couvrez les v\u00eatements et accessoires actuellement propos\u00e9s par BRAAM Family. Les prix et disponibilit\u00e9s peuvent changer ; la boutique officielle a le catalogue complet en ligne et le paiement s\u00e9curis\u00e9.' : 'Explore the current apparel and accessories listed by BRAAM Family. Prices and availability can change; the official store has the complete live catalog and secure checkout.' }}</p><a class="gradient-button" href="https://www.braamfamily.co.za/shop/" target="_blank" rel="noopener noreferrer">{{ isFrench ? 'Acheter dans la collection officielle' : 'Shop the official collection' }} <span>\u2197</span></a></section>
    <section class="content-section shop-section"><div class="shop-toolbar"><div class="filter-row">
      @for (f of productFilters; track f) {
        <button [class.active]="productFilter === f" (click)="productFilter = f">{{ frFilter(f) }}</button>
      }
    </div></div><div class="product-grid">
      @for (p of visibleProducts; track p.name) {
        <article class="product-card"><button class="product-image" (click)="openProduct(p)" [attr.aria-label]="'View ' + p.name"><img [src]="p.image" [alt]="p.name" loading="lazy" decoding="async"></button><div class="product-info"><small>{{ p.category }}</small><h3>{{ p.name }}</h3><div class="product-buy"><b>R{{ p.price }}</b><button (click)="openProduct(p)">{{ isFrench ? 'Panier d\u00e9mo' : 'Try demo basket' }}</button></div><a class="product-official-link" [href]="p.officialUrl" target="_blank" rel="noopener noreferrer">{{ isFrench ? 'Voir et acheter sur la boutique officielle' : 'View and buy at the official store' }} \u2197</a></div></article>
      }
    </div>
      @if (!visibleProducts.length) {
        <p class="empty-state">{{ isFrench ? 'Aucun produit dans cette cat\u00e9gorie pour le moment \u2014 revenez bient\u00f4t.' : 'No products in this category yet \u2014 check back soon.' }}</p>
      }
    </section>

    @if (cartCount > 0) {
      <div class="cart-bar"><span class="cart-icon">\ud83d\uded2<i>{{ cartCount }}</i></span><div><b>{{ cartCount }} {{ cartCount === 1 ? (isFrench ? 'article' : 'item') : (isFrench ? 'articles' : 'items') }} {{ isFrench ? 'dans le panier' : 'in cart' }}</b><small>{{ cart[0]?.product?.name }}</small></div><strong>R{{ cartTotal }}</strong><button class="outline-button" (click)="cartOpen = true">{{ isFrench ? 'Voir le panier' : 'View Cart' }}</button><button class="gradient-button" (click)="startCheckout()">{{ isFrench ? 'Commander' : 'Checkout' }} <span>\u2192</span></button></div>
    }

    @if (selectedProduct) {
      <div class="overlay" (click)="selectedProduct = null"><div class="product-modal info-panel" (click)="$event.stopPropagation()"><button class="modal-x" (click)="selectedProduct = null">\u00d7</button><img [src]="selectedProduct.image" [alt]="selectedProduct.name" loading="lazy" decoding="async"><small>{{ selectedProduct.category }}</small><h2>{{ selectedProduct.name }}</h2><b class="product-price">R{{ selectedProduct.price }}</b><p>{{ isFrench ? (selectedProduct.descFr || selectedProduct.desc) : selectedProduct.desc }}</p><p class="demo-shop-note">{{ isFrench ? 'Le panier et le paiement de ce site sont d\u00e9monstratifs uniquement. Pour les tailles, couleurs, stocks actuels et un v\u00e9ritable achat, utilisez la boutique officielle.' : 'This site\u2019s basket and payment are for demonstration only. For current sizes, colors, stock, and a real purchase, use the official store.' }}</p><a class="outline-button" [href]="selectedProduct.officialUrl" target="_blank" rel="noopener noreferrer">{{ isFrench ? 'Ouvrir la page produit officielle' : 'Open official product page' }} <span>\u2197</span></a><div class="join-actions"><button class="outline-button" (click)="selectedProduct = null">{{ isFrench ? 'Fermer' : 'Close' }}</button><button class="gradient-button" (click)="addToCart(selectedProduct)">{{ isFrench ? 'Ajouter au panier d\u00e9mo' : 'Add to demo basket' }}</button></div></div></div>
    }

    @if (cartOpen) {
      <div class="overlay cart-overlay" (click)="cartOpen = false"><aside class="cart-drawer" (click)="$event.stopPropagation()"><div class="drawer-head"><div><h2>{{ isFrench ? 'Votre panier' : 'Your Cart' }}</h2><small>{{ cartCount }} {{ cartCount === 1 ? (isFrench ? 'article' : 'item') : (isFrench ? 'articles' : 'items') }}</small></div><button class="modal-x" (click)="cartOpen = false">\u00d7</button></div>
        @for (line of cart; track line.product.name) {
          <div class="cart-line"><img [src]="line.product.image" [alt]="line.product.name" loading="lazy" decoding="async"><div><b>{{ line.product.name }}</b><div class="qty-control"><button (click)="changeQty(line, -1)">\u2212</button>{{ line.qty }}<button (click)="changeQty(line, 1)">+</button><button class="remove-item" (click)="removeLine(line)">\u25a2</button></div></div><strong>R{{ line.qty * line.product.price }}</strong></div>
        }
        @if (!cartCount) {
          <p class="empty-cart">{{ isFrench ? 'Votre panier est vide. Trouvez quelque chose qui vous inspire.' : 'Your cart is empty. Find something that inspires you.' }}</p>
        }
        <div class="drawer-total"><div><b>{{ isFrench ? 'Total' : 'Total' }}</b><strong>R{{ cartTotal }}</strong></div><button class="gradient-button" [disabled]="!cartCount" (click)="startCheckout()">{{ isFrench ? 'Passer la commande' : 'Proceed to Checkout' }} <span>\u2192</span></button><button class="clear-cart" (click)="cart = []">{{ isFrench ? 'Vider le panier' : 'Clear cart' }}</button></div></aside></div>
    }

    @if (checkoutStep) {
      <div class="overlay checkout-overlay" (click)="checkoutStep = 0"><section class="checkout-modal info-panel" (click)="$event.stopPropagation()"><div class="stepper compact">
        @for (label of (isFrench ? ['COMMANDE', 'D\u00c9TAILS', 'PAIEMENT'] : ['ORDER', 'DETAILS', 'PAYMENT']); track label; let i = $index) {
          <div [class.current]="checkoutStep === i + 1" [class.completed]="checkoutStep > i + 1"><span>{{ checkoutStep > i + 1 ? '\u2713' : i + 1 }}</span></div>
        }
        <button class="modal-x" (click)="checkoutStep = 0">\u00d7</button></div>
        @if (checkoutStep === 1) {
          <h2>{{ isFrench ? 'V\u00e9rifier votre commande' : 'Review Your Order' }}</h2><div class="review-lines">
            @for (line of cart; track line.product.name) {
              <div><img [src]="line.product.image" [alt]="line.product.name" loading="lazy" decoding="async"><span>{{ line.product.name }}<small>{{ isFrench ? 'Qt\u00e9' : 'Qty' }}: {{ line.qty }}</small></span><b>R{{ line.product.price * line.qty }}</b></div>
            }
          </div><div class="checkout-total"><b>{{ isFrench ? 'Total' : 'Total' }}</b><strong>R{{ cartTotal }}</strong></div><button class="gradient-button form-submit" (click)="checkoutStep = 2">{{ isFrench ? 'Continuer vers les d\u00e9tails' : 'Continue to Details' }}</button><button class="demo-quick-link" type="button" (click)="quickDemoOrder()">{{ isFrench ? 'Commande d\u00e9mo rapide \u00b7 test uniquement' : 'Quick demo checkout \u00b7 test only' }} <span>\u2192</span></button>
        }
        @if (checkoutStep === 2) {
          <h2>{{ isFrench ? 'Coordonn\u00e9es de livraison' : 'Delivery Details' }}</h2><form #deliveryForm="ngForm" (ngSubmit)="deliveryForm.valid && (checkoutStep = 3)"><label>{{ isFrench ? 'NOM COMPLET *' : 'FULL NAME *' }}<input name="deliveryName" [(ngModel)]="delivery.name" [placeholder]="isFrench ? 'Votre nom complet' : 'Your full name'" required></label><label>{{ isFrench ? 'ADRESSE EMAIL *' : 'EMAIL ADDRESS *' }}<input name="deliveryEmail" [(ngModel)]="delivery.email" type="email" [placeholder]="isFrench ? 'votre@email.com' : 'your@email.com'" required></label><label>{{ isFrench ? 'NUM\u00c9RO DE T\u00c9L\u00c9PHONE *' : 'PHONE NUMBER *' }}<input name="deliveryPhone" [(ngModel)]="delivery.phone" placeholder="+27..." required></label><label>{{ isFrench ? 'ADRESSE *' : 'STREET ADDRESS *' }}<input name="address" [(ngModel)]="delivery.address" [placeholder]="isFrench ? '123 Rue Exemple' : '123 Example St'" required></label><label>{{ isFrench ? 'VILLE / QUARTIER' : 'CITY / AREA' }}<input name="city" [(ngModel)]="delivery.city" [placeholder]="isFrench ? 'ex. Randburg, Sandton' : 'e.g. Randburg, Sandton'"></label><label>{{ isFrench ? 'INSTRUCTIONS SP\u00c9CIALES' : 'SPECIAL INSTRUCTIONS' }}<textarea name="instructions" [(ngModel)]="delivery.instructions" [placeholder]="isFrench ? 'Pr\u00e9cisions sur votre commande...' : 'Anything we should know about your order...'" rows="2"></textarea></label><div class="join-actions"><button class="outline-button" type="button" (click)="checkoutStep = 1">{{ isFrench ? 'Retour' : 'Back' }}</button><button class="gradient-button" type="submit">{{ isFrench ? 'Continuer vers le paiement' : 'Continue to Payment' }}</button></div></form>
        }
        @if (checkoutStep === 3) {
          <h2>{{ isFrench ? 'Paiement' : 'Payment' }}</h2><p class="demo-shop-note">{{ isFrench ? 'Le panier local est un aper\u00e7u. Le paiement d\u00e9mo en un clic utilise des donn\u00e9es d\u2019exemple ; aucun d\u00e9tail n\u2019est valid\u00e9 et aucun paiement r\u00e9el n\u2019est effectu\u00e9.' : 'The local basket is a preview. One-tap demo checkout uses sample data; no details are validated and no real payment is made.' }}</p>
          @if (yocoCheckoutEndpoint) {
            <button class="gradient-button form-submit" type="button" [disabled]="startingPayment()" (click)="completeOrder()">{{ startingPayment() ? (isFrench ? 'Préparation du paiement…' : 'Preparing payment…') : (isFrench ? 'Continuer vers le paiement sécurisé Yoco' : 'Continue to secure Yoco checkout') }} <span>\u2197</span></button>
          } @else {
            <a class="outline-button" href="https://www.braamfamily.co.za/shop/" target="_blank" rel="noopener noreferrer">{{ isFrench ? 'Pour un achat r\u00e9el, ouvrez la boutique officielle' : 'For a real purchase, open the official store' }} <span>\u2197</span></a>
          }
          @if (checkoutError) {
            <p class="inline-message" role="alert">{{ checkoutError }}</p>
          }
          <div class="checkout-total"><span>{{ isFrench ? 'Total commande démo' : 'Demo order total' }}</span><strong>R{{ cartTotal }}</strong></div><div class="join-actions"><button class="outline-button" (click)="checkoutStep = 2">{{ isFrench ? 'Retour' : 'Back' }}</button><button class="gradient-button" type="button" [disabled]="processingDemo()" (click)="quickDemoOrder()">{{ processingDemo() ? (isFrench ? 'Traitement…' : 'Processing…') : (isFrench ? 'Paiement démo complet' : 'Complete demo payment') }} <span>\u2192</span></button></div>
        }
        @if (orderReceived) {
          <div class="success-state"><span>\u2713</span><h2>{{ isFrench ? 'Commande d\u00e9mo termin\u00e9e' : 'Demo Checkout Complete' }}</h2><p>{{ isFrench ? 'Commande test simul\u00e9e avec des donn\u00e9es d\u2019exemple. Aucun d\u00e9tail n\u2019a \u00e9t\u00e9 valid\u00e9 et aucun paiement n\u2019a \u00e9t\u00e9 effectu\u00e9. R\u00e9f\u00e9rence : ' + demoOrderReference + '.' : 'Test order simulated with sample data. No details were validated and no payment was taken. Reference: ' + demoOrderReference + '.' }}</p><button class="gradient-button" (click)="checkoutStep = 0; orderReceived = false; cart = []; cartOpen = false">{{ isFrench ? 'Continuer les achats' : 'Continue Shopping' }}</button></div>
        }
      </section></div>
    }
  </main>
  `
})
export class ShopPage {
  private readonly prefs = inject(PreferencesService);
  readonly productFilters = ['All', 'T-shirts', 'Hoodies', 'Caps', 'Accessories'];
  productFilter = 'All';
  readonly products: Product[] = PRODUCTS;

  cart: CartLine[] = [];
  cartOpen = false;
  selectedProduct: Product | null = null;
  checkoutStep = 0;
  paymentMethod = 'Demo';
  orderReceived = false;
  checkoutError = '';
  demoOrderReference = '';
  readonly startingPayment = signal(false);
  readonly processingDemo = signal(false);
  delivery = { name: '', email: '', phone: '', address: '', city: '', instructions: '' };
  yocoCheckoutEndpoint = window.BRAAM_CONFIG?.yocoCheckoutEndpoint ?? '';

  get isFrench() { return this.prefs.isFrench(); }

  frFilter(f: string): string {
    if (!this.isFrench) return f;
    const map: Record<string, string> = { All: 'Tout', 'T-shirts': 'T-shirts', Hoodies: 'Sweats', Caps: 'Casquettes', Accessories: 'Accessoires' };
    return map[f] ?? f;
  }

  get visibleProducts() {
    return this.productFilter === 'All'
      ? this.products
      : this.products.filter((p) => p.category.toLowerCase() === this.productFilter.toLowerCase());
  }
  get cartCount() { return this.cart.reduce((n, l) => n + l.qty, 0); }
  get cartTotal() { return this.cart.reduce((n, l) => n + l.qty * l.product.price, 0); }

  openProduct(p: Product) { this.selectedProduct = p; }
  addToCart(p: Product) {
    const line = this.cart.find((l) => l.product.name === p.name);
    if (line) line.qty++;
    else this.cart.push({ product: p, qty: 1 });
    this.selectedProduct = null;
  }
  changeQty(line: CartLine, delta: number) {
    line.qty += delta;
    if (line.qty < 1) this.removeLine(line);
  }
  removeLine(line: CartLine) { this.cart = this.cart.filter((l) => l !== line); }
  startCheckout() {
    this.cartOpen = false;
    this.checkoutStep = 1;
    this.orderReceived = false;
  }
  async quickDemoOrder() {
    this.paymentMethod = 'Demo';
    this.checkoutError = '';
    this.processingDemo.set(true);
    // Simulated processing so the demo behaves like a real round-trip.
    await new Promise((resolve) => setTimeout(resolve, 700));
    this.demoOrderReference = `DEMO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    this.processingDemo.set(false);
    this.orderReceived = true;
    this.checkoutStep = 4;
  }

  private errorKey(error: unknown): string {
    const message = error instanceof Error ? error.message : '';
    if (message.includes('invalid checkout link')) return 'invalid-link';
    return 'network';
  }

  private describeError(key: string): string {
    if (key === 'invalid-link') {
      return this.isFrench
        ? "Le fournisseur de paiement a renvoyé un lien de caisse invalide."
        : 'The payment provider returned an invalid checkout link.';
    }
    return this.isFrench
      ? 'Impossible de démarrer le paiement sécurisé. Réessayez ou utilisez la boutique officielle.'
      : 'Could not start secure checkout. Try again, or use the official store.';
  }

  async completeOrder() {
    this.checkoutError = '';
    if (!this.yocoCheckoutEndpoint) {
      this.checkoutError = this.isFrench
        ? 'Aucun paiement réel n\u2019est configuré dans cet aperçu — utilisez la boutique officielle ou la commande démo.'
        : 'No real checkout is configured in this preview. Use the official store or demo checkout.';
      return;
    }
    this.startingPayment.set(true);
    try {
      const response = await fetch(this.yocoCheckoutEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currency: 'ZAR',
          amountInCents: this.cartTotal * 100,
          items: this.cart.map((line) => ({
            name: line.product.name,
            quantity: line.qty,
            unitAmountInCents: line.product.price * 100,
          })),
        }),
      });
      if (!response.ok) throw new Error('Checkout could not be created.');
      const result = (await response.json()) as { redirectUrl?: string };
      if (!result.redirectUrl || !/^https:\/\//.test(result.redirectUrl)) {
        throw new Error('The payment provider returned an invalid checkout link.');
      }
      window.location.assign(result.redirectUrl);
    } catch (error) {
      this.checkoutError = this.describeError(this.errorKey(error));
    } finally {
      this.startingPayment.set(false);
    }
  }
}
