// NAVBAR BACKGROUND E POSITION
window.addEventListener("resize", function () {
  if (window.innerWidth < 768) {
    if (
      document.querySelector(".navbar").classList.contains("bg-transparent")
    ) {
      document.querySelector(".navbar").classList.remove("position-absolute");
      document.querySelector(".navbar").classList.remove("bg-transparent");
      document.querySelector(".navbar").classList.add("bg-dark");
    }
  } else {
    if (document.querySelector(".navbar").classList.contains("bg-dark")) {
      document.querySelector(".navbar").classList.add("position-absolute");
      document.querySelector(".navbar").classList.remove("bg-dark");
      document.querySelector(".navbar").classList.add("bg-transparent");
    }
  }
});

if (window.matchMedia("(max-width: 768px)").matches) {
  if (document.querySelector(".navbar").classList.contains("bg-transparent")) {
    document.querySelector(".navbar").classList.remove("position-absolute");
    document.querySelector(".navbar").classList.remove("bg-transparent");
    document.querySelector(".navbar").classList.add("bg-dark");
  }
}

//DEBOUNCE PARA NÃO ADICIONAR A FUNÇÃO MUITAS VEZES DURANTE O SCROLL (MELHORA A PERFORMACE)
const debounce = function(callback, delay) {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
      timer = null;
    }, delay);
  };
}


// ANIMAÇÕES
const target = document.querySelectorAll("[anime-from]");
const animationClass = "animate";

function animeScroll() {
  const windowTop = window.scrollY + ((window.innerHeight * 4) / 4);
  target.forEach(function (element) {
    if (windowTop > element.offsetTop) {
      element.classList.add(animationClass)
    }else{
      element.classList.remove(animationClass)
    }
  });
}

animeScroll();

window.addEventListener("scroll", debounce( function () {
  animeScroll();
  console.log('teste')
}, 100));


// CARROUSSEL
const slide = document.querySelector(".slide");
const wrapper = document.querySelector(".slide-wrapper");
const slideArray = document.querySelectorAll(".slide li");
const dist = {};

document.querySelector("#next").addEventListener("click", onNext);
document.querySelector("#prev").addEventListener("click", onPrev);

let slideArrayPosition = [];
let contador = 1;

function moveSlide(distX) {
  dist.movePosition = distX;
  slide.style.transform = `translate3d(${distX}px, 0, 0)`;
}

function slidePosition(slide) {
  const margin = (wrapper.offsetWidth - slide.offsetWidth) / 2;
  return -(slide.offsetLeft - margin);
}

function updateSlideArrayPosition() {
  slideArrayPosition = [...slide.children].map((element) => {
    const position = slidePosition(element);
    return { position, element };
  });
}

function updateSlideStyles(index) {
  const selectedSlide = slideArray[index];
  selectedSlide.style.height = "500px";
  if (window.innerWidth <= 768) {
    selectedSlide.style.width = "100%";
  } else {
    selectedSlide.style.width = "950px";
  }

  for (let i = 0; i < slideArray.length; i++) {
    if (i !== index) {
      const divDetail = slideArray[i].children[1];
      divDetail.style.opacity = 0;

      const slide = slideArray[i];
      slide.style.height = "350px";

      if (window.innerWidth <= 768) {
        slide.style.width = "100vw";
      } else {
        slide.style.width = "950px";
      }
    } else {
      const divDetail = slideArray[i].children[1];
      divDetail.style.opacity = 1;
    }
  }

  if (window.innerWidth >= 963) {
    const buttonCarosel = document.querySelector("#button-carosel");
    buttonCarosel.style.left = `${
      wrapper.offsetWidth / 2 - buttonCarosel.offsetWidth / 2
    }px`;
  } else {
    const buttonCarosel = document.querySelector("#button-carosel");
    buttonCarosel.style.left = 0;
  }
}

function changeSlide(index) {
  moveSlide(slideArrayPosition[index].position);
  updateSlideStyles(index);
}

updateSlideArrayPosition();
changeSlide(contador);

function onNext() {
  contador = (contador + 1) % slideArray.length;
  changeSlide(contador);
}

function onPrev() {
  contador = (contador + slideArray.length - 1) % slideArray.length;
  changeSlide(contador);
}

window.addEventListener("resize", function () {
  updateSlideArrayPosition();
  changeSlide(contador);
});
