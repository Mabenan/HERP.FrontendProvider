sap.ui.define([
   "sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel"

], function (UIComponent, JSONModel) {
   "use strict";
   return UIComponent.extend("herp.appframework.Component", {
      metadata : {
            manifest: "json"
      },
      init : function () {
         // call the init function of the parent

         UIComponent.prototype.init.apply(this, arguments);
         
         var model = new JSONModel();
         this.setModel(model,"session");
			this.getRouter().initialize();
	}
   });
});