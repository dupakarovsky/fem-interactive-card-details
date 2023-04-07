const setErrorState = (val, context, message = "Can't be blank") => {
   val === "true"
      ? context.parentElement.setAttribute("style", "--active:1")
      : context.parentElement.removeAttribute("style");

   context.dataset.inError = val;
   context.nextElementSibling.dataset.error = message;
};
export function checkForErrorBlank(e, context) {
   if (!e.target.value) {
      return setErrorState("true", context);
   }
   setErrorState("false", context, "Can't be blank");
}
export function checkForErrorInvalidNumberFormat(e, context) {
   const input = context.value.split(" ").join("");

   if (input.length === 16 && !isFinite(+input)) {
      return setErrorState("true", context, "Wrong format, use numbers only");
   }
}
export function checkErrorInvalidMonth(e, context) {
   const input = context.value;
   if ((input.length === 2 && input > 12) || !isFinite(input)) {
      setErrorState("true", context, "Invalid value");
   }
   return true;
}
export function checkErrorInvalidYear(e, context) {
   const input = context.value;
   if (!isFinite(input)) return setErrorState("true", context, "Invalid value");
}
