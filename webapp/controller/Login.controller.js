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


            var username = this.getView().byId("Input1").getValue();
            var password = this.getView().byId("Input2").getValue();
            console.log(username);
            console.log(password);
            var t_this = this;
             $.ajax(
            {
                async:false,
                url: "https://portal.innocean.com/api/account/login",
                data: {"username":username, "password":password  },
                method: "POST",
                dataType: "json"
            })
            .done(function(data)
            {
                 if(data.state==="0")
                 {
                        var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
                        var v = {"username":username, "token":data.token};
                        oStorage.put('auth', v);
                          var oRouter = t_this.getOwnerComponent().getRouter();
                            oRouter.navTo("Main");
                            oRouter.navTo("Anchor");
                 }
                 else
                 {
                        console.log("fail");
                 }


            })
            .fail(function(xhr, status, errorThrown) {
                        console.log(xhr.responseJSON);
                        alert(xhr.responseJSON.error);
            });






        }
        
    });
});
