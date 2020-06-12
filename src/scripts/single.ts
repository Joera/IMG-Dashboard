import { graphs } from './charts/module';
import { munis } from './helpers/municipalities';
import * as d3 from 'd3';
import {GraphObject} from "./types/graphObject";
import {ResponseData} from "./types/responseData";
import { configs } from "./chart-configs/module";

import { InitDashboard } from "./dashboard";

export class InitSingle {

    graphObjectArray : GraphObject[]  = [];
    graphMethods = {};
    dashBoardMap;
    dashBoardInfo;
    className : string = "img-custom-graph";

    constructor(){
    }

    init() {

        let self = this;

        let elements = document.getElementsByClassName(this.className);

        for (let el of elements) {

            this.graphObjectArray.push(configs.find( c => c.slug === el.getAttribute("data-img-graph-preset")));
        }

        this.htmlContainers();
        this.makeSingleCall('all',false);
    }

    htmlContainers() {

        document.getElementsByClassName(this.className)[0].innerHTML = '';

        for (var i = 0; i < this.graphObjectArray.length; i++) {

            for (let graph of this.graphObjectArray[i].mapping) {
                let container = document.createElement('div');
                container.classList.add('img_graph_container');
                container.style.flex = '1';
                document.querySelector('.' + this.className + ':nth-of-type(' + (i + 1) + ')').appendChild(container);
            }
        }
    }

    createDropdown(containerElement) {

        // let container = document.getElementsByClassName(this.className)[0];
        let dropdown = document.createElement('select');
        dropdown.classList.add('municipality_select');

        for ( let muni of munis) {

            let option = document.createElement('option');
            option.label = muni.label;
            option.value = muni.value;
            dropdown.appendChild(option);
        }

        containerElement.appendChild(dropdown);
    }

    makeSingleCall(segment,update) {

        let self = this;

        let uniqueEndpoints = [... Array.from(new Set(this.graphObjectArray.map( (o) => o.endpoint)))];

        for (let endpoint of uniqueEndpoints) {

            const graphObjectArray = this.graphObjectArray.filter( o => o.endpoint === endpoint);

            let url = (endpoint === '/api/gemeenten') ? 'https://tcmg-hub.publikaan.nl/api/gemeenten' : 'https://tcmg-hub.publikaan.nl' + (endpoint || '/api/data') + '?gemeente=' + segment;

            d3.json<ResponseData>(url)
                .then((data) => {

                    for (let graphObject of graphObjectArray) {

                        let containerElement = document.querySelector('.' + this.className + '[data-img-graph-preset="' + graphObject.slug + '"]');

                        for (var j = 0; j < Object.values(graphObject.mapping).length; j++) {

                            let map = {};
                            map[Object.entries(graphObject.mapping)[j][0]] = Object.entries(graphObject.mapping)[j][1];

                            // dit of met data
                            let element = containerElement.querySelector('.img_graph_container:nth-of-type(' + (j + 1) + ')');

                            if (update && endpoint === '/api/data') {

                                this.graphMethods[j].update(data);

                            } else if(!update) {

                                element.innerHTML = '';
                                this.graphMethods[j] = new graphs[graphObject.config.graphType](data, element, graphObject.config, Object.values(map)[0], graphObject.description, 'all');
                                this.graphMethods[j].init();
                            }
                        }

                        if (graphObject.config.extra && graphObject.config.extra.muniSelect) {

                            this.createDropdown(containerElement);
                            const municipalitySelect = document.querySelector('.municipality_select') as HTMLSelectElement;

                            municipalitySelect.addEventListener("change", function () {
                                self.makeSingleCall(municipalitySelect.options[municipalitySelect.selectedIndex].value, true);
                            });
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

            }
    }
}