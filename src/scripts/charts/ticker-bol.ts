import { ChartObjects, ChartSVG, ChartDimensions, ChartScale, ChartAxes } from '../chart-basics/module';

import { ChartAvgLine, ChartBackgroundArea, ChartRaggedLine, ChartWeekGrid, HtmlCircle, HtmlHeader, HtmlLink, HtmlPopup, HtmlSegment } from '../chart-elements/module';
import * as d3 from "d3";
import { breakpoints } from "../_styleguide/_breakpoints";
import {colours} from "../_styleguide/_colours";
import {thousands} from "../helpers/_helpers";

export class TickerBol  {

    element;
    yParameter;
    dimensions;
    svg;
    yScale;
    xScale;
    bottomAxis;
    leftAxis;

    chartDimensions;
    chartSVG;
    chartXScale;
    chartYScale;
    chartAxes;

    chartLine;
    chartBackgroundArea;
    chartWeekGrid;
    chartAvgLine;
    htmlHeader;
    htmlCircle;
    htmlSegment;

    link;
    popup;

    constructor(

        private data : any,
        private elementID : string,
        private config : any,
        private dataMapping : [any],
        private description,
        private segment
    ){

        this.element = d3.select(this.elementID).node();
        this.yParameter = this.dataMapping[0].column;
        this.config.yParameter = this.dataMapping[0].column;
    }

    init() {

        let self = this;

        this.element.style.display = 'flex';
        this.element.style.flexDirection = 'row';
        this.element.style.flexWrap = 'wrap';
        this.element.style.flexDirection = 'column-reverse';
        this.element.style.justifyContent = 'space-between';


        if (window.innerWidth < breakpoints.sm) {

            this.element.style.width = '100%';
            this.element.style.margin = '1.5rem auto';
        //    this.element.style.height = '9.5rem';

        } else if  (window.innerWidth < breakpoints.md){

            this.element.style.flex = '0 0 30%';
            this.element.style.margin = '2rem auto 0 auto';
            this.element.style.height = '100%';

        } else {

            this.element.style.flexWrap = 'nowrap';
            this.element.style.flex = '0 0 25%';
            this.element.style.height = '100%';
        }


        const labelContainer = document.createElement('div');
        // labelContainer.classList.add('label_container');
        labelContainer.style.width = '100%';

        labelContainer.style.textAlign = 'center';
        labelContainer.innerText = this.dataMapping[0].label;
        this.element.appendChild(labelContainer);

        if (window.innerWidth < breakpoints.sm) {

            labelContainer.style.height = '2rem';

        } else if (window.innerWidth < breakpoints.md) {

            labelContainer.style.height = '1.5rem';

        } else {

            labelContainer.style.height = '2.5rem';
        }


        // const numberContainer = document.createElement('div');
        // numberContainer.style.width = 'calc(50% - .5rem)';
        // numberContainer.style.height = '3.75rem';
        // numberContainer.style.display = 'flex';
        // numberContainer.style.flexDirection = 'column';
        // numberContainer.style.alignItems = 'flex-end';
        //
        // const number = document.createElement('div');
        // number.innerText = this.data[0][this.dataMapping[0].column];
        // number.style.fontSize = '3rem';
        // number.style.lineHeight = ".9";
        // number.style.fontFamily = "Replica";
        // numberContainer.appendChild(number);

        // const units = document.createElement('div');
        // units.innerText = this.config.extra.units
        // numberContainer.appendChild(units);
        //
        // this.element.appendChild(numberContainer);


        // let graphWith;
        // if (window.innerWidth < breakpoints.md ) { graphWith = 'calc(50% - 1rem)' } else
        // if (window.innerWidth < breakpoints.lg ) { graphWith = '100px' } else
        // { graphWith = '130px'  }
        //
        // const graphContainer = document.createElement('div');
        // graphContainer.style.width = graphWith;
        // graphContainer.style.height = '4rem';
        // this.element.appendChild(graphContainer);

        // let chartObjects = ChartObjects();
        // this.config = Object.assign(chartObjects.config(),this.config);
        // this.dimensions = chartObjects.dimensions();
        // this.svg = chartObjects.svg();
        //
        // this.config.paddingInner = 0;
        // this.config.paddingOuter = 0;
        //
        // // get dimensions from parent element
        // this.chartDimensions = new ChartDimensions(graphContainer, this.config);
        // this.dimensions = this.chartDimensions.get(this.dimensions);
        //
        // // create svg elements without data
        // this.chartSVG = new ChartSVG(graphContainer, this.config, this.dimensions, this.svg);
        // this.chartXScale = new ChartScale(this.config.xScaleType, this.config, this.dimensions);
        // this.chartYScale = new ChartScale(this.config.yScaleType, this.config, this.dimensions);
        // this.bottomAxis = new ChartAxes(this.config, this.svg, 'bottom',this.chartXScale);
        // this.leftAxis = new ChartAxes(this.config, this.svg,'left',this.chartYScale);
     //   this.chartLine = new ChartRaggedLine(this.config, this.svg);
      //  this.chartBackgroundArea = new ChartBackgroundArea(this.config, this.svg, false, false);
        // this.chartWeekGrid = new ChartWeekGrid(this.config, this.svg);
        // this.chartAvgLine = new ChartAvgLine(this.config, this.svg);
        // this.htmlHeader = new HtmlHeader(this.element,this.dataMapping[0].label);
    //    this.htmlSegment = new HtmlSegment(this.element);




        // this.bottomAxis.draw();
        // this.leftAxis.draw();
       // this.htmlCircle.draw();
        // this.htmlHeader.draw();
        // this.chartAvgLine.draw();
        // this.link = new HtmlLink(this.element,this.config.extra.link,'');

        //
        // this.popup = new HtmlPopup(this.element,this.description);

        self.update(this.data,this.segment);

    }

