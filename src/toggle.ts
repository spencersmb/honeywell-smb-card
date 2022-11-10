// import "@material/mwc-icon-button";
// // import type { IconButton } from "@material/mwc-icon-button";
// import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
// import { customElement, property, query } from "lit/decorators";
// import { ifDefined } from "lit/directives/if-defined";
// import "./ha-svg-icon";

// @customElement("ha-icon-button")
// export class HaIconButton extends LitElement {
//   @property({ type: Boolean, reflect: true }) disabled = false;

//   // SVG icon path (if you need a non SVG icon instead, use the provided slot to pass an <ha-icon> in)
//   @property({ type: String }) path?: string;

//   // Label that is used for ARIA support and as tooltip
//   @property({ type: String }) label?: string;

//   // These should always be set as properties, not attributes,
//   // so that only the <button> element gets the attribute
//   @property({ type: String, attribute: "aria-haspopup" })
//   // override ariaHasPopup!: IconButton["ariaHasPopup"];

//   @property({ type: Boolean }) hideTitle = false;

//   // @query("mwc-icon-button", true) private _button?: IconButton;

//   public override focus() {
//     // this._button?.focus();
//   }

//   static shadowRootOptions: ShadowRootInit = {
//     mode: "open",
//     delegatesFocus: true,
//   };

//   protected render(): TemplateResult {
//     return html`
//       <ha-card >
//         <div class="love-ha-toggle">

//         </div>
//       </ha-card>
//     `;
//   }

//   static get styles(): CSSResultGroup {
//     return css`
//       .love-ha-toggle{
//         grid-area: tgl / tgl / tgl / tgl;
//         max-width: 100%;
//         place-self: center;
//         width: 42px;
//         height: 42px;
//         background-color: red;
//       }
//     `;
//   }
// }

// declare global {
//   interface HTMLElementTagNameMap {
//     "ha-icon-button": HaIconButton;
//   }
// }