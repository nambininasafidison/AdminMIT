const directiveBtn = document.querySelector(".directive-add-btn");
const addDirective = document.querySelector(".add-directive");
const accessBtn = document.querySelector(".access-add-btn");
const addAccess = document.querySelector(".add-access");
const cancel = document.querySelectorAll(".cancel");
const ok = document.querySelectorAll(".ok");
const accessLink = document.querySelector('.access-link a');
const directiveLink = document.querySelector('.directive-link a');
const statusLink = document.querySelector('.status-link a');
const historyLink = document.querySelector('.history-link');
const logLink = document.querySelector('.log-link');
const statLink = document.querySelector('.stat-link');

const acllinks = [accessLink, directiveLink, statusLink, historyLink, logLink, statLink];

acllinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});


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