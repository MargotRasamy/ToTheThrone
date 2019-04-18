/*
-----------
Aurélien
-----------
*/

const sliderGoLeft = element("#sliderGoLeft")
const sliderGoRight = element("#sliderGoRight")
const sliderContainer = element('.characterSlider__container')
const characters = elements('.characterSlider__container__item')
let sliderPos = 0

sliderGoLeft.addEventListener('click',function (e) {
    actualizeSliderPosition(e,(sliderPos > 0) ? sliderPos - 1 : sliderPos)
})

sliderGoRight.addEventListener('click',function (e) {
    actualizeSliderPosition(e,(sliderPos < 5) ? sliderPos + 1 : sliderPos)
})

function actualizeSliderPosition(e,newPos){
    e.preventDefault()
    characters[sliderPos].classList.remove("focus")
    sliderPos = newPos
    characters[sliderPos].classList.add("focus")
    sliderContainer.style.left = 26 - (28 * sliderPos) + "vw"
}