import { select, selectAll } from "./utils.js";

export const state = {
   name: "",
   cardnumber: [],
   direction: 1,
   lastInputCharCode: "",
   month: "",
   year: "",
   cvc: "",
};

export function setDefaultStateValues() {
   const cardHolder = select("card-holder");
   const cardnumber = select("card-number");
   const cardExp = select("card-exp");
   const cardCvc = select("card-cvc");

   state.name = cardHolder.textContent;
   state.cardnumber = cardnumber.textContent.split(" ");
   state.month = cardExp.textContent.split("/")[0];
   state.year = cardExp.textContent.split("/")[1];
   state.cvc = cardCvc.textContent;
   state.lastInputCharCode = null;

   console.log(state);
}

export function updateStateProperty(prop, val) {
   if (Array.isArray(state[prop])) return state[prop].push(val);
   return (state[prop] = val);
}
