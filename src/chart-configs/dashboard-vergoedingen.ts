import { GraphObject} from '../types/graphObject';

export const dashboardVergoedingen : GraphObject[] = [
    {
        "label": "Taart Schadevergoedingen",
        "slug": "taart_schadevergoeding_totaal",
        "mapping":  [
            [
                {
                    "label": "Mijnbouwschade",
                    "column": "fysieke_schade_schadebedrag",
                    "colour": "brown"
                },
                {
                    "label": "Stuwmeerregeling",
                    "column": "fysieke_schade_stuwmeerregeling_bedrag",
                    "colour": "blue"
                },
                {
                    "label": "Bijkomende kosten",
                    "column": "fysieke_schade_bijkomende_kosten_bedrag",
                    "colour": "moss"
                },
                {
                    "label": "Wettelijke rente",
                    "column": "fysieke_schade_wettelijke_rente_bedrag",
                    "colour": "orange"
                }
            ],
            [
                {
                    "label": "Totaal",
                    "column": "fysieke_schade_totaal_verleend",
                    "colour": "gray"
                }
            ]
        ],
        "config": {

            "graphType": "PieChartSum",
            "xScaleType" : false,
            "yScaleType" : false,
            "xParameter" : false,
            "yParameter" : false,
            "padding": {
                "top": 0,
                "bottom": 0,
                "left": 0,
                "right": 0
            },
            "margin": {
                "top": 0,
                "bottom": 0,
                "left": 0,
                "right": 0
            },
            "extra" :{
                "currencyLabels" : true,
                "legendWidth" : 220,
                "maxRadius" : 100,
                "innerRadius" : 20,
                "header" : "Vergoedingen fysieke schade",
                "segmentIndicator": true,
            }
        },
        "description" : "De diverse soorten schadevergoedingen die het IMG toekent uitgesplitst en als totaal opgeteld. De Stuwmeerregeling is afgelopen. Maar voor enkele van die dossiers worden nog vergoedingen toegekend omdat deze op basis van facturen van aannemers worden     kend.",
        "endpoint": "vergoedingen",
        "segment": "all",
        "elementClasslist": ['img-graph-container','img-graph-container-6','img-graph-container-vertical-padding']

    },
    {
        "label": "Afgewezen",
        "slug": "vergoedingen_taart_afgewezen",
        "mapping":  [
            [
                {
                    "label": "Besluiten met afwijzing",
                    "column": "fysieke_schade_afgewezen_meldingen",
                    "colour": "orange"
                },
                {
                    "label": "Besluiten met toekenning",
                    "column": "fysieke_schade_toegewezen_besluiten",
                    "colour": "blue"
                }
            ]
        ],
        "config": {

            "graphType": "PieChartSum",
            "xScaleType" : false,
            "yScaleType" : false,
            "xParameter" : false,
            "yParameter" : false,
            "padding": {
                "top": 0,
                "bottom": 0,
                "left": 0,
                "right": 0
            },
            "margin": {
                "top": 0,
                "bottom": 40,
                "left": 0,
                "right": 0
            },
            "extra" :{
                "currencyLabels" : false,
                "legendWidth" : 240,
                "maxRadius" : 100,
                "innerRadius" : 20,
                "header" : "Afwijzingen t.o.v. toegekende besluiten",
                "segmentIndicator": true,
                "municipalitySelect": true,
            }
        },
        "description" : "De verhouding tussen besluiten met toekenning en besluiten met een afwijzing",
        "endpoint": "vergoedingen?limit=60",
        "segment": false,
        "elementClasslist": ['img-graph-container','img-graph-container-6','img-graph-container-vertical-padding']
    },

  
    {   "label": "Gemiddeld schadebedrag",
    "slug": "meldingen_trend_schademeldingen",
    "mapping": [
        [
            {
                "label": "Percentage toegewezen",
                "column": "fysieke_schade_week_percentage_toegewezen_besluiten",
                "colour": "lightBlue",
                "short": "toegewezen"
            }
        ]
    ],
    "config": {
        "graphType": "TrendLine",
        "xScaleType": "time",
        "yScaleType": "linear",
        "xParameter": "_date",
        "yParameter": "schademeldingen",
        "padding": {
            "top": 20,
            "bottom": 80,
            "left": 40,
            "right": 0
        },
        "margin": {
            "top": 80,
            "bottom": 120,
            "left": 0,
            "right": 0
        },
        "extra": {
            "startDate" : '2019-10-01',
            "xScaleTicks": "quarterly",
            // "minValue" : 50,
            "useLineFill": true,
            "header" : "Trend percentage toegewezen besluiten",
            "legend" : false,
            "hasFocus": true,
            "percentage" : true,
            

        }
    },
    "description" : "De ontwikkeling van het gemiddelde bedrag aan schadevergoeding per besluit door de tijd heen.",
    "endpoint": "vergoedingen",
    "segment": "all",
    "elementClasslist": ['img-graph-container','img-graph-container-6','img-graph-container-trendline','img-graph-container-vertical-padding']
},
{   "label": "Gemiddeld schadebedrag",
    "slug": "meldingen_trend_schademeldingen",
    "mapping": [
        [
            {
                "label": "Gemiddeld schadebedrag",
                "column": "fysieke_schade_gemiddeld_schadebedrag",
                "colour": "orange",
                "short": "gem"
            }
        ]
    ],
    "config": {
        "graphType": "TrendLine",
        "xScaleType": "time",
        "yScaleType": "linear",
        "xParameter": "_date",
        "yParameter": "nieuw_schademeldingen",
        "padding": {
            "top": 20,
            "bottom": 80,
            "left": 40,
            "right": 0
        },
        "margin": {
            "top": 80,
            "bottom": 120,
            "left": 0,
            "right": 0
        },
        "extra": {
            "startDate" : '2019-10-01',
            "xScaleTicks": "quarterly",
            "useLineFill": true,
            "header" : "Trend gemiddeld schadebedrag",
            "legend" : false,
            "hasFocus": true,
            "currencyLabels" : true,

        }
    },
    "description" : "De ontwikkeling van het gemiddelde bedrag aan schadevergoeding per besluit door de tijd heen.",
    "endpoint": "vergoedingen",
    "segment": "all",
    "elementClasslist": ['img-graph-container','img-graph-container-6','img-graph-container-trendline','img-graph-container-vertical-padding']
},
    {
        "label" : "Schadevergoedingen",
        "slug" : "specials_bandbars_statussen",
        "mapping": [
            [
                {
                    label: "< €1K",
                    column: "fysieke_schade_vergoedingen_lager_dan_1000",
                    colour: 'lightBlue'
                },
                {
                    label : "€1K t/m €4K",
                    column : "fysieke_schade_vergoedingen_tussen_1000_en_4000",
                    colour :'orange'
                },
                {
                    label : "€4K t/m €10K",
                    column : "fysieke_schade_vergoedingen_tussen_4000_en_10000",
                    colour: 'moss'
                },
                {
                    label : "> €10K",
                    column : "fysieke_schade_vergoedingen_hoger_dan_10000",
                    colour: 'brown'
                }
            ]
        ],
        "config": {
            "graphType": "BandBars",
            "xScaleType" : 'band',
            "yScaleType" : 'linear',
            "xParameter" : 'label',
            "yParameter" : "value",
            "padding": {
                "top": 20,
                "bottom": 40,
                "left": 0,
                "right": 0
            },
            "margin": {
                "top": 0,
                "bottom": 200,
                "left": 0,
                "right": 0
            },
            "extra" : {
                "currencyLabels" : false,
                "privacySensitive" : true,
                "paddingInner" : .1,
                "paddingOuter" : .1,
                "municipalitySelect": true,
                "alternateTicks" : false,
                "header" : "Ordegrootte van schadevergoedingen",
                "largeHeader" : false,
            }
        },
        "description" : "Het aantal besluiten onderverdeeld naar omvang van de toegekende schadevergoeding in het besluit.",
        "endpoint": "vergoedingen?limit=60",  // ivm in-graph gemeentekiezer
        "segment": false,
        "elementClasslist": ['img-graph-container','img-graph-container-6','img-graph-container-vertical-padding','img-grap-container-medium-high']
    },
    {
        "label" : "Kaart totaal verleend",
        "slug" : "vergoedingen_kaart_totaal_verleend",
        "mapping": [
            [
                {
                    "label": "Specials",
                    "column": "fysieke_schade_totaal_verleend",
                    "colour": "moss"
                }
            ]
        ],
        "config": {
            "graphType": "Map",
            "xScaleType" : false,
            "yScaleType" : false,
            "xParameter" : false,
            "yParameter" : false,
            "padding": {
                "top": 0,
                "bottom": 20,
                "left": 0,
                "right": 0
            },
            "margin": {
                "top": 0,
                "bottom":20,
                "left": 0,
                "right": 0
            },
            "extra" : {
                "legendWidth" : 240,
                "currencyLabels" : true,
                "header" : "Totaal schadevergoedingen per gemeente"
            }
        },
        "description" : "De totale schadevergoeding die voor alle afgehandelde schademeldingen in een gemeente is toegekend.",
        "endpoint": "vergoedingen?limit=60",
        "segment": false,
        "publishDate": false,
        "elementClasslist": ['img-graph-container','img-graph-container-6','img-graph-container-map','img-graph-container-vertical-padding']
    },
    
   
    {
        "label" : "Spreiding percentage toegewezen besluiten",
        "slug" : "vergoedingen_kaart_percentage_afwijzingen",
        "mapping": [
            [
                {
                    "label": "Percentage afwijzingen",
                    "column": "fysieke_schade_percentage_toegewezen_besluiten",
                    "colour": "lightBlue"
                }
            ]
        ],
        "config": {
            "graphType": "Map",
            "xScaleType" : false,
            "yScaleType" : false,
            "xParameter" : false,
            "yParameter" : false,
            "padding": {
                "top": 0,
                "bottom": 0,
                "left": 0,
                "right": 0
            },
            "margin": {
                "top": 0,
                "bottom":0,
                "left": 0,
                "right": 0
            },
            "extra" : {
                "legendWidth" : 240,
                "currencyLabels" : false,
                "percentage": true,
                "header" : "Spreiding van het percentage toegewezen besluiten "
            }
        },
        "description" : "",
        "endpoint": "vergoedingen?limit=60",
        "segment": false,
        "publishDate": false,
        "elementClasslist": ['img-graph-container','img-graph-container-6','img-graph-container-map']
    },
    {
        "label": "Spreiding gemiddeld uitbetaald bedrag",
        "slug": "vergoedingen_kaart_gemiddeld_uitbetaald",
        "mapping": [
            [
                {
                    "label": "Percentage afwijzingen",
                    "column": "fysieke_schade_gemiddeld_schadebedrag_sinds_start",
                    "colour": "orange"
                }
            ]
        ],
        "config": {
            "graphType": "Map",
            "xScaleType": false,
            "yScaleType": false,
            "xParameter": false,
            "yParameter": false,
            "padding": {
                "top": 0,
                "bottom": 0,
                "left": 0,
                "right": 0
            },
            "margin": {
                "top": 0,
                "bottom": 0,
                "left": 0,
                "right": 0
            },
            "extra": {
                "legendWidth": 240,
                "currencyLabels" : true,
                "percentage": false,
                "header" : "Spreiding van het gemiddeld uitgekeerd schadebedrag"
            }
        },
        "description": "",
        "endpoint": "vergoedingen?limit=60",
        "segment": false,
        "publishDate": false,
        "elementClasslist": ['img-graph-container', 'img-graph-container-6', 'img-graph-container-map']
    }
]
