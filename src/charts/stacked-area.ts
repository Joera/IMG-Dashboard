import { ChartStackedArea} from "../svg-elements/module";

import { DataPart, GraphData } from "../types/data";
import { parseHistoryForStackedArea } from "../d3-services/data-with-history.functions";
import * as d3 from "d3";
import HtmlLegendDots from "../html-elements/html-legend-dots";
import { GraphControllerV2 } from "./graph-v2";
import { IGraphMapping } from "../types/mapping";
import { flattenColumn } from "../d3-services/_helpers";

export default class StackedArea extends GraphControllerV2  {

    keys;
    labels;

    bottomAxis;
    leftAxis;

    chartStackedArea;

    stack;
    legend;

    constructor(
        public main: any,
        public data : any,
        public element : HTMLElement,
        public mapping: IGraphMapping,
        public segment: string  
    ){

        super(main,data,element,mapping,segment) 
        this.pre();
    }

    pre() {

        this._addScale('x','time','horizontal','_date');
        this._addScale('y','linear','vertical',flattenColumn(this.firstMapping.column));

        this._addAxis("x","x","bottom");
        this._addAxis("y","y","left");

        this._addMargin(60,100,0,0);
        this._addPadding(20,120,60,30);
    }

    init() {

        super._init();
        super._svg();

        this.config.paddingInner = 0;
        this.config.paddingOuter = 0;

        this.chartStackedArea = new ChartStackedArea(this);
        this.legend = new HtmlLegendDots(this);

        this.update(this.data,"all",false);
    }

    prepareData(data: DataPart[]) : GraphData {

        let history = parseHistoryForStackedArea(this.mapping, data);
        history = history.slice(1,history.length);

        this.keys = Object.keys(history[0]).filter(key => {
            return ['_date','gemeente','label','colour'].indexOf(key) < 0
        })

        this.stack = d3.stack()
            .keys(this.keys);

        return { 
            "history" : history,
            "latest" : null, 
            "slice" : history,
            "stacked": this.stack(history) // add keys and labels here ? 
        };

    }

    draw(data: GraphData) {

        this.xScale = this.scales.x.set(data.slice.map(d => d[this.parameters.x]));
        this.chartStackedArea.draw(data.stacked);
    }


    redraw(data: GraphData) {
        
        this.yScale = this.scales.y.set(Object.values(data.stacked[data.stacked.length - 1]).map( d => d[1]));

        super.redraw(data);

        this.chartStackedArea.redraw();
    }

    update(data: GraphData, segment: string, update: boolean) {
        super._update(data,segment,update);
    } 
}
