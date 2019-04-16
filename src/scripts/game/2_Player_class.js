class Player {

    constructor(character){
        this.posY = 5
        this.posX = 0
        this.character = character
        this.pieces = 0
        this.stars = 0
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

    newPiece(){
        this.pieces++
        console.log("Pieces : "+this.pieces)
    }
    newStar(){
        this.stars++
        console.log("Stars : "+this.stars)
    }

    changeCharacter(newCharacterId){
        this.character.setAttribute('id',newCharacterId)
    }

    goToDeath(){
        this.character.classList.add("dead")
    }

    reinitialize(){
        this.character.classList.remove("dead")
        this.posY = 5
        this.posX = 0
        this.stars = 0
        this.pieces = 0
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
        if (delta == 1) {
            this.character.classList.add("isMoving")
        } else if (delta == 2) {
            this.character.classList.add("isMovingFast")
        } else if (delta >= 3) {
            this.character.classList.add("isMovingVeryFast")
        }
        setTimeout(function () {
            this.character.classList.remove("isMoving","isMovingFast","isMovingVeryFast")
        }.bind(this),700)
    }

    removeOtherClasses(){
        let classes = this.character.classList
        for (let i = 2; i < classes.length ; i++) {
            this.character.classList.remove(classes[i])
        }
    }

}