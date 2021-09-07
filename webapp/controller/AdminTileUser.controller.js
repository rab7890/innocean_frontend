sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
	'sap/m/MessageBox',
	'sap/f/library'
], function (JSONModel, Controller, Filter, FilterOperator, Sorter, MessageBox, fioriLibrary) {
	"use strict";

	return Controller.extend("portal.controller.AdminTileUser", {
		onInit: function () {          
			var oModel = new JSONModel(sap.ui.require.toUrl("portal/model/tilerole.json"));
			this.getView().setModel(oModel);
        
			this._bDescendingSort = false;
			this.oProductsTable = this.oView.byId("noticelist");
		},

		onSearch: function (oEvent) {
			var oTableSearchState = [],
				sQuery = oEvent.getParameter("query");

			if (sQuery && sQuery.length > 0) {
				oTableSearchState = [new Filter("Name", FilterOperator.Contains, sQuery)];
			}

			this.oProductsTable.getBinding("items").filter(oTableSearchState, "Application");
		},


		onSort: function () {
			this._bDescendingSort = !this._bDescendingSort;
			var oBinding = this.oProductsTable.getBinding("items"),
				oSorter = new Sorter("Name", this._bDescendingSort);

			oBinding.sort(oSorter);
		},

/*		onListItemPress: function () {
			var oFCL = this.oView.getParent().getParent();
			oFCL.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);
		}*/
	});
});
