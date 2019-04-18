/*
-----------
class GridManager
-----------
*/
class GameManager {

    constructor(gameGridContainer,character,endOfTheGameSection){
        this.gameGridContainer = gameGridContainer
        this.endOfTheGameSection = endOfTheGameSection
        this.player = new Player(character)
        this.grids = []
        this.mainTheme = element('#got_main_theme')
        this.mainTheme.volume = 0.2
        this.deathSound = element('#death_sound')
        this.timeRemainingLabel = element('#timeRemaining')
        this.winter = element('#winter')
        this.deathTime = null
        this.deathReason = document.querySelector('#deathReason')
        this.lifeSpan = 3000
        this.waitingActions = []
    }

    launchNewGame(){
        this.mainTheme.play();
        for (let i = 0; i < initMatrices.length; i++) {
            this.grids.push(new Grid(initMatrices[i]))
            this.lastGrid.displayInGame(this.gameGridContainer)
        }
        this.generateANewGrid()
        this.generateANewGrid()
        this.generateANewGrid()
    }

    generateANewGrid() {
        let random = Math.floor(Math.random() * matrices.length)
        this.grids.push(new Grid(matrices[random].clone()))
        this.lastGrid.displayInGame(this.gameGridContainer)
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
                    while (this.grids.length < gridIndex + 3) { // Si on a pas assez de grilles en place -> en générer
                        this.generateANewGrid()
                    }
                }
                cases.push([gridIndex,this.player.posY,relativeMaxPosX])
            } else { isAbleToContinue = false }
        }
        let oldPosX = this.player.posX
        this.player.setNewPosX(relativeMaxPosX,gridIndex) // Change la position sur X de l'utilisateur
        this.actualizeDisplay(cases,[gridIndex,this.player.posY,relativeMaxPosX + 1], (oldPosX - this.player.posX))
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
                if (relativeMaxPosX - 1 < 0 && gridIndex != 0) {
                    gridIndex -= 1
                    relativeMaxPosX = 10
                }
                cases.push([gridIndex,this.player.posY,relativeMaxPosX])
            } else {
                isAbleToContinue = false
            }
        }
        let oldPosX = this.player.posX
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

    actualizeTimeBeforeDeath(){
        if (this.deathTime != null){
            if (this.deathTime - Date.now() <= 0) {
                this.timeRemainingLabel.innerHTML = "It's death time"
                this.winter.style.width = "150vw";
                this.endOfTheGame(0)
            } else {
                let timeRemaining = Math.floor((this.deathTime - Date.now())/100)/10
                console.log(timeRemaining)
                let danger = (timeRemaining <= 1.4) ? ' dangerous' : ''
                let bigDanger = (timeRemaining <= 0.7) ? ' bigText' : ''
                this.timeRemainingLabel.innerHTML = "<div class='time" + danger + bigDanger + "'>"+ timeRemaining +"s</div>before death"
                this.winter.style.width = 100 - 50 * ((this.deathTime - Date.now())/this.lifeSpan) + "vw"
            }
        }
    }

    actualizeDisplay(cases,nextCase,delta){
        if (this.deathTime == null){
            this.launchTime = Date.now()
        }
        this.player.showMovementEffect(Math.abs(delta))
        if (delta != 0){
            let timeRemovedMs = Math.log(this.player.movementCounter) - Math.log10(this.player.movementCounter)
            if (this.lifeSpan > 300){
                this.lifeSpan = (3000 - timeRemovedMs * 1000 >= 300) ? 3000 - timeRemovedMs * 1000 : 300
            }
            this.deathTime = Date.now() + this.lifeSpan
        }
        let translateX = this.player.posX * 7
        let translateY = (this.player.posY - 5) * 7
        this.gameGridContainer.style.transform = "translate("+ -translateX +"vh,"+ -translateY +"vh)"
        let numberOfCase = cases.length
        for (let i = 0; i < numberOfCase ; i++) {
            let caseValue = this.grids[cases[i][0]].matrice[cases[i][1]][cases[i][2]]
            switch (caseValue) {
                case 2: // pièce
                    this.player.newCoin()
                    this.transformSpecialCaseToNormalCase(cases[i],i,numberOfCase)
                    break
                case 3: // étoile
                    this.player.newStar()
                    this.transformSpecialCaseToNormalCase(cases[i],i,numberOfCase)
                    break
                case 13: // mort immédiate
                    this.endOfTheGame(1)
                    break
            }
        }
        this.verifNextCase(nextCase)
    }

    transformSpecialCaseToNormalCase(theCase,i,tot){
        setTimeout(function () {
            this.grids[theCase[0]].matrice[theCase[1]][theCase[2]] = 1
            let casePos = (theCase[1] * 11) + theCase[2] + 1
            let caseNode = element('#gameGridContainer .grid:nth-child('+(theCase[0] + 1)+') .grid__elem:nth-child('+casePos+')')
            caseNode.classList.add("grid__elem1")
        }.bind(this), ((i+1)/tot) * 450 )
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
                    this.endOfTheGame(2)
                    break
            }
        }
        this.realizeNextMovement()
    }

    realizeNextMovement(){
        setTimeout(function () {
            if (this.waitingActions.length > 0){
                keyPress(this.waitingActions[0])
                this.waitingActions.splice(0,1)
            }
        }.bind(this),400)
    }

    endOfTheGame(deathReason){
        this.waitingActions = []
        this.deathSound.play()
        this.player.goToDeath()
        let gameDuration = (Date.now() - this.launchTime) / 1000
        if (gameDuration >= 60) {
            element('#lifeDuration').innerHTML = "<span class='bigText'>"+Math.floor(gameDuration/60)+"</span>min <span class='bigText'>"+Math.round(gameDuration % 60)+"</span>s"
        } else {
            element('#lifeDuration').innerHTML = "<span class='bigText'>"+ Math.round(gameDuration) +"</span>seconds"
        }
        if (deathReason == 0){
            this.deathReason.innerHTML = "Winter took you the life... be faster to stay alive"
        } else if (deathReason == 1){
            this.deathReason.innerHTML = "Fire is really dangerous... take care of your life next time"
        } else {
            this.deathReason.innerHTML = "Remember : A wall covered with Valerian iron spikes is not your friend..."
        }
        let score = Math.round((gameDuration*100) + (this.player.coins*50) + (this.player.stars*250))
        element('#score').innerHTML = score.toLocaleString('fr')
        let oldScore = parseInt(localStorage.getItem(KEY_tttScore))
        if (oldScore < score || isNaN(oldScore)){
            localStorage.setItem(KEY_tttScore,score)
            element('#titleYourScore').innerHTML = "Your new best score :"
        } else {
            element('#titleYourScore').innerHTML = "Your score :"
        }
        this.deathTime = null
        setTimeout(function () {
            this.endOfTheGameSection.style.bottom = "2.5vh"
        }.bind(this),600)
    }

    cleanGame(){
        this.mainTheme.currentTime = 0;
        this.gameGridContainer.style.transform = "translate(-154vh, 0vh)"
        this.gameGridContainer.innerHTML = ""
        this.grids = []
        this.player.reinitialize()
        this.endOfTheGameSection.style.bottom = "-100vh"
        this.winter.style.width = "50vw"
        this.timeRemainingLabel.innerHTML = "Go !"
    }

}