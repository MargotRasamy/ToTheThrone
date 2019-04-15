/*
-----------
Launch game
-----------
*/
const gameGridContainer = element('#gameGridContainer')
const gridManager = new GridManager()
gridManager.generateANewGrid()
gridManager.lastGrid.displayInGame(gameGridContainer)
gridManager.generateANewGrid()
gridManager.lastGrid.displayInGame(gameGridContainer)
gridManager.generateANewGrid()
gridManager.lastGrid.displayInGame(gameGridContainer)
gridManager.generateANewGrid()
gridManager.lastGrid.displayInGame(gameGridContainer)