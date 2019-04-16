/*
-----------
Launch game
-----------
*/

const gameManager = new GameManager(element('#gameGridContainer'),element('.mainCharacter'),element('#endOfTheGame'))

const chooseCharacterSection = element('#chooseYourCharacter')
const playNowButton = element('#playNow')
const selector = element('.selector')
const characters = elements('.characters__character')

const changeCharacterButton = element('#changeCharacter')
const playAgain = element('#playAgain')

for (let i = 0; i < characters.length; i++) {
    characters[i].addEventListener(
        'click',
        function(){
            selector.style.left = 9 + ( i * 18)+"vh"
            let selectedElem = element(".characters__character.selected")
            characters[i].classList.add('selected')
            selectedElem.classList.remove('selected')
            gameManager.player.changeCharacter(characters[i].children[0].getAttribute("id"))
        }
    )
}

playNowButton.addEventListener('click',function (e) {
    e.preventDefault()
    gameManager.launchNewGame()
    chooseCharacterSection.style.top = "100%"
})
    
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

changeCharacterButton.addEventListener('click',function (e) {
    e.preventDefault()
    gameManager.cleanGame()
    chooseCharacterSection.style.top = "0%"
})

playAgain.addEventListener('click',function (e) {
    e.preventDefault()
    gameManager.cleanGame()
    gameManager.launchNewGame()
})