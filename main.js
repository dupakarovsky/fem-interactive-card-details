import { select } from "./src/js/utils.js";
import { state, setDefaultStateValues, updateStateProperty } from "./src/js/model.js";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/all";

gsap.registerPlugin(TextPlugin);
let cardFlipTimeline = gsap.timeline();

const inputCardHolder = select("input-cardholder");
const inputCardNumber = select("input-number");
const inputCardMonth = select("input-month");
const inputCardYear = select("input-year");
const inputCardCvc = select("input-cvc");

const updateInputValue = (domEl, value) => {
   domEl.value = value;
};

const animateCardHolder = (evt) => {
   return gsap.to(select("card-holder"), {
      text: evt.target.value,
      duration: 0.2,
      ease: "sine1.inOut",
      onComplete: () => updateStateProperty("name", evt.target.value0),
   });
};

const animateCardNumber = (evt) => {
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

const animateCardField = (evt, prop) => {
   let cardFiled = state[prop];
   let input = evt.target;

   console.log(input.value, cardFiled);

   return gsap.to(select(`${prop}`), {
      text: {
         value: input.value + cardFiled.slice(input.value.length),
         type: "diff",
      },
      duration: 0.25,
      ease: "power1.out",
   });
};

const animateCardFlip = () => {
   cardFlipTimeline
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
      );

   return cardFlipTimeline.pause();
};

const setErrorState = (val, context, message = "Can't be blank") => {
   val === "true"
      ? context.parentElement.setAttribute("style", "--active:1")
      : context.parentElement.removeAttribute("style");

   context.dataset.inError = val;
   context.nextElementSibling.dataset.error = message;
};

function checkForErrorBlank(e, context) {
   if (!e.target.value) {
      return setErrorState("true", context);
   }
   setErrorState("false", context, "Can't be blank");
}
function checkForErrorInvalidNumberFormat(e, context) {
   const input = context.value.split(" ").join("");

   if (input.length === 16 && !isFinite(+input)) {
      return setErrorState("true", context, "Wrong format, use numbers only");
   }
}
function checkErrorInvalidMonth(e, context) {
   const input = context.value;
   if ((input.length === 2 && input > 12) || !isFinite(input)) return setErrorState("true", context, "Invalid value");
}
function checkErrorInvalidYear(e, context) {
   const input = context.value;
   if (!isFinite(input)) return setErrorState("true", context, "Invalid value");
}

inputCardHolder.addEventListener("input", function (e) {
   animateCardHolder(e);
   checkForErrorBlank(e, this);
});
inputCardNumber.addEventListener("input", function (e) {
   checkForErrorBlank(e, this);
   checkForErrorInvalidNumberFormat(e, this);
   animateCardNumber(e);
});
inputCardMonth.addEventListener("input", function (e) {
   checkForErrorBlank(e, this);
   checkErrorInvalidMonth(e, this);
   animateCardField(e, "month");
});
inputCardYear.addEventListener("input", function (e) {
   checkForErrorBlank(e, this);
   checkErrorInvalidYear(e, this);
   animateCardField(e, "year");
});
inputCardCvc.addEventListener("input", (e) => {
   animateCardField(e, "cvc");
});

inputCardCvc.addEventListener("focusout", (e) => {
   cardFlipTimeline.reverse();
});
inputCardCvc.addEventListener("focusin", (e) => {
   cardFlipTimeline.play();
});

window.addEventListener("load", () => {
   animateCardFlip();
   setDefaultStateValues();
});
