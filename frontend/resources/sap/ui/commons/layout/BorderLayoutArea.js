/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/commons/library','sap/ui/core/CustomStyleClassSupport','sap/ui/core/Element'],function(l,C,E){"use strict";var B=l.layout.BorderLayoutAreaTypes;var a=E.extend("sap.ui.commons.layout.BorderLayoutArea",{metadata:{library:"sap.ui.commons",properties:{areaId:{type:"sap.ui.commons.layout.BorderLayoutAreaTypes",group:"Identification",defaultValue:B.top,deprecated:true},overflowX:{type:"string",group:"Misc",defaultValue:'auto'},overflowY:{type:"string",group:"Misc",defaultValue:'auto'},contentAlign:{type:"string",group:"Misc",defaultValue:'left'},size:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:'100px'},visible:{type:"boolean",group:"Misc",defaultValue:true}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"}}}});C.apply(a.prototype);a.prototype.getAreaId=function(){var p=this.getParent();return(p&&p instanceof sap.ui.commons.layout.BorderLayout)?this.sParentAggregationName:undefined;};a.prototype.setVisible=function(v,b){var A=this.getAreaId();if(A==="center"||!b){this.setProperty("visible",v);return this;}this.setProperty("visible",v,true);this.getParent().getMetadata().getRenderer().animate(this,v);return this;};return a;});
