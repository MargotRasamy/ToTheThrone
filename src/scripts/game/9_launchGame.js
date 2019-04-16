/*
-----------
Launch game
-----------
*/
const chooseCharacterSection = element('#chooseYourCharacter')
const playNowButton = element('#playNow')
playNowButton.addEventListener('click',function (e) {
    e.preventDefault()
    chooseCharacterSection.style.top = "100%"
})

const gameGridContainer = element('#gameGridContainer')
const character = element('.character')
const gameManager = new GameManager(gameGridContainer,character)
gameManager.generateANewGrid()
gameManager.generateANewGrid()
gameManager.generateANewGrid()
    
document.onkeypress = function (e) {
    switch (e.code) {
        case "KeyW":
            gameManager.goTop()
            break
        case "KeyA":
            gameManager.goLeft()
            break
        case "KeyS":
            gameManager.goBottom()
            break
        case "KeyD":
            gameManager.goRight()
            break
    }
}

const selector = element('.selector')
const characters = elements('.characters__character')

for (let i = 0; i < characters.length; i++) {
    characters[i].addEventListener(
        'click',
        function(){
            selector.style.left = 9 + ( i * 18)+"vh"
            let selectedElem = element(".characters__character.selected")
            characters[i].classList.add('selected')
            selectedElem.classList.remove('selected')
        }
    )
    
}