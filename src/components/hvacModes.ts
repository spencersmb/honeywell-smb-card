import { css, CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators";
import { HoneywellCardConfig, HoneywellEntity } from "../types";
import { localize } from "../localize/localize";
import { getModeOptions, cssUtils } from "../utils";
import { HomeAssistant } from "custom-card-helpers/dist/types";

// @description
// Loop through hvac modes and print out the Buttons attached with a click
// handler to call HASS Service to change them
@customElement("ha-hvac-modes")
export class HaHvacModes extends LitElement {
  @property() config: HoneywellCardConfig;
  @property() hass: HomeAssistant;
  @state() entity: HoneywellEntity | undefined


  constructor(config: HoneywellCardConfig, hass: HomeAssistant) {
    super();
    this.hass = hass
    this.config = config
  }

  // Only update if the states of mode have changed
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

    return prevEntity.state !== currentEntity.state
  }

  protected render(): TemplateResult {

    if (this.config.show_error || !this.config.entity) {
      return this._showError(localize('common.show_error'));
    }
    this.entity = this.hass.states[this.config.entity] as HoneywellEntity

    return html`
      <div class="modes-wrapper flex flex-row space-between">
        ${this.entity.attributes.hvac_modes.map((mode, index) => {

          const modeObj = getModeOptions(mode)
          return html`
            <ha-custom-button
              id="mode-${index}"
              class="button-wrapper flex-1 overflow-hidden"
              selected=${mode === this.entity?.state}
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

    return () => {
      if(!this.config.entity) return

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
      :host{

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
    "ha-hvac-modes": any;
  }
}
