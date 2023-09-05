"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeekMeldingenV1 = void 0;
const d3_services_1 = require("@local/d3-services");
const _colours_1 = __importDefault(require("@local/styleguide/_colours"));
class WeekMeldingenV1 {
    constructor(ctrlr) {
        this.ctrlr = ctrlr;
    }
    draw(data) {
        this.wrapper = this.ctrlr.svg.layers.data.selectAll('wrapper')
            .data(data)
            .join("g")
            .attr("class", "wrapper");
        this.circle = this.wrapper
            .append("circle")
            .style("fill", (d) => _colours_1.default[d.colour][1]);
        this.textWrapper = this.wrapper
            .append("g")
            .attr("class", "text-wrapper");
        this.total = this.textWrapper
            .append("text")
            .attr("class", "total")
            .attr("text-anchor", "end")
            .attr("y", -24)
            .style("font-family", "Replica")
            .style("font-size", "2rem")
            .text((d) => (0, d3_services_1.thousands)(d.value));
        this.descriptor = this.textWrapper
            .append("text")
            .attr("class", "descriptor")
            .attr("text-anchor", "end")
            .style("font-family", "NotoSans Regular")
            .style("font-size", "1rem")
            .attr("y", 0)
            .text((d) => d.units);
        this.delta = this.textWrapper
            .append("text")
            .attr("class", "delta")
            .attr("text-anchor", "end")
            .style("font-family", "NotoSans Regular")
            .style("font-size", "1rem")
            .attr("y", 24)
            .text((d) => d.delta);
    }
    redraw(data) {
        this.wrapper
            .attr("transform", (d, i) => {
            // minus radius
            const x = 0; // -this.ctrlr.scales.r.scale(d.value);
            // plus radius
            const y = this.ctrlr.dimensions.height / 2;
            return "translate(" + x + "," + y + ")";
        });
        this.circle
            .attr("r", (d, i) => {
            return this.ctrlr.scales.r.scale(d.value);
        });
        this.textWrapper
            .attr("transform", (d, i) => {
            // plus radius - somthng
            const x = this.ctrlr.scales.r.scale(d.value) + 80;
            const y = 0; // + radius? 
            return "translate(" + x + "," + y + ")";
        });
    }
}
exports.WeekMeldingenV1 = WeekMeldingenV1;