import { Injectable, computed, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type Language = 'en' | 'fr';
export type Theme = 'light' | 'dark';

/**
 * Single source of truth for user preferences (language + theme).
 * State lives in signals, is persisted to localStorage, and applies the
 * theme/lang side effects to the document. Replaces the old
 * `braam-preferences` window CustomEvent bus.
 */
@Injectable({ providedIn: 'root' })
export class PreferencesService {
  private readonly document = inject(DOCUMENT);

  readonly language = signal<Language>(readStoredLanguage());
  readonly theme = signal<Theme>(readStoredTheme());

  readonly isFrench = computed(() => this.language() === 'fr');
  readonly isLight = computed(() => this.theme() === 'light');

  constructor() {
    this.applyDocument();
  }

  toggleLanguage(): void {
    this.language.set(this.isFrench() ? 'en' : 'fr');
    this.persist();
    this.applyDocument();
  }

  toggleTheme(): void {
    this.theme.set(this.isLight() ? 'dark' : 'light');
    this.persist();
    this.applyDocument();
  }

  /** Pick a translated string based on the current language. */
  tr<T>(en: T, fr: T): T {
    return this.isFrench() ? fr : en;
  }

  private persist(): void {
    try {
      localStorage.setItem('braam-language', this.language());
      localStorage.setItem('braam-theme', this.theme());
    } catch {
      /* storage unavailable (SSR / private mode) — keep in-memory state only */
    }
  }

  private applyDocument(): void {
    this.document.documentElement.lang = this.language();
    this.document.body?.classList.toggle('light-theme', this.isLight());
  }
}

function readStoredLanguage(): Language {
  try {
    return localStorage.getItem('braam-language') === 'fr' ? 'fr' : 'en';
  } catch {
    return 'en';
  }
}

function readStoredTheme(): Theme {
  try {
    return localStorage.getItem('braam-theme') === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}
