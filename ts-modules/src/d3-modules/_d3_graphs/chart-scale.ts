import * as d3 from 'd3';
import { IGraphControllerV2, IScale } from '@local/d3_types';

enum RangeDataItem {
    string,
    number,
    Date 
}

type RangeData = RangeDataItem[];

export default class ChartScale {

    dataLength;
    scale;

    constructor(

        private ctrlr: IGraphControllerV2,
        private config : IScale,

    ) {
        this.dataLength = 0;
    }

    set(data: (string|number|any)[], minValue) {

        if(!this.config.type) return;

        let self = this;

        this.dataLength = data.length;

        switch(this.config.type) {

            case 'linear':

                this.scale = d3.scaleLinear()
                    .domain([
                        minValue || 0,  //
                        d3.max(data, (v) => (v ? v : 0) as number)
                    ]);
                break;

            case 'time':

                const dates: Date[] = [];
                for (const d of data) {
                    if (new Date(d)) {
                        dates.push(new Date(d))
                    }
                }

                this.scale = d3.scaleTime()
                    .domain([
                        d3.min(data),
                        d3.max(data),
                    ]);
                break;

            case 'band':

                this.scale = d3.scaleBand()
                    .domain(data)
                    .paddingInner(self.ctrlr.config.paddingInner || 0)
                    .paddingOuter(self.ctrlr.config.paddingOuter || 0)
                    .align(.5);

                break;


            case 'bandTime':

                this.scale = d3.scaleBand()
                    .domain(data)
                    .paddingInner(.2)
                    .paddingOuter(.5)
                    .align(.5)

                break;

            case 'radius':

                this.scale = d3.scalePow()
                    .domain([
                        d3.min(data),  //
                        d3.max(data)
                    ]).nice();

                break;

            case 'normalised':

                this.scale = d3.scaleLinear();

                break;
        }

        return this.scale;
    }


    reset() {

        if (!this.config.type) return;

        if(this.scale.domain().length < 2) {
            // console.log(this.config + this.scale.domain())
        }

        switch(this.config.direction) {

            case 'horizontal':

                this.scale
                    .range([0, this.ctrlr.dimensions.width]);

                break;

                case 'horizontal-reverse':

                    this.scale
                        .range([this.ctrlr.dimensions.width,0]);
    
                    break;

            case 'vertical-reverse':

                this.scale
                    .range([0,this.ctrlr.dimensions.height]);

                break;

            case 'vertical':
                this.scale
                    .range([this.ctrlr.dimensions.height, 0]);

                break;


            case 'radius':

                let langsteZijde = this.ctrlr.dimensions.width > this.ctrlr.dimensions.height ? this.ctrlr.dimensions.width : this.ctrlr.dimensions.height;

                this.scale
                    .range([this.ctrlr.config.extra.minRadius, (langsteZijde / this.dataLength) * this.ctrlr.config.extra.radiusFactor]);

                break;

            case 'opacity':

                this.scale
                    .range([0.2,1]);

                break;

            case 'flow':

                this.scale
                    .range([70,-70]);

            

        }

        return this.scale;
    }

    fn(x: any) {


        for(let p of this.scale.range()) {

            if(isNaN(p) || p == undefined) {

                // console.log(this.config.slug)
                // console.log(this.scale.range())
                throw new RangeError();
            }
        }

        let r = this.scale(x);

        if(isNaN(r)) {

            // console.log(this.config.slug + " : " + this.config.type)
            // console.log(x) 
            // console.log(this.scale.domain())
            // console.log(this.scale.range())

        } else {
            return r;
        }

       
    }

    domain() {

        return this.scale.domain();
    }

    range() {

        return this.scale.range();
    }

    bandwidth() {

        return this.scale.bandwidth();
    }
}