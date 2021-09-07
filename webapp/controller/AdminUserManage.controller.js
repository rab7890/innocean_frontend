sap.ui.define([
    "sap/ui/model/json/JSONModel", 
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
    "sap/ui/core/Fragment"
], function (JSONModel, Controller, Filter, Fragment) {
    "use strict";

    return Controller.extend("portal.controller.AdminUserManage", {

        onInit: function () {
            var oModel = new JSONModel(sap.ui.require.toUrl("portal/model/usermanage.json"));
            this.getView().setModel(oModel);

            this._bDescendingSort = false;
            this.oProductsTable = this.oView.byId("AdminUserManage");
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
        },
        
        
        managePress: function (oEvent) {
			var oButton = oEvent.getSource(),
				oView = this.getView();

			// create popover
			if (!this._pPopover) {
				this._pPopover = Fragment.load({
					id: oView.getId(),
					name: "portal.view.UserManagePopover",
					controller: this
				}).then(function(oPopover){
					oView.addDependent(oPopover);
					return oPopover;
				});
			}
			this._pPopover.then(function(oPopover){
				oPopover.openBy(oButton);
			});
        },
        
    });
});
