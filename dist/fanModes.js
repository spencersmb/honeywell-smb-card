import{_ as t,e,a as o}from"./query-assigned-elements-7405f3b8.js";import{s as i,y as s,i as r}from"./lit-element-7979863d.js";import{t as n,l as a}from"./localize-3e8a49ff.js";import{cssUtils as c,getFanModeOptions as h}from"./utils.js";let d=class extends i{constructor(t,e){super(),this.config=t,this.hass=e}shouldUpdate(t){const e=t.get("hass"),o=t.get("config");if(!e||!o)return!0;if(!this.config.entity)return!1;const i=e.states[o.entity],s=this.hass.states[this.config.entity];return i.attributes.fan_mode!==s.attributes.fan_mode}render(){return this.config.show_error||!this.config.entity?this._showError(a("common.show_error")):(this.entity=this.hass.states[this.config.entity],this.entity.attributes.fan_modes&&this.entity.attributes.fan_mode?s`
      <div class="modes-wrapper flex flex-row justify-start">
      ${this.entity.attributes.fan_modes.map(((t,e)=>{var o;const i=h(t);return s`
          <ha-custom-button
            id="mode-${e}"
            class="button-wrapper flex-1 overflow-hidden"
            selected=${t===(null===(o=this.entity)||void 0===o?void 0:o.attributes.fan_mode)}
            color="${i.color}"
            @click=${this.handleClick(t)}
          >
            <ha-icon
            id="ha-icon"
            icon="${i.icon}"></ha-icon>

            <div class="mode-name">
              ${i.name}
            </div>

          </ha-custom-button>
        `}))}
      </div>
    `:this._showError("No Fan_modes attributes found"))}handleClick(t){return async()=>{if(this.config.entity)try{await this.hass.callService("climate","set_fan_mode",{entity_id:this.config.entity,fan_mode:t})}catch(t){console.error("Error in fanModes",t)}}}_showError(t){const e=document.createElement("hui-error-card");return e.setConfig({type:"error",error:t,origConfig:this.config}),s` ${e} `}static get styles(){return r`
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
      ${c}
  `}};t([e()],d.prototype,"hass",void 0),t([e()],d.prototype,"config",void 0),t([n()],d.prototype,"entity",void 0),d=t([o("ha-fan-modes")],d);export{d as HaFanModes};
