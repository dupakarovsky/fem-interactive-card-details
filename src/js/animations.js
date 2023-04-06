import { gsap } from "gsap";
import { TextPlugin } from "gsap/all";
import { state, updateStateProperty } from "./model.js";
import { select, updateInputValue } from "./utils.js";

gsap.registerPlugin(TextPlugin);
export const cardFlipMobile = gsap.timeline();

export const animateCardHolder = (evt) => {
   return gsap.to(select("card-holder"), {
      text: evt.target.value,
      duration: 0.2,
      ease: "sine1.inOut",
      onComplete: () => updateStateProperty("name", evt.target.value),
   });
};

export const animateCardNumber = (evt) => {
   let cardnums = state.cardnumber;
   let input = evt.target;

   if (input.value.length === 4 || input.value.length === 9 || input.value.length === 14) {
      state.lastInputCharCode === 32
         ? updateInputValue(input, input.value)
         : updateInputValue(input, input.value + " ");
   } else {
      updateInputValue(input, input.value);
   }
   updateStateProperty("lastInputCharCode", +input?.value?.charCodeAt(input.value.length - 1));

   return gsap.to(select("card-number"), {
      text: {
         value: input.value + cardnums.join(" ").slice(input.value.length),
         preserveSpaces: true,
         type: "diff",
      },
      duration: 0.25,
      ease: "power1.out",
   });
};

export const animateCardField = (evt, prop) => {
   let cardFiled = state[prop];
   let input = evt.target;

   return gsap.to(select(`${prop}`), {
      text: {
         value: input.value + cardFiled.slice(input.value.length),
         type: "diff",
      },
      duration: 0.25,
      ease: "power1.out",
   });
};

export const animateCardFlipMobile = () => {
   return cardFlipMobile
      .to(select("card-back"), {
         top: "50%",
         left: "5%",
         ease: "back.inOut(4)",
         zIndex: 2,
         duration: 0.5,
      })
      .to(
         select("card-front"),
         {
            top: "12.5%",
            right: "5%",
            left: "unset",
            zIndex: 1,
            ease: "back.inOut(4)",
            duration: 0.5,
         },
         "0"
      )
      .pause();
};
