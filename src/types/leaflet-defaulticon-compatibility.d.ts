declare module 'leaflet-defaulticon-compatibility' {
    import type { LeafletEvent } from 'leaflet';
    
    export function initialize(options?: {
      iconUrl?: string;
      iconRetinaUrl?: string;
      shadowUrl?: string;
      iconSize?: [number, number];
      iconAnchor?: [number, number];
      popupAnchor?: [number, number];
      shadowSize?: [number, number];
      className?: string;
    }): void;
    
    export function restore(): void;
  }