"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const elements_1 = require("@local/elements");
const elements_2 = require("@local/elements");
const img_services_1 = require("@local/img-services");
const d3_graphs_1 = require("@local/d3_graphs");
const d3_services_1 = require("@local/d3-services");
class CijfersLine extends d3_graphs_1.GraphControllerV2 {
    constructor(main, data, element, mapping, segment) {
        super(main, data, element, mapping, segment);
        this.main = main;
        this.data = data;
        this.element = element;
        this.mapping = mapping;
        this.segment = segment;
        this.pre();
    }
    pre() {
        this._addScale("x", "time", "horizontal", "_date");
        this._addScale("y", "linear", "vertical", (0, d3_services_1.flattenColumn)(this.mapping.parameters[0][0].column));
        this._addPadding(0, 0, 0, 0);
        this._addMargin(0, 0, 10, 10);
    }
    init() {
        const _super = Object.create(null, {
            _init: { get: () => super._init },
            _svg: { get: () => super._svg }
        });
        return __awaiter(this, void 0, void 0, function* () {
            this.parentEl = this.element;
            this.parentEl.innerWidth = '400px';
            this.parentEl.innerHeight = 400;
            _super._init.call(this);
            this.chartLine = new elements_1.ChartRaggedLine(this);
            this.chartBackgroundAreas = new elements_1.ChartBackgroundAreas(this);
            this.chartWeekGrid = new elements_1.ChartGridWeek(this);
            this.chartAvgLine = new elements_1.ChartAvgLine(this);
            this.htmlCircle = new elements_2.HtmlCircle(this);
            this.htmlCircle.draw();
            const svgId = "svg-wrapper-" + this.mapping.slug;
            const container = this.main.window.document.createElement('section');
            container.style.height = "100px";
            container.style.width = "600px";
            container.style.marginBottom = '3rem';
            container.id = svgId;
            this.element.appendChild(container);
            _super._svg.call(this, container);
            if (this.data.map((i) => i[this.firstMapping['column']]).filter((i) => i !== null && i !== undefined).length > 2) {
                this.chartAvgLine.draw();
            }
            yield this.update(this.data, this.segment, false);
        });
    }
    prepareData(data) {
        const neededColumns = (0, img_services_1.getNeededColumnsForHistoryV2)(data, this.mapping);
        const history = (0, img_services_1.filterWeeks)(data, neededColumns);
        // this data merging .. has been skipped
        // console.log(neededColumns);
        return {
            "history": history,
            "latest": data[0],
            "slice": history.slice(0, 8),
        };
    }
    redraw(data) {
        const _super = Object.create(null, {
            redraw: { get: () => super.redraw }
        });
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.main.window.innerWidth);
            console.log(this.main.window.document);
            console.log(this.main.window.document.getElementsByTagName("html")[0].offsetWidth);
            console.log(this.main.window.document.querySelector("#kip").offsetWidth);
            yield _super.redraw.call(this, data);
            yield this.htmlCircle.redraw([data.latest], this.firstMapping['column']);
            if (this.data.map((i) => i[this.firstMapping['column']]).filter((i) => i !== null && i !== undefined).length > 2) {
                this.chartBackgroundAreas.redraw(data.slice, this.firstMapping['colour']);
                this.chartWeekGrid.redraw(data.slice, this.firstMapping['colour']);
                this.chartLine.redraw(data.slice, this.firstMapping['colour']);
                this.chartAvgLine.redraw(data);
            }
            return;
        });
    }
    draw(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.xScale = this.scales.x.set(data.slice.map(d => d[this.parameters.x]));
            let minValue = 0;
            this.yScale = this.scales.y.set(data.history.map(d => d[this.parameters.y]), minValue);
            if (data.slice.map((i) => i[this.firstMapping['column']]).filter((i) => i !== null && i !== undefined).length > 2) {
                this.chartBackgroundAreas.draw(data.slice);
                this.chartLine.draw(data.slice);
                this.chartWeekGrid.draw(data.slice);
            }
            if (this.popup !== undefined) {
                this.popup.attachData(data.latest);
            }
            return;
        });
    }
    update(data, segment, update) {
        const _super = Object.create(null, {
            _update: { get: () => super._update }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super._update.call(this, data, segment, update);
        });
    }
}
exports.default = CijfersLine;
