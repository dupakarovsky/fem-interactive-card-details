import { select, selectAll } from "./src/js/utils.js";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/all";
import Splitting from "splitting";

gsap.registerPlugin(TextPlugin);

const inputCardHolder = select("input-cardholder");
const inputCardNumber = select("input-number");
const cardNumber = select("card-number");
const cardExp = select("card-exp");

let numPos = 0;
let prevInputLength = 0;
let direction = 0;

const updateCardHolder = (value) => {
   const cardHolder = select("card-holder");
   return gsap.to(cardHolder, {
      text: {
         value: value,
      },
      duration: 0.25,
      ease: "power1.out",
   });
};

const updateCardNumber = (string) => {
   let cardnums = select("card-number").textContent.split(" ");
   let inputs = "";

   console.log(inputs, cardnums);
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
   updateCardHolder(e.target.value);
});
inputCardNumber.addEventListener("input", (e) => {
   let input;
   if (!inputCardNumber.value && direction < 0) resetVars();

   direction = prevInputLength < e.target.value.length ? 1 : -1;
   numPos = numPos + direction;

   console.log("direction:", direction, "numPos:", numPos, "target:", e.target.value);
   if (numPos && numPos % 4 === 0 && e.target.value.length < 16) {
      if (direction === 1) {
         inputCardNumber.value = e.target.value + " ";
         numPos = 0;
      } else {
         inputCardNumber.value = e.target.value.trim();
         numPos--;
      }
   }
   input = inputCardNumber.value;
   prevInputLength = input.length;
});

function resetVars() {
   numPos = 0;
   prevInputLength = 0;
   direction = 1;
}

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
