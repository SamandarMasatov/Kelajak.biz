const openBtn = document.getElementById("open-popup-btn");
  const dismissBtn = document.getElementById("dismiss-popup-btn");
  const container = document.getElementById("container");
  const exit = document.getElementById("exit");
  
  openBtn.addEventListener("click", function () {
    container.classList.add("con");
    document.getElementsByClassName("popup")[0].classList.add("active-p");
  });
  
  dismissBtn.addEventListener("click", function () {
    document.getElementsByClassName("popup")[0].classList.remove("active-p");
    container.classList.remove("con");
  });
  
  container.addEventListener("click", () => {
    document.getElementsByClassName("popup")[0].classList.remove("active-p");
    container.classList.remove("con");
  });
  
  exit.addEventListener("click", () => {
    document.getElementsByClassName("popup")[0].classList.remove("active-p");
    container.classList.remove("con");
  });
  



       