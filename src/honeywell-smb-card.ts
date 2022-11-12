/* eslint-disable @typescript-eslint/no-explicit-any */
import { LitElement, html, TemplateResult, css, PropertyValues, CSSResultGroup } from 'lit';
import { customElement, eventOptions, property, queryAsync, state } from 'lit/decorators';
import {
  HomeAssistant,
  hasConfigOrEntityChanged,
  hasAction,
  ActionHandlerEvent,
  handleAction,
  LovelaceCardEditor,
  getLovelace,
  fireEvent,
} from 'custom-card-helpers'; // This is a community maintained npm module with common helper functions/types. https://github.com/custom-cards/custom-card-helpers

import type { HoneywellCardConfig, HADialog, HoneywellConfig, HoneywellEntity, HoneywellProps } from './types';
import { actionHandler } from './action-handler-directive';
import { CARD_VERSION } from './const';
import { localize } from './localize/localize';
import { Ripple } from '@material/mwc-ripple';
import { RippleHandlers } from '@material/mwc-ripple/ripple-handlers';
import './customButton';
import './et-pop-up';
import './modes-card';
import './inputSelect';

/* eslint no-console: 0 */
console.info(
  `%c  honeywell-smb-card \n%c  ${localize('common.version')} ${CARD_VERSION}    `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

// This puts your card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'honeywell-smb-card',
  name: 'Honeywell SMB Card',
  description: 'A template custom card for you to create something awesome',
});

// local/community/honeywell-card/honeywell-smb-card.js
@customElement('honeywell-smb-card')
export class HoneywellCard extends LitElement {

  private dialogEl: null | HADialog = null
  private isDialogOpen = false
  private tempEntity: null | HoneywellEntity = null
  private loaded = false
  private _popupEl: any = null

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