    prepareData(newData)  {

        let neededColumns = ['_date','_category'].concat(this.dataMapping.map( (c) => c.column ));

        let data = [];
        let hasEnoughData;

        for (let week of newData.slice(0,8)) {

            hasEnoughData = true;

            let clearWeek = {};

            for (let column of neededColumns) {

                if (week[column] !== null) {
                    clearWeek[column] = week[column]
                } else {
                    hasEnoughData = false;
                }
            }

            if (hasEnoughData) {
                data.push(clearWeek);
            }
        }

        return data;
    }

    redraw(data) {

        // this.yScale = this.chartYScale.set(data.map( d => d[this.yParameter]));
        //
        // // on redraw chart gets new dimensions
        // this.dimensions = this.chartDimensions.get(this.dimensions);
        //
        // this.chartSVG.redraw(this.dimensions);
        // // new dimensions mean new scales
        // this.xScale = this.chartXScale.reset('horizontal', this.dimensions, this.xScale);
        // this.yScale = this.chartYScale.reset('vertical', this.dimensions, this.yScale);

        let value =  (this.config.extra.decimal) ? data[0][this.yParameter ] : Math.round(data[0][this.yParameter ]);
        this.element.querySelector('.number').innerText = (value > 9999) ? thousands(value) : value;
     //   this.chartBackgroundArea.redraw(this.xScale, this.yScale, this.dimensions, data, this.dataMapping[0].colour, this.config.xParameter, this.yParameter);
        // this.chartWeekGrid.redraw(this.xScale, this.yScale, this.dimensions, data, this.dataMapping[0].colour, this.yParameter);
    //    this.chartLine.redraw(this.xScale,this.yScale,this.dimensions,data,this.dataMapping[0].colour,this.config.xParameter, this.yParameter);
      //  this.chartAvgLine.redraw(this.xScale,this.yScale,this.dimensions,data,this.dataMapping[0].colour,this.yParameter);
    }

    draw(data) {

        // this.xScale = this.chartXScale.set(data.map(d => d[this.config.xParameter]));

        let miniContainer = document.createElement('div');
        miniContainer.style.display ='flex';
        miniContainer.style.flexDirection = 'column';
        // miniContainer.style.justifyContent = 'center';
        miniContainer.style.alignItems = 'center';

        let div = document.createElement('div');
        div.classList.add('number_circle');
        div.style.backgroundColor =  colours[this.dataMapping[0].colour][1];
        div.style.border = '1px solid ' + colours[this.dataMapping[0].colour][0];
        div.style.borderRadius = '50%';
        div.style.display =  'flex';
        div.style.position = 'relative';
        div.style.flexDirection = 'column';
        div.style.justifyContent = 'center';
        div.style.alignItems = 'center';
        div.style.width = (this.config.extra.circleRadius) ? this.config.extra.circleRadius.toString() + 'rem' : '7.5rem';
        div.style.height = (this.config.extra.circleRadius) ? this.config.extra.circleRadius.toString() + 'rem' : '7.5rem';

        // div.style.marginBottom = '1rem';

        let number = document.createElement('span');
        number.classList.add('number');
        number.style.fontSize = '2.25rem';
        number.style.lineHeight = "1";
        number.style.color = 'black';
        number.style.fontFamily = "Replica";

        // number.innerText = data[0][this.property];
        div.appendChild(number);
      //  this.chartBackgroundArea.draw(data);
     //   this.chartLine.draw(data);
        // this.chartWeekGrid.draw(data);

        miniContainer.appendChild(div);

        this.element.insertBefore(miniContainer,this.element.childNodes[0])

    }

    average(data) {

        return (data.reduce((a,b) => { return a + parseInt(b[this.yParameter]); },0)) / (data.length);
    }

    update(newData,segment) {

        let self = this;

        let data = self.prepareData(newData);
        self.draw(data);
        self.redraw(data);
        window.addEventListener("resize", () => self.redraw(data), false);

        // if(this.config.extra.segmentIndicator) {
        //     this.htmlSegment.draw(segment);
        // }
    }


    createLink(label) {



    }
}