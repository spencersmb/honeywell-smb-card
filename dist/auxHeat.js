import{_ as t,e,a as i}from"./query-assigned-elements-7405f3b8.js";import{s,y as o,i as r}from"./lit-element-7979863d.js";import{t as a,l as n}from"./localize-3e8a49ff.js";import{cssUtils as h}from"./utils.js";let c=class extends s{constructor(t,e){super(),this.config=t,this.hass=e}shouldUpdate(t){const e=t.get("hass"),i=t.get("config");if(!e||!i)return!0;if(!this.config.entity)return!1;const s=e.states[i.entity],o=this.hass.states[this.config.entity];return s.attributes.aux_heat!==o.attributes.aux_heat}render(){if(this.config.show_error||!this.config.entity)return this._showError(n("common.show_error"));if(this.entity=this.hass.states[this.config.entity],!this.entity.attributes.aux_heat)return this._showError("No Aux_Heat attribute found.");const t=this.selected(this.entity.attributes.aux_heat);return o`
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
    `}selected(t){return"on"===t?{state:!0,icon:"mdi:fire",color:"blue",text:"On"}:{state:!1,icon:"mdi:fire-off",color:"",text:"Off"}}async handleClick(){var t;if(this.config.entity&&(null===(t=this.entity)||void 0===t?void 0:t.attributes.aux_heat))try{const t=this.selected(this.entity.attributes.aux_heat);await this.hass.callService("climate","set_aux_heat",{entity_id:this.config.entity,aux_heat:!t.state})}catch(t){console.error("Error in auxHeat",t)}}_showError(t){const e=document.createElement("hui-error-card");return e.setConfig({type:"error",error:t,origConfig:this.config}),o` ${e} `}static get styles(){return r`
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
      ${h}
  `}};t([e()],c.prototype,"hass",void 0),t([e()],c.prototype,"config",void 0),t([a()],c.prototype,"entity",void 0),c=t([i("ha-honeywell-auxheat")],c);export{c as HaHoneywellAuxHeat};
