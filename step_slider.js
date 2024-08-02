//Step Container Slider
const stepNextBtn  = document.querySelector('#right-btn');
const stepPrevBtn  = document.querySelector('#left-btn');
const dots = document.querySelectorAll('.wrapper__mainWrap__steps--smallScreen__btnWrap__dotsWrap__dot');
const slider = document.querySelector('.wrapper__mainWrap__steps--smallScreen__flex')
const slide = document.querySelectorAll('.wrapper__mainWrap__steps--smallScreen__flex__item')

let activeDot = 0;

updateSlide();

stepPrevBtn.addEventListener('click', () => {
  activeDot = Math.max(activeDot - 1, 0);
  slider.scrollTo({ left: activeDot * slider.offsetWidth, behavior: 'smooth' });
  updateSlide();
});

stepNextBtn.addEventListener('click', () => {
  activeDot = Math.min(activeDot + 1, slide.length - 1);
  slider.scrollTo({ left: activeDot * slider.offsetWidth, behavior: 'smooth' });
  updateSlide();
});


function updateSlide() {
  dots.forEach((dot, index) => dot.classList.toggle('active', index === activeDot));
  stepPrevBtn.disabled = activeDot === 0;
  stepNextBtn.disabled = activeDot >= slide.length - 1;
}

