sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    ],
/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (Controller, JSONModel, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("portal.controller.Anchor", {

        onInit: function (t) {

            console.log(t)
            var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);

                       var auth =  oStorage.get('auth');
                       var token = auth.token;
                       console.log("token :" + token);

             var current = this;
             $.ajax(
            {
            async:false,
            url: "https://portal.innocean.com/api/account/anchor/list",
            data: {  },
            beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization",token);
        },
            method: "GET",
            dataType: "json"})
            .done(function(json)
            {
                    console.log(json);
                  current.oModel = new JSONModel(json);

            var oView = current.getView();
            oView.setModel(current.oModel, 'result');
            })
            .fail(function(xhr, status, errorThrown) {
                console.log(xhr);
            });

        },
        search: function (oEvent){                            // SearchField 눌렀을 때 발생하는 action

                // token from storage
               var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);

               var auth =  oStorage.get('auth');
               var token = auth.token;


             var sQuery = oEvent.getSource().getValue();

             var current = this;
             var con = sap.ui.controller("portal.controller.Anchor")
             var oView = sap.ui.getCore().byId('Anchor');



             $.ajax(
            {
                    async:false,
                    url: "https://portal.innocean.com/api/account/anchor/search",
                    data: {"search":sQuery},
                    beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization",token);
                },
            method: "GET",
            dataType: "json"})
            .done(function(json)
            {
                console.log(json)
                var oModel = new JSONModel(json);
                view.setModel(oModel, 'result');
                //oView.setModel(current.oModel, 'result');

            })
            .fail(function(xhr, status, errorThrown) {
                console.log(xhr);
            });


        },


    });
});
