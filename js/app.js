const tabContent = document.querySelectorAll('.tabcontent');
const tabs = document.querySelectorAll('.tabheader__item');
const tabsParent = document.querySelector('.tabheader__items');

const hidetabContent = () => {
    tabContent.forEach((item) => {
        item.style.display = 'none'
    })
    tabs.forEach((item) => {
        item.classList.remove('tabheader__item_active')
    })

}

const showTabContent = (i = 0) => {
    tabContent[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active')

}

hidetabContent();
showTabContent()

tabsParent.addEventListener('click', (event) => {
    const target = event.target
    if (target.classList.contains('tabheader__item')) {
        tabs.forEach((item, index) => {
            if (target === item) {
                hidetabContent();
                showTabContent(index)
            }
        })
    }


})



const modal = document.querySelector('.modal')
const openModalBtn = document.querySelector('.btn_white');
const closeModalBtn = document.querySelector('.modal__close')
const openModal = () => {
    modal.classList.add('show');
    modal.classList.remove('hide')
    document.body.style.overflow = 'hidden'
};
openModalBtn.addEventListener('click', openModal)


const closeModal = () => {

    modal.classList.remove('show');
    modal.classList.add('hide')
};
closeModalBtn.addEventListener('click', closeModal)

window.addEventListener('scroll', () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    if (Math.ceil(scrolled) === scrollable) {
        openModal(scrolled);
    }
})

window.onclick=function(e){
    if (e.target==modal) {
        modal.style.display='none'
    }
}