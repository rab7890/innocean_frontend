sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/m/MessageBox"
],
/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (Controller, JSONModel, MessageBox) {
    "use strict";

    return Controller.extend("portal.controller.Login", {

        onInit: function () {},

        onButtonPress: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("Main");
            oRouter.navTo("Anchor");
        }
        
    });
});
