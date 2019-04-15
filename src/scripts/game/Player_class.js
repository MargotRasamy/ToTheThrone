class Player {

    constructor(character){
        this.posY = 5
        this.posX = 0
        this.character = character
    }

    get relativPosY(){
        return this.posY%11
    }
    get relativPosX(){
        return this.posX%11
    }

}