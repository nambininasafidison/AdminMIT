const directiveBtn = document.querySelector(".directive-add-btn");
const addDirective = document.querySelector(".add-directive");
const accessBtn = document.querySelector(".access-add-btn");
const addAccess = document.querySelector(".add-access");
const cancel = document.querySelectorAll(".cancel");
const ok = document.querySelectorAll(".ok");

directiveBtn.addEventListener("click", () => {
  addDirective.style.display = "flex";
});

accessBtn.addEventListener("click", () => {
  addAccess.style.display = "flex";
});

Array.from(cancel).map((item) => {
  item.addEventListener("click", () => {
    addAccess.style.display = "none";
    addDirective.style.display = "none";
  });
});

Array.from(ok).map((item) => {
    item.addEventListener("click", () => {
  addAccess.style.display = "none";
  addDirective.style.display = "none";
});
});