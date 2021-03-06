sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("portal.controller.Profile", {
		onInit: function () {  
            var oModel = new JSONModel(sap.ui.require.toUrl("portal/model/user.json"));
			this.getView().setModel(oModel);
        }
	});
});
