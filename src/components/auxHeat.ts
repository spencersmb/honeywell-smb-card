import { css, CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators";
import { HoneywellCardConfig, HoneywellEntity } from "../types";
import { localize } from "../localize/localize";
import { HomeAssistant } from "custom-card-helpers/dist/types";
import { cssUtils, getFanModeOptions } from "../utils";

// @description
// Loop through hvac modes and print out the Buttons attached with a click
// handler to call HASS Service to change them
@customElement("ha-honeywell-auxheat")
export class HaHoneywellAuxHeat extends LitElement {
  @property() hass: HomeAssistant;
  @property() config: HoneywellCardConfig;
  @state() entity: HoneywellEntity | undefined
  // @state() auxState = 'off' // used for local testing
  constructor(config: HoneywellCardConfig, hass: HomeAssistant) {
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

    return prevEntity.attributes.aux_heat !== currentEntity.attributes.aux_heat
  }

  protected render(): TemplateResult {
    if (this.config.show_error || !this.config.entity) {
      return this._showError(localize('common.show_error'));
    }
    this.entity = this.hass.states[this.config.entity] as HoneywellEntity

    if (!this.entity.attributes.aux_heat) {
      return this._showError(localize('common.show_error'));
    }

    const auxData = this.selected(this.entity.attributes.aux_heat)
    return html`
      <div class="modes-wrapper flex flex-row justify-start">
        <ha-custom-button
            id="aux-heat"
            class="button-wrapper flex-1 overflow-hidden"
            selected=${auxData.state}
            color="${auxData.color}"
            @click=${this.handleClick}
          >
            <ha-icon
            id="ha-icon"
            icon="${auxData.icon}"></ha-icon>

            <div class="mode-name">
              Aux ${auxData.text}
            </div>

          </ha-custom-button>
      </div>
    `
  }

  private selected (state: string) {
    switch (state) {
      case 'on':
        return {
          state: true,
          icon: "mdi:fire",
          color: "blue",
          text: "On"
        }
      default:
        return {
          state: false,
          icon: "mdi:fire-off",
          color: "",
          text: "Off"
        }
    }
  }

  private async handleClick() {

    if(!this.config.entity || !this.entity?.attributes.aux_heat) return
    // console.log('mode clicked', mode)

    try {
      const currentState = this.selected(this.entity.attributes.aux_heat)
      await this.hass.callService("climate", "set_aux_heat", {
        entity_id: this.config.entity,
        aux_heat: !currentState.state //do opposite of what current state is
      });

      // For local testing
      // const newState = !currentState.state
      // this.auxState = newState ? 'on' : 'off'
    } catch (e: any) {
      console.error('Error in auxHeat', e)
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
    "ha-honeywell-auxheat": any;
  }
}
