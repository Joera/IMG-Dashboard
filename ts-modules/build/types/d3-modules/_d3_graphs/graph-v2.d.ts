import { Dimensions } from '@local/d3_types';
import { IGraphMapping, IMappingOption, IGraphControllerV2, IGraphConfigV2 } from '@local/d3_types';
export default class GraphControllerV2 implements IGraphControllerV2 {
    main: any;
    data: any;
    element: HTMLElement;
    mapping: IGraphMapping;
    segment: string;
    config: IGraphConfigV2;
    dimensions: Dimensions;
    firstMapping: IMappingOption;
    svg: any;
    yScale: any;
    xScale: any;
    chartDimensions: any;
    chartSVG: any;
    scales: any;
    axes: any;
    parameters: any;
    htmlHeader: any;
    htmlSegment: any;
    popup: any;
    constructor(main: any, data: any, element: HTMLElement, mapping: IGraphMapping, segment: string);
    _init(): void;
    _svg(svgWrapper?: HTMLElement): void;
    redraw(data: any): void;
    draw(data: any): void;
    prepareData(data: any): void;
    _update(newData: any, segment: string, update: boolean): void;
    _addScale(slug: string, type: string, direction: string, parameter?: string): void;
    _addAxis(slug: string, scale: string, position: string, format?: string, extra?: string, label?: string): void;
    _addMargin(top: number, bottom: number, left: number, right: number): void;
    _addPadding(top: number, bottom: number, left: number, right: number): void;
}