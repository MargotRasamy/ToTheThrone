/*
-----------
class GridManager
-----------
*/
/*
0 => Case inaccessible
1 => Case chemin libre
2 => Case chemin pièce
3 => Case chemin étoile
4 => Case mur classique horizontal droit
5 => Case mur classique horizontal gauche
6 => Case mur classique vertical haut
7 => Case mur classique vertical bas
8 => Case mur angle bas gauche
9 => Case mur angle bas droite
10 => Case mur angle haut gauche
11 => Case mur angle haut droite
12 => Case mur central
13 => Case mort immédiate
14 => Case mur mortel
 */
class GameManager {

    generateANewGrid() {
        let random = Math.floor(Math.random() * matrices.length)
        this.grids.push(new Grid(matrices[random].clone()))
        this.lastGrid.displayInGame(gameGridContainer)
    }

    
    get lastGrid(){
        return this.grids[this.grids.length - 1]
    }

    isCaseAvalaible(nextCaseValue){
        return nextCaseValue == 1 || nextCaseValue == 2 || nextCaseValue == 3 || nextCaseValue == 13
    }

    goRight(){
        gameManager.player.goRight()
        let cases = []
        let gridIndex = this.player.gridIndex
        let relativeMaxPosX = this.player.relativPosX
        let isAbleToContinue = true // Permet de quitter la boucle
        while (isAbleToContinue) {
            let nextCaseValue
            if (relativeMaxPosX + 1 > 10) {
                nextCaseValue = this.grids[gridIndex + 1].matrice[this.player.posY][0] // Récupère la valeur de la prochaine case
            } else {
                nextCaseValue = this.grids[gridIndex].matrice[this.player.posY][relativeMaxPosX + 1] // Récupère la valeur de la prochaine case
            }
            if (this.isCaseAvalaible(nextCaseValue)) { // SI case avec possibilité de mouvement
                relativeMaxPosX++ // Augmentation de la position max sur X
                if (relativeMaxPosX > 10) {
                    gridIndex++ // On passe à la grille suivante
                    relativeMaxPosX = 0 // On revient à la première colonne de la grille suivante
                    // Si on a pas assez de grilles en place -> en générer
                    while (this.grids.length < gridIndex + 3) {
                        this.generateANewGrid()
                    }
                }
                cases.push([gridIndex,this.player.posY,relativeMaxPosX])
            } else {
                isAbleToContinue = false
            }
        }
        let oldPosX = this.player.relativPosX
        this.player.setNewPosX(relativeMaxPosX,gridIndex) // Change la position sur X de l'utilisateur
        let deltaPos = oldPosX - this.player.posX
        this.actualizeDisplay(cases,[gridIndex,this.player.posY,relativeMaxPosX + 1],deltaPos)
    }

    goLeft(){
        gameManager.player.goLeft()
        let cases = []
        let gridIndex = this.player.gridIndex
        let relativeMaxPosX = this.player.relativPosX
        let isAbleToContinue = true // Permet de quitter la boucle
        while (isAbleToContinue && (relativeMaxPosX != 0 || gridIndex != 0)){
            let nextCaseValue
            if (relativeMaxPosX - 1 < 0 && gridIndex != 0) {
                nextCaseValue = this.grids[gridIndex - 1].matrice[this.player.posY][10] // Récupère la valeur de la case précédente
            } else {
                nextCaseValue = this.grids[gridIndex].matrice[this.player.posY][relativeMaxPosX-1] // Récupère la valeur de la case précédente
            }
            if (this.isCaseAvalaible(nextCaseValue)){ // SI case avec possibilité de mouvement
                relativeMaxPosX -= 1 // Diminution de la position max sur X
                if (relativeMaxPosX - 2 < 0 && gridIndex != 0) {
                    gridIndex -= 1
                    relativeMaxPosX = 10
                }
                cases.push([gridIndex,this.player.posY,relativeMaxPosX])
            } else {
                isAbleToContinue = false
            }
        }
        let oldPosX = this.player.relativPosX
        this.player.setNewPosX(relativeMaxPosX,gridIndex) // Change la position sur X de l'utilisateur
        let deltaPos = oldPosX - this.player.posX
        this.actualizeDisplay(cases,[gridIndex,this.player.posY,relativeMaxPosX - 1],deltaPos)
    }

