import { css, CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators";
import { HoneywellCardConfig, HoneywellEntity, HvacModes, IControlProps, ITargetTempsState, ITempClickOptions } from "../types";
import { HomeAssistant } from "custom-card-helpers/dist/types";
import { localize } from "../localize/localize";
import { getModeOptions, cssUtils } from "../utils";

// Temperature Controls:
// Display Single control or dual Controls if Heat_Cool is seleced.
// If Heat_Cool is selected temp control becomes local with a master button
// to SET both temps at the same time.

@customElement("ha-temp-controls")
export class HaTempControls extends LitElement {
  @property() config: HoneywellCardConfig;
  @property() hass: HomeAssistant;
  @state() loading = false
  @state() hasInitialized = false
  @state() private entity: HoneywellEntity | undefined
  @state() private targetTempsState: ITargetTempsState = {
    targetTempHigh: null,
    targetTempLow: null,
    tempsChanged: false
  };

  constructor(config: HoneywellCardConfig, hass: HomeAssistant) {
    super();
    this.hass = hass
    this.config = config
  }

  // ON first load
  // Set the local target temps to what HASS has them set to start off as
  connectedCallback() {
    super.connectedCallback();
    if (!this.config.entity) return

    this.entity = this.hass.states[this.config.entity] as HoneywellEntity
    this.targetTempsState = {
      tempsChanged: false,
      targetTempHigh: this.entity.attributes.target_temp_high || this.entity.attributes.min_temp,
      targetTempLow: this.entity.attributes.target_temp_low || this.entity.attributes.min_temp
    }
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    // Should update on mode change or temp change or targetTemp
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const tmp = changedProps
    return true
  }

  protected render(): TemplateResult {

    if (this.config.show_error || !this.config.entity) {
      return this._showError(localize('common.show_error'));
    }


    this.entity = this.hass.states[this.config.entity] as HoneywellEntity

    if (this.entity.state === "heat_cool") {
      return html`
        <div class="flex flex-col w-full">
          <div class="heatCoolContainer flex flex-row">
          ${this.buildControls({
            temperature: this.targetTempsState.targetTempLow,
            textColor: `text-red`,
            hvacMode: this.entity.state as HvacModes,
            hvac_mode_text: 'Heat To',
            handleClick: this.handleHeatCoolClick.bind(this),
            target: 'heat'
          })}
          ${this.buildControls({
            temperature: this.targetTempsState.targetTempHigh,
            textColor: `text-blue`,
            hvacMode: this.entity.state as HvacModes,
            hvac_mode_text: 'Cool To',
            handleClick: this.handleHeatCoolClick.bind(this),
            target: 'cool'
          })}
          </div>
          ${this.renderSetHeatCoolButton()}
        </div>
      `
    }

    const hvacStatus = getModeOptions(this.entity.state)
    return this.buildControls({
      temperature: this.entity.state === 'off' ? this.entity.attributes.current_temperature : this.entity.attributes.temperature,
      textColor: `text-${hvacStatus.color}`,
      hvacMode: this.entity.state as HvacModes,
      hvac_mode_text: hvacStatus.hvacText,
      handleClick: this.handleTempClick.bind(this),
      target: this.entity.state as HvacModes
    })
  }

  private handleTempClick(options: ITempClickOptions) {
    return async () => {
      if(this.loading) return
      this.loading = true
      console.log('options', options)
      await this.hass.callService("climate", "set_temperature", {
        entity_id: this.config.entity,
        hvac_mode: options.hvacMode,
        temperature: options.temperature
      });

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

  // Target vs hvacMode
  // Need the option to independantly set target heat and target cool while still
  // targeting mode:heat_cool
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
              class=""
              aria-disabled=${controlProps.hvacMode === 'off'}
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
              class=""
              aria-disabled=${controlProps.hvacMode === 'off'}
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
      ${cssUtils}
  `;
  }

}



declare global {
  interface HTMLElementTagNameMap {
    "ha-temp-controls": any;
  }
}
