/* 스크롤 슬라이드 */
gsap.registerPlugin(ScrollTrigger);
//---------------------------------------------------

const lenis = new Lenis()

lenis.on('scroll', (e) => {
  //console.log(e)
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

//---------------------------------------------------

let slider = document.querySelector('.slider');
let slideWrapper = document.querySelector('.slider-wrapper');
let slides = document.querySelectorAll('.slide');


function updateScaleAnPosition() {
  slides.forEach((slide) => {
    let rect = slide.getBoundingClientRect();
    let centerPosition = (rect.left + rect.right) / 2;

    let distanceFromCenter = centerPosition;
    let scale;
    if (distanceFromCenter > 0) {
      scale = Math.min(1.75, 1 + distanceFromCenter / window.innerWidth)
    } else {
      scale = Math.min(0.5, 1 - Math.abs(distanceFromCenter) / window.innerWidth)
    }
    gsap.set(slide, {
      scale: scale
    }) //이것을 적어주면 커짐

  })
}
updateScaleAnPosition();

let horiz = gsap.to(slides, {
  xPercent: -97 * (slides.length - 1),
  scrollTrigger: {
    trigger: '.page',
    start: 'top top',
    end: "+=3000", //사진이 몇개 없으면 이 값만 줄여서 조정하면 됨
    scrub: 1,
    pin: true,
    onUpdate: () => {
      updateScaleAnPosition()
    }

  }
})
/* //스크롤 슬라이드 */


/* gsap scrolltrigger gallery */
document.addEventListener("DOMContentLoaded", function () {
  var heronsImg = document.querySelectorAll(".heron img");

  heronsImg.forEach(function (heron, i) {
    var imageUrl = "path/to/your/image" + (i + 1) + ".jpg";
    var tempImage = new Image();
    tempImage.src = imageUrl;

    tempImage.onload = function () {
      heron.src = imageUrl;
      heron.parentElement.classList.add("loaded"); // 부모 요소에 클래스 추가
    };
  });

  var TL = gsap.timeline({
    scrollTrigger: {
      trigger: "main",
      pin: ".herons",
      pinSpacing: false,
      scrub: 2,
      start: () => window.innerHeight + " bottom",
      end: "bottom bottom",
      invalidateOnRefresh: true,
    },
  });

  TL.to(".herons__inner", {
    rotate: 0
  }, 0);
  TL.fromTo(".herons .herons__col:nth-child(2n + 0)", {
    y: "-0vh"
  }, {
    y: "50vh"
  }, 0);
  TL.fromTo(".herons .herons__col:nth-child(2n + 1)", {
    y: "50vh"
  }, {
    y: "0vh"
  }, 0);
  TL.to(".heron", {
    width: "50vw"
  }, 0);
  TL.fromTo(".heron img", {
    scale: 2
  }, {
    scale: 1
  }, 0);

  var contentTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".preston",
      scrub: 2,
      start: () => window.innerHeight * 1 + " bottom",
      end: "bottom bottom",
      invalidateOnRefresh: true,
    },
  });
  contentTL.fromTo(".preston", 1, {
    borderRadius: "100%",
    scale: 0
  }, {
    borderRadius: "0%",
    scale: 1
  });
  contentTL.fromTo(".preston h1", 1, {
    scale: 0
  }, {
    scale: 1
  });
  contentTL.fromTo(".preston p", 1, {
    scale: 0
  }, {
    scale: 1
  });
});
/* //gsap scrolltrigger gallery */




/*랭킹*/

var lankBtn = $('.rank ul li ');
var lankAll = $('.rank .rank_item');

lankAll.hide().eq(0).show();

lankBtn.click(function (e) {
  e.preventDefault();
  var target = $(this);
  var index = target.index();

  lankBtn.removeClass('active');
  target.addClass('active')

  lankAll.hide();
  lankAll.eq(index).show();
});

var n = 0;
var stop = setInterval(function () {
  var length = $('.rank ul li').length;

  n++;
  console.log(n)

  var max = n % length;
  if (max == 0) n = 0;

  $('.rank ul li').removeClass('active');
  $('.rank ul li').eq(n - 1).addClass('active');

  $('.rank ul li').find('.rank_item').css({
    display: 'none'
  })
  $('.rank ul li').eq(n - 1).find('.rank_item').css({
    display: 'flex'
  })

}, 3000);

$('.rank ul li').click(function () {
  clearInterval(stop);
});
/* //랭킹 */


/* issue */
var panoWrap = $('.pano_wrap');
var listWrap = panoWrap.children('.list'); // li瑜� �멸퀬�덈뒗 ul�� 遺덈윭吏�
var item = listWrap.children('li'); //li媛� 遺덈윭吏꾨떎.
var itemWidth = item.width(); //300 console.log(itemWidth);
var itemLength = item.length // item�� 媛�닔 // 10 
var listWidth = itemWidth * itemLength //3000
var controls = $('.controls');
var listClone = null;
var move = 0;
var timer;

