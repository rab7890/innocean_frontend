sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("portal.controller.tiles.adminGroup1", {

            onInit: function(){

            },

            press1: function () {
			    var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("AdminTileRole");               
            },

            press2: function () {
			    var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("AdminTileUser");               
            },

            press3: function () {
			    var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("AdminDailySite");               
            },

            press4: function () {
			    var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("AdminMobileAccess");               
            },

            press5: function () {
			    var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("AdminUserManage");               
            },

            press6: function () {
			    var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("AdminUseStatus");               
            }
        });
	});
