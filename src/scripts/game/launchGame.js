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