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

    goRight(){
        let maxXPos = character.posX
        let isAbleToContinue = true
        while (isAbleToContinue){
            let currentGrid = this.grids[0].matrice
            console.log(currentGrid)
            let nextCaseValue = currentGrid[character.posY][maxXPos+1]
            if (nextCaseValue == 0 || nextCaseValue == 1 || nextCaseValue == 2){
                maxXPos++
            } else {
                isAbleToContinue = false
            }
        }
        print(maxXPos)
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
            [0,0,0,0,1,1,1,1,0,0,0],
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
    }

}