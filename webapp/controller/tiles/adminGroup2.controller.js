sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("portal.controller.tiles.adminGroup2", {

            onInit: function(){

            },

            press1: function () {
			    var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("AdminNotice");               
            },

            press3: function () {
			    var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("AdminAccessor");               
            },
            
            press4: function () {
			    var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("AdminMenu");               
            },
            
            press5: function () {
			    var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("AdminSystem");               
            },
            
            press6: function () {
			    var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("AdminBatch");               
            },
            
            press7: function () {
			    var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("AdminIp");               
            },
            
            press8: function () {
			    var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("AdminBatchList");               
            },
            
            press9: function () {
			    var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("AdminPopup");               
            },
            
            press10: function () {
			    var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("AdminLoginImage");               
            },
            
            press11: function () {
			    var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("AdminPage");               
            }
        });
	});
