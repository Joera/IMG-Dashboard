import * as d3 from "d3";
import { ChartObjects, ChartSVG, ChartDimensions, ChartScale, ChartAxes} from "../chart-basics/module";

import { ChartCircles, ChartBrackets, ChartFlowBetweenCircles, ChartFlowDuration, HtmlLink } from "../chart-elements/module"

export class Flow {


    element;
    dimensions;
    svg;
    xScale;
    yScale;
    rScale;

    xAxis;

    chartDimensions;
    chartXScale;
    chartRScale;
    chartSVG;

    chartCircles;
    chartBrackets;
    chartFlowBetweenCircles;
    chartFlowDuration;

    link;

    simulation;

    constructor(
        private data,
        private elementID,
        private config,
        private dataMapping
    ) {
        this.element = d3.select(elementID).node();
    }

    init(){

        let self = this;

        let chartObjects = ChartObjects();
        this.config = Object.assign(this.config,chartObjects.config());

        this.dimensions = chartObjects.dimensions();
        this.svg = chartObjects.svg();

        this.chartDimensions = new ChartDimensions(this.element,this.config);
        this.dimensions = this.chartDimensions.get(this.dimensions);

        this.chartSVG = new ChartSVG(this.element,this.config,this.dimensions,this.svg);

        this.chartXScale = new ChartScale(this.config.xScaleType,this.config,this.dimensions);
        this.chartRScale = new ChartScale('radius', this.config, this.dimensions);


        // let chartYScale = ChartYScale(config,dimensions,yScale);
        this.xAxis = new ChartAxes(this.config, this.svg,'bottom',this.chartXScale);


        // kan ik circles hergebruiken?
        this.chartCircles = new ChartCircles(this.config,this.svg.layers);
        this.chartBrackets = new ChartBrackets(this.config,this.svg);
        this.chartFlowBetweenCircles = new ChartFlowBetweenCircles(this.config,this.svg.layers);
        this.chartFlowDuration = new ChartFlowDuration(this.config,this.svg.layers);

        this.xAxis.draw();

        // let { data } = this.prepareData();
        //
        // this.draw(data);
        // this.redraw(data);
        // this.legend(data,this.elementID);

        this.update(this.data)

        this.link = new HtmlLink(this.element,'doorlooptijden','');
    }

    prepareData(newData) {

        let data = [


            {
                label: 'Nieuwe meldingen',
                colour: "red",
                value: 0,
                duration: 28,
                turnover: 750,
                inflow: 750,
                cumulativeDuration: 0
            },
            {
                label: 'Ontvangst & Analyse',
                colour: "red",
                value: 2500,
                duration: 28,
                turnover: 650,
                inflow: 750,
                cumulativeDuration: 0
            },
            {
                label: 'Planning schade-opname',
                colour: "red",
                value: 2100,
                duration: 32,
                turnover: 480,
                inflow: 650,
                cumulativeDuration: 0
            },
            {
                label: 'Ingepland voor opname',
                colour: "green",
                value: 2230,
                duration: 28,
                turnover: 610,
                inflow: 610,
                cumulativeDuration: 0
            },
            {
                label: 'Opleveren rapport',
                colour: "green",
                value: 3750,
                duration: 30,
                turnover: 660,
                inflow: 610,
                cumulativeDuration: 0
            },
            {
                label: 'Rapport bij bewoner',
                colour: "red",
                value: 1320,
                duration: 30,
                turnover: 510,
                inflow: 660,
                cumulativeDuration: 0
            },
            {
                label: 'Voorbereiden besluit',
                colour: "green",
                value: 2300,
                duration: 28,
                turnover: 750,
                inflow: 510,
                cumulativeDuration: 0
            },
            {
                label: 'Afgerond',
                colour: "blue",
                value: 100,
                duration: 0,
                turnover: 0,
                inflow: 850,
                cumulativeDuration: 0
            }

        ]

        let sum = 0;

        for (let phase of data) {

            phase.cumulativeDuration = sum;
            sum += phase.duration;
        }

        return data;
    }


