/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_GroupLock","./_Helper","./_Requestor","sap/base/Log","sap/base/util/isEmptyObject","sap/ui/base/SyncPromise","sap/ui/thirdparty/jquery"],function(_,a,b,L,c,S,q){"use strict";var r=/\(\$uid=[-\w]+\)$/,m="@com.sap.vocabularies.Common.v1.Messages",d=/^-?\d+$/,e=/^([^(]*)(\(.*\))$/;function f(i,p,k,D){if(k.$count!==undefined){s(i,p,k,k.$count+D);}}function g(R,p){return p===""||R===p||R.indexOf(p+"/")===0;}function s(i,p,k,v){if(typeof v==="string"){v=parseInt(v);}a.updateExisting(i,p,k,{$count:v});}function C(R,i,Q,k,G){this.bActive=true;this.mChangeListeners={};this.fnGetOriginalResourcePath=G;this.mLateQueryOptions=null;this.sMetaPath=a.getMetaPath("/"+i);this.mPatchRequests={};this.oPendingRequestsPromise=null;this.mPostRequests={};this.mPropertyRequestByPath={};this.oRequestor=R;this.sResourcePath=i;this.bSortExpandSelect=k;this.bSentReadRequest=false;this.oTypePromise=undefined;this.setQueryOptions(Q);}C.prototype._delete=function(G,E,p,o,i){var k=p.split("/"),D=k.pop(),l=k.join("/"),t=this;this.addPendingRequest();return this.fetchValue(_.$cached,l).then(function(v){var n=D?v[C.from$skip(D,v)]:v,H,K=a.getPrivateAnnotation(n,"predicate"),u=a.buildPath(l,Array.isArray(v)?K:D),T=a.getPrivateAnnotation(n,"transient");if(T===true){throw new Error("No 'delete' allowed while waiting for server response");}if(T){G.unlock();t.oRequestor.removePost(T,n);return undefined;}if(n["$ui5.deleting"]){throw new Error("Must not delete twice: "+E);}n["$ui5.deleting"]=true;H={"If-Match":o||n};E+=t.oRequestor.buildQueryString(t.sMetaPath,t.mQueryOptions,true);return t.oRequestor.request("DELETE",E,G,H,undefined,undefined,undefined,undefined,a.buildPath(t.getOriginalResourcePath(n),u)).catch(function(w){if(w.status!==404){delete n["$ui5.deleting"];throw w;}}).then(function(){if(Array.isArray(v)){i(t.removeElement(v,Number(D),K,l),v);}else{if(D){a.updateExisting(t.mChangeListeners,l,v,C.makeUpdateData([D],null));}else{n["$ui5.deleted"]=true;}i();}t.oRequestor.getModelInterface().reportBoundMessages(t.sResourcePath,[],[u]);});}).finally(function(){t.removePendingRequest();});};C.prototype.addPendingRequest=function(){var R;if(!this.oPendingRequestsPromise){this.oPendingRequestsPromise=new S(function(i){R=i;});this.oPendingRequestsPromise.$count=0;this.oPendingRequestsPromise.$resolve=R;}this.oPendingRequestsPromise.$count+=1;};C.prototype.calculateKeyPredicate=function(i,t,M){var p,T=t[M];if(T&&T.$Key){p=a.getKeyPredicate(i,M,t);if(p){a.setPrivateAnnotation(i,"predicate",p);}}return p;};C.prototype.checkActive=function(){var E;if(!this.bActive){E=new Error("Response discarded: cache is inactive");E.canceled=true;throw E;}};C.prototype.create=function(G,p,i,t,E,k,l){var n,K=E&&E["@$ui5.keepTransientPath"],o,u=this;function v(){a.removeByPath(u.mPostRequests,i,E);n.splice(n.indexOf(E),1);n.$created-=1;f(u.mChangeListeners,i,n,-1);delete n.$byPredicate[t];if(!i){u.adjustReadRequests(0,-1);}G.cancel();}function w(){u.addPendingRequest();a.setPrivateAnnotation(E,"transient",true);l();}function x(y,z){var A=z.getGroupId();a.setPrivateAnnotation(E,"transient",A);a.addByPath(u.mPostRequests,i,E);return S.all([u.oRequestor.request("POST",y,z,null,o,w,v,undefined,a.buildPath(u.sResourcePath,i,t)),u.fetchTypes()]).then(function(R){var B=R[0],D;a.deletePrivateAnnotation(E,"postBody");a.deletePrivateAnnotation(E,"transient");E["@$ui5.context.isTransient"]=false;a.removeByPath(u.mPostRequests,i,E);u.visitResponse(B,R[1],a.getMetaPath(a.buildPath(u.sMetaPath,i)),i+t,K);if(!K){D=a.getPrivateAnnotation(B,"predicate");if(D){n.$byPredicate[D]=E;a.updateTransientPaths(u.mChangeListeners,t,D);}}a.updateSelected(u.mChangeListeners,a.buildPath(i,D||t),E,B,a.getQueryOptionsForPath(u.mQueryOptions,i).$select);u.removePendingRequest();return E;},function(B){if(B.canceled){throw B;}u.removePendingRequest();k(B);return x(y,u.oRequestor.lockGroup(u.oRequestor.getGroupSubmitMode(A)==="API"?A:"$parked."+A,u,true,true));});}E=a.merge({},E);E=b.cleanPayload(E);o=a.merge({},E);a.setPrivateAnnotation(E,"postBody",o);a.setPrivateAnnotation(E,"transientPredicate",t);E["@$ui5.context.isTransient"]=true;n=this.getValue(i);if(!Array.isArray(n)){throw new Error("Create is only supported for collections; '"+i+"' does not reference a collection");}n.unshift(E);n.$created+=1;f(this.mChangeListeners,i,n,1);n.$byPredicate=n.$byPredicate||{};n.$byPredicate[t]=E;if(!i){u.adjustReadRequests(0,1);}return p.then(function(y){y+=u.oRequestor.buildQueryString(u.sMetaPath,u.mQueryOptions,true);return x(y,G);});};C.prototype.deregisterChange=function(p,l){a.removeByPath(this.mChangeListeners,p,l);};C.prototype.drillDown=function(D,p,G){var o=S.resolve(D),E,k,l,t=false,n=this;function u(i){L.error("Failed to drill-down into "+p+", invalid segment: "+i,n.toString(),"sap.ui.model.odata.v4.lib._Cache");return undefined;}function v(V,i,w){var x=p.split("/").slice(0,w).join("/"),R,y;if(Array.isArray(V)){return u(i);}return n.oRequestor.getModelInterface().fetchMetadata(n.sMetaPath+"/"+a.getMetaPath(x)).then(function(z){if(!z){return u(i);}if(z.$Type==="Edm.Stream"){R=V[i+"@odata.mediaReadLink"];y=n.oRequestor.getServiceUrl();return R||a.buildPath(y+n.sResourcePath,x);}if(!t){if(!E&&!Array.isArray(D)){E=D;k=0;}return E&&n.fetchLateProperty(G,E,l.slice(0,k).join("/"),l.slice(k).join("/"),l.slice(k,w).join("/"))||u(i);}if(z.$kind==="NavigationProperty"){return null;}if(!z.$Type.startsWith("Edm.")){return{};}if("$DefaultValue"in z){return z.$Type==="Edm.String"?z.$DefaultValue:a.parseLiteral(z.$DefaultValue,z.$Type,x);}return null;});}if(!p){return o;}l=p.split("/");return l.reduce(function(w,x,i){return w.then(function(V){var M,y;if(x==="$count"){return Array.isArray(V)?V.$count:u(x);}if(V===undefined||V===null){return undefined;}if(typeof V!=="object"||x==="@$ui5._"){return u(x);}if(a.getPrivateAnnotation(V,"predicate")){E=V;k=i;}y=V;t=t||a.getPrivateAnnotation(V,"transient");M=e.exec(x);if(M){if(M[1]){V=V[M[1]];}if(V){V=V.$byPredicate[M[2]];}}else{V=V[C.from$skip(x,V)];}return V===undefined&&x[0]!=="#"&&x[0]!=="@"?v(y,x,i+1):V;});},o);};C.prototype.fetchLateProperty=function(G,R,i,k,M){var F,l,n,p,Q,o,t=a.getMetaPath(i),T=this.fetchTypes().getResult(),u=[k],v=this;function w(x,B){var y=a.buildPath(F,B),E=T[y],z;if(!E){E=v.fetchType(T,y).getResult();}(E.$Key||[]).forEach(function(K){if(typeof K==="object"){K=K[Object.keys(K)[0]];}x.$select.push(K);u.push(a.buildPath(B,K));});if(B){u.push(B+"/@odata.etag");u.push(B+"/@$ui5._/predicate");}if(x.$expand){if(x.$select.length>1){x.$select=x.$select.slice(1);}z=Object.keys(x.$expand)[0];w(x.$expand[z],a.buildPath(B,z));}}if(!this.mLateQueryOptions){return undefined;}Q=a.intersectQueryOptions(this.mLateQueryOptions,[a.buildPath(t,k)],this.oRequestor.getModelInterface().fetchMetadata,this.sMetaPath,{});if(!Q){return undefined;}Q=a.getQueryOptionsForPath(Q,i);F=a.buildPath(this.sMetaPath,t);w(Q);l=a.buildPath(this.sResourcePath,i);o=l+this.oRequestor.buildQueryString(F,Q,false,true);p=this.mPropertyRequestByPath[o];if(!p){n=l+this.oRequestor.buildQueryString(F,this.mQueryOptions,true);p=this.oRequestor.request("GET",n,G.getUnlockedCopy(),undefined,undefined,undefined,undefined,F,undefined,false,Q).then(function(D){v.visitResponse(D,T,F,i);return D;}).finally(function(){delete v.mPropertyRequestByPath[o];});this.mPropertyRequestByPath[o]=p;}return p.then(function(D){if(a.getPrivateAnnotation(R,"predicate")!==a.getPrivateAnnotation(D,"predicate")){throw new Error("GET "+o+": Key predicate changed from "+a.getPrivateAnnotation(R,"predicate")+" to "+a.getPrivateAnnotation(D,"predicate"));}if(D["@odata.etag"]!==R["@odata.etag"]){throw new Error("GET "+o+": ETag changed");}a.updateSelected(v.mChangeListeners,i,R,D,u);return a.drillDown(R,M.split("/"));});};C.prototype.fetchType=function(t,M){var i=this;return this.oRequestor.fetchTypeForPath(M).then(function(T){var o,p=[];if(T){o=i.oRequestor.getModelInterface().fetchMetadata(M+"/"+m).getResult();if(o){T=Object.create(T);T[m]=o;}t[M]=T;(T.$Key||[]).forEach(function(k){if(typeof k==="object"){k=k[Object.keys(k)[0]];p.push(i.fetchType(t,M+"/"+k.slice(0,k.lastIndexOf("/"))));}});return S.all(p).then(function(){return T;});}});};C.prototype.fetchTypes=function(){var p,t,i=this;function k(B,Q){if(Q&&Q.$expand){Object.keys(Q.$expand).forEach(function(n){var M=B;n.split("/").forEach(function(l){M+="/"+l;p.push(i.fetchType(t,M));});k(M,Q.$expand[n]);});}}if(!this.oTypePromise){p=[];t={};p.push(this.fetchType(t,this.sMetaPath));if(this.bFetchOperationReturnType){p.push(this.fetchType(t,this.sMetaPath+"/$Type"));}k(this.sMetaPath,this.mQueryOptions);this.oTypePromise=S.all(p).then(function(){return t;});}return this.oTypePromise;};C.prototype.getLateQueryOptions=function(){return this.mLateQueryOptions;};C.prototype.getMeasureRangePromise=function(){return undefined;};C.prototype.getValue=function(p){throw new Error("Unsupported operation");};C.prototype.getOriginalResourcePath=function(E){return this.fnGetOriginalResourcePath&&this.fnGetOriginalResourcePath(E)||this.sResourcePath;};C.prototype.hasChangeListeners=function(){return!c(this.mChangeListeners);};C.prototype.hasPendingChangesForPath=function(p){return Object.keys(this.mPatchRequests).some(function(R){return g(R,p);})||Object.keys(this.mPostRequests).some(function(R){return g(R,p);});};C.prototype.patch=function(p,D){var t=this;return this.fetchValue(_.$cached,p).then(function(o){a.updateExisting(t.mChangeListeners,p,o,D);return o;});};C.prototype.refreshSingle=function(G,p,i,D){var t=this;return this.fetchValue(_.$cached,p).then(function(E){var k=a.getPrivateAnnotation(E[i],"predicate"),R=a.buildPath(t.sResourcePath,p,k),Q=Object.assign({},a.getQueryOptionsForPath(t.mQueryOptions,p));delete Q["$apply"];delete Q["$count"];delete Q["$filter"];delete Q["$orderby"];delete Q["$search"];R+=t.oRequestor.buildQueryString(t.sMetaPath,Q,false,t.bSortExpandSelect);t.bSentReadRequest=true;return S.all([t.oRequestor.request("GET",R,G,undefined,undefined,D),t.fetchTypes()]).then(function(l){var o=l[0];t.replaceElement(E,i,k,o,l[1],p);return o;});});};C.prototype.refreshSingleWithRemove=function(G,p,i,D,o){var t=this;return S.all([this.fetchValue(_.$cached,p),this.fetchTypes()]).then(function(R){var E=R[0],k=E[i],l=a.getPrivateAnnotation(k,"predicate"),Q=Object.assign({},a.getQueryOptionsForPath(t.mQueryOptions,p)),F=Q["$filter"],n=a.buildPath(t.sResourcePath,p),T=R[1];delete Q["$count"];delete Q["$orderby"];Q["$filter"]=(F?"("+F+") and ":"")+a.getKeyFilter(k,t.sMetaPath,T);n+=t.oRequestor.buildQueryString(t.sMetaPath,Q,false,t.bSortExpandSelect);t.bSentReadRequest=true;return t.oRequestor.request("GET",n,G,undefined,undefined,D).then(function(u){if(u.value.length>1){throw new Error("Unexpected server response, more than one entity returned.");}else if(u.value.length===0){t.removeElement(E,i,l,p);t.oRequestor.getModelInterface().reportBoundMessages(t.sResourcePath,[],[p+l]);o();}else{t.replaceElement(E,i,l,u.value[0],T,p);}});});};C.prototype.registerChange=function(p,l){this.checkActive();a.addByPath(this.mChangeListeners,p,l);};C.prototype.removeElement=function(E,i,p,k){var o,t;i=C.getElementIndex(E,p,i);o=E[i];E.splice(i,1);delete E.$byPredicate[p];t=a.getPrivateAnnotation(o,"transientPredicate");if(t){E.$created-=1;delete E.$byPredicate[t];}else if(!k){this.iLimit-=1;this.adjustReadRequests(i,-1);}f(this.mChangeListeners,k,E,-1);return i;};C.prototype.removePendingRequest=function(){this.oPendingRequestsPromise.$count-=1;if(!this.oPendingRequestsPromise.$count){this.oPendingRequestsPromise.$resolve();this.oPendingRequestsPromise=null;}};C.prototype.replaceElement=function(E,i,p,o,t,k){var O,T;i=C.getElementIndex(E,p,i);O=E[i];E[i]=E.$byPredicate[p]=o;T=a.getPrivateAnnotation(O,"transientPredicate");if(T){o["@$ui5.context.isTransient"]=false;E.$byPredicate[T]=o;a.setPrivateAnnotation(o,"transientPredicate",T);}this.visitResponse(o,t,a.getMetaPath(a.buildPath(this.sMetaPath,k)),k+p);};C.prototype.resetChangesForPath=function(p){var t=this;Object.keys(this.mPatchRequests).forEach(function(R){var i,k;if(g(R,p)){k=t.mPatchRequests[R];for(i=k.length-1;i>=0;i-=1){t.oRequestor.removePatch(k[i]);}delete t.mPatchRequests[R];}});Object.keys(this.mPostRequests).forEach(function(R){var E,i,T;if(g(R,p)){E=t.mPostRequests[R];for(i=E.length-1;i>=0;i-=1){T=a.getPrivateAnnotation(E[i],"transient");t.oRequestor.removePost(T,E[i]);}delete t.mPostRequests[R];}});};C.prototype.setActive=function(A){this.bActive=A;if(!A){this.mChangeListeners={};}};C.prototype.setLateQueryOptions=function(Q){this.mLateQueryOptions={$select:Q.$select,$expand:Q.$expand};};C.prototype.setProperty=function(p,v,E){var t=this;return this.fetchValue(_.$cached,E).then(function(o){a.updateSelected(t.mChangeListeners,E,o,C.makeUpdateData(p.split("/"),v));});};C.prototype.setQueryOptions=function(Q){if(this.bSentReadRequest){throw new Error("Cannot set query options: Cache has already sent a read request");}this.mQueryOptions=Q;this.sQueryString=this.oRequestor.buildQueryString(this.sMetaPath,Q,false,this.bSortExpandSelect);};C.prototype.toString=function(){return this.oRequestor.getServiceUrl()+this.sResourcePath+this.sQueryString;};C.prototype.update=function(G,p,v,E,i,k,u,l,n){var o,t=p.split("/"),U,w=this;try{o=this.fetchValue(_.$cached,k);}catch(x){if(!x.$cached){throw x;}o=S.resolve({"@odata.etag":"*"});}return o.then(function(y){var F=a.buildPath(k,p),z=G.getGroupId(),O,A,B,D,T,H,I=C.makeUpdateData(t,v);function J(){a.removeByPath(w.mPatchRequests,F,A);a.updateExisting(w.mChangeListeners,k,y,C.makeUpdateData(t,O));}function K(M,N){var R;function Q(){R=w.oRequestor.lockGroup(z,w,true);if(n){n();}}A=w.oRequestor.request("PATCH",i,M,{"If-Match":y},I,Q,J,undefined,a.buildPath(w.getOriginalResourcePath(y),k),N);a.addByPath(w.mPatchRequests,F,A);return S.all([A,w.fetchTypes()]).then(function(V){var W=V[0];a.removeByPath(w.mPatchRequests,F,A);if(!l){w.visitResponse(W,V[1],a.getMetaPath(a.buildPath(w.sMetaPath,k)),k);}a.updateExisting(w.mChangeListeners,k,y,l?{"@odata.etag":W["@odata.etag"]}:W);},function(x){var V=z;a.removeByPath(w.mPatchRequests,F,A);if(!E||x.canceled){throw x;}E(x);switch(w.oRequestor.getGroupSubmitMode(z)){case"API":break;case"Auto":if(!w.oRequestor.hasChanges(z,y)){V="$parked."+z;}break;default:throw x;}R.unlock();R=undefined;return K(w.oRequestor.lockGroup(V,w,true,true),true);}).finally(function(){if(R){R.unlock();}});}if(!y){throw new Error("Cannot update '"+p+"': '"+k+"' does not exist");}T=a.getPrivateAnnotation(y,"transient");if(T){if(T===true){throw new Error("No 'update' allowed while waiting for server response");}if(T.indexOf("$parked.")===0){D=T;T=T.slice(8);}if(T!==z){throw new Error("The entity will be created via group '"+T+"'. Cannot patch via group '"+z+"'");}}O=a.drillDown(y,t);a.updateAll(w.mChangeListeners,k,y,I);B=a.getPrivateAnnotation(y,"postBody");if(B){a.updateAll({},k,B,I);}if(u){U=u.split("/");u=a.buildPath(k,u);H=w.getValue(u);if(H===undefined){L.debug("Missing value for unit of measure "+u+" when updating "+F,w.toString(),"sap.ui.model.odata.v4.lib._Cache");}else{a.merge(T?B:I,C.makeUpdateData(U,H));}}if(T){if(D){a.setPrivateAnnotation(y,"transient",T);w.oRequestor.relocate(D,B,T);}G.unlock();return Promise.resolve();}w.oRequestor.relocateAll("$parked."+z,z,y);i+=w.oRequestor.buildQueryString(w.sMetaPath,w.mQueryOptions,true);return K(G);});};C.prototype.visitResponse=function(R,t,k,l,K,n){var o,H=false,p={},u=this.oRequestor.getServiceUrl()+this.sResourcePath,v=this;function w(M,i,A){H=true;if(M&&M.length){p[i]=M;M.forEach(function(B){if(B.longtextUrl){B.longtextUrl=a.makeAbsolute(B.longtextUrl,A);}});}}function x(B,i){return i?a.makeAbsolute(i,B):B;}function y(I,M,A,B){var D={},i,E,F,G;for(i=0;i<I.length;i+=1){F=I[i];E=A===""?n+i:i;if(F&&typeof F==="object"){z(F,M,A,B,E);G=a.getPrivateAnnotation(F,"predicate");if(!A){o.push(G||E.toString());}if(G){D[G]=F;I.$byPredicate=D;}}}}function z(i,M,I,A,B){var D,E,T=t[M],F=T&&T[m]&&T[m].$Path,G;A=x(A,i["@odata.context"]);E=v.calculateKeyPredicate(i,t,M);if(B!==undefined){I=a.buildPath(I,E||B);}else if(!K&&E){D=r.exec(I);if(D){I=I.slice(0,-D[0].length)+E;}}if(l&&!o){o=[I];}if(F){G=a.drillDown(i,F.split("/"));if(G!==undefined){w(G,I,A);}}Object.keys(i).forEach(function(J){var N,O=M+"/"+J,Q=i[J],U=a.buildPath(I,J);if(J.endsWith("@odata.mediaReadLink")){i[J]=a.makeAbsolute(Q,A);}if(J.includes("@")){return;}if(Array.isArray(Q)){Q.$created=0;Q.$count=undefined;N=i[J+"@odata.count"];if(N){s({},"",Q,N);}else if(!i[J+"@odata.nextLink"]){s({},"",Q,Q.length);}y(Q,O,U,x(A,i[J+"@odata.context"]));}else if(Q&&typeof Q==="object"){z(Q,O,U,A);}});}if(n!==undefined){o=[];y(R.value,k||this.sMetaPath,"",x(u,R["@odata.context"]));}else if(R&&typeof R==="object"){z(R,k||this.sMetaPath,l||"",u);}if(H){this.oRequestor.getModelInterface().reportBoundMessages(this.getOriginalResourcePath(R),p,o);}};function h(R,i,Q,k,D){C.call(this,R,i,Q,k,function(){return D;});this.sContext=undefined;this.aElements=[];this.aElements.$byPredicate={};this.aElements.$count=undefined;this.aElements.$created=0;this.aElements.$tail=undefined;this.iLimit=Infinity;this.aReadRequests=[];this.bServerDrivenPaging=false;this.oSyncPromiseAll=undefined;}h.prototype=Object.create(C.prototype);h.prototype.adjustReadRequests=function(i,o){this.aReadRequests.forEach(function(R){if(R.iStart>=i){R.iStart+=o;R.iEnd+=o;}});};h.prototype.fetchValue=function(G,p,D,l){var E,t=this;G.unlock();if(!this.oSyncPromiseAll){E=this.aElements.$tail?this.aElements.concat(this.aElements.$tail):this.aElements;this.oSyncPromiseAll=S.all(E);}return this.oSyncPromiseAll.then(function(){t.registerChange(p,l);return t.drillDown(t.aElements,p,G);});};h.prototype.fill=function(p,k,E){var i,n=Math.max(this.aElements.length,1024);if(E>n){if(this.aElements.$tail&&p){throw new Error("Cannot fill from "+k+" to "+E+", $tail already in use, # of elements is "+this.aElements.length);}this.aElements.$tail=p;E=this.aElements.length;}for(i=k;i<E;i+=1){this.aElements[i]=p;}this.oSyncPromiseAll=undefined;};h.prototype.getQueryString=function(){var Q=Object.assign({},this.mQueryOptions),E,k,F=Q["$filter"],i,K,l=[],n=this.sQueryString,t;for(i=0;i<this.aElements.$created;i+=1){E=this.aElements[i];if(!E["@$ui5.context.isTransient"]){t=t||this.fetchTypes().getResult();K=a.getKeyFilter(E,this.sMetaPath,t);if(K){l.push(K);}}}if(l.length){k="not ("+l.join(" or ")+")";if(F){Q["$filter"]="("+F+") and "+k;n=this.oRequestor.buildQueryString(this.sMetaPath,Q,false,this.bSortExpandSelect);}else{n+=(n?"&":"?")+"$filter="+a.encode(k,false);}}return n;};h.prototype.getReadRange=function(k,l,p){var E=this.aElements;function n(k,o){var i;for(i=k;i<o;i+=1){if(E[i]===undefined){return true;}}return false;}if(n(k+l,k+l+p/2)){l+=p;}if(n(Math.max(k-p/2,0),k)){l+=p;k-=p;if(k<0){l+=k;if(isNaN(l)){l=Infinity;}k=0;}}return{length:l,start:k};};h.prototype.getResourcePath=function(i,E){var k=this.aElements.$created,Q=this.getQueryString(),D=Q?"&":"?",l=E-i,R=this.sResourcePath+Q;if(i<k){throw new Error("Must not request created element");}i-=k;if(i>0||l<Infinity){R+=D+"$skip="+i;}if(l<Infinity){R+="&$top="+l;}return R;};h.prototype.getValue=function(p){var o=this.drillDown(this.aElements,p,_.$cached);if(o.isFulfilled()){return o.getResult();}};h.prototype.handleResponse=function(k,E,R,t){var l=-1,n,o=this.aElements.$created,p,i,O=this.aElements.$count,u,v=R.value.length;this.sContext=R["@odata.context"];this.visitResponse(R,t,undefined,undefined,undefined,k);for(i=0;i<v;i+=1){p=R.value[i];this.aElements[k+i]=p;u=a.getPrivateAnnotation(p,"predicate");if(u){this.aElements.$byPredicate[u]=p;}}n=R["@odata.count"];if(n){this.iLimit=l=parseInt(n);}if(R["@odata.nextLink"]){this.bServerDrivenPaging=true;if(E<this.aElements.length){for(i=k+v;i<E;i+=1){delete this.aElements[i];}}else{this.aElements.length=k+v;}}else if(v<E-k){if(l===-1){l=O&&O-o;}l=Math.min(l!==undefined?l:Infinity,k-o+v);this.aElements.length=o+l;this.iLimit=l;if(!n&&l>0&&!this.aElements[l-1]){l=undefined;}}if(l!==-1){s(this.mChangeListeners,"",this.aElements,l!==undefined?l+o:undefined);}};h.prototype.read=function(I,l,p,G,D){var i,n,E,k,o=-1,t=this.oPendingRequestsPromise||this.aElements.$tail,R,u=this;if(I<0){throw new Error("Illegal index "+I+", must be >= 0");}if(l<0){throw new Error("Illegal length "+l+", must be >= 0");}if(t){return t.then(function(){return u.read(I,l,p,G,D);});}R=this.getReadRange(I,l,this.bServerDrivenPaging?0:p);k=Math.min(R.start+R.length,this.aElements.$created+this.iLimit);n=Math.min(k,Math.max(R.start,this.aElements.length)+1);for(i=R.start;i<n;i+=1){if(this.aElements[i]!==undefined){if(o>=0){this.requestElements(o,i,G.getUnlockedCopy(),D);D=undefined;o=-1;}}else if(o<0){o=i;}}if(o>=0){this.requestElements(o,k,G.getUnlockedCopy(),D);}G.unlock();E=this.aElements.slice(I,k);if(this.aElements.$tail){E.push(this.aElements.$tail);}return S.all(E).then(function(){var v;u.checkActive();v={"@odata.context":u.sContext,value:u.aElements.slice(I,k)};v.value.$count=u.aElements.$count;return v;});};h.prototype.requestElements=function(i,E,G,D){var p,R={iEnd:E,iStart:i},t=this;this.aReadRequests.push(R);p=S.all([this.oRequestor.request("GET",this.getResourcePath(i,E),G,undefined,undefined,D),this.fetchTypes()]).then(function(k){if(t.aElements.$tail===p){t.aElements.$tail=undefined;}t.handleResponse(R.iStart,R.iEnd,k[0],k[1]);}).catch(function(o){t.fill(undefined,R.iStart,R.iEnd);throw o;}).finally(function(){t.aReadRequests.splice(t.aReadRequests.indexOf(R),1);});this.bSentReadRequest=true;this.fill(p,i,E);};h.prototype.requestSideEffects=function(G,p,N,k,l){var E,F=[],Q,R,t=this.fetchTypes().getResult(),o=this,i;function u(n){var v=a.getKeyFilter(n,o.sMetaPath,t);F.push(v);return v;}if(this.oPendingRequestsPromise){return this.oPendingRequestsPromise.then(function(){return o.requestSideEffects(G,p,N,k,l);});}Q=a.intersectQueryOptions(this.mLateQueryOptions||this.mQueryOptions,p,this.oRequestor.getModelInterface().fetchMetadata,this.sMetaPath,N,"",true);if(!Q){return S.resolve();}if(l===undefined){if(!u(this.aElements[k])){return null;}}else{for(i=0;i<this.aElements.length;i+=1){E=this.aElements[i];if(!E||a.hasPrivateAnnotation(E,"transient")){continue;}if((i<k||i>=k+l)&&!a.hasPrivateAnnotation(E,"transientPredicate")){delete this.aElements.$byPredicate[a.getPrivateAnnotation(E,"predicate")];delete this.aElements[i];continue;}if(!u(E)){return null;}}this.aElements.length=l?Math.min(k+l,this.aElements.length):this.aElements.$created;if(!F.length){return S.resolve();}}Q.$filter=F.join(" or ");a.selectKeyProperties(Q,t[this.sMetaPath]);delete Q.$count;delete Q.$orderby;delete Q.$search;R=this.sResourcePath+this.oRequestor.buildQueryString(this.sMetaPath,Q,false,true);return this.oRequestor.request("GET",R,G).then(function(v){var E,w,i,n;if(v.value.length!==F.length){throw new Error("Expected "+F.length+" row(s), but instead saw "+v.value.length);}o.visitResponse(v,t,undefined,"",false,NaN);for(i=0,n=v.value.length;i<n;i+=1){E=v.value[i];w=a.getPrivateAnnotation(E,"predicate");a.updateAll(o.mChangeListeners,w,o.aElements.$byPredicate[w],E);}});};function P(R,i,Q){C.call(this,R,i,Q);this.oPromise=null;}P.prototype=Object.create(C.prototype);P.prototype._delete=function(){throw new Error("Unsupported");};P.prototype.create=function(){throw new Error("Unsupported");};P.prototype.fetchValue=function(G,p,D,l){var t=this;if(this.oPromise){G.unlock();}else{this.oPromise=S.resolve(this.oRequestor.request("GET",this.sResourcePath+this.sQueryString,G,undefined,undefined,D,undefined,this.sMetaPath));this.bSentReadRequest=true;}return this.oPromise.then(function(R){t.registerChange("",l);return R.value;});};P.prototype.update=function(){throw new Error("Unsupported");};function j(R,i,Q,k,G,p,M,F){C.apply(this,arguments);this.bFetchOperationReturnType=F;this.sMetaPath=M||this.sMetaPath;this.bPost=p;this.bPosting=false;this.oPromise=null;}j.prototype=Object.create(C.prototype);j.prototype.fetchValue=function(G,p,D,l){var R=this.sResourcePath+this.sQueryString,t=this;if(this.oPromise){G.unlock();}else{if(this.bPost){throw new Error("Cannot fetch a value before the POST request");}this.oPromise=S.all([this.oRequestor.request("GET",R,G,undefined,undefined,D,undefined,this.sMetaPath),this.fetchTypes()]).then(function(i){t.visitResponse(i[0],i[1],t.bFetchOperationReturnType?t.sMetaPath+"/$Type":undefined);return i[0];});this.bSentReadRequest=true;}return this.oPromise.then(function(o){if(o["$ui5.deleted"]){throw new Error("Cannot read a deleted entity");}t.registerChange(p,l);return t.drillDown(o,p,G);});};j.prototype.getValue=function(p){var o;if(this.oPromise&&this.oPromise.isFulfilled()){o=this.drillDown(this.oPromise.getResult(),p,_.$cached);if(o.isFulfilled()){return o.getResult();}}};j.prototype.post=function(G,D,E){var i,H="POST",t=this;if(!this.bPost){throw new Error("POST request not allowed");}if(this.bPosting){throw new Error("Parallel POST requests not allowed");}if(E){i=G.getGroupId();this.oRequestor.relocateAll("$parked."+i,i,E);}if(D){H=D["X-HTTP-Method"]||H;delete D["X-HTTP-Method"];if(this.oRequestor.isActionBodyOptional()&&!Object.keys(D).length){D=undefined;}}this.oPromise=S.all([this.oRequestor.request(H,this.sResourcePath+this.sQueryString,G,{"If-Match":E},D),this.fetchTypes()]).then(function(R){t.bPosting=false;t.visitResponse(R[0],R[1],t.bFetchOperationReturnType?t.sMetaPath+"/$Type":undefined);return R[0];},function(o){t.bPosting=false;throw o;});this.bPosting=true;return this.oPromise;};j.prototype.requestSideEffects=function(G,p,n,R){var o=this.oPromise,Q=o&&a.intersectQueryOptions(this.mLateQueryOptions||this.mQueryOptions,p,this.oRequestor.getModelInterface().fetchMetadata,this.sMetaPath+"/$Type",n),i,t=this;if(!Q){return S.resolve();}R=(R||this.sResourcePath)+this.oRequestor.buildQueryString(this.sMetaPath,Q,false,true);i=S.all([this.oRequestor.request("GET",R,G),this.fetchTypes(),this.fetchValue(_.$cached,"")]).then(function(k){var N=k[0],O=k[2];t.visitResponse(N,k[1]);a.updateAll(t.mChangeListeners,"",O,N);return O;});this.oPromise=i.catch(function(){return o;});return i;};C.create=function(R,i,Q,k,D){return new h(R,i,Q,k,D);};C.createProperty=function(R,i,Q){return new P(R,i,Q);};C.createSingle=function(R,i,Q,k,G,p,M,F){return new j(R,i,Q,k,G,p,M,F);};C.from$skip=function(i,k){return d.test(i)?k.$created+Number(i):i;};C.getElementIndex=function(E,k,i){var o=E[i];if(!o||a.getPrivateAnnotation(o,"predicate")!==k){i=E.indexOf(E.$byPredicate[k]);}return i;};C.makeUpdateData=function(p,v){return p.reduceRight(function(V,i){var R={};R[i]=V;return R;},v);};return C;},false);
