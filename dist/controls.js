import{_ as t,e,a}from"./query-assigned-elements-7405f3b8.js";import{s as i,y as s,i as r}from"./lit-element-7979863d.js";import{t as o,l as n}from"./localize-3e8a49ff.js";import{getModeOptions as c,cssUtils as l}from"./utils.js";let h=class extends i{constructor(t,e){super(),this.loading=!1,this.hasInitialized=!1,this.targetTempsState={targetTempHigh:null,targetTempLow:null,tempsChanged:!1},this.hass=e,this.config=t}connectedCallback(){if(super.connectedCallback(),!this.config.entity)throw new Error("You need to define config entity in controls.ts");this.entity=this.hass.states[this.config.entity],this.targetTempsState={tempsChanged:!1,targetTempHigh:this.entity.attributes.target_temp_high||this.entity.attributes.min_temp,targetTempLow:this.entity.attributes.target_temp_low||this.entity.attributes.min_temp}}shouldUpdate(t){return!0}render(){if(this.config.show_error||!this.config.entity)return this._showError(n("common.show_error"));if(this.entity=this.hass.states[this.config.entity],"heat_cool"===this.entity.state)return s`
        <div class="flex flex-col w-full">
          <div class="heatCoolContainer flex flex-row">
          ${this.buildControls({temperature:this.targetTempsState.targetTempLow,textColor:"text-red",hvacMode:this.entity.state,hvac_mode_text:"Heat To",handleClick:this.handleHeatCoolClick.bind(this),target:"heat"})}
          ${this.buildControls({temperature:this.targetTempsState.targetTempHigh,textColor:"text-blue",hvacMode:this.entity.state,hvac_mode_text:"Cool To",handleClick:this.handleHeatCoolClick.bind(this),target:"cool"})}
          </div>
          ${this.renderSetHeatCoolButton()}
        </div>
      `;const t=c(this.entity.state);return this.buildControls({temperature:"off"===this.entity.state?this.entity.attributes.current_temperature:this.entity.attributes.temperature,textColor:`text-${t.color}`,hvacMode:this.entity.state,hvac_mode_text:t.hvacText,handleClick:this.handleTempClick.bind(this),target:this.entity.state})}handleTempClick(t){return async()=>{this.loading||(this.loading=!0,console.log("options",t),await this.hass.callService("climate","set_temperature",{entity_id:this.config.entity,hvac_mode:t.hvacMode,temperature:t.temperature}),this.loading=!1)}}handleHeatCoolClick(t){return()=>{"heat"===t.target&&t.temperature&&(this.targetTempsState=Object.assign(Object.assign({},this.targetTempsState),{targetTempLow:t.temperature,tempsChanged:!0})),"heat"!==t.target&&t.temperature&&(this.targetTempsState=Object.assign(Object.assign({},this.targetTempsState),{targetTempHigh:t.temperature,tempsChanged:!0}))}}async setNewHeatCoolTemps(){const t={entity_id:this.config.entity,hvac_mode:"heat_cool",target_temp_low:this.targetTempsState.targetTempLow,target_temp_high:this.targetTempsState.targetTempHigh};try{await this.hass.callService("climate","set_temperature",Object.assign({},t)),this.targetTempsState=Object.assign(Object.assign({},this.targetTempsState),{tempsChanged:!1})}catch(t){console.error("set new heat/cool temps error",t)}}buildControls(t){const e=t.temperature?t.temperature:0;return s`
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
    `}renderSetHeatCoolButton(){return s`
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
    `}_showError(t){const e=document.createElement("hui-error-card");return e.setConfig({type:"error",error:t,origConfig:this.config}),s` ${e} `}static get styles(){return r`
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
      ${l}
  `}};t([e()],h.prototype,"config",void 0),t([e()],h.prototype,"hass",void 0),t([o()],h.prototype,"loading",void 0),t([o()],h.prototype,"hasInitialized",void 0),t([o()],h.prototype,"entity",void 0),t([o()],h.prototype,"targetTempsState",void 0),h=t([a("ha-temp-controls")],h);export{h as HaTempControls};
