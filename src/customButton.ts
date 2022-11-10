import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, eventOptions, property, queryAsync } from "lit/decorators";
import { Ripple } from '@material/mwc-ripple';
import { RippleHandlers } from '@material/mwc-ripple/ripple-handlers';

@customElement("ha-custom-button")
export class HaCustomButton extends LitElement {
  @property() public header?: string;
  @property() public selected?: boolean;
  @property() public color?: string;
  @property() public disabled?: boolean;
  @property({ type: Boolean, reflect: true }) public raised = false;
  @queryAsync('mwc-ripple') private _ripple!: Promise<Ripple | null>;
  static get styles(): CSSResultGroup {
    return css`
    :host{
      background: transparent;
    }
    .temp-btn-lg{
      background: rgba(var(--color-theme),0.05);
      justify-content: center;
      align-items: center;
      padding: 16px;
      border-radius: var(--ha-card-border-radius, 4px);
      flex: 1;
    }

    .temp-btn-lg:hover{
      cursor: pointer;
    }
    .temp-btn-lg.red{
      background-color: rgba(var(--color-red), 0.2);
      color: rgba(var(--color-red), 1);
    }
    .temp-btn-lg.blue{
      background-color: rgba(var(--color-blue), 0.2);
      color: rgba(var(--color-blue), 1);
    }
    .temp-btn-lg.green{
      background-color: rgba(var(--color-green), 0.2);
      color: rgba(var(--color-green), 1);
    }
    .temp-btn-lg.yellow{
      background-color: rgba(var(--color-yellow), 0.2);
      color: rgba(var(--color-yellow), 1);
    }
    .temp-btn-lg:disabled{
      background-color: rgba(var(--color-theme),0.02);
      color: rgba(var(--color-theme),0.3);
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
    .overflow-hidden{
      overflow: hidden;
    }
    `;
  }

  protected render(): TemplateResult {
    return html`
      <ha-card
        ?disabled=${this.disabled}
        tabindex="0"
        @mousedown="${this.handleRippleActivate}"
        @mouseup="${this.handleRippleDeactivate}"
        class="temp-btn-lg flex flex-col overflow-hidden ${this.selected ? this.color : ""}"
      >
        <slot></slot>
        <mwc-ripple id="ripple"></mwc-ripple>
      </ha-card>
    `;
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this._ripple.then((r) => r && r.endPress && this._rippleHandlers.endPress());
  }
}



declare global {
  interface HTMLElementTagNameMap {
    "ha-custom-button": any;
  }
}
