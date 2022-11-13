import{o as e}from"./query-assigned-elements-7405f3b8.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function t(t){return e({finisher:(e,s)=>{Object.assign(e.prototype[s],t)}})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function s(t){return e({descriptor:e=>({async get(){var e;return await this.updateComplete,null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(t)},enumerable:!0,configurable:!0})})}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class r{constructor(e){this.startPress=t=>{e().then((e=>{e&&e.startPress(t)}))},this.endPress=()=>{e().then((e=>{e&&e.endPress()}))},this.startFocus=()=>{e().then((e=>{e&&e.startFocus()}))},this.endFocus=()=>{e().then((e=>{e&&e.endFocus()}))},this.startHover=()=>{e().then((e=>{e&&e.startHover()}))},this.endHover=()=>{e().then((e=>{e&&e.endHover()}))}}}export{r as R,t as a,s as e};
