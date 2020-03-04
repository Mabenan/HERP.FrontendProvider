/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/core/Control','sap/ui/core/IconPool','sap/ui/Device','./PanelRenderer'],function(l,C,I,D,P){"use strict";var a=l.PanelAccessibleRole;var B=l.BackgroundDesign;var b=C.extend("sap.m.Panel",{metadata:{library:"sap.m",properties:{headerText:{type:"string",group:"Data",defaultValue:""},width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"100%"},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"auto"},expandable:{type:"boolean",group:"Appearance",defaultValue:false},expanded:{type:"boolean",group:"Appearance",defaultValue:false},expandAnimation:{type:"boolean",group:"Behavior",defaultValue:true},backgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance",defaultValue:B.Translucent},accessibleRole:{type:"sap.m.PanelAccessibleRole",group:"Accessibility",defaultValue:a.Form}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},headerToolbar:{type:"sap.m.Toolbar",multiple:false},infoToolbar:{type:"sap.m.Toolbar",multiple:false}},events:{expand:{parameters:{expand:{type:"boolean"},triggeredByInteraction:{type:"boolean"}}}},dnd:{draggable:true,droppable:true},designtime:"sap/m/designtime/Panel.designtime"}});b.prototype.init=function(){this._bInteractiveExpand=false;this.data("sap-ui-fastnavgroup","true",true);};b.prototype.onThemeChanged=function(){this._setContentHeight();};b.prototype.setExpanded=function(e){if(e===this.getExpanded()){return this;}this.setProperty("expanded",e,true);if(!this.getExpandable()){return this;}this._toggleExpandCollapse();this._toggleCssClasses();this.fireExpand({expand:e,triggeredByInteraction:this._bInteractiveExpand});this._bInteractiveExpand=false;return this;};b.prototype.onBeforeRendering=function(){if(this.getExpandable()&&!this.oIconCollapsed){this.oIconCollapsed=this._createIcon();}if(this.oIconCollapsed){this._getIcon().$().attr("aria-expanded",this.getExpanded());}if(D.browser.msie||D.browser.edge){this._updateIconAriaLabelledBy();}if(sap.ui.getCore().getConfiguration().getAccessibility()){this.$().attr("role",this.getAccessibleRole().toLowerCase());}};b.prototype.onAfterRendering=function(){var $=this.$(),c,p=this.getDomRef("content");var d=this.getDomRef();if(d){d.style.width=this.getWidth();var h=this.getHeight();d.style.height=h;if(parseFloat(h)!=0){d.querySelector(".sapMPanelContent").style.height=h;}}this._setContentHeight();if(this.getExpandable()){c=this.oIconCollapsed.$();p&&c.attr("aria-controls",p.id);if(this.getExpanded()){c.attr("aria-expanded","true");}else{$.children(".sapMPanelExpandablePart").css("display","none");c.attr("aria-expanded","false");}}};b.prototype.exit=function(){if(this.oIconCollapsed){this.oIconCollapsed.destroy();this.oIconCollapsed=null;}};b.prototype._createIcon=function(){var t=this,c=I.getIconURI("slim-arrow-right"),T=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("PANEL_ICON");return I.createControlByURI({id:t.getId()+"-CollapsedImg",src:c,decorative:false,press:function(){t._bInteractiveExpand=true;t.setExpanded(!t.getExpanded());},tooltip:T}).addStyleClass("sapMPanelExpandableIcon");};b.prototype._getIcon=function(){return this.oIconCollapsed;};b.prototype._setContentHeight=function(){var A,t=this.getDomRef(),p=t&&t.querySelector(".sapMPanelContent");if(this.getHeight()==="auto"||!p){return;}A='calc('+this.getHeight()+' - '+p.offsetTop+'px)';p.style.height=A;};b.prototype._toggleExpandCollapse=function(){var o={};if(!this.getExpandAnimation()){o.duration=0;}this.$().children(".sapMPanelExpandablePart").slideToggle(o);};b.prototype._toggleCssClasses=function(){var $=this.$();$.children(".sapMPanelWrappingDiv").toggleClass("sapMPanelWrappingDivExpanded");$.children(".sapMPanelWrappingDivTb").toggleClass("sapMPanelWrappingDivTbExpanded");$.find(".sapMPanelExpandableIcon").first().toggleClass("sapMPanelExpandableIconExpanded");};b.prototype._updateIconAriaLabelledBy=function(){var L,A,f;if(!this.oIconCollapsed){return;}if(this.getAccessibleRole()===a.Form){f=true;}L=this._getLabellingElementId();A=this.oIconCollapsed.getAriaLabelledBy();if(A.indexOf(L)===-1){this.oIconCollapsed.removeAllAssociation("ariaLabelledBy");!f&&this.oIconCollapsed.addAriaLabelledBy(L);}};b.prototype._getLabellingElementId=function(){var h=this.getHeaderToolbar(),i;if(h){i=h.getTitleId();}else{i=this.getId()+"-header";}return i;};return b;});
