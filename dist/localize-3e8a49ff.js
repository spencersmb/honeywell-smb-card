import{e}from"./query-assigned-elements-7405f3b8.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function n(n){return e({...n,state:!0})}var o={version:"Version",invalid_configuration:"Invalid configuration",show_warning:"Show Warning",show_error:"Show Error"},r={common:o},t={version:"Versjon",invalid_configuration:"Ikke gyldig konfiguration",show_warning:"Vis advarsel"},i={common:t};const a={en:Object.freeze({__proto__:null,common:o,default:r}),nb:Object.freeze({__proto__:null,common:t,default:i})};function c(e,n="",o=""){const r=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_");let t;try{t=e.split(".").reduce(((e,n)=>e[n]),a[r])}catch(n){t=e.split(".").reduce(((e,n)=>e[n]),a.en)}return void 0===t&&(t=e.split(".").reduce(((e,n)=>e[n]),a.en)),""!==n&&""!==o&&(t=t.replace(n,o)),t}export{c as l,n as t};
