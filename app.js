const wrapper = document.querySelector(".wrapper__mainWrap-participants");
const carousel = document.querySelector(
  ".wrapper__mainWrap-participants__carousel"
);
const buttons = document.querySelectorAll(
  ".wrapper__mainWrap-participants__nav-btns .wrapper__mainWrap-participants__nav-btns-controls"
);
const firstCardWidth = carousel.querySelector(
  ".wrapper__mainWrap-participants__carousel-item"
).offsetWidth;
const carouselChild = [...carousel.children];
const counterElement = document.querySelector(
  ".wrapper__mainWrap-participants__nav-btns-counter"
);

let isDragging = false,
  startX,
  startSrcollLeft,
  timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

//Infinity scrolling
carouselChild
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

carouselChild
  .slice(0, cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
  });

//Mouse scroll
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startSrcollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = startSrcollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const autoPlay = () => {
  if (window.innerWidth < 800) return;
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
};

autoPlay();

const infiniteScroll = () => {
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
    carousel.classList.remove("no-transition");
  } else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
  updateCounter();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", infiniteScroll);

const updateCounter = () => {
  const totalImages = carouselChild.length;
  const currentIndex =
    (Math.floor(carousel.scrollLeft / firstCardWidth) % totalImages) + 1;
  counterElement.innerHTML = `<span style="opacity: 0.6">${currentIndex}</span>/${totalImages}`;
};
