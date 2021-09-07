sap.ui.define(['sap/uxap/BlockBase'], 
    
    function (BlockBase) {
    "use strict";

    var tiles = BlockBase.extend("portal.view.tiles", {
			metadata: {
				views: {
					Collapsed: {
						viewName: "portal.view.tiles",
						type: "XML"
					},
					Expanded: {
						viewName: "portal.view.tiles",
						type: "XML"
					}
				}
			}
        });
        
        return tiles;
    }
);
