import { Injectable, inject, signal } from '@angular/core';
import { PreferencesService } from './preferences.service';

/**
 * Holds a single user-visible notice for runtime errors caught by
 * AppErrorHandler, so a failure surfaces an honest bilingual message instead
 * of silently blanking the screen. Non-blocking and dismissible: the visitor
 * can keep browsing. The shell reads `message()` and calls `dismiss()`.
 */
@Injectable({ providedIn: 'root' })
export class ErrorNotifierService {
  private readonly prefs = inject(PreferencesService);

  /** Current notice text, or null when nothing to show. */
  readonly message = signal<string | null>(null);

  /** Last error that was reported; kept for future remote reporting. */
  lastError: unknown = null;

  /** Surface the generic recovery message. Repeats collapse to one notice. */
  report(error: unknown): void {
    this.lastError = error;
    this.message.set(
      this.prefs.tr(
        'Something went wrong on this page. Please try again — if it keeps happening, contact the church office.',
        'Un problème est survenu sur cette page. Veuillez réessayer — si cela persiste, contactez le secrétariat de l’église.'
      )
    );
  }

  dismiss(): void {
    this.message.set(null);
  }
}
