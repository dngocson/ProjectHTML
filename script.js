/////////////////////////////////////////

/// SELECT DOM
const openPopup = document.querySelectorAll(".open__map");
const closePopup = document.querySelector(".popup__close--icon");
const popup = document.querySelector(".popup");
const l1 = document.querySelector(".l1");
const l2 = document.querySelector(".l2");
///////////////////////////////////////////
/// MAP PART
const p1Location = [10.7776076, 106.68806858];
const p2Location = [10.7834904, 106.70062335];
let selectedLocation;
////////////////////////////////////////////
const map = L.map("map").setView([10.7834141, 106.70062335], 16.75);
googleStreets = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
);
googleStreets.addTo(map);
const createMaker = function () {
  popup.classList.remove("hidden");
  setTimeout(function () {
    map.invalidateSize();
  }, 500);
  L.marker([10.7834141, 106.70062335])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
      })
    )
    .setPopupContent("No. 4 Le Duan, District 1, Ho Chi Minh City")
    .openPopup();
  L.marker([10.7776076, 106.68806858])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
      })
    )
    .setPopupContent("No. 40 Ba Huyen Thanh Quan, District 3, Ho Chi Minh City")
    .openPopup();
};
///////////////////////////////////////////////
/// OPEN MAP
openPopup.forEach((mov) => {
  mov.addEventListener("click", function (e) {
    if (e.target.classList.contains("open__map--a2")) {
      selectedLocation = p2Location;
    } else {
      selectedLocation = p1Location;
    }
    createMaker();
    map.setView(selectedLocation, 16);
  });
});
///////////////////////////////////////
/// CLOSE MAP
closePopup.addEventListener("click", function () {
  popup.classList.add("hidden");
});
//////////////////////////////////////
/// Move map
l1.addEventListener("click", function () {
  map.setView(p1Location, 16, {
    animate: true,
    pad: {
      duration: 1,
    },
  });
});
l2.addEventListener("click", function () {
  map.setView(p2Location, 16, {
    animate: true,
    pad: {
      duration: 1,
    },
  });
});
///////////////////////////////////////
//////////////////////////////////////
/// SLIDER
const slides = document.querySelectorAll(".domestic__slideshow--container");
let curSlide = 0;
const maxSlide = slides.length;
btnRight = document.querySelector(".slidebtn--2");
btnLeft = document.querySelector(".slidebtn--1");
const dotContainer = document.querySelector(".dots");
////////////////////////
const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
goToSlide(0);
// GO TO NEXT SLIDE
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activeDot(curSlide);
};
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activeDot(curSlide);
};
// GO TO NEXT SLIDE
// btnRight.addEventListener("click", nextSlide);
// // GO TO PREVIOUS SLIDE
// btnLeft.addEventListener("click", prevSlide);
let repeater;

const autoplay = function (r) {
  if (r) {
    clearInterval(repeater);
    repeater = setInterval(nextSlide, 5000);
  } else {
    clearInterval(repeater);
  }
};
autoplay(true);

/////////////////
const activeDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide = "${slide}"]`)
    .classList.add("dots__dot--active");
};

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activeDot(slide);
  }
});
//////////////////////////////////////
/// SCROOL FUNCTION
const scrooling = function (e) {
  e.preventDefault();
  document.querySelector(this.getAttribute("href")).scrollIntoView({
    behavior: "smooth",
  });
};
document.querySelectorAll('a[href^="#section--1"]').forEach((anchor) => {
  anchor.addEventListener("click", scrooling);
});
document.querySelectorAll('a[href^="#section--2"]').forEach((anchor) => {
  anchor.addEventListener("click", scrooling);
});