var init = function () {
  panoWrap.css({
    'width': listWidth * 2 + 'px'
  }); //6000
  listWrap.css({
    'width': listWidth + 'px'
  }) //3000


  listWrap.clone().appendTo(panoWrap);
  listClone = panoWrap.children(); // ul�먭컻
  render();
  add();
  event();
}

var render = function () {
  move += 1; //move = move + 1;
  listClone.css({
    transform: 'translateX(' + -move + 'px)'
  })
  timer = window.requestAnimationFrame(render)
}

var add = function () {
  setInterval(function () {
    listWrap.clone().appendTo(panoWrap);
    listClone = panoWrap.children(); // ul�먭컻
  }, 10000)
}

var event = function () {
  controls.find('a.paly_on').click(function (e) {
    e.preventDefault();
    if ($(this).hasClass('active')) {
      clear();
      $(this).removeClass('active')
    } else {
      $(this).addClass('active')
      render();
    }
  });
}

var clear = function () {
  window.cancelAnimationFrame(timer);
}


init();
/* //issue */

/* 상단 버튼 */
$('.to_top').click(function (e) {
  e.preventDefault();
  $('html, body').animate({
    scrollTop: 0
  }, 600); 
});

$(window).scroll(function () {
  var $scrollTop = $(this).scrollTop();

  if ($scrollTop < 1200) {
    $('.to_top').fadeOut();
  } else {
    $('.to_top').fadeIn();
  }
});

//상단 버튼 







/* 슬라이드 */
const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");

const imagesContainer = document.getElementById("image-container");
let images = document.querySelectorAll(".model-images");

// This was done incase the user wanted to start first by pressing the left button
let cloneLastImage = images[images.length - 1].cloneNode(true);
imagesContainer.prepend(cloneLastImage);


// For the progressBar
const imageCount = images.length;
let currentImage = 0;

let firstImageIndexValue = 0;
let currentFirstImage = images[0];
let currentLastImage = images[images.length - 1];


// GSAP Animations
function buttonPressedAnimation(buttonId) {
  let rule = CSSRulePlugin.getRule(buttonId);
  let tl = gsap.timeline();

  gsap.set(rule, {
    cssRule: {
      scale: 1,
      border: "solid 0.1rem #fff",
      opacity: 0,
    },
  });

  tl.to(rule, {
    duration: .2,
    cssRule: {
      scale: 1.5,
      opacity: 1,
    },
  });

  tl.to(rule, {
    duration: 0.2,
    cssRule: {
      scale: 3,
      opacity: 0,
    },
    ease: "power2.out",
  });

  tl.to(rule, {
    duration: 0.2,
    cssRule: {
      scale: 1,
    },
    ease: "power2.in",
  });
}

function staggerImageAnimation(fromValue, toValue, direction) {
  gsap.fromTo(
    ".model-images", {
      translate: fromValue,
    }, {
      translate: toValue,
      stagger: {
        from: direction,
        amount: 0.3,
      },
      ease: "power2.inOut",
    }
  );
}

function progressBarAnimation() {
  gsap.to("#progress-bar", {
    scaleX: `${1 / imageCount + (currentImage % imageCount) / imageCount}`,
    duration: 0.3 * ((imageCount - 1) / 2),
    ease: "power2.inOut",
  });
}

gsap.set("#progress-bar", {
  scaleX: `${1 / imageCount + currentImage / imageCount}`,
});

// Gsap animation ends

// Image Placements
function moveImagesTotheLeft() {
  images = document.querySelectorAll(".model-images");
  let cloneFirstImage = images[1].cloneNode(true);
  imagesContainer.append(cloneFirstImage);

  let fromValue = `0`;
  let toValue = `calc(-100% - 0.5rem) `;

  staggerImageAnimation(fromValue, toValue, "start");
  images[0].remove();
}

function moveImagesTotheRight() {
  images = document.querySelectorAll(".model-images");
  let cloneLastImage = images[images.length - 2].cloneNode(true);

  imagesContainer.prepend(cloneLastImage);
  let fromValue = `calc(-200% - 1rem)`;
  let toValue = `calc(-100% - 0.5rem) `;
  staggerImageAnimation(fromValue, toValue, "end");
  images[images.length - 1].remove();
}
// Image Placements Ends

// Event Listeners
leftArrow.addEventListener("click", () => {
  moveImagesTotheRight();
  buttonPressedAnimation("#left-arrow:before");
  currentImage = (currentImage - 1) % imageCount;

  if (currentImage < 0) {
    currentImage = imageCount - 1;
  }

  progressBarAnimation();
});

rightArrow.addEventListener("click", () => {
  moveImagesTotheLeft();
  buttonPressedAnimation("#right-arrow:before");
  currentImage = (currentImage + 1) % imageCount;

  progressBarAnimation();
});

/* //슬라이드 */