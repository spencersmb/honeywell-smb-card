/* eslint-disable @typescript-eslint/no-explicit-any */
import { LitElement, html, TemplateResult, css, PropertyValues, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import {
  HomeAssistant,
  hasConfigOrEntityChanged,
  hasAction,
  ActionHandlerEvent,
  handleAction,
  LovelaceCardEditor,
  getLovelace,
} from 'custom-card-helpers'; // This is a community maintained npm module with common helper functions/types. https://github.com/custom-cards/custom-card-helpers

import type { HoneywellCardConfig, HoneywellConfig, HoneywellEntity } from './types';
import { actionHandler } from './action-handler-directive';
import { CARD_VERSION } from './const';
import { localize } from './localize/localize';

/* eslint no-console: 0 */
console.info(
  `%c  HA-HW-CARD \n%c  ${localize('common.version')} ${CARD_VERSION}    `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

// This puts your card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'hahw-modes-card',
  name: 'HA HW Card',
  description: 'A template custom card for you to create something awesome',
});

// TODO Name your custom element
@customElement('hahw-modes-card')
export class HAHWModesCard extends LitElement {

  private tempEntity: null | HoneywellEntity = null

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import('./editor');
    return document.createElement('honeywell-smb-card-editor');
  }


  public static getStubConfig(): Record<string, unknown> {
    return {};
  }

  // TODO Add any properities that should cause your element to re-render here
  // https://lit.dev/docs/components/properties/
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private config!: HoneywellCardConfig;

  // https://lit.dev/docs/components/properties/#accessors-custom
  public setConfig(config: HoneywellCardConfig): void {
    // TODO Check for required fields and that they are of the proper format
    if (!config) {
      throw new Error(localize('common.invalid_configuration'));
    }

    if (config.test_gui) {
      getLovelace().setEditMode(true);
    }

    this.config = {
      name: 'HWHAModes',
      ...config,
    };
  }

  // https://lit.dev/docs/components/lifecycle/#reactive-update-cycle-performing
  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) {
      return false;
    }

    return hasConfigOrEntityChanged(this, changedProps, false);
  }

  // https://lit.dev/docs/components/rendering/
  protected render(): TemplateResult | void {
    // TODO Check for stateObj or other necessary things and render a warning if missing
    if (this.config.show_warning) {
      return this._showWarning(localize('common.show_warning'));
    }

    if (this.config.show_error || !this.config.entity) {
      return this._showError(localize('common.show_error'));
    }

    this.tempEntity = this.hass.states[this.config.entity] as HoneywellEntity

    console.log('modes: tempObj', this.tempEntity.attributes)
    return html`
      <ha-card
        id="modes-card"
        tabindex="0"
      >
        <div class="modes-wrapper flex flex-row space-between">
          ${this.renderModes(this.tempEntity?.attributes)}
        </div>
      </ha-card>
    `;
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

  private getIconForMode(mode: string) {
    switch (mode) {
      case 'heat_cool':
        return {
          icon: "mdi:autorenew",
          name: "Heat/Cool",
          color: "green",
        }
      case 'cool':
        return {
          icon: "mdi:snowflake",
          name: "Cool",
          color: "blue"
        }
      case 'heat':
        return {
          icon: "mdi:fire",
          name: "Heat",
          color: "red"
        }
      case 'off':
        return {
          icon: "mdi:power",
          name: "Off",
          color: "yellow"
        }
      default:
        return {
          icon: "mdi:help",
          name: "None",
          color: "none"
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

  private _handleAction(ev: ActionHandlerEvent): void {
    if (this.hass && this.config && ev.detail.action) {
      handleAction(this, this.hass, this.config, ev.detail.action);
    }
  }

  private _showWarning(warning: string): TemplateResult {
    return html` <hui-warning>${warning}</hui-warning> `;
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

  // https://lit.dev/docs/components/styles/
  static get styles(): CSSResultGroup {
    return css`
      :host{
        --mdc-icon-size: 28px;

      }
      #modes-card{
        background: transparent;
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
    `;
  }
}