    draw(data) {

        let self = this;

        // eerst x as tekenen x scale = linear
        this.xScale = this.chartXScale.set(data.map( (d) => d[self.config.xParameter] + d['duration']).concat(0));
        this.rScale = this.chartRScale.set(data.map( (d) => d.value));

        this.simulation = d3.forceSimulation()
            .velocityDecay(0.25)
            .nodes(data);

        this.chartFlowBetweenCircles.draw(data);
        this.chartFlowDuration.draw(data);
        this.chartCircles.draw(data);
        this.chartBrackets.draw(data);

    }

    redraw(data) {

        let self = this;

        this.dimensions = this.chartDimensions.get(this.dimensions);
        this.chartSVG.redraw(this.dimensions);

        this.xScale = this.chartXScale.reset('horizontal',this.dimensions,this.xScale);
        this.rScale = this.chartRScale.reset('radius',this.dimensions,this.rScale)

      //  this.xAxis.redrawXLinearAxisBottom(this.xScale,this.dimensions);

        this.chartCircles.redraw(data,this.dimensions,this.rScale,this.xScale)
        this.chartBrackets.redraw(data,this.dimensions,this.rScale,this.xScale)
        this.chartFlowBetweenCircles.redraw(data,this.dimensions,this.rScale,this.xScale);
        this.chartFlowDuration.redraw(data,this.dimensions,this.rScale,this.xScale);

        let center = {x: (this.dimensions.width / 2) , y: ((this.dimensions.height / 2) - 40) };
        let forceStrength = 0.025;

        function ticked() {

            self.chartCircles.forceDirect(self.xScale, self.rScale, data);
            self.chartFlowBetweenCircles.forceDirect(self.xScale, self.rScale, data);
        }

        this.simulation
            .velocityDecay(0.5)
            // .force('y', d3.forceY().strength(forceStrength).y(center.y))
            .force('center', d3.forceCenter(center.x,center.y))
            //   .force('charge', d3.forceManyBody().strength(cluster))
            .force('collide', d3.forceCollide().radius((d : any) => this.rScale(d.value)))
            .force('y', d3.forceY().strength(forceStrength).y(center.y))
            .on('tick', ticked);

    }

    legend(data,elementID) {

            let self = this;

            let legendContainer = document.createElement("ul");
            legendContainer.classList.add("legend");
            legendContainer.style.display = 'flex';
            legendContainer.style.flexDirection = 'column';
            legendContainer.style.justifyContent = 'center';
            legendContainer.style.flexWrap =  'wrap';
            legendContainer.style.maxWidth = 'none';
            legendContainer.style.marginTop = '2rem';

            let li = document.createElement("li");
            li.classList.add("small-label");
            li.classList.add("large");
            li.innerText = "Het actuele aantal schademeldingen in de zes stappen in de procedure";

            let circle = document.createElement("span");
            circle.classList.add("circle");
            circle.classList.add("orange");
            li.prepend(circle);

            legendContainer.appendChild(li);

            li = document.createElement("li");
            li.classList.add("small-label");
            li.innerHTML = "Het aantal dossiers dat in de afgelopen week naar de volgende stap is gegaan. <a onclick='toggleDurations(this)'> Klik hier voor de absolute getallen</a>.";
            li.classList.add("large");

            let tween = document.createElement("span");
            tween.classList.add("tween");
            tween.classList.add("light-grey");

            li.prepend(tween);
            legendContainer.appendChild(li);

            this.element.appendChild(legendContainer);
    }

    update(newData) {

        let self = this;
        let data = this.prepareData(newData);
        this.draw(data);
        this.redraw(data);
        window.addEventListener("resize", () => self.redraw(data), false);
    }
}

function toggleDurations(el) {

    el.parentNode.parentNode.parentNode.querySelector('.data').classList.toggle('showturnover')
}