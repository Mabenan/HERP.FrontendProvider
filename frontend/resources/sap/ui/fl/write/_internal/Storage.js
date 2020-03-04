/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/StorageUtils","sap/ui/fl/write/_internal/StorageFeaturesMerger","sap/base/util/ObjectPath"],function(S,a,O){"use strict";var W="sap/ui/fl/write/_internal/connectors/";function _(){return S.getConnectors(W,false);}function f(l,C){var F=C.filter(function(o){return o.layers.indexOf("ALL")!==-1||o.layers.indexOf(l)!==-1;});if(F.length===1){return F[0];}if(F.length===0){throw new Error("No Connector configuration could be found to write into layer: "+l);}if(F.length>1){throw new Error("sap.ui.core.Configuration 'flexibilityServices' has a misconfiguration: Multiple Connector configurations were found to write into layer: "+l);}}function b(C){var i=C.map(function(o){return o.writeConnectorModule.loadFeatures({url:o.url}).then(function(F){return{features:F,layers:o.layers};}).catch(S.logAndResolveDefault.bind(null,{features:{},layers:o.layers},o,"loadFeatures"));});return Promise.all(i);}function c(p,C){p.url=C.url;return C.writeConnectorModule.versions.load(p);}function d(p,C){p.url=C.url;return C.writeConnectorModule.versions.activateDraft(p);}function g(l){if(!l){return Promise.reject("No layer was provided");}return _().then(f.bind(this,l));}function e(A,p){var v;if(p.draft){v=new Promise(function(r,i){sap.ui.require(["sap/ui/fl/write/api/FeaturesAPI"],function(F){F.isVersioningEnabled(p.layer).then(function(D){if(D){r();}else{i("Draft is not supported for the given layer: "+p.layer);}});});});}else{v=Promise.resolve();}return v.then(g.bind(undefined,p.layer)).then(function(C){p.url=C.url;var o=O.get(A,C.writeConnectorModule);return o.call(C.writeConnectorModule,p);});}var h={};h.write=function(p){return e("write",p);};h.remove=function(p){return e("remove",p);};h.update=function(p){return e("update",p);};h.reset=function(p){return e("reset",p);};h.getFlexInfo=function(p){return e("getFlexInfo",p);};h.loadFeatures=function(){return _().then(b).then(a.mergeResults);};h.publish=function(p){return e("publish",p);};h.versions={load:function(p){return _().then(f.bind(undefined,p.layer)).then(c.bind(undefined,p));},activateDraft:function(p){return _().then(f.bind(undefined,p.layer)).then(d.bind(undefined,p));}};return h;},true);