class Player {

    constructor(character){
        this.posY = 5
        this.posX = 22
        this.character = character
        this.coins = 0
        this.coinsInfo = element("#coins")
        this.stars = 0
        this.starsInfo = element("#stars")
        this.movementCounter = 0
        this.isAlive = true
        this.isMoving = false
    }

    get gridIndex(){
        return Math.floor(this.posX/11)
    }
    get relativPosX(){
        return this.posX%11
    }

    setNewPosX(newRelativePosX,newGridIndex){
        this.posX = newRelativePosX + newGridIndex * 11
    }

    newCoin(){
        this.coins++
        this.coinsInfo.innerHTML = this.coins+" coins"
    }
    newStar(){
        this.stars++
        this.starsInfo.innerHTML = this.stars+ " stars"
    }

    changeCharacter(newCharacterId){
        this.character.setAttribute('id',newCharacterId)
    }

    goToDeath(){
        this.isAlive = false
        this.character.classList.add("dead")
    }

    reinitialize(){
        this.isMoving = false
        this.isAlive = true
        this.character.classList.remove("dead")
        this.posY = 5
        this.posX = 22
        this.coins = 0
        this.coinsInfo.innerHTML = this.coins+ " coins"
        this.stars = 0
        this.starsInfo.innerHTML = this.stars+ " stars"
        this.movementCounter = 0
        this.removeOtherClasses()
    }

    goRight(){
        this.removeOtherClasses()
    }
    goLeft(){
        this.removeOtherClasses()
        this.character.classList.add('reversed')
    }

    showMovementEffect(delta){
        this.movementCounter = (delta == 0) ? this.movementCounter : this.movementCounter + 1
        this.isMoving = (delta != 0)
        if (delta != 0) {
            if (delta == 1) {
                this.character.classList.add("isMoving")
            } else if (delta == 2) {
                this.character.classList.add("isMovingFast")
            } else if (delta >= 3) {
                this.character.classList.add("isMovingVeryFast")
            }
            setTimeout(function () {
                this.isMoving = false
            }.bind(this),400)
            setTimeout(function () {
                this.character.classList.remove("isMoving","isMovingFast","isMovingVeryFast")
            }.bind(this),700)
        }
    }

    removeOtherClasses(){
        let classes = this.character.classList
        for (let i = 2; i < classes.length ; i++) {
            this.character.classList.remove(classes[i])
        }
    }

}