  @queryAsync('mwc-ripple') private _ripple!: Promise<Ripple | null>;

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
      name: 'Boilerplate',
      ...config,
    };
  }

  // https://lit.dev/docs/components/lifecycle/#reactive-update-cycle-performing
  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) {
      return false;
    }

    if (!this.config.toggleTrigger) {
      return hasConfigOrEntityChanged(this, changedProps, false);
    }

    const hasChanged = hasConfigOrEntityChanged(this, changedProps, false);

    if (hasChanged) {
      this._popupEl?.setHass(this.hass)
    }

    return hasChanged
  }


  renderPopUp() {
    // Check is el is already loaded into the DOM
    // IF so just update config and hass
    const id = this.config.entity?.replace('.', '-')
    const lookup:any = document.querySelector(`#${id}`)

    if (lookup) {
      lookup.setConfig(this.config)
      lookup.setHass(this.hass)
      return
    }

    const popUp = document.createElement("ha-custom-popup");
    popUp.setAttribute('id', id)
    document.body.append(popUp)
    this._popupEl = document.querySelector(`#${id}`)
    this._popupEl?.setConfig(this.config)
    this._popupEl?.setHass(this.hass)
    this._popupEl?.setAttribute('open', 'false')
  }

  // @action=${this._handleAction}
  // .actionHandler=${actionHandler({
  //   hasHold: hasAction(this.config.hold_action),
  //   hasDoubleClick: hasAction(this.config.double_tap_action),
  // })}
  // https://lit.dev/docs/components/rendering/
  protected render(): TemplateResult | void {
    // TODO Check for stateObj or other necessary things and render a warning if missing
    this.renderPopUp()

    if (this.config.show_warning) {
      return this._showWarning(localize('common.show_warning'));
    }

    if (this.config.show_error || !this.config.entity) {
      return this._showError(localize('common.show_error'));
    }
    this.tempEntity = this.hass.states[this.config.entity] as HoneywellEntity

    // const tempProps = tempObj.attributes as HoneywellProps
    console.log('this.config', this.config)
    console.log('tempObj', this.tempEntity.attributes)
    console.log('hass', this.hass)

    // @mousedown="${this.handleRippleActivate}"
    // @mouseup="${this.handleRippleDeactivate}"
    //@mousedown="${this.openPopUp}"
    // @mouseup="${this.handleRippleDeactivate}"
    // @action=${this._handleAction}
    //     .actionHandler=${actionHandler({
    //       hasHold: hasAction(this.config.hold_action),
    //       hasDoubleClick: hasAction(this.config.double_tap_action),
    //     })}
    // @click=${this.openPopUp}
    return html`
      <ha-card
        tabindex="0"
        @click="${this.openPopUp}"
      >
      <div
          class="love-ui-card love-ha-card button-on-card love-ha-card-padding love-ha-border-radius">

          <div class="love-ha-container love-ha-grid-h love-ha-grid-hidden">

            <div class="ha-img-cell love-ha-img-cell justify-start ${this.getThermostateStateClass(this.tempEntity.state)}">
              <div class="degree-number img-cell-number">
                ${this.tempEntity.attributes.current_temperature}
                <span class="degree-icon"></span>
              </div>
            </div>

            <div class="love-ha-name-grid love-ha-name love-ha-name--start ellipsis">
              ${this.config.name}
            </div>

            <div class="love-ha-label-grid love-ha-label love-ha-label--start ellipsis">
              Current Temp | ${this.tempEntity.attributes.hvac_action}
            </div>

            <!-- ${this.renderDialog()} -->

          </div>

      </div>
      <mwc-ripple id="ripple"></mwc-ripple>
    </ha-card>
    `;
  }

  renderDialog() {
    return html`
      <div class="love-ha-hidden-container open">
          <ha-dialog
            id="tmp-dialog"
            title="TEST"
            .hass=${this.hass}
            @close=${this.closeDialog}
            @closed=${this.onDialogClose}
            hideActions=${true}
          >
            <div class="content">
              <div class="temp-pop-up">
                <div class="temp-pop-up--grid flex flex-row space-between justify-start">
                  <div class="love-ha-name-grid love-ha-name love-ha-name--start ellipsis">
                    Basic Card Example
                  </div>
                  <div class="temp-pop-up--close">
                    <ha-icon-button
                    .label=${this.hass.localize("ui.dialogs.generic.close")}
                    dialogAction="close"
                    >
                      <ha-icon
                      id="ha-icon"
                      icon="mdi:close"></ha-icon>
                    </ha-icon-button>
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
                  .label=${this.hass.localize("ui.dialogs.generic.close")}
                  dialogAction="close"
                >
                  <ha-icon
                  id="ha-icon"
                  icon="mdi:chevron-down"></ha-icon>
                </ha-icon-button>
                <ha-icon-button
                  .label=${this.hass.localize("ui.dialogs.generic.close")}
                  @click=${this.closePopUp}
                >
                  <ha-icon
                  id="ha-icon"
                  icon="mdi:close"></ha-icon>
                </ha-icon-button>
              </div>
              <my-slider-v2
                .hass=${this.hass}
                .config=${this.config}></my-slider-v2>
            </div>
          </ha-dialog>
      </div>
    `
  }

  renderThermoCtrls() {
    return html`
      <div class="flex flex-col">

        <!-- STATUS -->
        <div>
          HEAT TO
        </div>

        <!-- TEMP CTRLS -->
        <div class="flex flex-row justify-center">

          <!-- MINUS -->
          <div>
            -
          </div>

          <!-- TEMP -->
          <div>
            68
          </div>

          <!-- ADD -->
          <div>
            +
          </div>

        </div>

        <!-- Degree -->
        <div>
          &#8457;
        </div>
      </div>
    `
  }

  getThermostateStateClass(status: string):string {
    switch (status) {
      case 'heat':
        return 'heating'
      case 'cool':
          return 'cooling'
      default:
        return 'off'
   }
  }

  onDialogClose (e:any) {
    console.log(e)
    this.isDialogOpen = false
      if (e.detail.action === 'yes') {
        alert('BOOM')
      }
      else if (e.detail.action === 'no') {
        alert('nothing happens')
      }
  }

  testContentRender() {
    return html`
      <ha-select naturalMenuWidth >
        <mwc-list-item tabindex="1" role="option">item 1</mwc-list-item>
        <mwc-list-item tabindex="2" role="option">item 2</mwc-list-item>
        <mwc-list-item tabindex="3" role="option">item 3</mwc-list-item>
        <mwc-list-item tabindex="4" role="option">item 4</mwc-list-item>
        <mwc-list-item tabindex="5" role="option">item 5</mwc-list-item>
      </ha-select>
    `
  }

  async openPopUp() {
    this.handleRippleActivate()
    if (!this.shadowRoot) return

    if (!this.dialogEl) {
      this.dialogEl = this.shadowRoot.querySelector('#tmp-dialog');
      const id = this.config.entity?.replace('.', '-')
      const customEl = document.querySelector(`#${id}`)
      // const customEl = document.querySelector('ha-custom-popup')
      // console.log('test', customEl)
      // await customEl.addContent(this.testContentRender())
      // customEl.showPopup()
      customEl?.setAttribute('open', 'true')

      // this.dialogEl = customEl.shadowRoot.querySelector('#tmp-dialog')
    }

    // console.log('open', this.dialogEl)

    // this.dialogEl?.show()
    this.isDialogOpen = true

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    // window.browser_mod?.service("popup", {
    //   content: {
    //     type: 'html',
    //     content: this.renderDialog()
    //   },
    //   ...this.config,
    // });
    setTimeout(() => {
      this.handleRippleDeactivate()
    }, 300)
  }
  openBrowserMod(){
    // fireEvent(this, "browser_mod", { dialog: this.localName });
  }
  closeDialog() {
    console.log('close')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // fireEvent(this, "dialog-closed", { dialog: this.localName });
  }
  closePopUp() {
    console.log('closed', this.dialogEl)
    this.dialogEl?.close()
  }
  buttonClicked() {
    if(!this.config.toggleTrigger) return
    const stateObj = this.hass.states[this.config.toggleTrigger];
    const service = stateObj.state === "on" ? "turn_off" : "turn_on";

    this.hass.callService("input_boolean", service, { entity_id: this.config.toggleTrigger });
  }

  private _rippleHandlers: RippleHandlers = new RippleHandlers(() => {
    // this._shouldRenderRipple = true;
    return this._ripple;
  });

  // backward compatibility
  @eventOptions({ passive: true })
  private handleRippleActivate(evt?: Event): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this._ripple.then((r) => r && r.startPress && this._rippleHandlers.startPress(evt));
  }

  private handleRippleDeactivate(): void {

    if (!this.isDialogOpen) {
      return
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this._ripple.then((r) => r && r.endPress && this._rippleHandlers.endPress());
  }

  private _handleAction(ev: ActionHandlerEvent): void {
    console.log('action', {
      hass: this.hass,
      config: this.config,
      detail: ev.detail.action
    })
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
        --mdc-ripple-focus-opacity: 0;
        --mdc-ripple-hover-opacity: 0;
        /* --mdc-icon-button-size: 36px; */
      }

      /* :host ha-icon-button{
        background-color: rgba(var(--color-theme),0.05);
        border-radius: 4px;
        overflow: hidden;
      } */
      .love-icon-button{
        border-radius: 50%;
        overflow: hidden;
        color: var(--primary-text-color);
        width: 36px;
        height: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        grid-area: tgl/tgl/tgl/tgl;
        box-shadow: rgb(0 0 0 / 80%) 0px 2px 4px 0px;
        background: var( --ha-card-background, var(--card-background-color, white) );
      }
      #ha-icon {
        fill: currentcolor;
        --mdc-icon-size: 100%;
        --iron-icon-width: 100%;
        --iron-icon-height: 100%;
        transition: all 0.3s ease-out 0s;
      }

      #ha-icon.icon {
        margin: auto;
        display: inline-block;
        fill: currentcolor;
        height: 100%;
        width: 100%;
        max-height: 100%;
        position: absolute;
        color: rgba(var(--color-theme), 0.2);
        width: 20px;
        position: relative;
      }

      svg {
        width: 100%;
        height: 100%;
        pointer-events: none;
        display: block;
      }

      #ha-svg-icon {
        display: var(--ha-icon-display, inline-flex);
        align-items: center;
        justify-content: center;
        position: relative;
        vertical-align: middle;
        fill: currentcolor;
        width: var(--mdc-icon-size, 24px);
        height: var(--mdc-icon-size, 24px);
      }
      .love-ui-card {
        background: var(--ha-card-background, var(--card-background-color, white));
        border-radius: var(--ha-card-border-radius, 4px);
        box-shadow: var(--ha-card-box-shadow, 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12));
        color: var(--primary-text-color);
        display: block;
        transition: all 0.3s ease-out 0s;
        position: relative;
      }

      .love-ha-card {
        cursor: pointer;
        overflow: hidden;
        box-sizing: border-box;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: normal;
        -webkit-user-select: none;
          -moz-user-select: none;
                user-select: none;
      }

      .button-on-card {
        padding: 4% 0px;
        text-transform: none;
        font-weight: 400;
        font-size: 1.2rem;
        align-items: center;
        text-align: center;
        letter-spacing: normal;
        width: 100%;
      }

      .love-ha-card-padding {
        padding: 12px;
      }

      .love-ha-border-radius {
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
      }

      .ha-img-cell {
        display: flex;
        grid-area: i/i/i/i;
        height: 100%;
        width: 100%;
        max-width: 100%;
        max-height: 100%;
        place-self: center;
        overflow: hidden;
        justify-content: center;
        align-items: center;
        position: relative;
      }

      .love-ha-img-cell {
        background-color: rgba(var(--color-theme), 0.05);
        border-radius: 50%;
        place-self: center start;
        width: 42px;
        height: 42px;
        margin-right: 12px;
      }

      .love-ha-img-cell.heating {
        background-color: rgba(var(--color-red), 0.2);
        color: rgba(var(--color-red), 1);
      }

      .love-ha-img-cell.cooling {
        background-color: rgba(var(--color-blue), 0.2);
        color: rgba(var(--color-blue), 1);
      }

      .love-ha-container {
        display: grid;
        width: 100%;
        height: 100%;
        text-align: center;
        align-items: center;
      }

      .love-ha-container--vertical {
        grid-template: "i" 1fr "n" -webkit-min-content "s" -webkit-min-content "l" min-content/1fr;
        grid-template: "i" 1fr "n" min-content "s" min-content "l" min-content/1fr;
      }

      .love-ha-grid-h {
        grid-template-areas: "i n" "i l";
        grid-template-columns: auto 1fr;
      }

      .love-ha-grid-hidden{
        grid-template-areas:
            "i n tgl"
            "i l tgl"
            "h h h";
        grid-template-columns: auto 1fr auto;
        width: 100%;
        overflow: hidden;
      }

      .love-ha-name {
        font-weight: bold;
        font-size: 14px;
        margin-top: 0px;
      }

      .love-ha-name-grid {
        grid-area: n/n/n/n;
        max-width: 100%;
        place-self: center;
      }

      .love-ha-name--start {
        justify-self: start;
      }

      .love-ha-label-grid {
        grid-area: l/l/l/l;
        max-width: 100%;
        place-self: center;
      }

      .love-ha-label {
        place-self: start;
        font-weight: bolder;
        font-size: 12px;
        filter: opacity(40%);
      }

      .love-ha-hidden-container {
        grid-area: h/h/h/h;
        max-width: 100%;
        place-self: center;
        height: 0;
        overflow: hidden;
      }

      .love-ha-hidden-container.open {
        height: auto
      }

      .love-ha-temp-container {
        padding: 40px 0 0;
      }

      .temp-pop-up {
        color: var(--primary-text-color);
        width: 100%;
      }

      .ellipsis {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .degree-number {
        text-align: center;
        font-size: 16px;
        font-weight: 600;
        position: relative;
      }

      .img-cell-number {
        margin-left: 9px;
      }

      .degree-icon {
        position: absolute;
        top: 5px;
        right: -8px;
        border-radius: 50%;
        border: 1.5px solid currentColor;
        width: 3px;
        height: 3px;
      }

      .justify-start {
        justify-content: start;
      }

      .justify-center {
        justify-content: center;
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
      .rotate-180{
        transform: rotate(180deg)
      }
      .rotate-0{
        transform: rotate(0deg)
      }
      .text-sm{
        font-size:14px;
      }
      `;
  }
}
