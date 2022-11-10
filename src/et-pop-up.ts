import { fireEvent, getLovelace } from "custom-card-helpers";
import { HomeAssistant } from "custom-card-helpers/dist/types";
import { css, CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, eventOptions, property, query, queryAsync, state } from "lit/decorators";
import { localize } from "./localize/localize";
import { BoilerplateCardConfig, HoneywellConfig, HoneywellEntity, HvacModes, IControlProps, ITargetTempsState, ITempClickOptions } from "./types";
import './components/controls'

@customElement("ha-custom-popup")
export class HaCustomPopup extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: BoilerplateCardConfig;
  @state() private loading = false;
  // @state() private setHeatChanged = false;
  @state() private value?: string;
  // @state() private targetTempLow: number | null = null;
  // @state() private targetTempHigh: number | null = null;
  @state() private targetTempsState: ITargetTempsState = {
    targetTempHigh: null,
    targetTempLow: null,
    tempsChanged: false
  };
  @property() open;
  @query("ha-dialog") dialog: any;
  private tempEntity: null | HoneywellEntity = null
  // @state() _config;

  public static getStubConfig(): Record<string, unknown> {
    return {};
  }

  public setConfig(config: BoilerplateCardConfig): void {
    // TODO Check for required fields and that they are of the proper format
    if (!config) {
      throw new Error(localize('common.invalid_configuration'));
    }

    if (config.test_gui) {
      getLovelace().setEditMode(true);
    }

    this.config = {
      ...config,
    };

    this.addEventListener("click", this.handleOutsideModalClick.bind(this));
  }

  public handleOutsideModalClick(e: any) {
    const path = e.path
    // console.log('listend to check event');
    // console.log(path[0].tagName);
    // console.log(path[0].tagName === "HA-CUSTOM-POPUP")
      if (path[0].tagName === "HA-CUSTOM-POPUP") {
        this.close()
      }
  }

  public setHass(hass: any): void{
    if (!hass) {
      throw new Error(localize('common.invalid_configuration'));
    }
    console.log('set new hass')
    this.hass = hass

    if(!this.config.entity) return
    this.tempEntity = this.hass.states[this.config.entity] as HoneywellEntity
    this.targetTempsState = {
      tempsChanged: false,
      targetTempHigh: this.tempEntity.attributes.target_temp_high || this.tempEntity.attributes.min_temp,
      targetTempLow: this.tempEntity.attributes.target_temp_low || this.tempEntity.attributes.min_temp
    }
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    console.log('should update',changedProps );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const tmp = changedProps
    // console.log('should update this', this );
    return true
  }
  // constructor() {
  //   super();
  //   // this.setConfig()
  // }
  // connectedCallback() {
  //   // const config = this.getAttribute('data-config')
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   //@ts-ignore
  //   // const hass: string = this.getAttribute('data-hass')
  //   // this.hass = JSON.parse(hass)
  //   // console.log('setCOnfig', this.hass)

  //   const config: string = this.getAttribute('dataconfig')
  //   const parsed = JSON.parse(config)
  //   console.log('setCOnfig', this.hass)
  //   // this.setConfig(parsed)
  // }
  // setConfig(config) {
  //   // this._config = config;
  //   (async () => {
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     // const ch = await window.loadCardHelpers();
  //     // this._element = await ch.createCardElement(config.card);
  //     // this._element.hass = this.hass;
  //   })();
  // }

  disconnectedCallback() {
    console.log('disconnectedCallback')
  }

  closeDialog() {
    this.open = false;
    // this.setAttribute('open', 'false')
  }

  protected render(): TemplateResult {
    // console.log('test render config', {
    //   config: this.config,
    //   hass: this.hass
    //   // element: this._element
    // })

    if (this.config.show_error || !this.config.entity) {
      return this._showError(localize('common.show_error'));
    }

    this.tempEntity = this.hass.states[this.config.entity] as HoneywellEntity
    this.value = this.tempEntity.attributes.preset_mode
    // console.log(this.tempEntity)

    if (this.open === "false") return html``

    return html`
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

                ${this.renderControls()}
                ${this.renderSetHeatCoolButton()}
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
                <div class="modes-wrapper flex flex-row space-between">
                ${this.renderModes(this.tempEntity?.attributes)}
                </div>
              </div>

              <!-- PRESETS -->
              <div class="content-row flex flex-col">
                <div class="category">
                  Presets
                </div>
                <div id="presetselect" class="flex">
                ${this.renderPresetSelect()}
                </div>
              </div>

              <!-- FAN MODES -->
              <div class="content-row flex flex-col">
                <div class="category">
                  Fan Mode
                </div>
                <div class="modes-wrapper flex flex-row space-between">
                ${this.renderFanModes(this.tempEntity?.attributes)}
                </div>
              </div>

              <!-- OLD CONTENT -->
              <div class="temp-pop-up">
                <div class="temp-pop-up--grid flex flex-row space-between justify-start">
                  <div class="love-ha-name-grid love-ha-name love-ha-name--start ellipsis">
                    Basic Card Example
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
                  dialogAction="close"
                >
                  <ha-icon
                  id="ha-icon"
                  icon="mdi:chevron-down"></ha-icon>
                </ha-icon-button>
                <ha-icon-button
                >
                  <ha-icon
                  id="ha-icon"
                  icon="mdi:close"></ha-icon>
                </ha-icon-button>
              </div>
            </div>
            <slot></slot>
          </ha-card>
    `;
  }

  close() {
    this.setAttribute('open', 'false')
  }

  private renderFanModes(tempAttributes: HoneywellConfig | undefined) {
    if (!tempAttributes) return html``
    return `

    `
  }

  private handleTempClick(options: ITempClickOptions) {
    return async () => {
      if(this.loading) return
      this.loading = true
      console.log('options', options)
      if (options.hvacMode === "heat_cool") {
        const targetTemp = options.target === 'heat'
          ? { target_temp_low: options.temperature }
          : { target_temp_high: options.temperature }
        const serviceOptions = {
          entity_id: this.config.entity,
          hvac_mode: options.hvacMode,
          ...targetTemp
        }
        console.log('serviceOptions', serviceOptions)
        await this.hass.callService("climate", "set_temperature", serviceOptions);
      } else {

        await this.hass.callService("climate", "set_temperature", {
          entity_id: this.config.entity,
          hvac_mode: options.hvacMode,
          temperature: options.temperature
        });
      }

      this.loading = false
      // console.log('serviceCall', serviceCall)
    }
  }

  private handleHeatCoolClick(options: ITempClickOptions) {
    return () => {
      if (options.target === 'heat' && options.temperature) {
        this.targetTempsState = {
          ...this.targetTempsState,
          targetTempLow: options.temperature,
          tempsChanged: true
        }
        // console.log('this.targetTempsState', this.targetTempsState)
      }
      if (options.target !== 'heat' && options.temperature) {
        this.targetTempsState = {
          ...this.targetTempsState,
          targetTempHigh: options.temperature,
          tempsChanged: true
        }
        // console.log('this.targetTempsState', this.targetTempsState)
      }
    }
  }

  private async setNewHeatCoolTemps() {
    const options = {
      entity_id: this.config.entity,
      hvac_mode: 'heat_cool',
      target_temp_low: this.targetTempsState.targetTempLow,
      target_temp_high: this.targetTempsState.targetTempHigh
    }
    // console.log('options', options)
    try {
      await this.hass.callService("climate", "set_temperature", { ...options });
      this.targetTempsState = {
        ...this.targetTempsState,
        tempsChanged: false
      }
    }
    catch(e: any){
      console.error('set new heat/cool temps error', e)
    }
  }

  private buildControls(controlProps: IControlProps) {
    const temp = controlProps.temperature ? controlProps.temperature : 0
    return html`
      <div class="temp-ctrls--container flex flex-col">
        <div class=${`temp-ctrls--desc ${controlProps.textColor}`}>
          ${controlProps.hvac_mode_text}
        </div>

        <div class="temp-ctrls flex flex-row space-between items-center">
          <div class="temp-ctrls--btn">
            <ha-icon-button
              class="temp-ctrls--btn"
              @click=${controlProps.handleClick({
                hvacMode: controlProps.hvacMode,
                target: controlProps.target,
                temperature: temp - 1
              })}>
              <ha-icon
              id="ha-icon"
              icon="mdi:minus"></ha-icon>
            </ha-icon-button>
          </div>
          <div class="temp-ctrls--temperature text-4xl">
            ${temp}
          </div>
          <div
            class="temp-ctrls--btn">
            <ha-icon-button
              class="temp-ctrls--btn"
              @click=${controlProps.handleClick({
                hvacMode: controlProps.hvacMode,
                target: controlProps.target,
                temperature: temp + 1
              })}>
              <ha-icon
              id="ha-icon"
              icon="mdi:plus"></ha-icon>
            </ha-icon-button>
          </div>
        </div>
      </div>
    `
  }

  private renderControls() {
    // PROPS
    // Temperature
    // HVAC_MODE TEXT
    // HVACMODE
    // TEXT COLOR class
    // CLICK EVENT
    if (!this.tempEntity) {
      return html ``
    }

    if (this.tempEntity.state === "heat_cool") {
      return html`
        <div class="heatCoolContainer flex flex-row">
          ${this.buildControls({
            temperature: this.targetTempsState.targetTempLow,
            textColor: `text-red`,
            hvacMode: this.tempEntity.state as HvacModes,
            hvac_mode_text: 'Heat To',
            handleClick: this.handleHeatCoolClick.bind(this),
            target: 'heat'
          })}
          ${this.buildControls({
            temperature: this.targetTempsState.targetTempHigh,
            textColor: `text-blue`,
            hvacMode: this.tempEntity.state as HvacModes,
            hvac_mode_text: 'Cool To',
            handleClick: this.handleHeatCoolClick.bind(this),
            target: 'cool'
          })}
        </div>
      `
    }

    const hvacStatus = this.getIconForMode(this.tempEntity.state)
    return this.buildControls({
      temperature: this.tempEntity.attributes.temperature,
      textColor: `text-${hvacStatus.color}`,
      hvacMode: this.tempEntity.state as HvacModes,
      hvac_mode_text: hvacStatus.hvacText,
      handleClick: this.handleTempClick.bind(this),
      target: this.tempEntity.state as HvacModes
    })
  }

  private renderSetHeatCoolButton() {
    // happens if this is the default starter
    return html`
    <div class="w-full setTemp--container">
      <ha-custom-button
        ?disabled=${!this.targetTempsState.tempsChanged}
        class=${`button-wrapper flex-1 overflow-hidden ${!this.targetTempsState.tempsChanged ? 'disabled' : ''}`}
        selected=${true}
        color="yellow"
        @click=${this.setNewHeatCoolTemps}
      >
            Set new temps
      </ha-custom-button>
    </div>
    `
  }

  private renderModes(tempAttributes: HoneywellConfig | undefined) {
    if(!tempAttributes) return html ``

    // rearrange so heat is first
    return html`
      ${tempAttributes.hvac_modes.map((mode, index) => {

        const modeObj = this.getIconForMode(mode)
        return html`
          <ha-custom-button
            id="mode-${index}"
            class="button-wrapper flex-1 overflow-hidden"
            selected=${mode === this.tempEntity?.state}
            color="${modeObj.color}"
            @click=${this.handleClick(mode)}
          >
            <ha-icon
            id="ha-icon"
            icon="${modeObj.icon}"></ha-icon>

            <div class="mode-name">
              ${modeObj.name}
            </div>

          </ha-custom-button>
        `
    })}
    `
  }

  private renderPresetSelect() {

    return html`
      <ha-select
        naturalMenuWidth
        .value=${this.value}
        @selected=${this._changed}
        >

        ${this.tempEntity?.attributes.preset_modes
          .map((mode, index) =>
              html`<mwc-list-item tabindex=${index} role="option" .value=${mode}>${mode}</mwc-list-item>`
          )}

      </ha-select>
    `
  }

  private _changed(ev): void {
    if (!this.hass || ev.target.value === "") {
      return;
    }
    this.value = ev.target.value;

    this.hass.callService("climate", "set_preset_mode", {
      entity_id: this.config.entity,
      preset_mode: this.value
    });
  }

  private getIconForMode(mode: string) {
    switch (mode) {
      case 'heat_cool':
        return {
          icon: "mdi:autorenew",
          name: "Heat/Cool",
          color: "green",
          hvacText: "Heat/Cool"
        }
      case 'cool':
        return {
          icon: "mdi:snowflake",
          name: "Cool",
          color: "blue",
          hvacText: "Cool To"
        }
      case 'heat':
        return {
          icon: "mdi:fire",
          name: "Heat",
          color: "red",
          hvacText: "Heat To"
        }
      case 'off':
        return {
          icon: "mdi:power",
          name: "Off",
          color: "yellow",
          hvacText: "HVAC Off"
        }
      default:
        return {
          icon: "mdi:help",
          name: "None",
          color: "none",
          hvacText: "None Selected"
        }
    }
  }

  private handleClick(mode: string) {

    return () => {
      console.log('Mode', mode)
      if(!this.config.entity) return
      // const stateObj = this.hass.states[this.config.entity];
      // const service = stateObj.state === "on" ? "turn_off" : "turn_on";

      this.hass.callService("climate", "set_hvac_mode", {
        entity_id: this.config.entity,
        hvac_mode: mode
      });
    }

  }

  private _showError(error: string): TemplateResult {
    const errorCard = document.createElement('hui-error-card');
    errorCard.setConfig({
      type: 'error',
      error,
      origConfig: this.config,
    });

    return html` ${errorCard} `;
  }

  static get styles(): CSSResultGroup {
    return css`

      ha-select{
        width: 100%;
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
        position: absolute;
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
        background: var( --ha-card-background, var(--card-background-color, white) );
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

      }
      .close-btn ha-icon-button,
      .temp-ctrls--btn ha-icon-button{
        background: rgba(var(--color-theme),0.05);
        border-radius: 50%;
      }
      .close-btn{
        --mdc-icon-button-size: 34px;
      }
      .close-btn ha-icon,
      .temp-ctrls--btn ha-icon{
        display: flex;
      }
      .temp-ctrls--btn[aria-disabled="true"] {
        background: rgba(var(--color-theme),0.02);
      }
      .temp-ctrls--btn[aria-disabled="true"] ha-icon{
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
      .mode-name{
        font-size: 14px;
        font-weight: 600;
        margin-top: 8px;
      }
      .setTemp--container{
        margin-top: 18px;
      }
      .button-wrapper .temp-btn-lg{
        --ha-card-border-radius: 12px;
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
    `;
  }

}

declare global {
  interface HTMLElementTagNameMap {
    "ha-custom-popup": any;
  }
}