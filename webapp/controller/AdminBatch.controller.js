sap.ui.define([
    "sap/ui/model/json/JSONModel", 
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter"
], function (JSONModel, Controller, Filter) {
    "use strict";

    return Controller.extend("portal.controller.AdminBatch", {

        onInit: function () {
            var oModel = new JSONModel(sap.ui.require.toUrl("portal/model/menu.json"));
            this.getView().setModel(oModel);

            this._bDescendingSort = false;
            this.oProductsTable = this.oView.byId("MenuTable");
        },


    });
});
