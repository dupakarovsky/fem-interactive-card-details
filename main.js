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
   animatedFormOut,
   animateConfIn,
} from "./src/js/animations.js";

(function () {
   const minSizeForDesktop = "960px";
   const maxSizeForMobile = "959px";
   const mediaChangeToDesktop = window.matchMedia(`(min-width: ${minSizeForDesktop})`);
   const mediaChangeToMobile = window.matchMedia(`(max-width: ${maxSizeForMobile})`);
   const form = select("form");

   const inputCardHolder = select("input-cardholder");
   const inputCardNumber = select("input-number");
   const inputCardMonth = select("input-month");
   const inputCardYear = select("input-year");
   const inputCardCvc = select("input-cvc");
   const cardPreview = select("card-preview");

   form.addEventListener("input", function (e) {
      const input = e.target.closest("input");
      if (!input) return;

      switch (true) {
         case e.target === inputCardHolder:
            animateCardHolder(e);
            checkForErrorBlank(e, e.target);
            break;
         case e.target === inputCardNumber:
            checkForErrorBlank(e, e.target);
            checkForErrorInvalidNumberFormat(e, e.target);
            animateCardNumber(e);
            break;
         case e.target === inputCardMonth:
            checkForErrorBlank(e, e.target);
            checkErrorInvalidMonth(e, e.target);
            animateCardField(e, "month");
            break;
         case e.target === inputCardYear:
            checkForErrorBlank(e, e.target);
            checkErrorInvalidYear(e, e.target);
            animateCardField(e, "year");
            break;
         case e.target === inputCardCvc:
            checkForErrorBlank(e, e.target);
            animateCardField(e, "cvc");
            break;
         default:
            "";
      }
   });
   form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (inputCardMonth.dataset.inError === "true") return;
      animatedFormOut();
      animateConfIn();
   });

   inputCardCvc.addEventListener("focusin", (e) => {
      if (mediaChangeToMobile.matches) cardFlipMobile.play();
   });
   inputCardCvc.addEventListener("focusout", (e) => {
      if (mediaChangeToMobile.matches) cardFlipMobile.reverse();
   });

   mediaChangeToDesktop.addEventListener("change", (e) => {
      if (e.target.matches) {
         removeInlineStyles(cardPreview);
      }
   });

   window.addEventListener("load", () => {
      setDefaultStateValues();
      animateCardFlipMobile();
   });
})();
