import{_ as t,e,a as o}from"./query-assigned-elements-7405f3b8.js";import{e as i}from"./index.m-247c165d.js";import{s,y as a,i as r}from"./lit-element-7979863d.js";import{t as n,l as c}from"./localize-3e8a49ff.js";import"./controls.js";import"./hvacModes.js";import"./presetsDropDown.js";import"./fanModes.js";import"./auxHeat.js";import"./humidity.js";import"./utils.js";let l=class extends s{constructor(){super(...arguments),this.tempEntity=null}static getStubConfig(){return{}}setConfig(t){if(!t)throw new Error(c("common.invalid_configuration"));t.test_gui&&i().setEditMode(!0),this.config=Object.assign({},t)}handleOutsideModalClick(){this.close()}setHass(t){if(!t)throw new Error(c("common.invalid_configuration"));this.hass=t}shouldUpdate(t){return!!t}closeDialog(){this.open=!1}render(){var t,e,o;return this.config.show_error||!this.config.entity?this._showError(c("common.show_error")):(this.tempEntity=this.hass.states[this.config.entity],"false"===this.open?a``:a`
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
                ${(null===(t=this.tempEntity)||void 0===t?void 0:t.attributes.fan_modes)?a`
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
                ${(null===(e=this.tempEntity)||void 0===e?void 0:e.attributes.aux_heat)?a`
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
                ${(null===(o=this.tempEntity)||void 0===o?void 0:o.attributes.humidity)?a`
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
    `)}close(){this.setAttribute("open","false")}_showError(t){const e=document.createElement("hui-error-card");return e.setConfig({type:"error",error:t,origConfig:this.config}),a` ${e} `}static get styles(){return r`

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
        position: fixed;
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
        background: transparent;
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
    `}};t([e({attribute:!1})],l.prototype,"hass",void 0),t([n()],l.prototype,"config",void 0),t([e()],l.prototype,"open",void 0),t([n()],l.prototype,"tempEntity",void 0),l=t([o("ha-custom-popup")],l);export{l as HaCustomPopup};
