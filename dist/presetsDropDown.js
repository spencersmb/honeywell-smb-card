import{_ as t,e,a as s}from"./query-assigned-elements-7405f3b8.js";import{s as r,y as i,i as o}from"./lit-element-7979863d.js";import{t as a,l as n}from"./localize-3e8a49ff.js";let h=class extends r{constructor(t,e){super(),this.state={items:[],currentValue:""},this.config=t,this.hass=e}shouldUpdate(t){const e=t.get("hass"),s=t.get("config");if(!e||!s)return!0;if(!this.config.entity)return!1;const r=e.states[s.entity],i=this.hass.states[this.config.entity];return r.attributes.preset_mode!==i.attributes.preset_mode}render(){return this.config.show_error||!this.config.entity?this._showError(n("common.show_error")):(this.entity=this.hass.states[this.config.entity],this.state={items:this.entity.attributes.preset_modes,currentValue:this.entity.attributes.preset_mode},i`
      <ha-select
        naturalMenuWidth
        .value=${this.state.currentValue}
        @selected=${this._changed}
        >

        ${this.state.items.map(((t,e)=>i`<mwc-list-item tabindex=${e} role="option" .value=${t}>${t}</mwc-list-item>`))}

      </ha-select>
    `)}async _changed(t){if(!this.hass||""===t.target.value)return;const e=this.state.currentValue;this.state.currentValue=t.target.value;try{await this.hass.callService("climate","set_preset_mode",{entity_id:this.config.entity,preset_mode:this.state.currentValue})}catch(t){console.error("preset error",t),this.state.currentValue=e}}_showError(t){const e=document.createElement("hui-error-card");return e.setConfig({type:"error",error:t,origConfig:this.config}),i` ${e} `}static get styles(){return o`
      :host{
        width: 100%;
      }
      ha-select{
        width: 100%;
      }
  `}};t([e()],h.prototype,"hass",void 0),t([e()],h.prototype,"config",void 0),t([a()],h.prototype,"entity",void 0),t([a()],h.prototype,"state",void 0),h=t([s("ha-presets-dropdown")],h);export{h as HaPresetsDropdown};
