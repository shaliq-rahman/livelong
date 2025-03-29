/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */

declare module 'leaflet-defaulticon-compatibility' {
  import type { LeafletEvent, IconOptions } from 'leaflet';

  export function initialize(options?: IconOptions): void;
  export function restore(): void;
}