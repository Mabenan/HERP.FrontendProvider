/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Control','sap/ui/core/theming/Parameters','sap/ui/Device','./library',"./Column",'./utils/TableUtils',"./extensions/ExtensionBase",'sap/ui/core/Renderer','sap/ui/core/IconPool',"sap/base/Log"],function(C,P,D,a,b,T,E,R,I,L){"use strict";var V=a.VisibleRowCountMode;var S=a.SortOrder;var f={Begin:"flex-start",End:"flex-end",Left:undefined,Right:undefined,Center:"center"};var c={apiVersion:2};c.render=function(r,t){delete t._iHeaderRowCount;f.Left=t._bRtlMode?"flex-end":"flex-start";f.Right=t._bRtlMode?"flex-start":"flex-end";T.getResourceBundle();r.openStart("div",t);t._getAccRenderExtension().writeAriaAttributesFor(r,t,"ROOT");r.class("sapUiTable");if(D.browser.chrome&&window.devicePixelRatio<1){r.class("sapUiTableZoomout");}if('ontouchstart'in document){r.class("sapUiTableTouch");}r.class("sapUiTableSelMode"+t.getSelectionMode());if(t.getColumnHeaderVisible()){r.class("sapUiTableCHdr");}if(T.hasRowHeader(t)){r.class("sapUiTableRowSelectors");}if(T.hasRowHighlights(t)){r.class("sapUiTableRowHighlights");}var s=a.TableHelper.addTableClass();if(s){r.class(s);}var o=t._getScrollExtension();if(o.isVerticalScrollbarRequired()&&!o.isVerticalScrollbarExternal()){r.class("sapUiTableVScr");}if(t.getEditable()){r.class("sapUiTableEdt");}if(T.hasRowActions(t)){var i=T.getRowActionCount(t);r.class(i==1?"sapUiTableRActS":"sapUiTableRAct");}else if(T.hasRowNavigationIndicators(t)){r.class("sapUiTableRowNavIndicator");}if(T.isNoDataVisible(t)&&!T.hasPendingRequests(t)){r.class("sapUiTableEmpty");}if(t.getShowOverlay()){r.class("sapUiTableOverlay");}var m=T.Grouping.getModeCssClass(t);if(m){r.class(m);}r.style("width",t.getWidth());t._getRowMode().applyTableStyles(r);if(t._bFirstRendering){r.class("sapUiTableNoOpacity");}r.openEnd();this.renderTabElement(r,"sapUiTableOuterBefore");r.renderControl(t.getAggregation("_messageStrip"));if(t.getTitle()){this.renderHeader(r,t,t.getTitle());}if(t.getToolbar()){this.renderToolbar(r,t,t.getToolbar());}if(t.getExtension()&&t.getExtension().length>0){this.renderExtensions(r,t,t.getExtension());}r.openStart("div",t.getId()+"-sapUiTableCnt");r.class("sapUiTableCnt");r.attr("data-sap-ui-fastnavgroup","true");r.openEnd();r.openStart("div",t.getId()+"-sapUiTableGridCnt");t._getAccRenderExtension().writeAriaAttributesFor(r,t,"CONTENT");r.openEnd();this.renderColRsz(r,t);this.renderColHdr(r,t);this.renderTable(r,t);r.close("div");var d=t.getCreationRow();if(d){r.renderControl(d);this.renderHSbBackground(r,t);this.renderHSb(r,t);}t._getAccRenderExtension().writeHiddenAccTexts(r,t);r.openStart("div",t.getId()+"-overlay");r.class("sapUiTableOverlayArea");r.attr("tabindex","0");t._getAccRenderExtension().writeAriaAttributesFor(r,t,"OVERLAY");r.openEnd();r.close("div");r.close("div");if(t.getFooter()){this.renderFooter(r,t,t.getFooter());}if(t.getVisibleRowCountMode()==V.Interactive){this.renderVariableHeight(r,t);}this.renderBottomPlaceholder(r,t);this.renderTabElement(r,"sapUiTableOuterAfter");r.close("div");};c.renderHeader=function(r,t,o){r.openStart("div");r.class("sapUiTableHdr");t._getAccRenderExtension().writeAriaAttributesFor(r,t,"TABLEHEADER");r.openEnd();r.renderControl(o);r.close("div");};c.renderToolbar=function(r,t,o){if(!T.isA(o,"sap.ui.core.Toolbar")){return;}r.openStart("div");r.class("sapUiTableTbr");if(typeof o.getStandalone==="function"&&o.getStandalone()){o.setStandalone(false);}if(o.isA("sap.m.Toolbar")){o.setDesign("Transparent",true);o.addStyleClass("sapMTBHeader-CTX");r.class("sapUiTableMTbr");}t._getAccRenderExtension().writeAriaAttributesFor(r,t,"TABLESUBHEADER");r.openEnd();r.renderControl(o);r.close("div");};c.renderExtensions=function(r,t,e){for(var i=0,l=e.length;i<l;i++){this.renderExtension(r,t,e[i]);}};c.renderExtension=function(r,t,e){r.openStart("div");r.class("sapUiTableExt");t._getAccRenderExtension().writeAriaAttributesFor(r,t,"TABLESUBHEADER");r.openEnd();r.renderControl(e);r.close("div");};c.renderTable=function(r,t){this.renderTabElement(r,"sapUiTableCtrlBefore");r.openStart("div",t.getId()+"-tableCCnt");t._getRowMode().applyRowContainerStyles(r);r.class("sapUiTableCCnt");r.openEnd();this.renderTableCCnt(r,t);r.close("div");this.renderTabElement(r,"sapUiTableCtrlAfter");if(!t._getScrollExtension().isVerticalScrollbarExternal()){this.renderVSbBackground(r,t);this.renderVSb(r,t);}var o=t.getCreationRow();if(!o){this.renderHSbBackground(r,t);this.renderHSb(r,t);}};c.renderTableCCnt=function(r,t){this.renderTableCtrl(r,t);this.renderRowHdr(r,t);this.renderRowActions(r,t);r.openStart("div",t.getId()+"-noDataCnt");r.class("sapUiTableCtrlEmpty");r.attr("tabindex","0");t._getAccRenderExtension().writeAriaAttributesFor(r,t,"NODATA");r.openEnd();if(t.getNoData()instanceof C){r.renderControl(t.getNoData());}else{r.openStart("span",t.getId()+"-noDataMsg");r.class("sapUiTableCtrlEmptyMsg");r.openEnd();r.text(T.getNoDataText(t));r.close("span");}r.close("div");};c.renderFooter=function(r,t,F){r.openStart("div");r.class("sapUiTableFtr");t._getAccRenderExtension().writeAriaAttributesFor(r,t,"TABLEFOOTER");r.openEnd();r.renderControl(F);r.close("div");};c.renderVariableHeight=function(r,t){r.openStart("div",t.getId()+"-sb");r.attr("tabindex","-1");r.class("sapUiTableHeightResizer");r.style("height","5px");r.openEnd();r.close("div");};c.renderBottomPlaceholder=function(r,t){var p=t._getRowMode().getTableBottomPlaceholderStyles();if(p===undefined){return;}r.openStart("div",t.getId()+"-placeholder-bottom");r.class("sapUiTablePlaceholder");t._getRowMode().applyTableBottomPlaceholderStyles(r);r.openEnd();r.close("div");};c.renderColHdr=function(r,t){var n=T.getHeaderRowCount(t);var d=t.getColumns();var F=t.getComputedFixedColumnCount();r.openStart("div");r.class("sapUiTableColHdrCnt");r.openEnd();this.renderColRowHdr(r,t);if(F>0){r.openStart("div");r.class("sapUiTableCHA");r.class("sapUiTableCtrlScrFixed");r.class("sapUiTableNoOpacity");r.openEnd();this.renderTableControlCnt(r,t,true,0,F,true,false,0,n,true);r.close("div");}r.openStart("div",t.getId()+"-sapUiTableColHdrScr");r.class("sapUiTableCHA");r.class("sapUiTableCtrlScr");if(d.length==0){r.class("sapUiTableHasNoColumns");}if(F>0){if(t._bRtlMode){r.style("margin-right","0");}else{r.style("margin-left","0");}}r.openEnd();this.renderTableControlCnt(r,t,false,F,d.length,false,false,0,n,true);r.close("div");r.openStart("div");r.class("sapUiTableVSbHeader");r.openEnd();r.close("div");if(T.hasRowActions(t)){r.openStart("div");r.attr("id",t.getId()+"-rowacthdr");t._getAccRenderExtension().writeAriaAttributesFor(r,t,"ROWACTIONHEADER");r.class("sapUiTableCell");r.class("sapUiTableHeaderCell");r.class("sapUiTableRowActionHeaderCell");r.openEnd();r.openStart("span");r.openEnd();r.text(T.getResourceText("TBL_ROW_ACTION_COLUMN_LABEL"));r.close("span");r.close("div");}r.close("div");};c.renderColRowHdr=function(r,t){var e=false;var s=false;var m=t._getSelectionPlugin().getRenderConfig();r.openStart("div",t.getId()+"-selall");r.class("sapUiTableCell");r.class("sapUiTableHeaderCell");r.class("sapUiTableRowSelectionHeaderCell");var d;if(m.headerSelector.visible){var A=T.areAllRowsSelected(t);if(m.headerSelector.type==="toggle"){d=A?"TBL_DESELECT_ALL":"TBL_SELECT_ALL";}else if(m.headerSelector.type==="clear"){d="TBL_DESELECT_ALL";if(!m.headerSelector.enabled){r.class("sapUiTableSelAllDisabled");r.attr("aria-disabled","true");}}if(t._getShowStandardTooltips()&&d){r.attr("title",T.getResourceText(d));}if(!A){r.class("sapUiTableSelAll");}else{s=true;}r.class("sapUiTableSelAllVisible");e=true;}r.attr("tabindex","-1");t._getAccRenderExtension().writeAriaAttributesFor(r,t,"COLUMNROWHEADER",{enabled:e,checked:s});r.openEnd();if(m.headerSelector.visible){if(m.headerSelector.type==="clear"&&m.headerSelector.icon){r.renderControl(m.headerSelector.icon);}else{r.openStart("div");r.class("sapUiTableSelectAllCheckBox");r.openEnd();r.close("div");}}r.close("div");};c.renderCol=function(r,t,o,h,n,i,d,e,g){var l,j=!n,k=o.getIndex(),m=o.getMultiLabels();if(m.length>0){l=m[h];}else if(h==0){l=o.getLabel();}var H=o.getId();if(h===0){r.openStart("td",o);}else{H=H+"_"+h;r.openStart("td",H);}r.attr('data-sap-ui-colid',o.getId());r.attr("data-sap-ui-colindex",k);r.attr("tabindex","-1");var A={column:o,headerId:H,index:k};if(n>1){r.attr("colspan",n);A.colspan=true;}if(g){var F=o.getFiltered();var s=o.getSorted();if(F){r.class("sapUiTableColFiltered");}if(s){r.class("sapUiTableColSorted");if(o.getSortOrder()===S.Descending){r.class("sapUiTableColSortedD");}}}t._getAccRenderExtension().writeAriaAttributesFor(r,t,"COLUMNHEADER",A);r.class("sapUiTableCell");r.class("sapUiTableHeaderCell");r.class("sapUiTableHeaderDataCell");if(t.getEnableColumnReordering()||t.hasListeners("columnSelect")||o._menuHasItems()){r.class("sapUiTableHeaderCellActive");}if(i){r.class("sapUiTableCellFirst");}if(d){r.class("sapUiTableCellLastFixed");}if(e){r.class("sapUiTableCellLast");}if(j){r.class("sapUiTableHidden");}if(t.getColumnHeaderHeight()>0){r.style("height",t.getColumnHeaderHeight()+"px");}var p=o.getTooltip_AsString();if(p){r.attr("title",p);}r.openEnd();r.openStart("div");r.class("sapUiTableCellInner");r.attr("id",H+"-inner");var q=o.getHAlign();var u=R.getTextAlign(q);if(u){r.style("text-align",u);}r.openEnd();r.openStart("div");r.style("justify-content",f[q]);r.openEnd();if(l){r.renderControl(l);}r.close("div");r.close("div");r.close("td");};c.renderColRsz=function(r,t){r.openStart("div",t.getId()+"-rsz");r.class("sapUiTableColRsz");r.openEnd();r.close("div");};c.renderRowHdr=function(r,t){r.openStart("div",t.getId()+"-sapUiTableRowHdrScr");t._getAccRenderExtension().writeAriaAttributesFor(r,t,"PRESENTATION");r.class("sapUiTableRowHdrScr");r.class("sapUiTableNoOpacity");t._getAccRenderExtension().writeAriaAttributesFor(r,t,"ROWHEADER_COL");r.openEnd();for(var d=0,e=t.getRows().length;d<e;d++){this.renderRowAddon(r,t,t.getRows()[d],d,true);}r.close("div");};c.renderRowActions=function(r,t){if(!T.hasRowActions(t)&&!T.hasRowNavigationIndicators(t)){return;}r.openStart("div",t.getId()+"-sapUiTableRowActionScr");t._getAccRenderExtension().writeAriaAttributesFor(r,t,"PRESENTATION");T.hasRowActions(t)?r.class("sapUiTableRowWithAction"):r.class("sapUiTableRowActionScr");r.class("sapUiTableNoOpacity");r.openEnd();for(var d=0,e=t.getRows().length;d<e;d++){this.renderRowAddon(r,t,t.getRows()[d],d,false);}r.close("div");};c.addRowCSSClasses=function(r,t,i){var m=t._getRowCounts();var F=T.getFirstFixedBottomRowIndex(t);if(i===0){r.class("sapUiTableFirstRow");}else if(i===t.getRows().length-1){r.class("sapUiTableLastRow");}if(m.fixedTop>0){if(i==m.fixedTop-1){r.class("sapUiTableRowLastFixedTop");}if(i==m.fixedTop){r.class("sapUiTableRowFirstScrollable");}}if(F>=0&&F===i){r.class("sapUiTableRowFirstFixedBottom");}else if(F>=1&&F-1===i){r.class("sapUiTableRowLastScrollable");}};c.renderRowAddon=function(r,t,o,i,h){var d=t._getSelectionPlugin().isIndexSelected(o.getIndex());r.openStart("div");t._getAccRenderExtension().writeAriaAttributesFor(r,t,"TR",{index:i,rowHidden:o.isEmpty()});r.attr("data-sap-ui-related",o.getId());r.attr("data-sap-ui-rowindex",i);r.class("sapUiTableRow");r.class("sapUiTableContentRow");if(o.isContentHidden()){r.class("sapUiTableRowHidden");}else if(d){r.class("sapUiTableRowSel");}if(i%2!=0&&t.getAlternateRowColors()&&!T.Grouping.isTreeMode(t)){r.class("sapUiTableRowAlternate");}this.addRowCSSClasses(r,t,i);r.openEnd();r.openStart("div",t.getId()+(h?"-rowsel":"-rowact")+i);r.class("sapUiTableCell");r.class("sapUiTableContentCell");r.class(h?"sapUiTableRowSelectionCell":"sapUiTableRowActionCell");t._getRowMode().renderRowStyles(r);r.attr("tabindex","-1");t._getAccRenderExtension().writeAriaAttributesFor(r,t,h?"ROWHEADER":"ROWACTION",{rowSelected:d,rowHidden:o.isEmpty()});r.openEnd();if(h){this.writeRowHighlightContent(r,t,o,i);this.writeRowSelectorContent(r,t,o,i);}else{var A=o.getRowAction();if(A){r.renderControl(A);}this.writeRowNavigationContent(r,t,o,i);}r.close("div");r.close("div");};c.renderTableCtrl=function(r,t){if(t.getComputedFixedColumnCount()>0){r.openStart("div");r.attr("id",t.getId()+"-sapUiTableCtrlScrFixed");r.class("sapUiTableCtrlScrFixed");r.openEnd();this.renderTableControl(r,t,true);r.close("div");}r.openStart("div",t.getId()+"-sapUiTableCtrlScr");r.class("sapUiTableCtrlScr");if(t.getComputedFixedColumnCount()>0){if(t._bRtlMode){r.style("margin-right","0");}else{r.style("margin-left","0");}}r.openEnd();r.openStart("div",t.getId()+"-tableCtrlCnt");r.class("sapUiTableCtrlCnt");r.openEnd();this.renderTableControl(r,t,false);r.close("div");r.close("div");};c.renderTableControl=function(r,t,F){var s,e;if(F){s=0;e=t.getComputedFixedColumnCount();}else{s=t.getComputedFixedColumnCount();e=t.getColumns().length;}var m=t._getRowCounts();var d=t.getRows();if(m.fixedTop>0){this.renderTableControlCnt(r,t,F,s,e,true,false,0,m.fixedTop);}this.renderTableControlCnt(r,t,F,s,e,false,false,m.fixedTop,d.length-m.fixedBottom);if(m.fixedBottom>0&&d.length>0){this.renderTableControlCnt(r,t,F,s,e,false,true,d.length-m.fixedBottom,d.length);}};c.renderTableControlCnt=function(r,t,F,s,e,d,g,i,h,H){var j=H?"-header":"-table";var k=t.getId()+j;var l=[];if(F){k+="-fixed";l.push("sapUiTableCtrlFixed");}else{l.push("sapUiTableCtrlScroll");}if(d){k+="-fixrow";l.push("sapUiTableCtrlRowFixed");}else if(g){k+="-fixrow-bottom";l.push("sapUiTableCtrlRowFixedBottom");}else{l.push("sapUiTableCtrlRowScroll");}r.openStart("table",k);l.forEach(function(J){r.class(J);});t._getAccRenderExtension().writeAriaAttributesFor(r,t,H?"COLUMNHEADER_TABLE":"TABLE");r.class("sapUiTableCtrl");if(H){r.class("sapUiTableCHT");}r.style(F?"width":"min-width",t._getColumnsWidth(s,e)+"px");r.openEnd();r.openStart("thead").openEnd();r.openStart("tr");r.class("sapUiTableCtrlCol");if(i==0){r.class("sapUiTableCtrlFirstCol");}if(H){r.class("sapUiTableCHTHR");}r.openEnd();var m=t.getColumns();var n=new Array(e);var o;var p;var q=!F&&e>s;for(o=s;o<e;o++){p=m[o];var u={shouldRender:!!(p&&p.shouldRender())};if(u.shouldRender){var w=p.getWidth();if(T.isVariableWidth(w)){q=false;if(F){p._iFixWidth=p._iFixWidth||160;w=p._iFixWidth+"px";}}else if(F){delete p._iFixWidth;}u.width=w;}n[o]=u;}if(m.length===0){r.openStart("th").openEnd().close("th");}for(o=s;o<e;o++){j=H?"_hdr":"_col";p=m[o];u=n[o];if(u.shouldRender){if(i==0){r.openStart("th",t.getId()+j+o);t._getAccRenderExtension().writeAriaAttributesFor(r,t,"TH",{column:p});}else{r.openStart("th");}r.style("width",u.width);r.attr("data-sap-ui-headcolindex",o);r.attr("data-sap-ui-colid",p.getId());r.openEnd();if(i==0&&T.getHeaderRowCount(t)==0&&!H){if(p.getMultiLabels().length>0){r.renderControl(p.getMultiLabels()[0]);}else{r.renderControl(p.getLabel());}}r.close("th");}}if(q){r.openStart("th",H&&t.getId()+"-dummycolhdr");t._getAccRenderExtension().writeAriaAttributesFor(r,t,"PRESENTATION");r.openEnd().close("th");}r.close("tr");r.close("thead");r.openStart("tbody").openEnd();var v=t._getVisibleColumns();var x=t.getRows();var y;var z;if(H){for(y=i,z=h;y<z;y++){this.renderColumnHeaderRow(r,t,y,F,s,e,q,y===z-1);}}else{var A=t._getAccExtension().getAriaTextsForSelectionMode(true);var B=T.isRowSelectionAllowed(t);var G=t.getDragDropConfig().some(function(J){return J.getMetadata().isInstanceOf("sap.ui.core.dnd.IDragInfo")&&J.getSourceAggregation()==="rows";});for(y=i,z=h;y<z;y++){this.renderTableRow(r,t,x[y],y,F,s,e,false,v,q,A,B,G);}}r.close("tbody");r.close("table");};c.writeRowSelectorContent=function(r,t,o,i){t._getAccRenderExtension().writeAccRowSelectorText(r,t,o,i);if(T.Grouping.isGroupMode(t)){r.openStart("div");r.class("sapUiTableGroupShield");r.openEnd();r.close("div");r.openStart("div",o.getId()+"-groupHeader");r.class("sapUiTableGroupIcon");r.openEnd();r.close("div");if(T.Grouping.showGroupMenuButton(t)){var d=I.getIconInfo("sap-icon://drop-down-list");r.openStart("div").class("sapUiTableGroupMenuButton").openEnd();r.text(d.content);r.close("div");}}};c.writeRowHighlightContent=function(r,t,o,i){if(!T.hasRowHighlights(t)){return;}var d=o.getAggregation("_settings");var h=d._getHighlightCSSClassName();r.openStart("div",o.getId()+"-highlight");r.class("sapUiTableRowHighlight");r.class(h);r.openEnd();t._getAccRenderExtension().writeAccRowHighlightText(r,t,o,i);r.close("div");};c.writeRowNavigationContent=function(r,t,o,i){if(!T.hasRowNavigationIndicators(t)){return;}var d=o.getAggregation("_settings");r.openStart("div",o.getId()+"-navIndicator");if(d.getNavigated()){r.class("sapUiTableRowNavigated");}r.openEnd();r.close("div");};c.renderColumnHeaderRow=function(r,t,i,F,s,e,h,l){r.openStart("tr");r.class("sapUiTableRow");r.class("sapUiTableHeaderRow");r.class("sapUiTableColHdrTr");t._getAccRenderExtension().writeAriaAttributesFor(r,t,"COLUMNHEADER_ROW");r.openEnd();var d,n=0,g=-1;d=t.getColumns().slice(s,e).filter(function(o){return o&&o.shouldRender();});function j(o,m,p){var q=T.Column.getHeaderSpan(o,i),u;if(n<1){if(q>1){u=o.getIndex();q=p.slice(m+1,m+q).reduce(function(v,w){return w.getIndex()-u<q?v+1:v;},1);}o._nSpan=n=q;g=m;}else{o._nSpan=0;}n--;}d.forEach(j);function k(o,m){this.renderCol(r,t,o,i,o._nSpan,m===0,F&&(m==g),!F&&(m==g),o._nSpan===1&&!o._bIconsRendered);o._bIconsRendered=o._bIconsRendered||o._nSpan===1;delete o._nSpan;if(l){delete o._bIconsRendered;}}d.forEach(k.bind(this));if(!F&&h&&d.length>0){r.openStart("td").class("sapUiTableCellDummy");t._getAccRenderExtension().writeAriaAttributesFor(r,t,"PRESENTATION");r.openEnd().close("td");}r.close("tr");};c.renderTableRow=function(r,t,o,i,F,s,e,d,v,h,m,g,j){if(!o){return;}var k=t._getSelectionPlugin();if(F){r.openStart("tr",o.getId()+"-fixed");r.attr("data-sap-ui-related",o.getId());}else{r.openStart("tr",o);}if(o._bDummyRow){r.style("opacity","0");}r.class("sapUiTableRow");r.class("sapUiTableContentRow");r.class("sapUiTableTr");if(o.isContentHidden()){r.class("sapUiTableRowHidden");}else{if(j&&F){r.attr("draggable",true);}if(k.isIndexSelected(o.getIndex())){r.class("sapUiTableRowSel");}}if(i%2!=0&&t.getAlternateRowColors()&&!T.Grouping.isTreeMode(t)){r.class("sapUiTableRowAlternate");}this.addRowCSSClasses(r,t,i);r.attr("data-sap-ui-rowindex",i);t._getRowMode().renderRowStyles(r);t._getAccRenderExtension().writeAriaAttributesFor(r,t,"TR",{index:i,rowHidden:o.isEmpty()});r.openEnd();var l=!o.isEmpty()&&k.isIndexSelected(o.getIndex());var n=o.getCells();for(var p=0,q=n.length;p<q;p++){this.renderTableCell(r,t,o,n[p],p,F,s,e,v,l);}if(!F&&h&&n.length>0){r.openStart("td").class("sapUiTableCellDummy");t._getAccRenderExtension().writeAriaAttributesFor(r,t,"PRESENTATION");r.openEnd();r.close("td");}r.close("tr");};c.renderTableCell=function(r,t,o,d,i,F,s,e,v,g){var h=b.ofCell(d);var j=h.getIndex();var l=t.getColumns()[t.getFixedColumnCount()-1];if(h.shouldRender()&&s<=j&&e>j){var k=o.getId()+"-col"+i;r.openStart("td",k);r.attr("tabindex","-1");r.attr("data-sap-ui-colid",h.getId());var n=v.length;var m=n>0&&v[0]===h;var p=n>0&&v[n-1]===h;var q=F&l===h;t._getAccRenderExtension().writeAriaAttributesFor(r,t,"DATACELL",{index:j,column:h,row:o,fixed:F,rowSelected:g});var u=R.getTextAlign(h.getHAlign());if(u){r.style("text-align",u);}r.class("sapUiTableCell");r.class("sapUiTableContentCell");r.class("sapUiTableDataCell");if(m){r.class("sapUiTableCellFirst");}if(q){r.class("sapUiTableCellLastFixed");}if(p){r.class("sapUiTableCellLast");}r.openEnd();r.openStart("div");r.class("sapUiTableCellInner");if(m&&T.Grouping.isTreeMode(t)){r.class("sapUiTableCellFlex");}t._getRowMode().renderCellContentStyles(r);r.openEnd();this.renderTableCellControl(r,t,d,m);r.close("div");r.close("td");}};c.renderTableCellControl=function(r,t,o,i){if(i&&T.Grouping.isTreeMode(t)&&!t._bFlatMode){var d=o.getParent();r.openStart("span",d.getId()+"-treeicon");r.class("sapUiTableTreeIcon");r.attr("tabindex","-1");t._getAccRenderExtension().writeAriaAttributesFor(r,t,"TREEICON",{row:d});r.openEnd();r.close("span");}r.renderControl(o);};c.renderVSb=function(r,t,m){m=Object.assign({cssClass:"sapUiTableVSb",tabIndex:true,hidden:true},m);m.id=t.getId()+"-vsb";var s=t._getScrollExtension();r.openStart("div",m.id);r.class(m.cssClass);if(m.hidden){r.class("sapUiTableHidden");}if(m.tabIndex){r.attr("tabindex","-1");}r.style("max-height",s.getVerticalScrollbarHeight()+"px");var d=t._getRowCounts();if(d.fixedTop>0){t._iVsbTop=d.fixedTop*t._getBaseRowHeight()-1;r.style("top",t._iVsbTop+'px');}r.openEnd();r.openStart("div",m.id+"-content");r.class("sapUiTableVSbContent");r.style("height",s.getVerticalScrollHeight()+"px");r.openEnd();r.close("div");r.close("div");};c.renderVSbExternal=function(r,t){if(E.isEnrichedWith(t,"sap.ui.table.extensions.Synchronization")){this.renderVSb(r,t,{cssClass:"sapUiTableVSbExternal",tabIndex:false});}else{L.error("This method can only be used with synchronization enabled.",t,"TableRenderer.renderVSbExternal");}};c.renderVSbBackground=function(r,t){r.openStart("div",t.getId()+"-vsb-bg");r.class("sapUiTableVSbBg");r.openEnd().close("div");};c.renderHSb=function(r,t,m){m=Object.assign({id:t.getId()+"-hsb",cssClass:"sapUiTableHSb",tabIndex:true,hidden:true,scrollWidth:0},m);r.openStart("div",m.id);r.class(m.cssClass);if(m.hidden){r.class("sapUiTableHidden");}if(m.tabIndex){r.attr("tabindex","-1");}r.openEnd();r.openStart("div",m.id+"-content");r.class("sapUiTableHSbContent");if(m.scrollWidth>0){r.style("width",m.scrollWidth+"px");}r.openEnd();r.close("div");r.close("div");};c.renderHSbExternal=function(r,t,i,s){if(E.isEnrichedWith(t,"sap.ui.table.extensions.Synchronization")){this.renderHSb(r,t,{id:i,cssClass:"sapUiTableHSbExternal",tabIndex:false,hidden:false,scrollWidth:s});}else{L.error("This method can only be used with synchronization enabled.",t,"TableRenderer.renderVSbExternal");}};c.renderHSbBackground=function(r,t){r.openStart("div",t.getId()+"-hsb-bg");r.class("sapUiTableHSbBg");r.openEnd().close("div");};c.renderTabElement=function(r,s){r.openStart("div");if(s){r.class(s);}r.attr("tabindex","0");r.openEnd().close("div");};return c;},true);
