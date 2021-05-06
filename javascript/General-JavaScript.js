let currentMetaTag = document.getElementsByName('pagename');
let pageName = currentMetaTag[0].getAttribute('content');
let currentPage = document.querySelector('.'+pageName);

currentPage.classList.add('current-page');

let menu = document.querySelectorAll('nav ul li a');
for(let i=0; i<menu.length; i++){
    menu[i].addEventListener('click', function () {
        currantPage.classList.remove('current-page');
        currantPage = menu[i];
        menu[i].classList.add('current-page');
    });
}