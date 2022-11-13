import { fireEvent, getLovelace } from "custom-card-helpers";
import { HomeAssistant } from "custom-card-helpers/dist/types";
import { css, CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, eventOptions, property, query, queryAsync, state } from "lit/decorators";
import { localize } from "./localize/localize";
import { HoneywellCardConfig, HoneywellConfig, HoneywellEntity, HvacModes, IControlProps, ITargetTempsState, ITempClickOptions } from "./types";
import './components/controls'
import './components/hvacModes'
import './components/presetsDropDown'
import './components/fanModes'
import './components/auxHeat'
import './components/humidity'
import { getModeOptions } from "./utils";

@customElement("ha-custom-popup")
export class HaCustomPopup extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: HoneywellCardConfig;
  @property() open;
  @state() browser = '';
  @state() private tempEntity: null | HoneywellEntity = null

  public static getStubConfig(): Record<string, unknown> {
    return {};
  }

  public setConfig(config: HoneywellCardConfig): void {
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
    const ua = window.navigator.userAgent
    const event = ua.match(/iPad/i) || ua.match(/iPhone/) ? "touchstart" : "click";
    // alert(ua)

    // this.addEventListener("click", this.handleOutsideModalClick.bind(this));
  }

  public handleOutsideModalClick() {
    this.close()
  }

  public setHass(hass: any): void{
    if (!hass) {
      throw new Error(localize('common.invalid_configuration'));
    }
    this.hass = hass
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    console.log('should update',changedProps );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const tmp = changedProps
    // console.log('should update this', this );
    return true
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

              <div class="content-row flex flex-col">
                <div class="category">
                  USER
                </div>
                <div>
                  ${this.browser}
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
                ${this.tempEntity?.attributes.fan_modes
                ? html`
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
                ` : null}

                <!-- AUX_HEAT -->
                ${this.tempEntity?.attributes.aux_heat
                ? html`
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
                `
                : null }

              </div>

               <!-- Humidity -->
              <div class="content-row flex flex-col">
                ${this.tempEntity?.attributes.humidity
                ? html`
                  <div class="category">
                    Humidity
                  </div>
                  <ha-honeywell-humidity
                    .hass=${this.hass}
                    .config=${this.config}
                  >
                  </ha-honeywell-humidity>
                `
                : null
                }
              </div>
            </div>
            <slot></slot>
          </ha-card>
          <ha-card
            @click=${this.handleOutsideModalClick}
            id="tmp-overlay"
            class="overlay-popup"
          ></ha-card>
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
    `;
  }

}

declare global {
  interface HTMLElementTagNameMap {
    "ha-custom-popup": any;
  }
}
