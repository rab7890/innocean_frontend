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
        custom_search: function (){                            // SearchField 눌렀을 때 발생하는 action
            console.log("aa");

        },


    });
});
