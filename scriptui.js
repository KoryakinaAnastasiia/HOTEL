const buttonLike = document.querySelector(".buttonsLike__input");
const hartElements = document.querySelector(".buttonsLike__counter");

let count = parseInt(hartElements.textContent);

buttonLike.addEventListener("change", () => {
  if (buttonLike.checked) {
    count++;
  } else {
    count--;
  }
  hartElements.textContent = count;
});
