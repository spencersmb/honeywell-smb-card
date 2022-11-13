import{_ as t,e,a as o}from"./query-assigned-elements-7405f3b8.js";import{s,y as i,i as r}from"./lit-element-7979863d.js";import{t as n,l as a}from"./localize-3e8a49ff.js";import{cssUtils as c,getModeOptions as h}from"./utils.js";let d=class extends s{constructor(t,e){super(),this.hass=e,this.config=t}shouldUpdate(t){const e=t.get("hass"),o=t.get("config");if(!e||!o)return!0;if(!this.config.entity)return!1;const s=e.states[o.entity],i=this.hass.states[this.config.entity];return s.state!==i.state}render(){return this.config.show_error||!this.config.entity?this._showError(a("common.show_error")):(this.entity=this.hass.states[this.config.entity],i`
      <div class="modes-wrapper flex flex-row space-between">
        ${this.entity.attributes.hvac_modes.map(((t,e)=>{var o;const s=h(t);return i`
            <ha-custom-button
              id="mode-${e}"
              class="button-wrapper flex-1 overflow-hidden"
              selected=${t===(null===(o=this.entity)||void 0===o?void 0:o.state)}
              color="${s.color}"
              @click=${this.handleClick(t)}
            >
              <ha-icon
              id="ha-icon"
              icon="${s.icon}"></ha-icon>

              <div class="mode-name">
                ${s.name}
              </div>

            </ha-custom-button>
          `}))}
      </div>
    `)}handleClick(t){return()=>{this.config.entity&&this.hass.callService("climate","set_hvac_mode",{entity_id:this.config.entity,hvac_mode:t})}}_showError(t){const e=document.createElement("hui-error-card");return e.setConfig({type:"error",error:t,origConfig:this.config}),i` ${e} `}static get styles(){return r`
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
      ${c}
  `}};t([e()],d.prototype,"config",void 0),t([e()],d.prototype,"hass",void 0),t([n()],d.prototype,"entity",void 0),d=t([o("ha-hvac-modes")],d);export{d as HaHvacModes};
