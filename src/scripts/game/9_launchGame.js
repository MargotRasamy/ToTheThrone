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