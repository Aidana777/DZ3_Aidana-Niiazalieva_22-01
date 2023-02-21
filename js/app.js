const tabs = document.querySelectorAll(".tabheader__item");
const tabsParent = document.querySelector(".tabheader__items");
const tabContent = document.querySelectorAll(".tabcontent");

const hideTabContent = () => {
  tabContent.forEach((item) => {
    item.style.display = "none";
  });
  tabs.forEach((item) => {
    item.classList.remove("tabheader__item_active");
  });
};

const showTabContent = (i = 0) => {
  tabContent[i].style.display = "block";
  tabs[i].classList.add("tabheader__item_active");
};
hideTabContent();
showTabContent();

let currentSlideIndex = 0;

const startSlider = () => {
  const sliderInterval = setInterval(() => {
    currentSlideIndex = (currentSlideIndex + 1) % tabs.length;
    hideTabContent();
    showTabContent(currentSlideIndex);
  }, 1000);

  return sliderInterval;
};

let sliderInterval = startSlider();

tabsParent.addEventListener("click", (event) => {
  const target = event.target;

  if (target.classList.contains("tabheader__item")) {
    clearInterval(sliderInterval);

    tabs.forEach((item, i) => {
      if (target === item) {
        currentSlideIndex = i;
        hideTabContent();
        showTabContent(i);
      }
    });

    setTimeout(() => {
      sliderInterval = startSlider();
    }, 3000);
  }
});

const animateTabContent = (elem) => {
  elem.classList.add("fade");
  setTimeout(() => {
    elem.classList.remove("fade");
  }, 500);
};

const animateTabs = () => {
  tabs.forEach((tab) => {
    animateTabContent(tab);
  });
};

setInterval(() => {
  animateTabs();
}, 1000);