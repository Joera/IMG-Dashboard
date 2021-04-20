import {dashboardMeldingen} from "../chart-configs/dashboard-meldingen";
import {dashboardVoortgang} from "../chart-configs/dashboard-voortgang";
import {dashboardVergoedingen} from "../chart-configs/dashboard-vergoedingen";
import {dashboardSpecials} from "../chart-configs/dashboard-specials";
import {dashboardReacties} from "../chart-configs/dashboard-reacties";
import {dashboardOpnames} from "../chart-configs/dashboard-opnames";
import {dashboardWaardedalingsRegeling} from "../chart-configs/dashboard-waardedalingsregeling";
import {dashboardMain} from "../chart-configs/dashboard";
import {munis} from "../helpers/municipalities";

export default class DashboardParams {

    constructor() {

    }

    matchConfig(topic) {

        switch (topic) {

            case 'meldingen' :

                return dashboardMeldingen;

            case 'voortgang' :

                return dashboardVoortgang;

            case 'vergoedingen' :

                return dashboardVergoedingen;

            case 'specials' :

                return dashboardSpecials;

            case 'reacties' :

                return dashboardReacties;

            case 'opnames' :

                return dashboardOpnames;

            case 'waardedaling' :

                return dashboardWaardedalingsRegeling;

            default :

                return dashboardMain;
        }
    }

    read() {

        const params : any = this._getParams(window.location.href);
        let segment = 'all';
        // segment
        if (params.gemeente && params.gemeente !== undefined) {
            // check if is known gemeente

            if ( munis.map ( m => m.value ).indexOf(params.gemeente) > -1 ) {
                segment = params.gemeente;
            } else {
                console.log('gemeente onbekend');
            }
        }

        return { params, segment };
    }

    _getParams(url) {
        let params = {};
        const parser = document.createElement('a');
        parser.href = url;
        const query = parser.search.substring(1);
        const vars = query.split('&');
        for (let i = 0; i < vars.length; i++) {
            const pair = vars[i].split('=');
            params[pair[0]] = decodeURIComponent(pair[1]);
        }
        return params;
    };




}