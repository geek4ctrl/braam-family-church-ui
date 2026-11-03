import { ErrorHandler, Injectable, inject } from '@angular/core';
import { ErrorNotifierService } from './error-notifier.service';

/**
 * Global catch-all for uncaught runtime errors (failed asset loads, form edge
 * cases, lazy-chunk load failures, template exceptions). Without it Angular
 * only logs to the console and the visitor sees a silent blank screen.
 *
 * Two responsibilities:
 *  1. Log the real error to the console for developers.
 *  2. Feed a bilingual, dismissible notice to ErrorNotifierService so the
 *     visitor gets honest feedback instead of a dead page.
 *
 * Future reporting plug-in point: forward `error` to Sentry/Bugsnag here —
 * this is the single place every uncaught error already flows through.
 */
@Injectable({ providedIn: 'root' })
export class AppErrorHandler implements ErrorHandler {
  private readonly notifier = inject(ErrorNotifierService);

  handleError(error: unknown): void {
    // TODO(reporting): send `error` to the chosen monitoring service here.
    console.error('[BRAAM] Uncaught error:', error);
    this.notifier.report(error);
  }
}
