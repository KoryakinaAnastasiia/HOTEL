/* like buttons */
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

/* Rate Buttons */

const buttonStarsBorder = document.querySelectorAll(
  ".buttonsRate__starsBorder",
);
const buttonStars = document.querySelectorAll(".buttonsRate__stars");

buttonStarsBorder.forEach((btn) => {
  btn.addEventListener("click", function () {
    b.classList.remove("active");
  });
});
