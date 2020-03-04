/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/base/EventProvider','sap/ui/model/SelectionModel',"sap/ui/support/supportRules/ui/models/SharedModel"],function(E,S,a){"use strict";function _(o,t){if(!o||!t){return false;}var c=sap.ui.require(t);return!!(c&&(o instanceof c));}var T={isIndexSelected:function(r){return this._isSelectedInModel(r);},setSelectedIndex:function(r){},getSelectedIndices:function(){return[];},setSelectionInterval:function(f,t){this._doChangeSelection("setSelectionInterval",arguments);},addSelectionInterval:function(f,t){this._doChangeSelection("addSelectionInterval",arguments);},removeSelectionInterval:function(f,t){this._doChangeSelection("removeSelectionInterval",arguments);},selectAll:function(){this._doChangeSelection("selectAll",[this._getBinding().getLength()-1]);},getSelectedIndex:function(){return this._getSelectionModel().getLeadSelectedIndex();},clearSelection:function(){if(this._ignoreClearSelection){this._initializeSelectionModel();return;}this._doChangeSelection("clearSelection",arguments);},_getSelectedIndicesCount:function(){return this._getSelectionModel().getSelectedIndices().length;},_initializeSelectionModel:function(){return this._initializeSelectionModel();},updateSelectionFromModel:function(){return this.updateSelectionFromModel();},syncParentNoteWithChildrenNotes:function(t){return this.syncParentNoteWithChildrenNotes(t);}};function d(n,h){return function(){return T[n].apply(h,arguments);};}var b=E.extend("sap.ui.support.supportRules.ui.models.CustomListSelection",{constructor:function(c,k){E.call(this);var t=this;this._keys={};this._key=k;this._control=c;this._UITable=_(this._control,"sap/ui/table/Table");this._tree=_(this._control,"sap/ui/table/TreeTable")||_(this._control,"sap/m/Tree");if(this._UITable){this._aggregation="rows";for(var f in T){this._control[f]=d(f,this);}this._control.__onBindingChange=this._control._onBindingChange;this._control._onBindingChange=function(e){t._ignoreClearSelection=true;this.__onBindingChange.apply(this,arguments);if(e.getParameter("reason")!=='filter'&&e.getParameter("reason")!=='sort'){t._ignoreClearSelection=false;}};this.attachEvent("selectionChange",function(e){t._getControl()._onSelectionChanged(e);});}else{this._aggregation="items";this._control.attachSelectionChange(function(e){var s=t._getSelectionModel();var C=e.getParameter("listItems");var g=[];for(var i=0;i<C.length;i++){var h=C[i].getSelected();var j=c.indexOfItem(C[i]);g.push(j);if(h){s.addSelectionInterval(j,j);}else{s.removeSelectionInterval(j,j);}}var e=t.oEventPool.borrowObject("selectionChanged",t,{rowIndices:g});t._updateModelAfterSelectionChange(e);t.oEventPool.returnObject(e);t._initializeSelectionModel();});this._control.attachUpdateFinished(function(){t._getSelectionModel(true);});this._doAfterInitSelectionModel=function(){var I=this._getControl().getItems();for(var i=0;i<I.length;i++){I[i].setSelected(this._isSelectedInModel(i),true);}};}if(this._isTree()){c.attachToggleOpenState(function(){t._getSelectionModel(true);});}},attachRowSelectionChange:function(h){this.attachEvent("selectionChange",h);},getSelectedKeys:function(){var k=[];for(var K in this._keys){if(!!this._keys[K]){k.push(K);}}return k;},_getControl:function(){return this._control;},_isUITable:function(){return this._UITable;},_isTree:function(){return this._tree;},_getBinding:function(){return this._getControl().getBinding(this._aggregation);},_getContextByIndex:function(r){return this._getBinding().getContexts(r,1)[0];},_getSelectionModel:function(f){if(!this.selectionmodel||f){this._initializeSelectionModel();}return this.selectionmodel;},_getSelectedIndicesFromModel:function(){var B=this._getBinding();var I=[];if(B){var m=B.getModel();var l=B.getLength();for(var i=0;i<l;i++){var c=this._getContextByIndex(i);if(!c){return I;}if(this._checkSelectionForContext(m,c)){I.push(i);}}}return I;},_updateModelAfterSelectionChange:function(e){},updateSelectionFromModel:function(){var B=this._getBinding();var m=B.getModel();var D=m.getData();var A=this._getAllIndicesInModel();var t=this;function s(p,e,f){var n=m.getProperty(p+"/nodes");if(t._isTree()&&t._dependent){if(n&&n.length){for(var j=0;j<n.length;j++){var P=p.split("");s(p+"/nodes/"+j+"",m.getData()[P[1]].nodes[j].selected,true);}}else{var P=p.split("/");t.bTempSelected=true;P.pop();P.pop();var g=P.join("/"),h=g.split("/");if(D[h[1]]){t.bTempSelected=D[h[1]].selected;}t._setSelectionForContext(m,m.createBindingContext(g),t.bTempSelected);}}t._setSelectionForContext(m,m.createBindingContext(p),e);}for(var i=0;i<A.length;i++){var c=this._getContextByIndex(A[i]),p=c.getPath(),P=p.split("/"),e=true;if(P[2]){if(D[P[1]].nodes[P[3]]){e=D[P[1]].nodes[P[3]].selected;}}else{e=D[P[1]].selected;}s(p,e);}this._finalizeSelectionUpdate();},_getAllIndicesInModel:function(){var B=this._getBinding();var I=[];if(B){var l=B.getLength();for(var i=0;i<l;i++){I.push(i);}}return I;},_isSelectedInModel:function(r){var B=this._getBinding();var l=B?B.getLength():0;if(!B||r>=l){return false;}return this._checkSelectionForContext(B.getModel(),this._getContextByIndex(r));},_finalizeSelectionUpdate:function(){this._initializeSelectionModel();this._getSelectionModel();this._fireRowSelectionChange();},_checkSelectionForContext:function(m,c){var k;if(this._key==="$PATH"){k=c.getPath();}else{k=m.getProperty(this._key,c);}return!!this._keys[k];},_setSelectionForContext:function(m,c,s){var k;if(this._key==="$PATH"){k=c.getPath();}else{k=m.getProperty(this._key,c);}if(s){this._keys[k]=true;}else{delete this._keys[k];}},_initializeSelectionModel:function(){if(!this.selectionmodel){this.selectionmodel=new S(S.MULTI_SELECTION);}else{this.selectionmodel.clearSelection();}var I=this._getSelectedIndicesFromModel();for(var i=0;i<I.length;i++){this.selectionmodel.addSelectionInterval(I[i],I[i]);}if(this._doAfterInitSelectionModel){this._doAfterInitSelectionModel();}},_doUpdateModelAfterSelectionChange:function(e){this._getSelectionModel().detachSelectionChanged(this._doUpdateModelAfterSelectionChange,this);this._updateModelAfterSelectionChange(e);},_doChangeSelection:function(c,A){var s=this._getSelectionModel();s.attachSelectionChanged(this._doUpdateModelAfterSelectionChange,this);s[c].apply(s,A);},_fireRowSelectionChange:function(){this.fireEvent("selectionChange",{selectedKeys:this.getSelectedKeys()});},syncParentNoteWithChildrenNotes:function(t){Object.keys(t).forEach(function(l){var f=true;t[l].nodes.forEach(function(r){if(!r.selected){f=false;t[l].selected=false;}else if(f){t[l].selected=true;}});});a.setProperty('/treeModel',t);},updateModelAfterChangedSelection:function(t,p,s){var P=p.split("/");if(P[2]){if(t[P[1]].nodes.length!==0){t[P[1]].nodes[P[3]].selected=s;}}else{t[P[1]].selected=s;}}});return b;});
