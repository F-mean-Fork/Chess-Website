// Carousel data
const carousel = document.querySelector('#carousel');
const carouselStyles = getComputedStyle(carousel);
const cards = carousel.querySelectorAll('.card');

//Carousel item data
const cardAmount = cards.length;
const carouselGap = parseInt(carouselStyles.getPropertyValue('gap'));
const cardWidth = document.querySelector('.card').offsetWidth;
const scrollLength = cardWidth + carouselGap;


// Buttons data
const leftBtn = document.querySelector('#CarouselBtnLeft');
const rightBtn = document.querySelector('#CarouselBtnRight');

// Buttons processing
leftBtn.addEventListener("click", () => navigateSlide('prev'));
rightBtn.addEventListener("click", () => navigateSlide('next'));

// Card container
let cardContainer = [];
for (let i = 0; i < cardAmount; i++) {
  cardContainer[i] = cards[i];
  cards[i].remove();
}

// Variables
let step = 0;
let slidesPerView = getSlidesPerView();

// Check screen size and adjust slidesPerView
function getSlidesPerView() 
{
  const screenWidth = window.innerWidth;
  if (screenWidth <= 376) {
    return 1;
  }
  return 3;
}

// Slider processing
updateSlideCounter();

function showCards(step) 
{
  for (let i = 0; i < slidesPerView; i++) {
    let visibleCards = document.createElement('div');
    visibleCards.classList.add('wrapper__mainWrap__participants__carousel__item__thumb');
    visibleCards.appendChild(cardContainer[step + i].cloneNode(true));
    carousel.appendChild(visibleCards);
    carousel.scrollLeft = scrollLength * slidesPerView;
  }
}

function navigateSlide(direction) 
{
  step = direction === 'next' ? (step + slidesPerView) : (step - slidesPerView + cardAmount);
  step = step % cardAmount;
  for (let i = 0; i < slidesPerView; i++) {
    carousel.removeChild(carousel.children[0]);
  }
  showCards(step);
  updateSlideCounter();
}

function updateSlideCounter() {
  const slideCounterElement = document.querySelector('.wrapper__mainWrap__participants__nav__btns__counter')
  const visibleSlideIndex = step + slidesPerView;
  const totalSlides = cardAmount;
  slideCounterElement.innerHTML = `<span style="opacity: 0.6">${visibleSlideIndex}</span>/${totalSlides}`;
};

showCards(step);

//Auto scroll
setInterval(() => {
  navigateSlide('next');
}, 4000);