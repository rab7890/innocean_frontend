sap.ui.define([
    "sap/ui/model/json/JSONModel", 
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter"
], function (JSONModel, Controller, Filter) {
    "use strict";

    return Controller.extend("portal.controller.AdminLoginImage", {

        onInit: function () {
            var oModel = new JSONModel(sap.ui.require.toUrl("portal/model/image.json"));
            this.getView().setModel(oModel);

            this._bDescendingSort = false;
            this.oProductsTable = this.oView.byId("MenuTable");
        },

		handleUploadComplete: function(oEvent) {
			var sResponse = oEvent.getParameter("response"),
				iHttpStatusCode = parseInt(/\d{3}/.exec(sResponse)[0]),
				sMessage;

			if (sResponse) {
				sMessage = iHttpStatusCode === 200 ? sResponse + " (Upload Success)" : sResponse + " (Upload Error)";
				MessageToast.show(sMessage);
			}
		},

		handleUploadPress: function() {
			var oFileUploader = this.byId("fileUploader");
			if (!oFileUploader.getValue()) {
				MessageToast.show("Choose a file first");
				return;
			}
			oFileUploader.checkFileReadable().then(function() {
				oFileUploader.upload();
			}, function(error) {
				MessageToast.show("The file cannot be read. It may have changed.");
			}).then(function() {
				oFileUploader.clear();
			});
		},

		handleTypeMissmatch: function(oEvent) {
			var aFileTypes = oEvent.getSource().getFileType();
			aFileTypes.map(function(sType) {
				return "*." + sType;
			});
			MessageToast.show("The file type *." + oEvent.getParameter("fileType") +
									" is not supported. Choose one of the following types: " +
									aFileTypes.join(", "));
		},

		handleValueChange: function(oEvent) {
			MessageToast.show("Press 'Upload File' to upload file '" +
									oEvent.getParameter("newValue") + "'");
		}

    });
});
