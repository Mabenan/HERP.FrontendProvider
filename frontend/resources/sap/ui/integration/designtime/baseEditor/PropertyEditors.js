/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/integration/designtime/baseEditor/util/findClosestInstance","sap/ui/integration/designtime/baseEditor/util/createPromise"],function(C,f,c){"use strict";var a="config";var b="tags";var P=C.extend("sap.ui.integration.designtime.baseEditor.PropertyEditors",{metadata:{properties:{tags:{type:"any"},renderLabels:{type:"boolean"},config:{type:"array"}},aggregations:{propertyEditors:{type:"sap.ui.integration.designtime.baseEditor.propertyEditor.BasePropertyEditor",visibility:"hidden"}},associations:{editor:{type:"sap.ui.integration.designtime.baseEditor.BaseEditor",multiple:false}},events:{editorChange:{parameters:{previousEditor:{type:"sap.ui.integration.designtime.baseEditor.BaseEditor"},editor:{type:"sap.ui.integration.designtime.baseEditor.BaseEditor"}}},propertyEditorsChange:{parameters:{previousPropertyEditors:{type:"sap.ui.integration.designtime.baseEditor.propertyEditor.BasePropertyEditor"},propertyEditors:{type:"sap.ui.integration.designtime.baseEditor.propertyEditor.BasePropertyEditor"}}},configChange:{parameters:{previousConfig:{type:"array"},config:{type:"array"}}},tagsChange:{parameters:{previousTags:{type:"string"},tags:{type:"string"}}}}},_bEditorAutoDetect:false,_sCreatedBy:null,constructor:function(){C.prototype.constructor.apply(this,arguments);if(!this.getEditor()){this._bEditorAutoDetect=true;}this._propagationListener=this._propagationListener.bind(this);this.attachEditorChange(function(){if(this._sCreatedBy){this._removePropertyEditors();}this._initPropertyEditors();});this.attachConfigChange(function(e){var p=e.getParameter("previousConfig");var d=e.getParameter("config");if(this._fnCancelInit||this._sCreatedBy===b||!Array.isArray(p)||!Array.isArray(d)||p.length!==d.length){this._removePropertyEditors();this._initPropertyEditors();}else if(this._sCreatedBy){var g=this.getAggregation("propertyEditors");d.forEach(function(m,i){g[i].setConfig(m);});}});this.attachTagsChange(function(){if(this._sCreatedBy===b){this._removePropertyEditors();}if(this._sCreatedBy!==a){this._initPropertyEditors();}});this._initPropertyEditors();},renderer:function(r,o){var p=o.getAggregation("propertyEditors");r.openStart("div",o);r.openEnd();if(Array.isArray(p)){p.forEach(function(d){r.renderControl(d);});}r.close("div");}});P.prototype.getEditor=function(){return sap.ui.getCore().byId(this.getAssociation("editor"));};P.prototype.setConfig=function(m){var p=this.getConfig();if(p!==m&&(!Array.isArray(p)||!Array.isArray(m)||JSON.stringify(p)!==JSON.stringify(m))){this.setProperty("config",m);this.fireConfigChange({previousConfig:p,config:m});}};P.prototype.setTags=function(t){var p=this.getTags();var r=t;if(typeof t==="string"){r=t.split(",").sort().join(",");}if(p!==r){this.setProperty("tags",r);this.fireTagsChange({previousTags:p,tags:r});}};P.prototype.setEditor=function(e){var p=this.getEditor();var E=typeof e==="string"?sap.ui.getCore().byId(e):e;if(p!==E){this.setAssociation("editor",e);var E=this.getEditor();this.fireEditorChange({previousEditor:p,editor:E});}};P.prototype.destroy=function(){this._removePropertyEditors();C.prototype.destroy.apply(this,arguments);};P.prototype._removePropertyEditors=function(){var p=this.removeAllAggregation("propertyEditors");if(p.length){p.forEach(function(o){switch(this._sCreatedBy){case a:o.destroy();break;case b:o.setParent(null);break;}},this);this._sCreatedBy=null;this.firePropertyEditorsChange({previousPropertyEditors:p,propertyEditors:[]});}};P.prototype._initPropertyEditors=function(){if(this.getEditor()&&(this.getConfig()||(!this.getBindingInfo("config")&&this.getTags()))){var e=this.getEditor();if(this._fnCancelInit){this._fnCancelInit();delete this._fnCancelInit;}var p=c(function(r,R){var o;var s;if(this.getConfig()){o=Promise.all(this.getConfig().map(function(i){return e.createPropertyEditor(i);}));s=a;}else{var t=this.getTags().split(",");o=e.getPropertyEditors(t);s=b;}o.then(function(d){var g=this.getProperty("renderLabels");if(g!==undefined){d.forEach(function(h){h.setProperty("renderLabel",g);});}this._sCreatedBy=s;this._sCreatedBy=s;delete this._fnCancelInit;r(d);}.bind(this)).catch(R);}.bind(this));this._fnCancelInit=p.cancel;p.promise.then(function(d){var g=(this.getAggregation("propertyEditors")||[]).slice();d.forEach(function(o){this.addAggregation("propertyEditors",o);},this);this.firePropertyEditorsChange({previousPropertyEditors:g,propertyEditors:(this.getAggregation("propertyEditors")||[]).slice()});}.bind(this));}};P.prototype._propagationListener=function(){var e=f(this.getParent(),"sap.ui.integration.designtime.baseEditor.BaseEditor");if(e){this.setEditor(e);this.removePropagationListener(this._propagationListener);}};P.prototype.setParent=function(p){C.prototype.setParent.apply(this,arguments);if(this._bEditorAutoDetect){var e=f(p,"sap.ui.integration.designtime.baseEditor.BaseEditor");if(e){this.setEditor(e);}else{this.addPropagationListener(this._propagationListener);}}};return P;});