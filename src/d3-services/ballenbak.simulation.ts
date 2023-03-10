import * as d3 from "d3";
import { BaseType, SimulationLinkDatum, SimulationNodeDatum } from "d3";
import { Dimensions } from "../types/dimensions";

const forceStrength = 0.125;

export default class BallenbakSimulation {

    s: any;

    constructor(private ctrlr: any) {

        this.init()
    }

    init() {

        this.s = d3.forceSimulation();
        
        this.s
            .force('charge', d3.forceManyBody().strength(forceStrength))
            .force("center", d3.forceCenter())
            .force("collide", d3.forceCollide().strength(forceStrength))
         //   .force("forceX", d3.forceX().strength(forceStrength))    
    }

    supply(data: any, groupCount: number) {

        let self = this;
                    
        this.s   
            .nodes(data as SimulationNodeDatum[]);

        this.s    
            .force("collide")
                .strength(forceStrength)
                .radius((d : any) => self.ctrlr.scales.r.fn(d.value));
        // this.s 
        //     .force("forceX")
        //         .strength(forceStrength);

        this.s 
            .on("tick", (d: any) => {
                self.ctrlr.chartCircleGroups.forceDirect()
            }); 

            
        
    }

    restart() {

        // console.log("mo checks");
    
        this.s.alphaTarget(.3).restart;
    }

    redraw(groupCount: number) {

        let groupWidth = this.ctrlr.dimensions.width / groupCount;
        let center = {x: (groupWidth / 2) , y: ((this.ctrlr.dimensions.height / 2) + 20) };

        this.s 
            .force("center")
                .x(center.x)
                .y(center.y);
            
        this.s    
            .force("collide")
                .radius((d : any) => this.ctrlr.scales.r.fn(d.value));

        // this.s
        //     .force("forceX")
        //         .x(center.x);
        

        this.s.alphaTarget(.3).restart;
    }









}