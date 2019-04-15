class Player {

    constructor(character){
        this.posY = 5
        this.posX = 0
        this.character = character
    }

    get relativPosY(){
        return this.posY%11
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

    goToDeath(){
        this.character.classList.add("dead")
    }

}