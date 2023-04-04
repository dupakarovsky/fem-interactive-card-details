import { select, selectAll } from "./utils.js";

export const state = {
   name: "",
   cardnumber: [],
   direction: 1,
   lastInputCharCode: "",
   expriation: {
      month: "",
      year: "",
   },
   cvc: "",
};

export function setDefaultStateValues() {
   const cardHolder = select("card-holder");
   const cardnumber = select("card-number");
   const cardExp = select("card-exp");
   const cardCvc = select("card-cvc");

   state.name = cardHolder.textContent;
   state.cardnumber = cardnumber.textContent.split(" ");
   state.expriation.month = cardExp.textContent.split("/")[0];
   state.expriation.year = cardExp.textContent.split("/")[1];
   state.cvc = cardCvc.textContent;
   state.lastInputCharCode = null;

   console.log(state);
}

export function updateStateProperty(prop, val) {
   return (state[prop] = val);
}
