export const weekFs = [
    {
        "slug": "bol_schademeldingen",
        "graph": "CijfersLine",
        "args": [],
        "parameters": [
            [
                {
                    "label": "Nieuw binnen vorige week",
                    "column": "nieuw_schademeldingen",
                    "colour": "blue",
                    "units": "meldingen"
                },
                {
                    "label": "Schade-meldingen",
                    "column": "schademeldingen",
                    "colour": "blue"
                }
            ]
        ],
        "header": "",
        "description": "",
        "endpoint": "meldingen",
        "segment": "all",
        "elementClasslist": ['img-graph-container', 'img-graph-container-12']
    },
];