    goTop(){
        let cases = []
        let maxPosY = this.player.posY
        let currentMatrice = this.grids[this.player.gridIndex].matrice
        let isAbleToContinue = true
        while (isAbleToContinue){
            let nextCaseValue = currentMatrice[maxPosY-1][this.player.relativPosX]
            if (this.isCaseAvalaible(nextCaseValue)){
                maxPosY -= 1
                if (maxPosY - 1 < 0) {
                    isAbleToContinue = false
                }
                cases.push([this.player.gridIndex,maxPosY,this.player.relativPosX])
            } else {
                isAbleToContinue = false
            }
        }
        let deltaPos = maxPosY - this.player.posY
        this.player.posY = maxPosY
        this.actualizeDisplay(cases,[this.player.gridIndex,maxPosY - 1,this.player.relativPosX],deltaPos)
    }

    goBottom(){
        let cases = []
        let maxPosY = this.player.posY
        let currentMatrice = this.grids[this.player.gridIndex].matrice
        let isAbleToContinue = true
        while (isAbleToContinue){
            let nextCaseValue = currentMatrice[maxPosY+1][this.player.relativPosX]
            if (this.isCaseAvalaible(nextCaseValue)){
                maxPosY++
                if (maxPosY + 1 > 10) {
                    isAbleToContinue = false
                }
                cases.push([this.player.gridIndex,maxPosY,this.player.relativPosX])
            } else {
                isAbleToContinue = false
            }
        }
        let deltaPos = maxPosY - this.player.posY
        this.player.posY = maxPosY
        this.actualizeDisplay(cases,[this.player.gridIndex,maxPosY + 1,this.player.relativPosX],deltaPos)
    }

    actualizeDisplay(cases,nextCase,delta){
        this.player.showMovementEffect(Math.abs(delta))
        let translateX = this.player.posX * 7
        let translateY = (this.player.posY - 5) * 7
        this.gameGridContainer.style.transform = "translate("+ -translateX +"vh,"+ -translateY +"vh)"
        for (let i = 0; i < cases.length ; i++) {
            let caseValue = this.grids[cases[i][0]].matrice[cases[i][1]][cases[i][2]]
            switch (caseValue) {
                case 2: // pièce
                    this.player.newPiece()
                    this.transformSpecialCaseToNormalCase(cases[i])
                    break
                case 3: // étoile
                    this.player.newStar()
                    this.transformSpecialCaseToNormalCase(cases[i])
                    break
                case 13: // mort immédiate
                    this.endOfTheGame()
                    break
            }
        }
        this.verifNextCase(nextCase)
    }

    transformSpecialCaseToNormalCase(theCase){
        this.grids[theCase[0]].matrice[theCase[1]][theCase[2]] = 1
        let casePos = (theCase[1] * 11) + theCase[2] + 1
        let caseNode = element('#gameGridContainer .grid:nth-child('+(theCase[0] + 1)+') .grid__elem:nth-child('+casePos+')')
        caseNode.classList.add("grid__elem1")
    }

    verifNextCase(nextCase){ // 0 => index grid | 1 => posY | 2 => posX
        if (nextCase[2] < 0) {
            nextCase[0] -= 1
            nextCase[2] = 10
        }
        if (nextCase[0] >= 0 && nextCase[1] >= 0 && nextCase[1] <= 10) {
            let caseValue = this.grids[nextCase[0]].matrice[nextCase[1]][nextCase[2]]
            switch (caseValue) {
                case 14:
                    this.endOfTheGame()
                    break
            }
        }
    }

    endOfTheGame(){
        this.player.goToDeath()
        this.endOfTheGameSection.style.bottom = "10vh"
        let gameDuration = (Date.now() - this.launchTime) / 1000
        if (gameDuration >= 60) {
            element('#lifeDuration').innerHTML = "<span class='bigText'>"+Math.floor(gameDuration/60)+"</span>min <span class='bigText'>"+Math.round(gameDuration % 60)+"</span>s"
        } else {
            element('#lifeDuration').innerHTML = "<span class='bigText'>"+ Math.round(gameDuration) +"</span>seconds"
        }
        element('#score').innerHTML = Math.round((gameDuration*100) + (this.player.pieces*10) + (this.player.pieces*100))
    }

    cleanGame(){
        this.gameGridContainer.style.transform = "translate(0vh, 0vh)"
        this.gameGridContainer.innerHTML = ""
        this.grids = []
        this.player.reinitialize()
        this.endOfTheGameSection.style.bottom = "-100vh"
    }

    launchNewGame(){
        this.generateANewGrid()
        this.generateANewGrid()
        this.generateANewGrid()
        this.launchTime = Date.now()
    }

    constructor(gameGridContainer,character,endOfTheGameSection){
        this.gameGridContainer = gameGridContainer
        this.endOfTheGameSection = endOfTheGameSection
        this.player = new Player(character)
        this.grids = []
    }

}