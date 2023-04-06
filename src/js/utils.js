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

export function updateInputValue(domEl, value) {
   domEl.value = value;
}

export function removeInlineStyles(parent) {
   Array.from(parent.children).forEach((child) => {
      child.removeAttribute("style");
   });
}
