import { css, CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators";
import { BoilerplateCardConfig, buildInputProps, HoneywellEntity } from "../types";
import { localize } from "../localize/localize";
import { HomeAssistant } from "custom-card-helpers/dist/types";
import { cssUtils, getFanModeOptions } from "../utils";
import RangeTouch from 'rangetouch';

// @description
// Loop through hvac modes and print out the Buttons attached with a click
// handler to call HASS Service to change them
@customElement("ha-honeywell-humidity")
export class HaHoneywellHumidity extends LitElement {
  @property() hass: HomeAssistant;
  @property() config: BoilerplateCardConfig;
  @state() entity: HoneywellEntity | undefined
  @state() value = 50 // used for local testing
  @state() liveValue = 50 // used for local testing
  @state() input: null | HTMLInputElement = null
  constructor(config: BoilerplateCardConfig, hass: HomeAssistant) {
    super();
    this.config = config
    this.hass = hass
  }


  connectedCallback(): void {
    super.connectedCallback()
    if (!this.config.entity) {
      throw new Error("You need to define config entity")
    }
    this.entity = this.hass.states[this.config.entity] as HoneywellEntity

    // TEST LOAD ENTITY
    // this.entity = {
    //   ...this.entity,
    //   attributes: {
    //     ...this.entity?.attributes,
    //     humidity: 5,
    //     min_humidity: 15,
    //     max_humidity: 50
    //   }
    // }

    // set live value to parent value on first Load
    this.liveValue = this.entity?.attributes.humidity as number
  }

  // Only update if the preset mode has changed
  protected shouldUpdate(changedProps: PropertyValues): boolean {
    const prevHass = changedProps.get('hass')
    const prevConfig = changedProps.get('config')
    const prevLiveValue = changedProps.get('liveValue')

    // First render PREV will be undefined
    if (!prevHass || !prevConfig || !prevLiveValue) {
      return true
    }

    if (!this.config.entity) {
      return false
    }

    if (prevLiveValue !== this.liveValue) {
      return true
    }

    const prevEntity = prevHass.states[prevConfig.entity] as HoneywellEntity
    const currentEntity = this.hass.states[this.config.entity] as HoneywellEntity

    return prevEntity.attributes.humidity !== currentEntity.attributes.humidity
  }

  protected render(): TemplateResult {
    if (this.config.show_error || !this.config.entity) {
      return this._showError(localize('common.show_error'));
    }
    this.entity = this.hass.states[this.config.entity] as HoneywellEntity

    // TEST ENTITY
    // this.entity = {
    //   ...this.entity,
    //   attributes: {
    //     ...this.entity?.attributes,
    //     humidity: 5,
    //     min_humidity: 15,
    //     max_humidity: 50
    //   }
    // }

    if (!this.entity?.attributes.humidity
      || !this.entity?.attributes.min_humidity
      || !this.entity?.attributes.max_humidity) {
      return this._showError('Unable to find Humidity Attributes');
    }

    // Only build input once
    if (!this.input) {
      this.buildInput({
        min_humidity: this.entity?.attributes.min_humidity,
        max_humidity: this.entity?.attributes.max_humidity,
        humidity: this.entity?.attributes.humidity
      })
    }

    return html`
      <div class="modes-wrapper flex flex-row justify-center">
        ${this.liveValue} %
      </div>
    `
  }
  private handleInput(e) {
    this.liveValue = e.target.value
  }
  private async handleChangeInput(e: any) {
    e.preventDefault()
    this.liveValue = e.target.value
    try{
      await this.hass.callService("climate", "set_humidity", {
        entity_id: this.config.entity,
        humidity: e.target.value
      });

    } catch (e: any) {
      console.error('Error in Humidity', e)

      // Set back to Original
      const original = this.entity?.attributes.humidity as number
      this.liveValue = original
      const input = this.shadowRoot?.querySelector('#etSlider')
      input?.setAttribute('value', original.toString())
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      input?.value = original
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

  private buildInput({
    min_humidity,
    max_humidity,
    humidity
  }: buildInputProps) {
    this.input = document.createElement('input')
    this.input.setAttribute('type', 'range')
    this.input.setAttribute('class', 'etSlider')
    this.input.setAttribute('id', 'etSlider')

    // Prev safe checked for
    this.input.setAttribute('min', min_humidity.toString())
    this.input.setAttribute('max', max_humidity.toString())
    this.input.setAttribute('value', humidity.toString())
    const range = new RangeTouch(this.input, {});
    this.input.addEventListener('change', this.handleChangeInput.bind(this))
    this.input.addEventListener('input', this.handleInput.bind(this))
    this.shadowRoot?.append(this.input)
  }

  static get styles(): CSSResultGroup {
    return css`
      :host{
        width: 100%;
        display: flex;
        flex-direction: row;
        column-gap: 8px;
        align-items: center;
      }
      .etSlider{
        -webkit-appearance: none;
        background: transparent;
        cursor: pointer;
        width: 100%;
        overflow: hidden;
        border-radius: 12px;
        position: relative;
      }
      .etSlider::-webkit-slider-runnable-track{
        background: var( --lovelace-background, var(--primary-background-color) );
        height: 3rem;
      }
      .etSlider::-moz-range-track{
        background: rgba(var(--color-blue), 0.2);
        height: 3rem;
      }
      .etSlider::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 5px;
        height: 2rem;
        position: relative;
        background: #fff;
        top: 7px;
        right: 10px;
        box-shadow: -200px 0 0 210px rgba(var(--color-blue), 1);
        border: none;
        border-radius: 20px;
      }

      .etSlider::-moz-range-thumb {
        width: 5px;
        height: 2rem;
        position: relative;
        background: #fff;
        top: 8.5px;
        right: 10px;
        box-shadow: -200px 0 0 210px rgba(var(--color-blue), 1);
        border: none;
        border-radius: 20px;
      }
      .etSlider::-ms-fill-lower {
          background: rgba(var(--color-blue), 1);
      }
      .modes-wrapper{
        padding: 0 12px;
        font-size: 21px;
        font-weight: bold;
        text-align: center;
        width: 88px;
      }
      ${cssUtils}
  `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-honeywell-humidity": any;
  }
}
