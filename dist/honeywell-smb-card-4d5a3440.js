import t from"rangetouch";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var e=function(t,i){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},e(t,i)};function i(t,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function o(){this.constructor=t}e(t,i),t.prototype=null===i?Object.create(i):(o.prototype=i.prototype,new o)}var o=function(){return o=Object.assign||function(t){for(var e,i=1,o=arguments.length;i<o;i++)for(var r in e=arguments[i])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t},o.apply(this,arguments)};function r(t,e,i,o){var r,n=arguments.length,s=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(s=(n<3?r(s):n>3?r(e,i,s):r(e,i))||s);return n>3&&s&&Object.defineProperty(e,i,s),s}function n(t){var e="function"==typeof Symbol&&Symbol.iterator,i=e&&t[e],o=0;if(i)return i.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&o>=t.length&&(t=void 0),{value:t&&t[o++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=window,a=s.ShadowRoot&&(void 0===s.ShadyCSS||s.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,l=Symbol(),c=new WeakMap;class h{constructor(t,e,i){if(this._$cssResult$=!0,i!==l)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(a&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=c.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&c.set(e,t))}return t}toString(){return this.cssText}}const d=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1]),t[0]);return new h(i,t,l)},u=a?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new h("string"==typeof t?t:t+"",void 0,l))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var p;const m=window,g=m.trustedTypes,f=g?g.emptyScript:"",v=m.reactiveElementPolyfillSupport,y={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>e!==t&&(e==e||t==t),w={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:b};class _ extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;null!==(e=this.h)&&void 0!==e||(this.h=[]),this.h.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const o=this._$Ep(i,e);void 0!==o&&(this._$Ev.set(o,i),t.push(o))})),t}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,o=this.getPropertyDescriptor(t,i,e);void 0!==o&&Object.defineProperty(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(o){const r=this[t];this[e]=o,this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||w}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(u(t))}else void 0!==t&&e.push(u(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{a?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const i=document.createElement("style"),o=s.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=e.cssText,t.appendChild(i)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=w){var o;const r=this.constructor._$Ep(t,i);if(void 0!==r&&!0===i.reflect){const n=(void 0!==(null===(o=i.converter)||void 0===o?void 0:o.toAttribute)?i.converter:y).toAttribute(e,i.type);this._$El=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this._$El=null}}_$AK(t,e){var i;const o=this.constructor,r=o._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=o.getPropertyOptions(r),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:y;this._$El=r,this[r]=n.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let o=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||b)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var x;_.finalized=!0,_.elementProperties=new Map,_.elementStyles=[],_.shadowRootOptions={mode:"open"},null==v||v({ReactiveElement:_}),(null!==(p=m.reactiveElementVersions)&&void 0!==p?p:m.reactiveElementVersions=[]).push("1.4.1");const $=window,E=$.trustedTypes,A=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,C=`lit$${(Math.random()+"").slice(9)}$`,S="?"+C,k=`<${S}>`,T=document,H=(t="")=>T.createComment(t),j=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,R=/>/g,U=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),z=/'/g,N=/"/g,D=/^(?:script|style|textarea|title)$/i,L=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),I=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),W=new WeakMap,B=T.createTreeWalker(T,129,null,!1),q=(t,e)=>{const i=t.length-1,o=[];let r,n=2===e?"<svg>":"",s=P;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(s.lastIndex=h,l=s.exec(i),null!==l);)h=s.lastIndex,s===P?"!--"===l[1]?s=M:void 0!==l[1]?s=R:void 0!==l[2]?(D.test(l[2])&&(r=RegExp("</"+l[2],"g")),s=U):void 0!==l[3]&&(s=U):s===U?">"===l[0]?(s=null!=r?r:P,c=-1):void 0===l[1]?c=-2:(c=s.lastIndex-l[2].length,a=l[1],s=void 0===l[3]?U:'"'===l[3]?N:z):s===N||s===z?s=U:s===M||s===R?s=P:(s=U,r=void 0);const d=s===U&&t[e+1].startsWith("/>")?" ":"";n+=s===P?i+k:c>=0?(o.push(a),i.slice(0,c)+"$lit$"+i.slice(c)+C+d):i+C+(-2===c?(o.push(void 0),e):d)}const a=n+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==A?A.createHTML(a):a,o]};class F{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let r=0,n=0;const s=t.length-1,a=this.parts,[l,c]=q(t,e);if(this.el=F.createElement(l,i),B.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(o=B.nextNode())&&a.length<s;){if(1===o.nodeType){if(o.hasAttributes()){const t=[];for(const e of o.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(C)){const i=c[n++];if(t.push(e),void 0!==i){const t=o.getAttribute(i.toLowerCase()+"$lit$").split(C),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:r,name:e[2],strings:t,ctor:"."===e[1]?Y:"?"===e[1]?Q:"@"===e[1]?tt:X})}else a.push({type:6,index:r})}for(const e of t)o.removeAttribute(e)}if(D.test(o.tagName)){const t=o.textContent.split(C),e=t.length-1;if(e>0){o.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],H()),B.nextNode(),a.push({type:2,index:++r});o.append(t[e],H())}}}else if(8===o.nodeType)if(o.data===S)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=o.data.indexOf(C,t+1));)a.push({type:7,index:r}),t+=C.length-1}r++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,o){var r,n,s,a;if(e===I)return e;let l=void 0!==o?null===(r=i._$Co)||void 0===r?void 0:r[o]:i._$Cl;const c=j(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,i,o)),void 0!==o?(null!==(s=(a=i)._$Co)&&void 0!==s?s:a._$Co=[])[o]=l:i._$Cl=l),void 0!==l&&(e=J(t,l._$AS(t,e.values),l,o)),e}class K{constructor(t,e){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var e;const{el:{content:i},parts:o}=this._$AD,r=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:T).importNode(i,!0);B.currentNode=r;let n=B.nextNode(),s=0,a=0,l=o[0];for(;void 0!==l;){if(s===l.index){let e;2===l.type?e=new Z(n,n.nextSibling,this,t):1===l.type?e=new l.ctor(n,l.name,l.strings,this,t):6===l.type&&(e=new et(n,this,t)),this.u.push(e),l=o[++a]}s!==(null==l?void 0:l.index)&&(n=B.nextNode(),s++)}return r}p(t){let e=0;for(const i of this.u)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Z{constructor(t,e,i,o){var r;this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cm=null===(r=null==o?void 0:o.isConnected)||void 0===r||r}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),j(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==I&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.k(t):this.g(t)}O(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==V&&j(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){var e;const{values:i,_$litType$:o}=t,r="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=F.createElement(o.h,this.options)),o);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===r)this._$AH.p(i);else{const t=new K(r,this),e=t.v(this.options);t.p(i),this.T(e),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new F(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const r of t)o===e.length?e.push(i=new Z(this.O(H()),this.O(H()),this,this.options)):i=e[o],i._$AI(r),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cm=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class X{constructor(t,e,i,o,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,o){const r=this.strings;let n=!1;if(void 0===r)t=J(this,t,e,0),n=!j(t)||t!==this._$AH&&t!==I,n&&(this._$AH=t);else{const o=t;let s,a;for(t=r[0],s=0;s<r.length-1;s++)a=J(this,o[i+s],e,s),a===I&&(a=this._$AH[s]),n||(n=!j(a)||a!==this._$AH[s]),a===V?t=V:t!==V&&(t+=(null!=a?a:"")+r[s+1]),this._$AH[s]=a}n&&!o&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Y extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}const G=E?E.emptyScript:"";class Q extends X{constructor(){super(...arguments),this.type=4}j(t){t&&t!==V?this.element.setAttribute(this.name,G):this.element.removeAttribute(this.name)}}class tt extends X{constructor(t,e,i,o,r){super(t,e,i,o,r),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=J(this,t,e,0))&&void 0!==i?i:V)===I)return;const o=this._$AH,r=t===V&&o!==V||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,n=t!==V&&(o===V||r);r&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class et{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const it=$.litHtmlPolyfillSupport;null==it||it(F,Z),(null!==(x=$.litHtmlVersions)&&void 0!==x?x:$.litHtmlVersions=[]).push("2.4.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ot,rt;class nt extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var o,r;const n=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:e;let s=n._$litPart$;if(void 0===s){const t=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:null;n._$litPart$=s=new Z(e.insertBefore(H(),t),t,void 0,null!=i?i:{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return I}}nt.finalized=!0,nt._$litElement$=!0,null===(ot=globalThis.litElementHydrateSupport)||void 0===ot||ot.call(globalThis,{LitElement:nt});const st=globalThis.litElementPolyfillSupport;null==st||st({LitElement:nt}),(null!==(rt=globalThis.litElementVersions)&&void 0!==rt?rt:globalThis.litElementVersions=[]).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:o}=e;return{kind:i,elements:o,finisher(e){customElements.define(t,e)}}})(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,lt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function ct(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):lt(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function ht(t){return ct({...t,state:!0})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const dt=({finisher:t,descriptor:e})=>(i,o)=>{var r;if(void 0===o){const o=null!==(r=i.originalKey)&&void 0!==r?r:i.key,n=null!=e?{kind:"method",placement:"prototype",key:o,descriptor:e(i.key)}:{...i,key:o};return null!=t&&(n.finisher=function(e){t(e,o)}),n}{const r=i.constructor;void 0!==e&&Object.defineProperty(i,o,e(o)),null==t||t(r,o)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;function ut(t){return dt({finisher:(e,i)=>{Object.assign(e.prototype[i],t)}})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return dt({descriptor:e=>({async get(){var e;return await this.updateComplete,null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(t)},enumerable:!0,configurable:!0})})}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var mt;const gt=null!=(null===(mt=window.HTMLSlotElement)||void 0===mt?void 0:mt.prototype.assignedElements)?(t,e)=>t.assignedElements(e):(t,e)=>t.assignedNodes(e).filter((t=>t.nodeType===Node.ELEMENT_NODE));function ft(t){const{slot:e,selector:i}=null!=t?t:{};return dt({descriptor:o=>({get(){var o;const r="slot"+(e?`[name=${e}]`:":not([name])"),n=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(r),s=null!=n?gt(n,t):[];return i?s.filter((t=>t.matches(i))):s},enumerable:!0,configurable:!0})})}var vt="[^\\s]+";function yt(t,e){for(var i=[],o=0,r=t.length;o<r;o++)i.push(t[o].substr(0,e));return i}var bt=function(t){return function(e,i){var o=i[t].map((function(t){return t.toLowerCase()})),r=o.indexOf(e.toLowerCase());return r>-1?r:null}};function wt(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];for(var o=0,r=e;o<r.length;o++){var n=r[o];for(var s in n)t[s]=n[s]}return t}var _t=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],xt=["January","February","March","April","May","June","July","August","September","October","November","December"],$t=yt(xt,3),Et={dayNamesShort:yt(_t,3),dayNames:_t,monthNamesShort:$t,monthNames:xt,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10?1:0)*t%10]}},At=(wt({},Et),function(t){return+t-1}),Ct=[null,"[1-9]\\d?"],St=[null,vt],kt=["isPm",vt,function(t,e){var i=t.toLowerCase();return i===e.amPm[0]?0:i===e.amPm[1]?1:null}],Tt=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(t){var e=(t+"").match(/([+-]|\d\d)/gi);if(e){var i=60*+e[1]+parseInt(e[2],10);return"+"===e[0]?i:-i}return 0}];bt("monthNamesShort"),bt("monthNames");var Ht,jt;!function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}}(),function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(Ht||(Ht={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(jt||(jt={}));var Ot=["closed","locked","off"],Pt=function(t,e,i,o){o=o||{},i=null==i?{}:i;var r=new Event(e,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});return r.detail=i,t.dispatchEvent(r),r},Mt=function(t){Pt(window,"haptic",t)},Rt=function(t,e,i,o){if(o||(o={action:"more-info"}),!o.confirmation||o.confirmation.exemptions&&o.confirmation.exemptions.some((function(t){return t.user===e.user.id}))||(Mt("warning"),confirm(o.confirmation.text||"Are you sure you want to "+o.action+"?")))switch(o.action){case"more-info":(i.entity||i.camera_image)&&Pt(t,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":o.navigation_path&&function(t,e,i){void 0===i&&(i=!1),i?history.replaceState(null,"",e):history.pushState(null,"",e),Pt(window,"location-changed",{replace:i})}(0,o.navigation_path);break;case"url":o.url_path&&window.open(o.url_path);break;case"toggle":i.entity&&(function(t,e){(function(t,e,i){void 0===i&&(i=!0);var o,r=function(t){return t.substr(0,t.indexOf("."))}(e),n="group"===r?"homeassistant":r;switch(r){case"lock":o=i?"unlock":"lock";break;case"cover":o=i?"open_cover":"close_cover";break;default:o=i?"turn_on":"turn_off"}t.callService(n,o,{entity_id:e})})(t,e,Ot.includes(t.states[e].state))}(e,i.entity),Mt("success"));break;case"call-service":if(!o.service)return void Mt("failure");var r=o.service.split(".",2);e.callService(r[0],r[1],o.service_data),Mt("success");break;case"fire-dom-event":Pt(t,"ll-custom",o)}},Ut=function(t,e,i,o){var r;"double_tap"===o&&i.double_tap_action?r=i.double_tap_action:"hold"===o&&i.hold_action?r=i.hold_action:"tap"===o&&i.tap_action&&(r=i.tap_action),Rt(t,e,i,r)};function zt(t,e,i){if(e.has("config")||i)return!0;if(t.config.entity){var o=e.get("hass");return!o||o.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}var Nt=function(){var t=document.querySelector("home-assistant");if(t=(t=(t=(t=(t=(t=(t=(t=t&&t.shadowRoot)&&t.querySelector("home-assistant-main"))&&t.shadowRoot)&&t.querySelector("app-drawer-layout partial-panel-resolver"))&&t.shadowRoot||t)&&t.querySelector("ha-panel-lovelace"))&&t.shadowRoot)&&t.querySelector("hui-root")){var e=t.lovelace;return e.current_view=t.___curView,e}return null};var Dt={version:"Version",invalid_configuration:"Invalid configuration",show_warning:"Show Warning",show_error:"Show Error"},Lt={common:Dt},It={version:"Versjon",invalid_configuration:"Ikke gyldig konfiguration",show_warning:"Vis advarsel"},Vt={common:It};const Wt={en:Object.freeze({__proto__:null,common:Dt,default:Lt}),nb:Object.freeze({__proto__:null,common:It,default:Vt})};function Bt(t,e="",i=""){const o=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_");let r;try{r=t.split(".").reduce(((t,e)=>t[e]),Wt[o])}catch(e){r=t.split(".").reduce(((t,e)=>t[e]),Wt.en)}return void 0===r&&(r=t.split(".").reduce(((t,e)=>t[e]),Wt.en)),""!==e&&""!==i&&(r=r.replace(e,i)),r}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class qt{constructor(t){this.startPress=e=>{t().then((t=>{t&&t.startPress(e)}))},this.endPress=()=>{t().then((t=>{t&&t.endPress()}))},this.startFocus=()=>{t().then((t=>{t&&t.startFocus()}))},this.endFocus=()=>{t().then((t=>{t&&t.endFocus()}))},this.startHover=()=>{t().then((t=>{t&&t.startHover()}))},this.endHover=()=>{t().then((t=>{t&&t.endHover()}))}}}let Ft=class extends nt{constructor(){super(...arguments),this.raised=!1,this._rippleHandlers=new qt((()=>this._ripple))}static get styles(){return d`
    :host{
      background: transparent;
    }
    .temp-btn-lg{
      background: rgba(var(--color-theme),0.05);
      justify-content: center;
      align-items: center;
      padding: 16px;
      border-radius: var(--ha-card-border-radius, 4px);
      flex: 1;
    }

    .temp-btn-lg:hover{
      cursor: pointer;
    }
    .temp-btn-lg.red{
      background-color: rgba(var(--color-red), 0.2);
      color: rgba(var(--color-red), 1);
    }
    .temp-btn-lg.blue{
      background-color: rgba(var(--color-blue), 0.2);
      color: rgba(var(--color-blue), 1);
    }
    .temp-btn-lg.green{
      background-color: rgba(var(--color-green), 0.2);
      color: rgba(var(--color-green), 1);
    }
    .temp-btn-lg.yellow{
      background-color: rgba(var(--color-yellow), 0.2);
      color: rgba(var(--color-yellow), 1);
    }
    .temp-btn-lg:disabled{
      background-color: rgba(var(--color-theme),0.02);
      color: rgba(var(--color-theme),0.3);
    }
    .justify-start {
      justify-content: start;
    }

    .justify-center {
      justify-content: center;
    }

    .space-between {
      justify-content: space-between;
    }

    .items-center {
      align-items: center;
    }

    .flex {
      display: flex;
    }

    .flex-row {
      flex-direction: row;
    }

    .flex-col {
      flex-direction: column;
    }
    .overflow-hidden{
      overflow: hidden;
    }
    `}render(){return L`
      <ha-card
        ?disabled=${this.disabled}
        tabindex="0"
        @mousedown="${this.handleRippleActivate}"
        @mouseup="${this.handleRippleDeactivate}"
        class="temp-btn-lg flex flex-col overflow-hidden ${this.selected?this.color:""}"
      >
        <slot></slot>
        <mwc-ripple id="ripple"></mwc-ripple>
      </ha-card>
    `}handleRippleActivate(t){this._ripple.then((e=>e&&e.startPress&&this._rippleHandlers.startPress(t)))}handleRippleDeactivate(){this._ripple.then((t=>t&&t.endPress&&this._rippleHandlers.endPress()))}};r([ct()],Ft.prototype,"header",void 0),r([ct()],Ft.prototype,"selected",void 0),r([ct()],Ft.prototype,"color",void 0),r([ct()],Ft.prototype,"disabled",void 0),r([ct({type:Boolean,reflect:!0})],Ft.prototype,"raised",void 0),r([pt("mwc-ripple")],Ft.prototype,"_ripple",void 0),r([ut({passive:!0})],Ft.prototype,"handleRippleActivate",null),Ft=r([at("ha-custom-button")],Ft);const Jt=t=>{switch(t){case"heat_cool":return{icon:"mdi:autorenew",name:"Heat/Cool",color:"green",hvacText:"Heat/Cool"};case"cool":return{icon:"mdi:snowflake",name:"Cool",color:"blue",hvacText:"Cool To"};case"heat":return{icon:"mdi:fire",name:"Heat",color:"red",hvacText:"Heat To"};case"off":return{icon:"mdi:power",name:"Off",color:"yellow",hvacText:"Current Temperature"};default:return{icon:"mdi:help",name:"None",color:"none",hvacText:"None Selected"}}},Kt=d`
  .justify-start {
    justify-content: start;
  }
  .justify-center {
    justify-content: center;
  }
  .space-between {
    justify-content: space-between;
  }
  .items-center {
    align-items: center;
  }
  .flex {
    display: flex;
  }
  .flex-row {
    flex-direction: row;
  }
  .flex-col {
    flex-direction: column;
  }
  .flex-1{
    flex: 1;
  }
  .overflow-hidden{
    overflow: hidden;
  }
  .text-4xl {
    font-size: 36px;
    line-height: 40px;
  }
  .text-red{
    color: rgba(var(--color-red), 1);
  }
  .text-blue{
    color: rgba(var(--color-blue), 1);
  }
  .w-full{
    width: 100%;
  }
  .col-gap-8{
    column-gap: 8px;
  }
`;let Zt=class extends nt{constructor(t,e){super(),this.loading=!1,this.hasInitialized=!1,this.targetTempsState={targetTempHigh:null,targetTempLow:null,tempsChanged:!1},this.hass=e,this.config=t}connectedCallback(){super.connectedCallback(),this.config.entity&&(this.entity=this.hass.states[this.config.entity],this.targetTempsState={tempsChanged:!1,targetTempHigh:this.entity.attributes.target_temp_high||this.entity.attributes.min_temp,targetTempLow:this.entity.attributes.target_temp_low||this.entity.attributes.min_temp})}shouldUpdate(t){return!0}render(){if(this.config.show_error||!this.config.entity)return this._showError(Bt("common.show_error"));if(this.entity=this.hass.states[this.config.entity],"heat_cool"===this.entity.state)return L`
        <div class="flex flex-col w-full">
          <div class="heatCoolContainer flex flex-row">
          ${this.buildControls({temperature:this.targetTempsState.targetTempLow,textColor:"text-red",hvacMode:this.entity.state,hvac_mode_text:"Heat To",handleClick:this.handleHeatCoolClick.bind(this),target:"heat"})}
          ${this.buildControls({temperature:this.targetTempsState.targetTempHigh,textColor:"text-blue",hvacMode:this.entity.state,hvac_mode_text:"Cool To",handleClick:this.handleHeatCoolClick.bind(this),target:"cool"})}
          </div>
          ${this.renderSetHeatCoolButton()}
        </div>
      `;const t=Jt(this.entity.state);return this.buildControls({temperature:"off"===this.entity.state?this.entity.attributes.current_temperature:this.entity.attributes.temperature,textColor:`text-${t.color}`,hvacMode:this.entity.state,hvac_mode_text:t.hvacText,handleClick:this.handleTempClick.bind(this),target:this.entity.state})}handleTempClick(t){return async()=>{this.loading||(this.loading=!0,console.log("options",t),await this.hass.callService("climate","set_temperature",{entity_id:this.config.entity,hvac_mode:t.hvacMode,temperature:t.temperature}),this.loading=!1)}}handleHeatCoolClick(t){return()=>{"heat"===t.target&&t.temperature&&(this.targetTempsState=Object.assign(Object.assign({},this.targetTempsState),{targetTempLow:t.temperature,tempsChanged:!0})),"heat"!==t.target&&t.temperature&&(this.targetTempsState=Object.assign(Object.assign({},this.targetTempsState),{targetTempHigh:t.temperature,tempsChanged:!0}))}}async setNewHeatCoolTemps(){const t={entity_id:this.config.entity,hvac_mode:"heat_cool",target_temp_low:this.targetTempsState.targetTempLow,target_temp_high:this.targetTempsState.targetTempHigh};try{await this.hass.callService("climate","set_temperature",Object.assign({},t)),this.targetTempsState=Object.assign(Object.assign({},this.targetTempsState),{tempsChanged:!1})}catch(t){console.error("set new heat/cool temps error",t)}}buildControls(t){const e=t.temperature?t.temperature:0;return L`
      <div class="temp-ctrls--container flex flex-col">
        <div class=${`temp-ctrls--desc ${t.textColor}`}>
          ${t.hvac_mode_text}
        </div>

        <div class="temp-ctrls flex flex-row space-between items-center">
          <div class="temp-ctrls--btn">
            <ha-icon-button
              class=""
              aria-disabled=${"off"===t.hvacMode}
              @click=${t.handleClick({hvacMode:t.hvacMode,target:t.target,temperature:e-1})}>
              <ha-icon
              id="ha-icon"
              icon="mdi:minus"></ha-icon>
            </ha-icon-button>
          </div>
          <div class="temp-ctrls--temperature text-4xl">
            ${e}
          </div>
          <div
            class="temp-ctrls--btn">
            <ha-icon-button
              class=""
              aria-disabled=${"off"===t.hvacMode}
              @click=${t.handleClick({hvacMode:t.hvacMode,target:t.target,temperature:e+1})}>
              <ha-icon
              id="ha-icon"
              icon="mdi:plus"></ha-icon>
            </ha-icon-button>
          </div>
        </div>
      </div>
    `}renderSetHeatCoolButton(){return L`
      <div class="w-full setTemp--container">
        <ha-custom-button
          ?disabled=${!this.targetTempsState.tempsChanged}
          class=${"button-wrapper flex-1 overflow-hidden "+(this.targetTempsState.tempsChanged?"":"disabled")}
          selected=${!0}
          color="yellow"
          @click=${this.setNewHeatCoolTemps}
        >
              Set new temps
        </ha-custom-button>
      </div>
    `}_showError(t){const e=document.createElement("hui-error-card");return e.setConfig({type:"error",error:t,origConfig:this.config}),L` ${e} `}static get styles(){return d`
      :host{
        width: 100%;
        display: flex;
        justify-content: center;
      }
      .heatCoolContainer{
        justify-content: space-between;
        width: 100%;
      }
      .temp-ctrls{
        column-gap: 10px;
      }
      .temp-ctrls--container{
        max-width: 170px;
      }
      .temp-ctrls--desc{
        font-weight: bold;
        margin-bottom: 8px;
        text-align: center;
      }
      .temp-ctrls--btn ha-icon-button{
        background: rgba(var(--color-theme),0.05);
        border-radius: 50%;
      }
      .temp-ctrls--btn ha-icon{
        display: flex;
      }
      .temp-ctrls--btn ha-icon-button[aria-disabled="true"] {
        background: rgba(var(--color-theme),0.02);
      }
      .temp-ctrls--btn ha-icon-button[aria-disabled="true"] ha-icon{
        opacity: .2;
      }
      .temp-ctrls--btn{
        --mdc-icon-button-size: 54px;
      }
      .temp-ctrls--btn .mdc-ripple-surface::after{
        background-color: transparent;
      }
      .controls{
        text-align: center;
        margin: 0 auto;
      }
      .setTemp--container{
        margin-top: 18px;
      }
      .button-wrapper .temp-btn-lg{
        --ha-card-border-radius: 12px;
      }
      ${Kt}
  `}};r([ct()],Zt.prototype,"config",void 0),r([ct()],Zt.prototype,"hass",void 0),r([ht()],Zt.prototype,"loading",void 0),r([ht()],Zt.prototype,"hasInitialized",void 0),r([ht()],Zt.prototype,"entity",void 0),r([ht()],Zt.prototype,"targetTempsState",void 0),Zt=r([at("ha-temp-controls")],Zt);let Xt=class extends nt{constructor(t,e){super(),this.hass=e,this.config=t}shouldUpdate(t){const e=t.get("hass"),i=t.get("config");if(!e||!i)return!0;if(!this.config.entity)return!1;const o=e.states[i.entity],r=this.hass.states[this.config.entity];return o.state!==r.state}render(){return this.config.show_error||!this.config.entity?this._showError(Bt("common.show_error")):(this.entity=this.hass.states[this.config.entity],L`
      <div class="modes-wrapper flex flex-row space-between">
        ${this.entity.attributes.hvac_modes.map(((t,e)=>{var i;const o=Jt(t);return L`
            <ha-custom-button
              id="mode-${e}"
              class="button-wrapper flex-1 overflow-hidden"
              selected=${t===(null===(i=this.entity)||void 0===i?void 0:i.state)}
              color="${o.color}"
              @click=${this.handleClick(t)}
            >
              <ha-icon
              id="ha-icon"
              icon="${o.icon}"></ha-icon>

              <div class="mode-name">
                ${o.name}
              </div>

            </ha-custom-button>
          `}))}
      </div>
    `)}handleClick(t){return()=>{this.config.entity&&this.hass.callService("climate","set_hvac_mode",{entity_id:this.config.entity,hvac_mode:t})}}_showError(t){const e=document.createElement("hui-error-card");return e.setConfig({type:"error",error:t,origConfig:this.config}),L` ${e} `}static get styles(){return d`
      :host{

      }
      .modes-wrapper{
        column-gap: 8px;
      }
      .mode-name{
        font-size: 14px;
        font-weight: 600;
        margin-top: 8px;
      }
      ${Kt}
  `}};r([ct()],Xt.prototype,"config",void 0),r([ct()],Xt.prototype,"hass",void 0),r([ht()],Xt.prototype,"entity",void 0),Xt=r([at("ha-hvac-modes")],Xt);let Yt=class extends nt{constructor(t,e){super(),this.state={items:[],currentValue:""},this.config=t,this.hass=e}shouldUpdate(t){const e=t.get("hass"),i=t.get("config");if(!e||!i)return!0;if(!this.config.entity)return!1;const o=e.states[i.entity],r=this.hass.states[this.config.entity];return o.attributes.preset_mode!==r.attributes.preset_mode}render(){return this.config.show_error||!this.config.entity?this._showError(Bt("common.show_error")):(this.entity=this.hass.states[this.config.entity],this.state={items:this.entity.attributes.preset_modes,currentValue:this.entity.attributes.preset_mode},L`
      <ha-select
        naturalMenuWidth
        .value=${this.state.currentValue}
        @selected=${this._changed}
        >

        ${this.state.items.map(((t,e)=>L`<mwc-list-item tabindex=${e} role="option" .value=${t}>${t}</mwc-list-item>`))}

      </ha-select>
    `)}async _changed(t){if(!this.hass||""===t.target.value)return;const e=this.state.currentValue;this.state.currentValue=t.target.value;try{await this.hass.callService("climate","set_preset_mode",{entity_id:this.config.entity,preset_mode:this.state.currentValue})}catch(t){console.error("preset error",t),this.state.currentValue=e}}_showError(t){const e=document.createElement("hui-error-card");return e.setConfig({type:"error",error:t,origConfig:this.config}),L` ${e} `}static get styles(){return d`
      :host{
        width: 100%;
      }
      ha-select{
        width: 100%;
      }
  `}};r([ct()],Yt.prototype,"hass",void 0),r([ct()],Yt.prototype,"config",void 0),r([ht()],Yt.prototype,"entity",void 0),r([ht()],Yt.prototype,"state",void 0),Yt=r([at("ha-presets-dropdown")],Yt);let Gt=class extends nt{constructor(t,e){super(),this.config=t,this.hass=e}shouldUpdate(t){const e=t.get("hass"),i=t.get("config");if(!e||!i)return!0;if(!this.config.entity)return!1;const o=e.states[i.entity],r=this.hass.states[this.config.entity];return o.attributes.fan_mode!==r.attributes.fan_mode}render(){return this.config.show_error||!this.config.entity?this._showError(Bt("common.show_error")):(this.entity=this.hass.states[this.config.entity],this.entity.attributes.fan_modes&&this.entity.attributes.fan_mode?L`
      <div class="modes-wrapper flex flex-row justify-start">
      ${this.entity.attributes.fan_modes.map(((t,e)=>{var i;const o=(t=>{switch(t){case"auto":return{icon:"mdi:fan-auto",name:"Auto",color:"blue"};case"on":return{icon:"mdi:fan",name:"On",color:"blue"};default:return{icon:"mdi:help",name:"Not Found",color:"yellow"}}})(t);return L`
          <ha-custom-button
            id="mode-${e}"
            class="button-wrapper flex-1 overflow-hidden"
            selected=${t===(null===(i=this.entity)||void 0===i?void 0:i.attributes.fan_mode)}
            color="${o.color}"
            @click=${this.handleClick(t)}
          >
            <ha-icon
            id="ha-icon"
            icon="${o.icon}"></ha-icon>

            <div class="mode-name">
              ${o.name}
            </div>

          </ha-custom-button>
        `}))}
      </div>
    `:this._showError(Bt("common.show_error")))}handleClick(t){return async()=>{if(this.config.entity)try{await this.hass.callService("climate","set_fan_mode",{entity_id:this.config.entity,fan_mode:t})}catch(t){console.error("Error in fanModes",t)}}}_showError(t){const e=document.createElement("hui-error-card");return e.setConfig({type:"error",error:t,origConfig:this.config}),L` ${e} `}static get styles(){return d`
      :host{
        width: 100%;
      }
      .button-wrapper{
        width: 100%;
        max-width: 86px;
      }
      .modes-wrapper{
        column-gap: 8px;
      }
      .mode-name{
        font-size: 14px;
        font-weight: 600;
        margin-top: 8px;
      }
      ${Kt}
  `}};r([ct()],Gt.prototype,"hass",void 0),r([ct()],Gt.prototype,"config",void 0),r([ht()],Gt.prototype,"entity",void 0),Gt=r([at("ha-fan-modes")],Gt);let Qt=class extends nt{constructor(t,e){super(),this.config=t,this.hass=e}shouldUpdate(t){const e=t.get("hass"),i=t.get("config");if(!e||!i)return!0;if(!this.config.entity)return!1;const o=e.states[i.entity],r=this.hass.states[this.config.entity];return o.attributes.aux_heat!==r.attributes.aux_heat}render(){if(this.config.show_error||!this.config.entity)return this._showError(Bt("common.show_error"));if(this.entity=this.hass.states[this.config.entity],!this.entity.attributes.aux_heat)return this._showError(Bt("common.show_error"));const t=this.selected(this.entity.attributes.aux_heat);return L`
      <div class="modes-wrapper flex flex-row justify-start">
        <ha-custom-button
            id="aux-heat"
            class="button-wrapper flex-1 overflow-hidden"
            selected=${t.state}
            color="${t.color}"
            @click=${this.handleClick}
          >
            <ha-icon
            id="ha-icon"
            icon="${t.icon}"></ha-icon>

            <div class="mode-name">
              Aux ${t.text}
            </div>

          </ha-custom-button>
      </div>
    `}selected(t){return"on"===t?{state:!0,icon:"mdi:fire",color:"blue",text:"On"}:{state:!1,icon:"mdi:fire-off",color:"",text:"Off"}}async handleClick(){var t;if(this.config.entity&&(null===(t=this.entity)||void 0===t?void 0:t.attributes.aux_heat))try{const t=this.selected(this.entity.attributes.aux_heat);await this.hass.callService("climate","set_aux_heat",{entity_id:this.config.entity,aux_heat:!t.state})}catch(t){console.error("Error in auxHeat",t)}}_showError(t){const e=document.createElement("hui-error-card");return e.setConfig({type:"error",error:t,origConfig:this.config}),L` ${e} `}static get styles(){return d`
      :host{
        width: 100%;
      }
      .button-wrapper{
        width: 100%;
        max-width: 86px;
      }
      .modes-wrapper{
        column-gap: 8px;
      }
      .mode-name{
        font-size: 14px;
        font-weight: 600;
        margin-top: 8px;
      }
      ${Kt}
  `}};r([ct()],Qt.prototype,"hass",void 0),r([ct()],Qt.prototype,"config",void 0),r([ht()],Qt.prototype,"entity",void 0),Qt=r([at("ha-honeywell-auxheat")],Qt);let te=class extends nt{constructor(t,e){super(),this.value=50,this.liveValue=50,this.input=null,this.config=t,this.hass=e}connectedCallback(){var t;if(super.connectedCallback(),!this.config.entity)throw new Error("You need to define config entity");this.entity=this.hass.states[this.config.entity],this.liveValue=null===(t=this.entity)||void 0===t?void 0:t.attributes.humidity}shouldUpdate(t){const e=t.get("hass"),i=t.get("config"),o=t.get("liveValue");if(!e||!i||!o)return!0;if(!this.config.entity)return!1;if(o!==this.liveValue)return!0;const r=e.states[i.entity],n=this.hass.states[this.config.entity];return r.attributes.humidity!==n.attributes.humidity}render(){var t,e,i,o,r,n;return this.config.show_error||!this.config.entity?this._showError(Bt("common.show_error")):(this.entity=this.hass.states[this.config.entity],(null===(t=this.entity)||void 0===t?void 0:t.attributes.humidity)&&(null===(e=this.entity)||void 0===e?void 0:e.attributes.min_humidity)&&(null===(i=this.entity)||void 0===i?void 0:i.attributes.max_humidity)?(this.input||this.buildInput({min_humidity:null===(o=this.entity)||void 0===o?void 0:o.attributes.min_humidity,max_humidity:null===(r=this.entity)||void 0===r?void 0:r.attributes.max_humidity,humidity:null===(n=this.entity)||void 0===n?void 0:n.attributes.humidity}),L`
      <div class="modes-wrapper flex flex-row justify-center">
        ${this.liveValue} %
      </div>
    `):this._showError("Unable to find Humidity Attributes"))}handleInput(t){this.liveValue=t.target.value}async handleChangeInput(t){var e,i;t.preventDefault(),this.liveValue=t.target.value;try{await this.hass.callService("climate","set_humidity",{entity_id:this.config.entity,humidity:t.target.value})}catch(t){console.error("Error in Humidity",t);const o=null===(e=this.entity)||void 0===e?void 0:e.attributes.humidity;this.liveValue=o;const r=null===(i=this.shadowRoot)||void 0===i?void 0:i.querySelector("#etSlider");null==r||r.setAttribute("value",o.toString()),null==r||(r.value=o)}}_showError(t){const e=document.createElement("hui-error-card");return e.setConfig({type:"error",error:t,origConfig:this.config}),L` ${e} `}buildInput({min_humidity:e,max_humidity:i,humidity:o}){var r;this.input=document.createElement("input"),this.input.setAttribute("type","range"),this.input.setAttribute("class","etSlider"),this.input.setAttribute("id","etSlider"),this.input.setAttribute("min",e.toString()),this.input.setAttribute("max",i.toString()),this.input.setAttribute("value",o.toString()),new t(this.input,{}),this.input.addEventListener("change",this.handleChangeInput.bind(this)),this.input.addEventListener("input",this.handleInput.bind(this)),null===(r=this.shadowRoot)||void 0===r||r.append(this.input)}static get styles(){return d`
      :host{
        width: 100%;
        display: flex;
        flex-direction: row;
        column-gap: 8px;
        align-items: center;
      }
      .etSlider{
        -webkit-appearance: none;
        background: transparent;
        cursor: pointer;
        width: 100%;
        overflow: hidden;
        border-radius: 12px;
        position: relative;
      }
      .etSlider::-webkit-slider-runnable-track{
        background: var( --lovelace-background, var(--primary-background-color) );
        height: 3rem;
      }
      .etSlider::-moz-range-track{
        background: rgba(var(--color-blue), 0.2);
        height: 3rem;
      }
      .etSlider::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 5px;
        height: 2rem;
        position: relative;
        background: #fff;
        top: 7px;
        right: 10px;
        box-shadow: -200px 0 0 210px rgba(var(--color-blue), 1);
        border: none;
        border-radius: 20px;
      }

      .etSlider::-moz-range-thumb {
        width: 5px;
        height: 2rem;
        position: relative;
        background: #fff;
        top: 8.5px;
        right: 10px;
        box-shadow: -200px 0 0 210px rgba(var(--color-blue), 1);
        border: none;
        border-radius: 20px;
      }
      .etSlider::-ms-fill-lower {
          background: rgba(var(--color-blue), 1);
      }
      .modes-wrapper{
        padding: 0 12px;
        font-size: 21px;
        font-weight: bold;
        text-align: center;
        width: 88px;
      }
      ${Kt}
  `}};r([ct()],te.prototype,"hass",void 0),r([ct()],te.prototype,"config",void 0),r([ht()],te.prototype,"entity",void 0),r([ht()],te.prototype,"value",void 0),r([ht()],te.prototype,"liveValue",void 0),r([ht()],te.prototype,"input",void 0),te=r([at("ha-honeywell-humidity")],te);let ee=class extends nt{constructor(){super(...arguments),this.browser="",this.tempEntity=null}static getStubConfig(){return{}}setConfig(t){if(!t)throw new Error(Bt("common.invalid_configuration"));t.test_gui&&Nt().setEditMode(!0),this.config=Object.assign({},t);const e=window.navigator.userAgent;e.match(/iPad/i)||e.match(/iPhone/)}handleOutsideModalClick(){this.close()}setHass(t){if(!t)throw new Error(Bt("common.invalid_configuration"));this.hass=t}shouldUpdate(t){return console.log("should update",t),!0}closeDialog(){this.open=!1}render(){var t,e,i;return this.config.show_error||!this.config.entity?this._showError(Bt("common.show_error")):(this.tempEntity=this.hass.states[this.config.entity],"false"===this.open?L``:L`
          <ha-card
            id="tmp-dialog"
            class="temp-popup"
          >
            <div class="content">
              <!-- HEADER -->
              <div class="header flex flex-row space-between items-center">
                <div class="name">
                  ${this.config.name} Settings
                </div>

                <div class="close-btn">
                  <ha-icon-button
                    @click=${this.close}>
                    <ha-icon
                    id="ha-icon"
                    icon="mdi:close"></ha-icon>
                  </ha-icon-button>
                </div>

              </div>

              <div class="content-row flex flex-col">
                <div class="category">
                  USER
                </div>
                <div>
                  ${this.browser}
                </div>
              </div>

              <!-- TEMP CONTROLS -->
              <div class="content-row flex flex-col controls justify-center items-center">

                <ha-temp-controls
                  .hass=${this.hass}
                  .config=${this.config}
                >
                </ha-temp-controls>

              </div>

              <!-- MODES -->
              <div class="content-row flex flex-col">
                <div class="category">
                  Modes
                </div>
                <ha-hvac-modes
                  .hass=${this.hass}
                  .config=${this.config}
                >
                </ha-hvac-modes>
              </div>

              <!-- PRESETS -->
              <div class="content-row flex flex-col">
                <div class="category">
                  Presets
                </div>
                <div id="presetselect" class="flex">
                  <ha-presets-dropdown
                    .hass=${this.hass}
                    .config=${this.config}
                  ></ha-presets-dropdown>
                </div>
              </div>

              <!-- FAN/AUX_HEAT -->
              <div class="content-row flex flex-row col-gap-8">

                <!-- FAN MODES -->
                ${(null===(t=this.tempEntity)||void 0===t?void 0:t.attributes.fan_modes)?L`
                  <div class="flex-1">
                    <div class="category">
                      Fan Mode
                    </div>
                    <div class="modes-wrapper flex flex-row space-between">
                      <ha-fan-modes
                        .hass=${this.hass}
                        .config=${this.config}
                      ></ha-fan-modes>
                    </div>
                  </div>
                `:null}

                <!-- AUX_HEAT -->
                ${(null===(e=this.tempEntity)||void 0===e?void 0:e.attributes.aux_heat)?L`
                  <div class="flex-1">
                    <div class="category">
                      Aux Heat
                    </div>
                    <div class="modes-wrapper flex flex-row space-between">
                      <ha-honeywell-auxheat
                        .hass=${this.hass}
                        .config=${this.config}
                      ></ha-honeywell-auxheat>
                    </div>
                  </div>
                `:null}

              </div>

               <!-- Humidity -->
              <div class="content-row flex flex-col">
                ${(null===(i=this.tempEntity)||void 0===i?void 0:i.attributes.humidity)?L`
                  <div class="category">
                    Humidity
                  </div>
                  <ha-honeywell-humidity
                    .hass=${this.hass}
                    .config=${this.config}
                  >
                  </ha-honeywell-humidity>
                `:null}
              </div>
            </div>
            <slot></slot>
          </ha-card>
          <ha-card
            @click=${this.handleOutsideModalClick}
            id="tmp-overlay"
            class="overlay-popup"
          ></ha-card>
    `)}close(){this.setAttribute("open","false")}renderFanModes(t){return t?"\n\n    ":L``}_showError(t){const e=document.createElement("hui-error-card");return e.setConfig({type:"error",error:t,origConfig:this.config}),L` ${e} `}static get styles(){return d`

      ha-select{
        width: 100%;
      }
      .col-gap-8{
        column-gap: 8px;
      }
      :host{
        background: #00000000;
        width: 0;
        height: 0;
        position: absolute;
        --mdc-ripple-focus-opacity: 0;
        --mdc-ripple-hover-opacity: 0;
      }
      :host([open="true"]){
        background: #0000009c;
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 99999;
      }
      .overlay-popup{
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
      }
      .header{
        margin-bottom: 18px;
      }
      .name{
        font-size: 14px;
        font-weight: bold;
      }
      .content{
        padding: 16px;
      }
      .category{
        color: var(--primary-text-color);
        font-weight: bold;
        font-size: 1rem;
        opacity: 0.4;
        margin-bottom:8px;
        margin-top: 20px;
      }
      .temp-popup{
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        max-width: 400px;
        position: absolute;
        width: 100%;
        height: auto;
        z-index: 2;
        background: var( --ha-card-background, var(--card-background-color, white) );
      }
      .temp-btn-lg{
        background: rgba(var(--color-theme),0.05);
        justify-content: center;
        align-items: center;
        padding: 16px;
        border-radius: var(--ha-card-border-radius, 4px);
        flex: 1;
      }
      .close-btn ha-icon-button{
        background: rgba(var(--color-theme),0.05);
        border-radius: 50%;
      }
      .close-btn{
        --mdc-icon-button-size: 34px;
      }
      .close-btn ha-icon{
        display: flex;
      }

      .justify-start {
        justify-content: start;
      }
      .justify-center {
        justify-content: center;
      }

      .space-between {
        justify-content: space-between;
      }

      .items-center {
        align-items: center;
      }

      .flex {
        display: flex;
      }

      .flex-row {
        flex-direction: row;
      }

      .flex-col {
        flex-direction: column;
      }
      .flex-1{
        flex: 1;
      }
      .overflow-hidden{
        overflow: hidden;
      }
      .text-4xl {
        font-size: 36px;
        line-height: 40px;
      }
      .text-red{
        color: rgba(var(--color-red), 1);
      }
      .text-blue{
        color: rgba(var(--color-blue), 1);
      }
      .w-full{
        width: 100%;
      }
    `}};r([ct({attribute:!1})],ee.prototype,"hass",void 0),r([ht()],ee.prototype,"config",void 0),r([ct()],ee.prototype,"open",void 0),r([ht()],ee.prototype,"browser",void 0),r([ht()],ee.prototype,"tempEntity",void 0),ee=r([at("ha-custom-popup")],ee),console.info(`%c  HA-HW-CARD \n%c  ${Bt("common.version")} 1.4.1    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"hahw-modes-card",name:"HA HW Card",description:"A template custom card for you to create something awesome"});let ie=class extends nt{constructor(){super(...arguments),this.tempEntity=null}static async getConfigElement(){return await import("./editor-3ff4b404.js"),document.createElement("honeywell-smb-card-editor")}static getStubConfig(){return{}}setConfig(t){if(!t)throw new Error(Bt("common.invalid_configuration"));t.test_gui&&Nt().setEditMode(!0),this.config=Object.assign({name:"HWHAModes"},t)}shouldUpdate(t){return!!this.config&&zt(this,t,!1)}render(){var t;return this.config.show_warning?this._showWarning(Bt("common.show_warning")):this.config.show_error||!this.config.entity?this._showError(Bt("common.show_error")):(this.tempEntity=this.hass.states[this.config.entity],console.log("modes: tempObj",this.tempEntity.attributes),L`
      <ha-card
        id="modes-card"
        tabindex="0"
      >
        <div class="modes-wrapper flex flex-row space-between">
          ${this.renderModes(null===(t=this.tempEntity)||void 0===t?void 0:t.attributes)}
        </div>
      </ha-card>
    `)}renderModes(t){return t?L`
      ${t.hvac_modes.map(((t,e)=>{var i;const o=this.getIconForMode(t);return L`
          <ha-custom-button
            id="mode-${e}"
            class="button-wrapper flex-1 overflow-hidden"
            selected=${t===(null===(i=this.tempEntity)||void 0===i?void 0:i.state)}
            color="${o.color}"
            @click=${this.handleClick(t)}
          >
            <ha-icon
            id="ha-icon"
            icon="${o.icon}"></ha-icon>

            <div class="mode-name">
              ${o.name}
            </div>

          </ha-custom-button>
        `}))}
    `:L``}getIconForMode(t){switch(t){case"heat_cool":return{icon:"mdi:autorenew",name:"Heat/Cool",color:"green"};case"cool":return{icon:"mdi:snowflake",name:"Cool",color:"blue"};case"heat":return{icon:"mdi:fire",name:"Heat",color:"red"};case"off":return{icon:"mdi:power",name:"Off",color:"yellow"};default:return{icon:"mdi:help",name:"None",color:"none"}}}handleClick(t){return()=>{console.log("Mode",t),this.config.entity&&this.hass.callService("climate","set_hvac_mode",{entity_id:this.config.entity,hvac_mode:t})}}_handleAction(t){this.hass&&this.config&&t.detail.action&&Ut(this,this.hass,this.config,t.detail.action)}_showWarning(t){return L` <hui-warning>${t}</hui-warning> `}_showError(t){const e=document.createElement("hui-error-card");return e.setConfig({type:"error",error:t,origConfig:this.config}),L` ${e} `}static get styles(){return d`
      :host{
        --mdc-icon-size: 28px;

      }
      #modes-card{
        background: transparent;
      }
      .modes-wrapper{
        column-gap: 8px;
      }
      .temp-btn-lg{
        background: rgba(var(--color-theme),0.05);
        justify-content: center;
        align-items: center;
        padding: 16px;
        border-radius: var(--ha-card-border-radius, 4px);
        flex: 1;
      }
      .mode-name{
        font-size: 14px;
        font-weight: 600;
        margin-top: 8px;
      }
      .justify-start {
        justify-content: start;
      }

      .justify-center {
        justify-content: center;
      }

      .space-between {
        justify-content: space-between;
      }

      .items-center {
        align-items: center;
      }

      .flex {
        display: flex;
      }

      .flex-row {
        flex-direction: row;
      }

      .flex-col {
        flex-direction: column;
      }
      .flex-1{
        flex: 1;
      }
      .overflow-hidden{
        overflow: hidden;
      }
    `}};r([ct({attribute:!1})],ie.prototype,"hass",void 0),r([ht()],ie.prototype,"config",void 0),ie=r([at("hahw-modes-card")],ie),console.info(`%c  HA-HW-CARD \n%c  ${Bt("common.version")} 1.4.1    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"ha-hw-select",name:"HA HW Select",description:"A template custom card for you to create something awesome"});let oe=class extends nt{constructor(){super(...arguments),this.tempEntity=null}static async getConfigElement(){return await import("./editor-3ff4b404.js"),document.createElement("honeywell-smb-card-editor")}static getStubConfig(){return{}}setConfig(t){if(!t)throw new Error(Bt("common.invalid_configuration"));t.test_gui&&Nt().setEditMode(!0),this.config=Object.assign({name:"HWHAModes"},t)}shouldUpdate(t){return!!this.config&&zt(this,t,!1)}render(){return this.config.show_warning?this._showWarning(Bt("common.show_warning")):this.config.show_error||!this.config.entity?this._showError(Bt("common.show_error")):(this.tempEntity=this.hass.states[this.config.entity],console.log("modes: tempObj",this.tempEntity.attributes),L`
      <ha-card
        id="modes-card"
        tabindex="0"
      >
        <div class="flex flex-row space-between">
          <div >
            <ha-select naturalMenuWidth fixedMenuPosition >
              <mwc-list-item>item 1</mwc-list-item>
              <mwc-list-item>item 2</mwc-list-item>
              <mwc-list-item>item 3</mwc-list-item>
              <mwc-list-item>item 4</mwc-list-item>
              <mwc-list-item>item 5</mwc-list-item>
            </ha-select>
          </div>

          <label for="cars">Choose a car:</label>
          <select name="cars" id="cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </div>
      </ha-card>
    `)}handleClick(t){console.log("click",t)}_handleAction(t){this.hass&&this.config&&t.detail.action&&Ut(this,this.hass,this.config,t.detail.action)}_showWarning(t){return L` <hui-warning>${t}</hui-warning> `}_showError(t){const e=document.createElement("hui-error-card");return e.setConfig({type:"error",error:t,origConfig:this.config}),L` ${e} `}static get styles(){return d`
      :host{
        --mdc-icon-size: 28px;

      }
      #modes-card{
        background: transparent;
      }
      .modes-wrapper{
        column-gap: 8px;
      }
      .temp-btn-lg{
        background: rgba(var(--color-theme),0.05);
        justify-content: center;
        align-items: center;
        padding: 16px;
        border-radius: var(--ha-card-border-radius, 4px);
        flex: 1;
      }
      .mode-name{
        font-size: 14px;
        font-weight: 600;
        margin-top: 8px;
      }
      .justify-start {
        justify-content: start;
      }

      .justify-center {
        justify-content: center;
      }

      .space-between {
        justify-content: space-between;
      }

      .items-center {
        align-items: center;
      }

      .flex {
        display: flex;
      }

      .flex-row {
        flex-direction: row;
      }

      .flex-col {
        flex-direction: column;
      }
      .flex-1{
        flex: 1;
      }
      .overflow-hidden{
        overflow: hidden;
      }
    `}};r([ct({attribute:!1})],oe.prototype,"hass",void 0),r([ht()],oe.prototype,"config",void 0),oe=r([at("ha-hw-select")],oe),console.info(`%c  honeywell-smb-card \n%c  ${Bt("common.version")} 1.4.1    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"honeywell-smb-card",name:"Honeywell SMB Card",description:"A template custom card for you to create something awesome"});let re=class extends nt{constructor(){super(...arguments),this.dialogEl=null,this.isDialogOpen=!1,this.tempEntity=null,this.loaded=!1,this._popupEl=null,this._rippleHandlers=new qt((()=>this._ripple))}static async getConfigElement(){return await import("./editor-3ff4b404.js"),document.createElement("honeywell-smb-card-editor")}static getStubConfig(){return{}}setConfig(t){if(!t)throw new Error(Bt("common.invalid_configuration"));t.test_gui&&Nt().setEditMode(!0),this.config=Object.assign({name:"Boilerplate"},t)}shouldUpdate(t){var e;if(!this.config)return!1;if(!this.config.toggleTrigger)return zt(this,t,!1);const i=zt(this,t,!1);return i&&(null===(e=this._popupEl)||void 0===e||e.setHass(this.hass)),i}renderPopUp(){var t,e,i,o;const r=null===(t=this.config.entity)||void 0===t?void 0:t.replace(".","-"),n=document.querySelector(`#${r}`);if(n)return n.setConfig(this.config),void n.setHass(this.hass);const s=document.createElement("ha-custom-popup");s.setAttribute("id",r),document.body.append(s),this._popupEl=document.querySelector(`#${r}`),null===(e=this._popupEl)||void 0===e||e.setConfig(this.config),null===(i=this._popupEl)||void 0===i||i.setHass(this.hass),null===(o=this._popupEl)||void 0===o||o.setAttribute("open","false")}render(){return this.renderPopUp(),this.config.show_warning?this._showWarning(Bt("common.show_warning")):this.config.show_error||!this.config.entity?this._showError(Bt("common.show_error")):(this.tempEntity=this.hass.states[this.config.entity],console.log("this.config",this.config),console.log("tempObj",this.tempEntity.attributes),console.log("hass",this.hass),L`
      <ha-card
        tabindex="0"
        @click="${this.openPopUp}"
      >
      <div
          class="love-ui-card love-ha-card button-on-card love-ha-card-padding love-ha-border-radius">

          <div class="love-ha-container love-ha-grid-h love-ha-grid-hidden">

            <div class="ha-img-cell love-ha-img-cell justify-start ${this.getThermostateStateClass(this.tempEntity.state)}">
              <div class="degree-number img-cell-number">
                ${this.tempEntity.attributes.current_temperature}
                <span class="degree-icon"></span>
              </div>
            </div>

            <div class="love-ha-name-grid love-ha-name love-ha-name--start ellipsis">
              ${this.config.name}
            </div>

            <div class="love-ha-label-grid love-ha-label love-ha-label--start ellipsis">
              Current Temp | ${this.tempEntity.attributes.hvac_action}
            </div>

            <!-- ${this.renderDialog()} -->

          </div>

      </div>
      <mwc-ripple id="ripple"></mwc-ripple>
    </ha-card>
    `)}renderDialog(){return L`
      <div class="love-ha-hidden-container open">
          <ha-dialog
            id="tmp-dialog"
            title="TEST"
            .hass=${this.hass}
            @close=${this.closeDialog}
            @closed=${this.onDialogClose}
            hideActions=${!0}
          >
            <div class="content">
              <div class="temp-pop-up">
                <div class="temp-pop-up--grid flex flex-row space-between justify-start">
                  <div class="love-ha-name-grid love-ha-name love-ha-name--start ellipsis">
                    Basic Card Example
                  </div>
                  <div class="temp-pop-up--close">
                    <ha-icon-button
                    .label=${this.hass.localize("ui.dialogs.generic.close")}
                    dialogAction="close"
                    >
                      <ha-icon
                      id="ha-icon"
                      icon="mdi:close"></ha-icon>
                    </ha-icon-button>
                  </div>
                </div>

                <div class="temp-pop-up--modes flex flex-row space-between">
                  <ha-custom-button>
                    <h1>TITLE</h1>
                    <ha-icon
                    id="ha-icon-1"
                    icon="mdi:fire"></ha-icon>
                  </ha-custom-button>

                </div>
              </div>
              <div class="love-ha-temp-container">
                <ha-icon-button
                  .label=${this.hass.localize("ui.dialogs.generic.close")}
                  dialogAction="close"
                >
                  <ha-icon
                  id="ha-icon"
                  icon="mdi:chevron-down"></ha-icon>
                </ha-icon-button>
                <ha-icon-button
                  .label=${this.hass.localize("ui.dialogs.generic.close")}
                  @click=${this.closePopUp}
                >
                  <ha-icon
                  id="ha-icon"
                  icon="mdi:close"></ha-icon>
                </ha-icon-button>
              </div>
              <my-slider-v2
                .hass=${this.hass}
                .config=${this.config}></my-slider-v2>
            </div>
          </ha-dialog>
      </div>
    `}renderThermoCtrls(){return L`
      <div class="flex flex-col">

        <!-- STATUS -->
        <div>
          HEAT TO
        </div>

        <!-- TEMP CTRLS -->
        <div class="flex flex-row justify-center">

          <!-- MINUS -->
          <div>
            -
          </div>

          <!-- TEMP -->
          <div>
            68
          </div>

          <!-- ADD -->
          <div>
            +
          </div>

        </div>

        <!-- Degree -->
        <div>
          &#8457;
        </div>
      </div>
    `}getThermostateStateClass(t){switch(t){case"heat":return"heating";case"cool":return"cooling";default:return"off"}}onDialogClose(t){console.log(t),this.isDialogOpen=!1,"yes"===t.detail.action?alert("BOOM"):"no"===t.detail.action&&alert("nothing happens")}testContentRender(){return L`
      <ha-select naturalMenuWidth >
        <mwc-list-item tabindex="1" role="option">item 1</mwc-list-item>
        <mwc-list-item tabindex="2" role="option">item 2</mwc-list-item>
        <mwc-list-item tabindex="3" role="option">item 3</mwc-list-item>
        <mwc-list-item tabindex="4" role="option">item 4</mwc-list-item>
        <mwc-list-item tabindex="5" role="option">item 5</mwc-list-item>
      </ha-select>
    `}async openPopUp(){var t;if(this.handleRippleActivate(),this.shadowRoot){if(!this.dialogEl){this.dialogEl=this.shadowRoot.querySelector("#tmp-dialog");const e=null===(t=this.config.entity)||void 0===t?void 0:t.replace(".","-"),i=document.querySelector(`#${e}`);null==i||i.setAttribute("open","true")}this.isDialogOpen=!0,setTimeout((()=>{this.handleRippleDeactivate()}),300)}}openBrowserMod(){}closeDialog(){console.log("close")}closePopUp(){var t;console.log("closed",this.dialogEl),null===(t=this.dialogEl)||void 0===t||t.close()}buttonClicked(){if(!this.config.toggleTrigger)return;const t="on"===this.hass.states[this.config.toggleTrigger].state?"turn_off":"turn_on";this.hass.callService("input_boolean",t,{entity_id:this.config.toggleTrigger})}handleRippleActivate(t){this._ripple.then((e=>e&&e.startPress&&this._rippleHandlers.startPress(t)))}handleRippleDeactivate(){this.isDialogOpen&&this._ripple.then((t=>t&&t.endPress&&this._rippleHandlers.endPress()))}_handleAction(t){console.log("action",{hass:this.hass,config:this.config,detail:t.detail.action}),this.hass&&this.config&&t.detail.action&&Ut(this,this.hass,this.config,t.detail.action)}_showWarning(t){return L` <hui-warning>${t}</hui-warning> `}_showError(t){const e=document.createElement("hui-error-card");return e.setConfig({type:"error",error:t,origConfig:this.config}),L` ${e} `}static get styles(){return d`
      :host{
        --mdc-ripple-focus-opacity: 0;
        --mdc-ripple-hover-opacity: 0;
        /* --mdc-icon-button-size: 36px; */
      }

      /* :host ha-icon-button{
        background-color: rgba(var(--color-theme),0.05);
        border-radius: 4px;
        overflow: hidden;
      } */
      .love-icon-button{
        border-radius: 50%;
        overflow: hidden;
        color: var(--primary-text-color);
        width: 36px;
        height: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        grid-area: tgl/tgl/tgl/tgl;
        box-shadow: rgb(0 0 0 / 80%) 0px 2px 4px 0px;
        background: var( --ha-card-background, var(--card-background-color, white) );
      }
      #ha-icon {
        fill: currentcolor;
        --mdc-icon-size: 100%;
        --iron-icon-width: 100%;
        --iron-icon-height: 100%;
        transition: all 0.3s ease-out 0s;
      }

      #ha-icon.icon {
        margin: auto;
        display: inline-block;
        fill: currentcolor;
        height: 100%;
        width: 100%;
        max-height: 100%;
        position: absolute;
        color: rgba(var(--color-theme), 0.2);
        width: 20px;
        position: relative;
      }

      svg {
        width: 100%;
        height: 100%;
        pointer-events: none;
        display: block;
      }

      #ha-svg-icon {
        display: var(--ha-icon-display, inline-flex);
        align-items: center;
        justify-content: center;
        position: relative;
        vertical-align: middle;
        fill: currentcolor;
        width: var(--mdc-icon-size, 24px);
        height: var(--mdc-icon-size, 24px);
      }
      .love-ui-card {
        background: var(--ha-card-background, var(--card-background-color, white));
        border-radius: var(--ha-card-border-radius, 4px);
        box-shadow: var(--ha-card-box-shadow, 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12));
        color: var(--primary-text-color);
        display: block;
        transition: all 0.3s ease-out 0s;
        position: relative;
      }

      .love-ha-card {
        cursor: pointer;
        overflow: hidden;
        box-sizing: border-box;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: normal;
        -webkit-user-select: none;
          -moz-user-select: none;
                user-select: none;
      }

      .button-on-card {
        padding: 4% 0px;
        text-transform: none;
        font-weight: 400;
        font-size: 1.2rem;
        align-items: center;
        text-align: center;
        letter-spacing: normal;
        width: 100%;
      }

      .love-ha-card-padding {
        padding: 12px;
      }

      .love-ha-border-radius {
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
      }

      .ha-img-cell {
        display: flex;
        grid-area: i/i/i/i;
        height: 100%;
        width: 100%;
        max-width: 100%;
        max-height: 100%;
        place-self: center;
        overflow: hidden;
        justify-content: center;
        align-items: center;
        position: relative;
      }

      .love-ha-img-cell {
        background-color: rgba(var(--color-theme), 0.05);
        border-radius: 50%;
        place-self: center start;
        width: 42px;
        height: 42px;
        margin-right: 12px;
      }

      .love-ha-img-cell.heating {
        background-color: rgba(var(--color-red), 0.2);
        color: rgba(var(--color-red), 1);
      }

      .love-ha-img-cell.cooling {
        background-color: rgba(var(--color-blue), 0.2);
        color: rgba(var(--color-blue), 1);
      }

      .love-ha-container {
        display: grid;
        width: 100%;
        height: 100%;
        text-align: center;
        align-items: center;
      }

      .love-ha-container--vertical {
        grid-template: "i" 1fr "n" -webkit-min-content "s" -webkit-min-content "l" min-content/1fr;
        grid-template: "i" 1fr "n" min-content "s" min-content "l" min-content/1fr;
      }

      .love-ha-grid-h {
        grid-template-areas: "i n" "i l";
        grid-template-columns: auto 1fr;
      }

      .love-ha-grid-hidden{
        grid-template-areas:
            "i n tgl"
            "i l tgl"
            "h h h";
        grid-template-columns: auto 1fr auto;
        width: 100%;
        overflow: hidden;
      }

      .love-ha-name {
        font-weight: bold;
        font-size: 14px;
        margin-top: 0px;
      }

      .love-ha-name-grid {
        grid-area: n/n/n/n;
        max-width: 100%;
        place-self: center;
      }

      .love-ha-name--start {
        justify-self: start;
      }

      .love-ha-label-grid {
        grid-area: l/l/l/l;
        max-width: 100%;
        place-self: center;
      }

      .love-ha-label {
        place-self: start;
        font-weight: bolder;
        font-size: 12px;
        filter: opacity(40%);
      }

      .love-ha-hidden-container {
        grid-area: h/h/h/h;
        max-width: 100%;
        place-self: center;
        height: 0;
        overflow: hidden;
      }

      .love-ha-hidden-container.open {
        height: auto
      }

      .love-ha-temp-container {
        padding: 40px 0 0;
      }

      .temp-pop-up {
        color: var(--primary-text-color);
        width: 100%;
      }

      .ellipsis {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .degree-number {
        text-align: center;
        font-size: 16px;
        font-weight: 600;
        position: relative;
      }

      .img-cell-number {
        margin-left: 9px;
      }

      .degree-icon {
        position: absolute;
        top: 5px;
        right: -8px;
        border-radius: 50%;
        border: 1.5px solid currentColor;
        width: 3px;
        height: 3px;
      }

      .justify-start {
        justify-content: start;
      }

      .justify-center {
        justify-content: center;
      }

      .flex {
        display: flex;
      }

      .flex-row {
        flex-direction: row;
      }

      .flex-col {
        flex-direction: column;
      }
      .rotate-180{
        transform: rotate(180deg)
      }
      .rotate-0{
        transform: rotate(0deg)
      }
      .text-sm{
        font-size:14px;
      }
      `}};r([ct({attribute:!1})],re.prototype,"hass",void 0),r([ht()],re.prototype,"config",void 0),r([pt("mwc-ripple")],re.prototype,"_ripple",void 0),r([ut({passive:!0})],re.prototype,"handleRippleActivate",null),re=r([at("honeywell-smb-card")],re);export{Pt as A,re as H,qt as R,i as _,o as a,r as b,V as c,ut as d,ct as e,pt as f,n as g,at as h,d as i,ft as l,dt as o,nt as s,ht as t,I as x,L as y};
