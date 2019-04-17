/*
-----------
Aurélien
-----------
*/

const slider = element('.slider')
const sliderImages = elements(".slider__container img")
const sliderContainer = element('.slider__container')
const previousButton = element(".previous")
const nextButton = element('.next')

let step = -500,
  time = 5000,
  pos = 0,
  slide


function slideInterval() {
  slide = setInterval(
    function () {
      pos = (pos + 1) % sliderImages.length
      sliderContainer.style.left = pos * step + 'px'
    },
    time
  )
}

sliderContainer.addEventListener("mouseover", function () {
  clearInterval(slide)
})

sliderContainer.addEventListener("mouseout", function () {
  slideInterval()
})

previousButton.addEventListener(
  'click',
  function () {
    pos = pos - 1
    if (pos < 0) {
      pos = sliderImages.length - 1
    }
    sliderContainer.style.left = pos * step + 'px'
  }
)

nextButton.addEventListener(
  'click',
  function () {
    pos = (pos + 1) % sliderImages.length
    sliderContainer.style.left = pos * step + 'px'
  }
)
