import{_ as e,e as r,a as t}from"./query-assigned-elements-7405f3b8.js";import{s as o,i as l,y as a}from"./lit-element-7979863d.js";import{e as s,a as i,R as n}from"./ripple-handlers-5bacd717.js";let p=class extends o{constructor(){super(...arguments),this.raised=!1,this._rippleHandlers=new n((()=>this._ripple))}static get styles(){return l`
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
    `}render(){return a`
      <ha-card
        ?disabled=${this.disabled}
        tabindex="0"
        @mousedown="${this.handleRippleActivate}"
        @mouseup="${this.handleRippleDeactivate}"
        class="temp-btn-lg flex flex-col overflow-hidden ${this.selected?this.color:""}"
      >
        <slot></slot>
        <mwc-ripple id="ripple"></mwc-ripple>
      </ha-card>
    `}handleRippleActivate(e){this._ripple.then((r=>r&&r.startPress&&this._rippleHandlers.startPress(e)))}handleRippleDeactivate(){this._ripple.then((e=>e&&e.endPress&&this._rippleHandlers.endPress()))}};e([r()],p.prototype,"header",void 0),e([r()],p.prototype,"selected",void 0),e([r()],p.prototype,"color",void 0),e([r()],p.prototype,"disabled",void 0),e([r({type:Boolean,reflect:!0})],p.prototype,"raised",void 0),e([s("mwc-ripple")],p.prototype,"_ripple",void 0),e([i({passive:!0})],p.prototype,"handleRippleActivate",null),p=e([t("ha-custom-button")],p);export{p as HaCustomButton};
