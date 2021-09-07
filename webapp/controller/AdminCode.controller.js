sap.ui.define(['sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel', 'sap/m/Menu', 'sap/m/MenuItem'],
	function(Controller, JSONModel, Menu, MenuItem) {
	"use strict";

	var PageController = Controller.extend("portal.controller.AdminCode", {
		onInit : function (evt) {
			// set explored app's demo model on this sample
			var oModel = new JSONModel(sap.ui.require.toUrl("portal/model/code.json"));
			this.getView().setModel(oModel);
		},

		onToggleContextMenu: function(oEvent) {
			if (oEvent.getParameter("pressed")) {
				this.byId("Tree").setContextMenu(new Menu({
					items: [
						new MenuItem({text: "{text}"})
					]
				}));
			} else {
				this.byId("Tree").destroyContextMenu();
			}
		}
	});

	return PageController;

});