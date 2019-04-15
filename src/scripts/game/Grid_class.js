/*
-----------
class Grid
-----------
*/
class Grid {

    constructor(matrice){
        this.matrice = matrice
    }

    displayInGame(gameContainer){
        let grid = document.createElement("div")
        grid.classList.add("grid")
        for (let i = 0; i < this.matrice.length; i++) {
            for (let j = 0; j < this.matrice[i].length; j++) {
                let elem = document.createElement("div")
                elem.classList.add("grid__elem","grid__elem"+this.matrice[i][j])
                grid.appendChild(elem)
            }
        }
        gameContainer.appendChild(grid)
    }

}