import { css, CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators";
import { HoneywellCardConfig, HoneywellEntity } from "../types";
import { localize } from "../localize/localize";
import { HomeAssistant } from "custom-card-helpers/dist/types";
import { cssUtils } from "../utils";

// @description
// Loop through hvac modes and print out the Buttons attached with a click
// handler to call HASS Service to change them
@customElement("ha-presets-dropdown")
export class HaPresetsDropdown extends LitElement {
  @property() hass: HomeAssistant;
  @property() config: HoneywellCardConfig;

  @state() entity: HoneywellEntity | undefined
  @state() state: {
    items: string[]
    currentValue: string
  } = {
      items: [],
      currentValue: ''
  }

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

    return prevEntity.attributes.preset_mode !== currentEntity.attributes.preset_mode
  }

  protected render(): TemplateResult {
    if (this.config.show_error || !this.config.entity) {
      return this._showError(localize('common.show_error'));
    }
    this.entity = this.hass.states[this.config.entity] as HoneywellEntity
    this.state = {
      items: this.entity.attributes.preset_modes,
      currentValue: this.entity.attributes.preset_mode
    }

    return html`
      <ha-select
        naturalMenuWidth
        .value=${this.state.currentValue}
        @selected=${this._changed}
        >

        ${this.state.items
          .map((mode, index) =>
              html`<mwc-list-item tabindex=${index} role="option" .value=${mode}>${mode}</mwc-list-item>`
          )}

      </ha-select>
    `
  }

  private async _changed(ev): Promise<void> {
    if (!this.hass || ev.target.value === "") {
      return;
    }
    const prevValue = this.state.currentValue
    this.state.currentValue = ev.target.value;

    try {
      await this.hass.callService("climate", "set_preset_mode", {
        entity_id: this.config.entity,
        preset_mode: this.state.currentValue
      });
    } catch (e: any) {
      console.error('preset error', e)
      this.state.currentValue = prevValue
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
      ha-select{
        width: 100%;
      }
  `;
  }
}



declare global {
  interface HTMLElementTagNameMap {
    "ha-presets-dropdown": any;
  }
}
