import 'babel-polyfill';
import 'isomorphic-fetch';

import { InitDashboard } from "./dashboard";
import { InitTicker } from "./ticker";
import { InitSingle} from "./single";
import {configs} from "./chart-configs/module";

export class InitGraph {

    constructor(){

        this.addStylesheets();

            const graphElements = [].slice.call(document.querySelectorAll("[data-img-graph-preset]"));

            for (let el of graphElements) {

                const graph = el.getAttribute('data-img-graph-preset');

                switch (graph) {

                    case 'dashboard' :

                        this.dashboard();

                        break;

                    case 'ticker' :

                        this.ticker();

                        break;

                    default :

                        this.single();

                }
            }
    }

    single() {

        console.log('1');
        const single = new InitSingle();
        single.init();
    }

    dashboard() {
        const dashboard = new InitDashboard();
        dashboard.init();
    }

    ticker() {
        const ticker = new InitTicker();
        ticker.init();
    }

    addStylesheets() {

        const head  = document.getElementsByTagName('head')[0];
        const link  = document.createElement('link');
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://img.publikaan.nl/graphs/styles/main.css'; //; //  ; //  graphObject
        link.media = 'all';
        head.appendChild(link);
    }
}

new InitGraph();


window.addEventListener('graph_ready', function (e) {
    new InitGraph();
}, false);