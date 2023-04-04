export function select(el) {
   return document.querySelector(el) || document.querySelector(`.${el}`) || document.querySelector(`#${el}`) || null;
}
export function selectAll(el) {
   return (
      document.querySelectorAll(el) ||
      document.querySelectorAll(`.${el}`) ||
      document.querySelectorAll(`#${el}`) ||
      null
   );
}
