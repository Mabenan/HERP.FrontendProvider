sap.ui.define([
	"sap/ui/Device",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/Popover",
	"sap/m/Button",
	"sap/m/library"
], function (Device, Controller, JSONModel, Popover, Button, library) {
	"use strict";

	return Controller.extend("herp.appframework.controller.App", {

		onInit: function () {
				this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				this.username = new sap.m.Input({
					
				})
				this.password = new sap.m.Input({
					
				})
				this.loginDialog = new sap.m.Dialog({
					content:[this.username, this.password],

					beginButton: new sap.m.Button({
						type: sap.m.ButtonType.Emphasized,
						text: "OK",
						press: function () {
							this.loginDialog.close();
							this.login();
						}.bind(this)
					}),
					endButton: new sap.m.Button({
						text: "Close",
						press: function () {
							this.loginDialog.close();
						}.bind(this)
					})
				});
		},

		onItemSelect: function (oEvent) {
				var item = oEvent.getParameter('item');
				var key = item.getKey();
				this.oRouter.navTo(key, {});
		},
		handleLoginPress: function(oEvent){
			this.loginDialog.open();
		},
		login: function(oEvent){
			$.ajax({
				type: "POST",
				url: "/api/login",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify({
					user: this.username.getValue(),
					password: this.password.getValue()
				}),
				dataType: "json",
				processData: false,
				success: function (result) {
					// process result
					sap.ui.getCore().getModel().setHeaders({
						"auth_guid" : result.auth_guid
					});
				},
				error: function (e) {
					 // log error in browser
					console.log(e.message);
				}
			})
		},
		onSideNavButtonPress: function () {
			var oToolPage = this.byId("toolPage");

			oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
		},
	});
});