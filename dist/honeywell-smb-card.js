import{_ as e,e as t,a as i}from"./query-assigned-elements-7405f3b8.js";import{s as o,y as r,i as n}from"./lit-element-7979863d.js";import{l as a,t as s}from"./localize-3e8a49ff.js";import{e as l,a as c,R as d}from"./ripple-handlers-5bacd717.js";import{e as h,X as p,J as m}from"./index.m-247c165d.js";import{C as g}from"./modes-card-4d24524e.js";import"./customButton.js";import"./et-pop-up.js";import"./controls.js";import"./utils.js";import"./hvacModes.js";import"./presetsDropDown.js";import"./fanModes.js";import"./auxHeat.js";import"./humidity.js";console.info(`%c  HA-HW-CARD \n%c  ${a("common.version")} ${g}    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"ha-hw-select",name:"HA HW Select",description:"A template custom card for you to create something awesome"});let u=class extends o{constructor(){super(...arguments),this.tempEntity=null}static async getConfigElement(){return await import("./editor-3dd4ac08.js"),document.createElement("honeywell-smb-card-editor")}static getStubConfig(){return{}}setConfig(e){if(!e)throw new Error(a("common.invalid_configuration"));e.test_gui&&h().setEditMode(!0),this.config=Object.assign({name:"HWHAModes"},e)}shouldUpdate(e){return!!this.config&&p(this,e,!1)}render(){return this.config.show_warning?this._showWarning(a("common.show_warning")):this.config.show_error||!this.config.entity?this._showError(a("common.show_error")):(this.tempEntity=this.hass.states[this.config.entity],console.log("modes: tempObj",this.tempEntity.attributes),r`
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
    `)}handleClick(e){console.log("click",e)}_handleAction(e){this.hass&&this.config&&e.detail.action&&m(this,this.hass,this.config,e.detail.action)}_showWarning(e){return r` <hui-warning>${e}</hui-warning> `}_showError(e){const t=document.createElement("hui-error-card");return t.setConfig({type:"error",error:e,origConfig:this.config}),r` ${t} `}static get styles(){return n`
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
    `}};e([t({attribute:!1})],u.prototype,"hass",void 0),e([s()],u.prototype,"config",void 0),u=e([i("ha-hw-select")],u),console.info(`%c  Honeywell SMB Card \n%c  ${a("common.version")} ${g}    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"honeywell-smb-card",name:"Honeywell SMB Card",description:"A lovelace card design for Honeywell Thermostats."});let f=class extends o{constructor(){super(...arguments),this.tempEntity=null,this._popupEl=null,this._rippleHandlers=new d((()=>this._ripple))}static async getConfigElement(){return await import("./editor-3dd4ac08.js"),document.createElement("honeywell-smb-card-editor")}static getStubConfig(){return{}}setConfig(e){if(!e)throw new Error(a("common.invalid_configuration"));e.test_gui&&h().setEditMode(!0),this.config=Object.assign({name:"HoneywellCard"},e)}shouldUpdate(e){var t;if(!this.config)return!1;if(!this.config.toggleTrigger)return p(this,e,!1);const i=p(this,e,!1);return i&&(null===(t=this._popupEl)||void 0===t||t.setHass(this.hass)),i}renderPopUp(){var e,t,i,o;const r=null===(e=this.config.entity)||void 0===e?void 0:e.replace(".","-"),n=document.querySelector(`#${r}`);if(n)return n.setConfig(this.config),void n.setHass(this.hass);const a=document.createElement("ha-custom-popup");a.setAttribute("id",r),document.body.append(a),this._popupEl=document.querySelector(`#${r}`),null===(t=this._popupEl)||void 0===t||t.setConfig(this.config),null===(i=this._popupEl)||void 0===i||i.setHass(this.hass),null===(o=this._popupEl)||void 0===o||o.setAttribute("open","false")}render(){return this.renderPopUp(),this.config.show_warning?this._showWarning(a("common.show_warning")):this.config.show_error||!this.config.entity?this._showError(a("common.show_error")):(this.tempEntity=this.hass.states[this.config.entity],r`
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

          </div>

      </div>
      <mwc-ripple id="ripple"></mwc-ripple>
    </ha-card>
    `)}getThermostateStateClass(e){switch(e){case"heat":return"heating";case"cool":return"cooling";default:return"off"}}async openPopUp(){var e;this.handleRippleActivate(),this.shadowRoot&&(null===(e=this._popupEl)||void 0===e||e.setAttribute("open","true"),setTimeout((()=>{this.handleRippleDeactivate()}),250))}handleRippleActivate(e){this._ripple.then((t=>t&&t.startPress&&this._rippleHandlers.startPress(e)))}handleRippleDeactivate(){this._ripple.then((e=>e&&e.endPress&&this._rippleHandlers.endPress()))}_showWarning(e){return r` <hui-warning>${e}</hui-warning> `}_showError(e){const t=document.createElement("hui-error-card");return t.setConfig({type:"error",error:e,origConfig:this.config}),r` ${t} `}static get styles(){return n`
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
      `}};e([t({attribute:!1})],f.prototype,"hass",void 0),e([s()],f.prototype,"config",void 0),e([l("mwc-ripple")],f.prototype,"_ripple",void 0),e([c({passive:!0})],f.prototype,"handleRippleActivate",null),f=e([i("honeywell-smb-card")],f);export{f as HoneywellCard};
