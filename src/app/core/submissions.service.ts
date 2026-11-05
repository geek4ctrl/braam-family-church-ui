import { Injectable, signal } from '@angular/core';

/**
 * Central place where contact / join / shop-catalogue submissions will be posted
 * once a backend endpoint exists. Today there is no server, so `submit()`
 * simulates network latency against a placeholder endpoint and reports an
 * honest "not connected yet" error when one is not configured.
 *
 * Swapping in real HTTP later only touches this file: add @angular/common/http,
 * inject HttpClient, and POST `payload` to the endpoint resolved from
 * window.BRAAM_CONFIG (mirroring how the shop page reads yocoCheckoutEndpoint).
 */

/** Placeholder endpoint keys; wire each in public/app-config.js when a server exists. */
const ENDPOINT_CONFIG_KEYS = {
  contact: 'contactEndpoint',
  join: 'joinEndpoint',
} as const;

type SubmissionKind = keyof typeof ENDPOINT_CONFIG_KEYS;

@Injectable({ providedIn: 'root' })
export class SubmissionsService {
  /** True while a submission is in flight; pages use it for disabled/loading UI. */
  readonly busy = signal(false);

  private endpointFor(kind: SubmissionKind): string {
    const config = window.BRAAM_CONFIG as unknown as Record<string, string | undefined>;
    return config?.[ENDPOINT_CONFIG_KEYS[kind]]?.trim() ?? '';
  }

  /**
   * Resolves with a reference on success, or rejects with one of the stable
   * error keys below so pages can render the message in the active language.
   */
  async submit(kind: SubmissionKind, payload: unknown): Promise<string> {
    if (this.busy()) throw new Error('already-in-flight');
    this.busy.set(true);
    try {
      const endpoint = this.endpointFor(kind);
      // Simulated latency; becomes the real fetch/POST round-trip later.
      await new Promise((resolve) => setTimeout(resolve, 900));
      if (!endpoint) throw new Error('not-configured');
      void payload;
      return `BRAAM-${Date.now().toString(36).toUpperCase()}`;
    } finally {
      this.busy.set(false);
    }
  }
}
