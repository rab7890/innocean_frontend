sap.ui.define([
    "sap/ui/model/json/JSONModel", 
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter"
], function (JSONModel, Controller, Filter) {
    "use strict";

    return Controller.extend("portal.controller.AdminMobileAccess", {

        onInit: function () {
            var oModel = new JSONModel(sap.ui.require.toUrl("portal/model/mobile.json"));
            this.getView().setModel(oModel);

            this._bDescendingSort = false;
            this.oProductsTable = this.oView.byId("AdminMobileAccess");
        },

        onSearch: function (oEvent) {
            var oTableSearchState = [],
                sQuery = oEvent.getParameter("query");

            if (sQuery && sQuery.length > 0) {
                oTableSearchState = [new Filter("Title", FilterOperator.Contains, sQuery)];
            }

            this.oProductsTable.getBinding("items").filter(oTableSearchState, "Application");
        },

        
		onReset: function(oEvent) {
			// resetting the value of Combobox and initial state of the table
			var oBinding = this.oProductsTable.getBinding("items");
			oBinding.filter([]);
			this.oProductsTable.setShowOverlay(false);
			this.byId("oComboBox").setSelectedItem(null);
        },
        
		onSearch1: function(oEvent) {
			var comboBoxValue = this.byId("oComboBox").getValue(),
				oBinding = this.oProductsTable.getBinding("items"),
                oFilter;
			if (comboBoxValue || comboBoxValue === "") {
				oFilter = new Filter("Department", "EQ", comboBoxValue);
                oBinding.filter([oFilter]);
            }

                
		}
    });
});