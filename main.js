import { select, selectAll } from "./src/js/utils.js";
import { state, setDefaultStateValues, updateStateProperty } from "./src/js/model.js";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/all";
import Splitting from "splitting";

gsap.registerPlugin(TextPlugin);

const inputCardHolder = select("input-cardholder");
const inputCardNumber = select("input-number");
let counter = 0;

const animateCardHolder = (evt) => {
   return gsap.to(select("card-holder"), {
      text: evt.target.value,
      duration: 0.2,
      ease: "sine1.inOut",
      onComplete: () => updateStateProperty("name", evt.target.value0),
   });
};

const updateInputValue = (domEl, value) => {
   domEl.value = value;
};

const animateCardNumber = (evt) => {
   let cardnums = state.cardnumber;
   let input = evt.target;

   if (input.value.indexOf(input.value.at(-1)) > 0 && input.value.indexOf(input.value.at(-1)) % 3 === 0) {
      state.lastInput === 32 || input.value.length === 19
         ? updateInputValue(input, input.value)
         : updateInputValue(input, input.value + " ");
   } else {
      console.log(input.value.at(-1), input.value.indexOf(input.value.at(-1)));
      updateInputValue(input, input.value);
   }
   updateStateProperty("lastInput", +input?.value?.at(-1)?.charCodeAt());

   // return gsap.to(cardNumber, {
   //    text: {
   //       value: string,
   //       preserveSpaces: true,
   //       type: "diff",
   //       delimiter: " ",
   //    },
   //    duration: 0.25,
   //    ease: "power1.out",
   // });
};

const setErrorState = (val, context) => {
   val === "true"
      ? context.parentElement.setAttribute("style", "--active:1")
      : context.parentElement.removeAttribute("style");

   context.dataset.inError = val;
};

function checkForErrorBlank(e) {
   if (!e.target.value) {
      return setErrorState("true", this);
   }
   setErrorState("false", this);
}

function checkForErrorInvalidFormat(e) {
   const input = this.value.trim();

   if (!isFinite(+input) || input.length < 16) return setErrorState("true", this);
   setErrorState("false", this);
}

inputCardHolder.addEventListener("input", (e) => {
   animateCardHolder(e);
});
inputCardNumber.addEventListener("input", (e) => {
   animateCardNumber(e);
});

window.addEventListener("load", setDefaultStateValues);

//* FLIP POSITIONS
// const cardBack = select("card-back");
// const cardFront = select("card-front");
// const tl = gsap.timeline();
// tl.to(cardBack, {
//    top: "50%",
//    left: "5%",
//    ease: "back.out(4)",
//    zIndex: 2,
//    delay: 0.75,
//    duration: 0.25,
// }).to(
//    cardFront,
//    {
//       top: "12.5%",
//       right: "5%",
//       left: "unset",
//       zIndex: 1,
//       ease: "back.out(4)",
//       delay: 0.75,
//       duration: 0.25,
//    },
//    "0"
// );

//* SPLITTING
// const splitting =  ()=>{
//    const cardNumber = select("card-number");
//    let [split] = Splitting({ target: cardNumber, cardNumber, by: "chars" });

//    const one = split.chars[0];
//    console.log(one);

//       let split;
//       gsap.set(cardNumber, { onStart: ([split] = Splitting({ target: cardNumber, by: "chars" })) });
//       console.log(split.chars);

//       const tl = gsap.timeline();
//       tl.from(split.chars, { scale: 0, ease: "sine.in", stagger: { each: 0.05 }, delay: 1 });
// }
