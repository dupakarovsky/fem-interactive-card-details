import { select, removeInlineStyles } from "./src/js/utils.js";
import { setDefaultStateValues } from "./src/js/model.js";
import {
   checkForErrorBlank,
   checkForErrorInvalidNumberFormat,
   checkErrorInvalidMonth,
   checkErrorInvalidYear,
} from "./src/js/error-handlers.js";

import {
   cardFlipMobile,
   animateCardHolder,
   animateCardNumber,
   animateCardField,
   animateCardFlipMobile,
} from "./src/js/animations.js";

const minSizeForDesktop = "960px";
const maxSizeForMobile = "959px";
const mediaChangeToDesktop = window.matchMedia(`(min-width: ${minSizeForDesktop})`);
const mediaChangeToMobile = window.matchMedia(`(max-width: ${maxSizeForMobile})`);
const inputCardHolder = select("input-cardholder");
const inputCardNumber = select("input-number");
const inputCardMonth = select("input-month");
const inputCardYear = select("input-year");
const inputCardCvc = select("input-cvc");
const cardPreview = select("card-preview");

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
inputCardCvc.addEventListener("input", function (e) {
   checkForErrorBlank(e, this);
   animateCardField(e, "cvc");
});

inputCardCvc.addEventListener("focusin", (e) => {
   if (mediaChangeToMobile.matches) cardFlipMobile.play();
});
inputCardCvc.addEventListener("focusout", (e) => {
   if (mediaChangeToMobile.matches) cardFlipMobile.reverse();
});

document.addEventListener("load", () => {
   setDefaultStateValues();
   animateCardFlipMobile();
});

mediaChangeToDesktop.addEventListener("change", (e) => {
   if (e.target.matches) {
      console.log("now in desktop");
      removeInlineStyles(cardPreview);
   }
});
mediaChangeToMobile.addEventListener("change", (e) => {
   if (e.target.matches) {
      console.log("now in mobile");
   }
});
