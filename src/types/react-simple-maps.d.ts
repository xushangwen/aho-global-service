declare module 'react-simple-maps' {
  import { ComponentType, ReactNode } from 'react';

  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: {
      scale?: number;
      center?: [number, number];
      rotate?: [number, number, number];
    };
    width?: number;
    height?: number;
    className?: string;
    children?: ReactNode;
    [key: string]: unknown;
  }

  export interface GeographiesProps {
    geography: string | object;
    children: (data: { geographies: Geography[] }) => ReactNode;
  }

  export interface Geography {
    rsmKey: string;
    properties: Record<string, unknown>;
    geometry: object;
  }

  export interface GeographyProps {
    geography: Geography;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    style?: {
      default?: React.CSSProperties & { outline?: string };
      hover?: React.CSSProperties & { outline?: string };
      pressed?: React.CSSProperties & { outline?: string };
    };
    [key: string]: unknown;
  }

  export interface MarkerProps {
    coordinates: [number, number];
    children?: ReactNode;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick?: () => void;
    [key: string]: unknown;
  }

  export interface ZoomableGroupProps {
    center?: [number, number];
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    children?: ReactNode;
    [key: string]: unknown;
  }

  export const ComposableMap: ComponentType<ComposableMapProps>;
  export const Geographies: ComponentType<GeographiesProps>;
  export const Geography: ComponentType<GeographyProps>;
  export const Marker: ComponentType<MarkerProps>;
  export const ZoomableGroup: ComponentType<ZoomableGroupProps>;
}
