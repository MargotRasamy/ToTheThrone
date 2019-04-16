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
4 => Case mur classique horizontal
5 => Case mur classique vertical
6 => Case mur angle bas gauche
7 => Case mur angle bas droite
8 => Case mur angle haut gauche
9 => Case mur angle haut droite
10 => Case mur central
11 => Case mort immédiate
12 => Case mur mortel
 */
class GameManager {

    generateANewGrid() {
        let random = Math.floor(Math.random() * this.matrices.length)
        this.grids.push(new Grid(this.matrices[random]))
        this.lastGrid.displayInGame(gameGridContainer)
        this.counter++
    }

    
    get lastGrid(){
        return this.grids[this.grids.length - 1]
    }

    isCaseAvalaible(nextCaseValue){
        return nextCaseValue == 1 || nextCaseValue == 2 || nextCaseValue == 3 || nextCaseValue == 11
    }

    goRight(){
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
        this.player.setNewPosX(relativeMaxPosX,gridIndex) // Change la position sur X de l'utilisateur
        this.actualizeDisplay(cases,[gridIndex,this.player.posY,relativeMaxPosX + 1])
    }

    goLeft(){
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
        this.player.setNewPosX(relativeMaxPosX,gridIndex) // Change la position sur X de l'utilisateur
        this.actualizeDisplay(cases,[gridIndex,this.player.posY,relativeMaxPosX - 1])
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
        this.player.posY = maxPosY
        this.actualizeDisplay(cases,[this.player.gridIndex,maxPosY - 1,this.player.relativPosX])
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
        this.player.posY = maxPosY
        this.actualizeDisplay(cases,[this.player.gridIndex,maxPosY + 1,this.player.relativPosX])
    }

    actualizeDisplay(cases,nextCase){
        console.log("actualizeDisplay")
        let translateX = this.player.posX * 7
        let translateY = (this.player.posY - 5) * 7
        this.gameGridContainer.style.transform = "translate("+ -translateX +"vh,"+ -translateY +"vh)"
        for (let i = 0; i < cases.length ; i++) {
            let caseValue = this.grids[cases[i][0]].matrice[cases[i][1]][cases[i][2]]
            switch (caseValue) {
                case 2: // pièce
                    console.log("pièce")
                    break
                case 3: // étoile
                    console.log("étoile")
                    break
                case 11: // mort immédiate
                    console.log("mort immédiate")
                    break
            }
            console.log(cases[i]+ " -> "+caseValue)
        }
        this.verifNextCase(nextCase)
    }

    verifNextCase(nextCase){ // 0 => index grid | 1 => posY | 2 => posX
        if (nextCase[2] < 0) {
            nextCase[0] -= 1
            nextCase[2] = 10
        }
        console.log("verif : "+ nextCase)
        if (nextCase[0] >= 0 && nextCase[1] >= 0 && nextCase[1] <= 10) {
            let caseValue = this.grids[nextCase[0]].matrice[nextCase[1]][nextCase[2]]
            console.log("verifNextCase : "+caseValue)
            switch (caseValue) {
                case 12:
                    console.log("mur mortel")
                    break
            }
        }
    }

    constructor(gameGridContainer,character){
        this.gameGridContainer = gameGridContainer
        this.counter = 0
        this.player = new Player(character)
        this.grids = []
        this.matrices = []
        this.matrices.push([
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,1,2,2,0,0,0,0],
            [0,0,1,1,1,0,2,0,0,1,1],
            [1,1,1,0,0,3,2,1,0,1,1],
            [0,0,0,0,0,0,0,1,0,0,1],
            [0,0,0,0,0,0,0,1,0,0,1],
            [0,0,0,0,0,0,0,1,1,0,1],
            [0,0,0,0,0,0,0,0,1,1,1],
            [0,0,0,0,0,0,0,0,0,0,0]
        ])
        this.matrices.push([
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,12,1,1,1,1,0,0,0],
            [0,0,0,0,1,0,0,0,0,0,0],
            [0,0,0,0,1,1,1,0,0,0,0],
            [0,0,1,1,1,0,1,0,0,1,1],
            [1,1,1,0,0,1,1,1,0,1,1],
            [0,0,0,0,0,1,0,1,0,0,1],
            [0,0,0,0,0,1,1,1,0,0,1],
            [0,0,0,0,0,0,0,1,1,0,1],
            [0,0,0,0,0,0,0,0,1,1,1],
            [0,0,0,0,0,0,0,0,0,0,0]
        ])
        this.matrices.push([
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,1,2,2,0,0,0,0],
            [0,0,1,1,1,0,2,0,0,1,1],
            [1,1,1,1,2,3,2,1,1,1,1],
            [0,0,0,0,0,0,0,1,0,0,1],
            [0,0,0,0,0,0,0,1,0,0,1],
            [0,0,0,0,0,0,0,1,1,0,1],
            [0,0,0,0,0,0,0,0,1,1,1],
            [0,0,0,0,0,0,0,0,0,0,0]
        ])
    }

}