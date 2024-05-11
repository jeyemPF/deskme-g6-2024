import React from 'react';
import { ImageMapperProps } from './types';
interface StylesProps {
    container: React.CSSProperties;
    canvas: React.CSSProperties;
    img: React.CSSProperties;
    map: React.CSSProperties | undefined;
}
declare const styles: (props?: Partial<ImageMapperProps>) => StylesProps;
export default styles;
