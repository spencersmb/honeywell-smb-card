import { css, CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators";
import { BoilerplateCardConfig, HoneywellEntity } from "../types";
import { localize } from "../localize/localize";
import { HomeAssistant } from "custom-card-helpers/dist/types";
import { cssUtils, getFanModeOptions } from "../utils";

// @description
// Loop through hvac modes and print out the Buttons attached with a click
// handler to call HASS Service to change them
@customElement("ha-fan-modes")
export class HaFanModes extends LitElement {
  @property() hass: HomeAssistant;
  @property() config: BoilerplateCardConfig;

  @state() entity: HoneywellEntity | undefined

  constructor(config: BoilerplateCardConfig, hass: HomeAssistant) {
    super();
    this.config = config
    this.hass = hass
  }

  // Only update if the preset mode has changed
  protected shouldUpdate(changedProps: PropertyValues): boolean {
    const prevHass = changedProps.get('hass')
    const prevConfig = changedProps.get('config')

    // First render PREV will be undefined
    if (!prevHass || !prevConfig) {
      return true
    }

    if (!this.config.entity) {
      return false
    }

    const prevEntity = prevHass.states[prevConfig.entity] as HoneywellEntity
    const currentEntity = this.hass.states[this.config.entity] as HoneywellEntity

    return prevEntity.attributes.fan_mode !== currentEntity.attributes.fan_mode
  }

  protected render(): TemplateResult {
    if (this.config.show_error || !this.config.entity) {
      return this._showError(localize('common.show_error'));
    }
    this.entity = this.hass.states[this.config.entity] as HoneywellEntity

    if (!this.entity.attributes.fan_modes || !this.entity.attributes.fan_mode) {
      return this._showError(localize('common.show_error'));
    }
    // found in this.entity.attributes.fan_modes
    // const hardCodedFanModes = ['auto', 'on']

    // found in this.entity.attributes.fan_mode
    // const selected = 'on'

    return html`
      <div class="modes-wrapper flex flex-row justify-start">
      ${this.entity.attributes.fan_modes.map((mode, index) => {

        const modeObj = getFanModeOptions(mode)
        return html`
          <ha-custom-button
            id="mode-${index}"
            class="button-wrapper flex-1 overflow-hidden"
            selected=${mode === this.entity?.attributes.fan_mode}
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
      </div>
    `
  }

  private handleClick(mode: string) {

    return async () => {
      if(!this.config.entity) return
      // console.log('mode clicked', mode)

      try {
        await this.hass.callService("climate", "set_fan_mode", {
          entity_id: this.config.entity,
          fan_mode: mode
        });
      } catch (e: any) {
        console.error('Error in fanModes', e)
      }
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
      ${cssUtils}
  `;
  }
}



declare global {
  interface HTMLElementTagNameMap {
    "ha-fan-modes": any;
  }
}
