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
        let gridIndex = this.player.gridIndex
        let relativeMaxPosX = this.player.relativPosX
        let isAbleToContinue = true // Permet de quitter la boucle
        while (isAbleToContinue){
            let currentMatrice = this.grids[gridIndex].matrice // Récupérer la matrice sur laquelle le perso est
            let nextCaseValue = currentMatrice[this.player.posY][relativeMaxPosX+1] // Récupère la valeur de la prochaine case
            if (nextCaseValue == 1 || nextCaseValue == 2 || nextCaseValue == 3 || nextCaseValue == 11){ // SI case avec possibilité de mouvement
                relativeMaxPosX++ // Augmentation de la position max sur X

                // Si on sort de la grille actuelle
                if (relativeMaxPosX+1 > 10) {
                    gridIndex++ // On passe à la grille suivante
                    relativeMaxPosX = 0 // On revient à la première colonne de la grille suivante

                    // Si on a pas assez de grilles en place -> en générer
                    while (this.grids.length < gridIndex + 3){
                        this.generateANewGrid()
                    }
                }

            } else {
                isAbleToContinue = false
            }
        }
        this.player.setNewPosX(relativeMaxPosX,gridIndex) // Change la position sur X de l'utilisateur
        this.actualizeDisplay() // Change la position du gameCridContainer
    }

    /*
    Globalement l'inverse de goRight
    SAUF QUE
    - pas besoin de générer des nouvelles grilles
    - Besoin de bloquer l'utilisateur à la colonne 0 de la grid 0
     */
    goLeft(){

    }

    goTop(){

    }

    goBottom(){

    }

    actualizeDisplay(){
        let translateX = this.player.posX * 7
        let translateY = (this.player.posY - 5) * 7
        this.gameGridContainer.style.transform = "translate(-"+ translateX +"vh,-"+ translateY +"vh)"
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