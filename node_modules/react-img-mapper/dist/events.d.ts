import { ImageMapperProps, CustomArea, AreaEvent, TouchEvent, ImageEvent } from './types';
export declare const imageMouseMove: (event: ImageEvent, props: ImageMapperProps) => void;
export declare const imageClick: (event: ImageEvent, props: ImageMapperProps) => void;
export declare const mouseMove: (area: CustomArea, index: number, event: AreaEvent, props: ImageMapperProps) => void;
export declare const mouseDown: (area: CustomArea, index: number, event: AreaEvent, props: ImageMapperProps) => void;
export declare const mouseUp: (area: CustomArea, index: number, event: AreaEvent, props: ImageMapperProps) => void;
export declare const touchStart: (area: CustomArea, index: number, event: TouchEvent, props: ImageMapperProps) => void;
export declare const touchEnd: (area: CustomArea, index: number, event: TouchEvent, props: ImageMapperProps) => void;
