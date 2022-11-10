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
  @state() private value?: string;
  @property() open;
  @query("ha-dialog") dialog: any;
  private tempEntity: null | HoneywellEntity = null

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
    this.hass = hass
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    console.log('should update',changedProps );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const tmp = changedProps
    // console.log('should update this', this );
    return true
  }

  disconnectedCallback() {
    super.disconnectedCallback()
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
