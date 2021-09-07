sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/richtexteditor/RichTextEditor"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("portal.controller.AdminNotiRegiste", {
			onInit: function() {
			this.initRichTextEditor(false);
        },
        
		initRichTextEditor: function (EditorType) {
			var that = this,
				sHtmlValue = '<p s>'
                sap.ui.require(["sap/ui/richtexteditor/RichTextEditor", "sap/ui/richtexteditor/EditorType"],
				function (RTE, EditorType) {
					that.oRichTextEditor = new RTE("myRTE", {
						editorType: EditorType.TinyMCE4,
						width: "100%",
						height: "600px",
						customToolbar: true,
						showGroupFont: true,
						showGroupLink: true,
                        showGroupInsert: true,
                        showGroupTextAlign:true,
						value: sHtmlValue,
						ready: function () {
							this.addButtonGroup("styleselect").addButtonGroup("table");
						}
					});

					that.getView().byId("adminNotice").addContent(that.oRichTextEditor);
			});
		}

	});
});
