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
  }, 5000);
};

const animateTabs = () => {
  tabs.forEach((tab) => {
    animateTabContent(tab);
  });
};

setInterval(() => {
  animateTabs();
}, 1000);
const modal = document.querySelector(".modal");
const modalTrigger = document.querySelectorAll("[data-modal]");

modalTrigger.forEach((item) => {
  item.addEventListener("click", openModal);
});

function openModal() {
  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";

  clearInterval(modalTimeout);
}

function closeModal() {
  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "";
}

modal.addEventListener("click", (event) => {
  if (
    event.target === modal ||
    event.target.classList.contains("modal__close")
  ) {
    closeModal();
  }
});

function openModalScroll() {
  const page = document.documentElement;

  if (page.scrollTop + page.clientHeight >= page.scrollHeight) {
    openModal();

    window.removeEventListener("scroll", openModalScroll);
  }
}

window.addEventListener("scroll", openModalScroll);
const modalTimeout = setTimeout(openModal, 50000);

const open = document.querySelector("#open_modal");
const close = document.querySelector('#close_modal');


open.addEventListener('click', () => {
  modal.classList.remove('close_modal')
  modal.classList.add('open_modal')
});

close.addEventListener('click', () => {
  modal.classList.remove('open_modal')
  modal.classList.add('close_modal')
})


close.addEventListener('click', () => {
  modal.classList.remove('open_modal')
  modal.classList.add('close_modal')
})
const messageText = {
  loading: 'Loading...',
  success: 'Все успешно сохранено!',
  error: 'Ошибка при запросе!'
}

const forms = document.querySelectorAll('form');

forms.forEach((form) => {
  postData(form);
})




function postData(form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const messageBlock = document.createElement('div');
    messageBlock.textContent = messageText.loading;
    form.append(messageBlock)
    const request = new XMLHttpRequest();
    request.open('POST', 'server.php');

    const formData = new FormData(form);
    console.log(formData, 'formData');
    const obj = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    })

    console.log(obj);
    request.send(formData);
    request.addEventListener('load', () => {
      if (request.status === 200) {
        const response = request.response;
        console.log(response, 'response from server');
        messageBlock.textContent = messageText.success;
      } else {
        console.log('request error');
        messageBlock.textContent = messageText.error;
      }
    })
  })
}
