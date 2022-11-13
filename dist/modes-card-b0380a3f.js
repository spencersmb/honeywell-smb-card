import{_ as e,e as t,a as o}from"./query-assigned-elements-7405f3b8.js";import{s as n,y as i,i as r}from"./lit-element-7979863d.js";import{l as s,t as a}from"./localize-3e8a49ff.js";import{e as c,X as d,J as l}from"./index.m-247c165d.js";const m="1.4.1";console.info(`%c  HA-HW-CARD \n%c  ${s("common.version")} 1.4.1    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"hahw-modes-card",name:"HA HW Card",description:"A template custom card for you to create something awesome"});let h=class extends n{constructor(){super(...arguments),this.tempEntity=null}static async getConfigElement(){return await import("./editor-3dd4ac08.js"),document.createElement("honeywell-smb-card-editor")}static getStubConfig(){return{}}setConfig(e){if(!e)throw new Error(s("common.invalid_configuration"));e.test_gui&&c().setEditMode(!0),this.config=Object.assign({name:"HWHAModes"},e)}shouldUpdate(e){return!!this.config&&d(this,e,!1)}render(){var e;return this.config.show_warning?this._showWarning(s("common.show_warning")):this.config.show_error||!this.config.entity?this._showError(s("common.show_error")):(this.tempEntity=this.hass.states[this.config.entity],console.log("modes: tempObj",this.tempEntity.attributes),i`
      <ha-card
        id="modes-card"
        tabindex="0"
      >
        <div class="modes-wrapper flex flex-row space-between">
          ${this.renderModes(null===(e=this.tempEntity)||void 0===e?void 0:e.attributes)}
        </div>
      </ha-card>
    `)}renderModes(e){return e?i`
      ${e.hvac_modes.map(((e,t)=>{var o;const n=this.getIconForMode(e);return i`
          <ha-custom-button
            id="mode-${t}"
            class="button-wrapper flex-1 overflow-hidden"
            selected=${e===(null===(o=this.tempEntity)||void 0===o?void 0:o.state)}
            color="${n.color}"
            @click=${this.handleClick(e)}
          >
            <ha-icon
            id="ha-icon"
            icon="${n.icon}"></ha-icon>

            <div class="mode-name">
              ${n.name}
            </div>

          </ha-custom-button>
        `}))}
    `:i``}getIconForMode(e){switch(e){case"heat_cool":return{icon:"mdi:autorenew",name:"Heat/Cool",color:"green"};case"cool":return{icon:"mdi:snowflake",name:"Cool",color:"blue"};case"heat":return{icon:"mdi:fire",name:"Heat",color:"red"};case"off":return{icon:"mdi:power",name:"Off",color:"yellow"};default:return{icon:"mdi:help",name:"None",color:"none"}}}handleClick(e){return()=>{console.log("Mode",e),this.config.entity&&this.hass.callService("climate","set_hvac_mode",{entity_id:this.config.entity,hvac_mode:e})}}_handleAction(e){this.hass&&this.config&&e.detail.action&&l(this,this.hass,this.config,e.detail.action)}_showWarning(e){return i` <hui-warning>${e}</hui-warning> `}_showError(e){const t=document.createElement("hui-error-card");return t.setConfig({type:"error",error:e,origConfig:this.config}),i` ${t} `}static get styles(){return r`
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
    `}};e([t({attribute:!1})],h.prototype,"hass",void 0),e([a()],h.prototype,"config",void 0),h=e([o("hahw-modes-card")],h);export{m as C,h as H};
