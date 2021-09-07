sap.ui.define([
	"sap/ui/Device",
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",   //Fragment, Popover, Button = Popover
	"sap/m/Popover",   
	"sap/m/Button",
    "sap/m/library",         //Popover, Button, library = toolbar
    "sap/ui/model/Filter",   //MessageToast, Filter = searchfield,
    "sap/m/Dialog",
    "sap/m/CheckBox",
    "sap/m/ButtonType",
    "sap/m/Text"             //Dialog, ButtonType, Text = Dialog
], 
    function (Device, Controller, JSONModel, MessageBox, Fragment, Popover, Button, library, Filter, Dialog, CheckBox, ButtonType, Text) {
    "use strict";
    
	var ButtonType = library.ButtonType,
        PlacementType = library.PlacementType;

	return Controller.extend("portal.controller.Main", {
        
		onInit: function () {

                   var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);

                       var auth =  oStorage.get('auth');
                       var token = auth.token;
                       console.log("token :" + token);

		        var current = this;
		        var o_view;
             $.ajax(
            {
            async:false,
            url: "https://portal.innocean.com/api/account/anchor/list",
            data: {  },
              beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", token);
        },
            method: "GET",
            dataType: "json"})
            .done(function(json)
            {
                  console.log(json)
                  current.oModel = new JSONModel(json);
                    var oView = current.getView();
                    oView.setModel(current.oModel);

            })
            .fail(function(xhr, status, errorThrown) {
                    console.log(xhr);
            });


            this.setToggleButtonTooltip(!Device.system.desktop);


			this.oSF = this.getView().byId("searchField");               // searchField는 Main.view의 search의 Id
        },

        onAfterRendering: function(oResponsivePaddingDialog){   //화면 랜더링 후 호출
           
            // if (!this.oResponsivePaddingDialog) {
			// 	this.oResponsivePaddingDialog = new Dialog({
			// 		title: "비밀번호 변경",
			// 		contentWidth: "400px",
			// 		contentHeight: "200px",
			// 		resizable: true,
			// 		draggable: true,
			// 		content: new Text({
			// 			text: "비밀번호를 변경하세요"
            //         }),                    
            //         content: new CheckBox({
            //             text: "하루 동안 다시 보지 않음"
            //         }),
			// 		endButton: new Button({
			// 			type: ButtonType.Emphasized,
			// 			text: "닫기",
			// 			press: function () {
			// 				this.oResponsivePaddingDialog.close();
			// 			}.bind(this)
            //         })
			// 	});
			// 	// Enable responsive padding by adding the appropriate classes to the control
			// 	this.oResponsivePaddingDialog.addStyleClass("sapUiResponsivePadding--content sapUiResponsivePadding--header sapUiResponsivePadding--footer sapUiResponsivePadding--subHeader");
			// 	//to get access to the controller's model
			// 	this.getView().addDependent(this.oResponsivePaddingDialog);
			// }
			// this.oResponsivePaddingDialog.open();
        },

		onSuggest: function (event) {                       // searchField에 걸려있는 filter -> searchField에 text입력시 filter를 걸어주는 이벤트
			var sValue = event.getParameter("suggestValue"),
				aFilters = [];
			if (sValue) {
				aFilters = [
					new Filter([
						new Filter("ProductId", function (sText) {
							return (sText || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
						}),
						new Filter("Name", function (sDes) {
							return (sDes || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
						})
					], false)
				];
			}

			this.oSF.getBinding("suggestionItems").filter(aFilters);
			this.oSF.suggest();
        },        
        

        onSearch: function (){                            // SearchField 눌렀을 때 발생하는 action


               sap.ui.controller("portal.controller.Anchor").custom_search();

        },       
        

		/*onItemSelect: function (oEvent) {               //sideNav Item을 눌렀을 때 발생하는 action
            var oItem = oEvent.getParameter("item");
			this.byId("pageContainer").to(this.getView().createId(oItem.getKey()));
        },*/

        onNotiButtonPress: function () {                  //header의 Notice버튼을 눌렀을 때 발생하는 action
            var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("Notice");
        },

        onFaqButtonPress: function () {                   //header의 Faq버튼을 눌렀을 때 발생하는 action
            var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("Faq");
        },

//프로필 icon 클릭 시 팝업화면   
        onUserNamePress: function (oEvent) {
			var oButton = oEvent.getSource(),
				oView = this.getView();

			// create popover
			if (!this._pPopover) {
				this._pPopover = Fragment.load({
					id: oView.getId(),
					name: "portal.view.UserPopover",
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
        
        onButton1: function () {                //header의 Profile버튼을 눌렀을 때 발생하는 action
            var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("Profile");
        },

        onButton2: function () {                //header의 Password버튼을 눌렀을 때 발생하는 action
            var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("Password");
        },

        onButton3: function () {                //header의 Profile버튼을 눌렀을 때 발생하는 action
            var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("Login");
        },
        
// SideNav Button 
		onSideNavButtonPress: function () {
            var oToolPage = this.byId("toolPage");                     //Main.view.xml에 전체 페이지 Id: toolPage 
			var bSideExpanded = oToolPage.getSideExpanded();            //버튼을 누르면 페이지 축소 확장

            this.setToggleButtonTooltip(bSideExpanded);
            
            oToolPage.setSideExpanded(!oToolPage.getSideExpanded());

        },

		setToggleButtonTooltip: function (bLarge) {                    //버튼을 누르면 Navigation 축소 확장
			var oToggleButton = this.byId('sideNavigationToggleButton');
			if (bLarge) {
				oToggleButton.setTooltip('Large Size Navigation');
			} else {
				oToggleButton.setTooltip('Small Size Navigation');
			}
        }    

	});
});