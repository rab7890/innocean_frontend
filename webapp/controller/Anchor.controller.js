sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"],
/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("portal.controller.Anchor", {

        onInit: function () {



             var current = this;
             $.ajax(
            { url: "https://portal.innocean.com/api/portal/anchor/list",
            data: {  },
            method: "GET",
            dataType: "json"})
            .done(function(json)
            {

                  current.oModel = new JSONModel(json);
                  console.log(current.oModel)
            var oView = current.getView();
            oView.setModel(current.oModel, 'result');
            })
            .fail(function(xhr, status, errorThrown) {

            });

        },
        custom_search: function (){                            // SearchField 눌렀을 때 발생하는 action
            console.log("aa");
        },


    });
});
