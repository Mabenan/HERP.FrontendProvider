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
		},

		onItemSelect: function (oEvent) {
				var item = oEvent.getParameter('item');
				var key = item.getKey();
				this.oRouter.navTo(key, {});
		},
		onSideNavButtonPress: function () {
			var oToolPage = this.byId("toolPage");

			oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
		},
	});
});