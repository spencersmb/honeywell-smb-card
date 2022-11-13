import{_ as t,e,a as i}from"./query-assigned-elements-7405f3b8.js";import{s as n,y as r,i as o}from"./lit-element-7979863d.js";import{t as u,l as s}from"./localize-3e8a49ff.js";import{cssUtils as a}from"./utils.js";function l(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function h(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function c(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function d(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?c(Object(i),!0).forEach((function(e){h(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):c(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var f={addCSS:!0,thumbWidth:15,watch:!0};function p(t,e){return function(){return Array.from(document.querySelectorAll(e)).includes(this)}.call(t,e)}var m=function(t){return null!=t?t.constructor:null},y=function(t,e){return!!(t&&e&&t instanceof e)},b=function(t){return null==t},v=function(t){return m(t)===Object},g=function(t){return m(t)===String},w=function(t){return Array.isArray(t)},x=function(t){return y(t,NodeList)},S=g,k=w,E=x,A=function(t){return y(t,Element)},O=function(t){return y(t,Event)},j=function(t){return b(t)||(g(t)||w(t)||x(t))&&!t.length||v(t)&&!Object.keys(t).length};function _(t,e){if(1>e){var i=function(t){var e="".concat(t).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);return e?Math.max(0,(e[1]?e[1].length:0)-(e[2]?+e[2]:0)):0}(e);return parseFloat(t.toFixed(i))}return Math.round(t/e)*e}var C=function(){function t(e,i){(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")})(this,t),A(e)?this.element=e:S(e)&&(this.element=document.querySelector(e)),A(this.element)&&j(this.element.rangeTouch)&&(this.config=d({},f,{},i),this.init())}return function(t,e,i){e&&l(t.prototype,e),i&&l(t,i)}(t,[{key:"init",value:function(){t.enabled&&(this.config.addCSS&&(this.element.style.userSelect="none",this.element.style.webKitUserSelect="none",this.element.style.touchAction="manipulation"),this.listeners(!0),this.element.rangeTouch=this)}},{key:"destroy",value:function(){t.enabled&&(this.config.addCSS&&(this.element.style.userSelect="",this.element.style.webKitUserSelect="",this.element.style.touchAction=""),this.listeners(!1),this.element.rangeTouch=null)}},{key:"listeners",value:function(t){var e=this,i=t?"addEventListener":"removeEventListener";["touchstart","touchmove","touchend"].forEach((function(t){e.element[i](t,(function(t){return e.set(t)}),!1)}))}},{key:"get",value:function(e){if(!t.enabled||!O(e))return null;var i,n=e.target,r=e.changedTouches[0],o=parseFloat(n.getAttribute("min"))||0,u=parseFloat(n.getAttribute("max"))||100,s=parseFloat(n.getAttribute("step"))||1,a=n.getBoundingClientRect(),l=100/a.width*(this.config.thumbWidth/2)/100;return 0>(i=100/a.width*(r.clientX-a.left))?i=0:100<i&&(i=100),50>i?i-=(100-2*i)*l:50<i&&(i+=2*(i-50)*l),o+_(i/100*(u-o),s)}},{key:"set",value:function(e){t.enabled&&O(e)&&!e.target.disabled&&(e.preventDefault(),e.target.value=this.get(e),function(t,e){if(t&&e){var i=new Event(e,{bubbles:!0});t.dispatchEvent(i)}}(e.target,"touchend"===e.type?"change":"input"))}}],[{key:"setup",value:function(e){var i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},n=null;if(j(e)||S(e)?n=Array.from(document.querySelectorAll(S(e)?e:'input[type="range"]')):A(e)?n=[e]:E(e)?n=Array.from(e):k(e)&&(n=e.filter(A)),j(n))return null;var r=d({},f,{},i);if(S(e)&&r.watch){var o=new MutationObserver((function(i){Array.from(i).forEach((function(i){Array.from(i.addedNodes).forEach((function(i){A(i)&&p(i,e)&&new t(i,r)}))}))}));o.observe(document.body,{childList:!0,subtree:!0})}return n.map((function(e){return new t(e,i)}))}},{key:"enabled",get:function(){return"ontouchstart"in document.documentElement}}]),t}();let P=class extends n{constructor(t,e){super(),this.value=50,this.liveValue=50,this.input=null,this.config=t,this.hass=e}connectedCallback(){var t;if(super.connectedCallback(),!this.config.entity)throw new Error("You need to define config entity");this.entity=this.hass.states[this.config.entity],this.liveValue=null===(t=this.entity)||void 0===t?void 0:t.attributes.humidity}shouldUpdate(t){const e=t.get("hass"),i=t.get("config"),n=t.get("liveValue");if(!e||!i||!n)return!0;if(!this.config.entity)return!1;if(n!==this.liveValue)return!0;const r=e.states[i.entity],o=this.hass.states[this.config.entity];return r.attributes.humidity!==o.attributes.humidity}render(){var t,e,i,n,o,u;return this.config.show_error||!this.config.entity?this._showError(s("common.show_error")):(this.entity=this.hass.states[this.config.entity],(null===(t=this.entity)||void 0===t?void 0:t.attributes.humidity)&&(null===(e=this.entity)||void 0===e?void 0:e.attributes.min_humidity)&&(null===(i=this.entity)||void 0===i?void 0:i.attributes.max_humidity)?(this.input||this.buildInput({min_humidity:null===(n=this.entity)||void 0===n?void 0:n.attributes.min_humidity,max_humidity:null===(o=this.entity)||void 0===o?void 0:o.attributes.max_humidity,humidity:null===(u=this.entity)||void 0===u?void 0:u.attributes.humidity}),r`
      <div class="modes-wrapper flex flex-row justify-center">
        ${this.liveValue} %
      </div>
    `):this._showError("Unable to find Humidity Attributes"))}handleInput(t){this.liveValue=t.target.value}async handleChangeInput(t){var e,i;t.preventDefault(),this.liveValue=t.target.value;try{await this.hass.callService("climate","set_humidity",{entity_id:this.config.entity,humidity:t.target.value})}catch(t){console.error("Error in Humidity",t);const n=null===(e=this.entity)||void 0===e?void 0:e.attributes.humidity;this.liveValue=n;const r=null===(i=this.shadowRoot)||void 0===i?void 0:i.querySelector("#etSlider");null==r||r.setAttribute("value",n.toString()),null==r||(r.value=n)}}_showError(t){const e=document.createElement("hui-error-card");return e.setConfig({type:"error",error:t,origConfig:this.config}),r` ${e} `}buildInput({min_humidity:t,max_humidity:e,humidity:i}){var n;this.input=document.createElement("input"),this.input.setAttribute("type","range"),this.input.setAttribute("class","etSlider"),this.input.setAttribute("id","etSlider"),this.input.setAttribute("min",t.toString()),this.input.setAttribute("max",e.toString()),this.input.setAttribute("value",i.toString()),new C(this.input,{}),this.input.addEventListener("change",this.handleChangeInput.bind(this)),this.input.addEventListener("input",this.handleInput.bind(this)),null===(n=this.shadowRoot)||void 0===n||n.append(this.input)}static get styles(){return o`
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
      ${a}
  `}};t([e()],P.prototype,"hass",void 0),t([e()],P.prototype,"config",void 0),t([u()],P.prototype,"entity",void 0),t([u()],P.prototype,"value",void 0),t([u()],P.prototype,"liveValue",void 0),t([u()],P.prototype,"input",void 0),P=t([i("ha-honeywell-humidity")],P);export{P as HaHoneywellHumidity};
