/*
-----------
Launch game
-----------
*/
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