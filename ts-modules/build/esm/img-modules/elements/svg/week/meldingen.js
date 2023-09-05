import { thousands } from "@local/d3-services";
import colours from "@local/styleguide/_colours";
export class WeekMeldingenV1 {
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
            .style("fill", (d) => colours[d.colour][1]);
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
            .text((d) => thousands(d.value));
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