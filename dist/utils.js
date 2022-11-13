import{i as e}from"./lit-element-7979863d.js";const o=e=>{switch(e){case"heat_cool":return{icon:"mdi:autorenew",name:"Heat/Cool",color:"green",hvacText:"Heat/Cool"};case"cool":return{icon:"mdi:snowflake",name:"Cool",color:"blue",hvacText:"Cool To"};case"heat":return{icon:"mdi:fire",name:"Heat",color:"red",hvacText:"Heat To"};case"off":return{icon:"mdi:power",name:"Off",color:"yellow",hvacText:"Current Temperature"};default:return{icon:"mdi:help",name:"None",color:"none",hvacText:"None Selected"}}},t=e=>{switch(e){case"auto":return{icon:"mdi:fan-auto",name:"Auto",color:"blue"};case"on":return{icon:"mdi:fan",name:"On",color:"blue"};default:return{icon:"mdi:help",name:"Not Found",color:"yellow"}}},n=e`
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
  .text-4xl {
    font-size: 36px;
    line-height: 40px;
  }
  .text-red{
    color: rgba(var(--color-red), 1);
  }
  .text-blue{
    color: rgba(var(--color-blue), 1);
  }
  .w-full{
    width: 100%;
  }
  .col-gap-8{
    column-gap: 8px;
  }
`;export{n as cssUtils,t as getFanModeOptions,o as getModeOptions};
