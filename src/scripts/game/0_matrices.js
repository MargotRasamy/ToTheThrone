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
const initMatrices = [
    [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [3,3,3,0,3,3,3,0,3,3,3],
        [0,3,0,0,0,3,0,0,0,3,0],
        [0,3,0,0,0,3,0,0,0,3,0],
        [0,3,0,0,0,3,0,0,0,3,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0]
    ],
    [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,10,7,7,7,7,7,7,7,7,7],
        [0,5,13,1,1,1,1,1,1,1,1],
        [0,8,6,6,6,6,6,6,6,6,6],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0]
    ]
]
const matrices = [
    [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,14,0,0,0],
        [0,0,0,0,0,2,2,2,0,0,0],
        [0,0,14,2,1,3,12,3,2,2,0],
        [0,0,2,1,12,12,12,12,1,2,0],
        [1,2,1,2,12,14,2,2,2,3,1],
        [0,0,0,2,1,1,2,0,0,0,0],
        [0,3,13,3,2,2,3,0,3,0,0],
        [0,0,0,0,0,0,13,0,3,0,0],
        [0,0,0,0,0,0,3,3,3,0,0],
        [0,0,0,0,0,0,0,0,0,0,0]
    ],
    [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,13,0,0,0,0,0,0],
        [0,0,0,0,3,0,0,0,0,0,0],
        [0,0,2,1,2,0,0,0,0,0,0],
        [0,0,1,0,1,0,0,0,0,0,0],
        [1,2,1,0,1,0,14,1,2,2,1],
        [0,0,0,0,3,2,1,2,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0]
    ],
    [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [1,2,1,2,1,3,1,3,2,2,1],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0]
    ],
    [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,3,0,0,0,0,14,0,0,0],
        [0,0,13,0,0,0,0,3,0,0,0],
        [0,0,3,0,0,2,2,2,0,0,0],
        [1,1,3,0,0,1,0,1,2,2,1],
        [0,0,2,1,1,1,0,0,0,0,0],
        [0,0,2,2,2,2,0,0,0,0,0],
        [0,0,0,0,0,3,3,0,0,0,0],
        [0,0,0,0,0,3,3,0,0,0,0],
        [0,0,0,0,0,14,3,0,0,0,0]
    ],
    [
        [0,0,2,2,2,2,0,0,0,0,0],
        [0,0,2,1,1,2,0,0,0,0,0],
        [0,0,2,0,0,2,0,0,0,0,0],
        [0,0,2,0,14,2,1,1,0,0,0],
        [0,2,2,0,3,0,0,2,0,0,0],
        [1,2,0,0,3,0,0,2,2,2,1],
        [0,2,0,0,3,0,0,0,2,0,0],
        [0,2,1,2,2,0,1,1,2,0,0],
        [0,0,0,0,2,2,2,2,2,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0]
    ],
    [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,14,3,14,0,0,0],
        [0,0,0,0,0,3,3,3,0,0,0],
        [0,0,2,2,2,2,0,3,0,0,0],
        [0,0,2,1,1,2,0,3,0,0,0],
        [1,2,1,0,0,2,2,2,0,3,1],
        [0,0,0,0,0,0,0,2,2,1,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0]
    ],
    [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,14,3,3,1,1,3,0,0,0,0],
        [0,14,3,3,0,1,2,0,0,0,0],
        [0,0,3,3,0,1,2,0,0,0,0],
        [1,2,2,2,0,0,2,2,2,2,1],
        [0,0,0,0,0,0,0,1,1,1,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0]
    ],
    [
        [0,3,3,0,0,0,0,0,0,0,0],
        [0,3,3,0,0,0,0,0,0,0,0],
        [0,3,3,0,0,0,14,0,0,0,0],
        [0,3,3,3,1,1,2,0,0,0,0],
        [0,0,0,3,0,0,2,1,0,0,0],
        [1,2,1,2,0,0,2,1,2,2,1],
        [0,0,0,0,0,0,2,1,2,0,0],
        [0,0,3,3,3,3,2,2,2,0,0],
        [0,0,2,2,2,13,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0]
    ],
    [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,14,0,0,0,0,0],
        [0,0,0,2,2,3,0,0,0,0,0],
        [0,0,2,2,0,2,3,0,0,0,0],
        [0,2,2,0,0,0,3,2,2,0,0],
        [1,2,0,0,0,0,0,2,3,2,1],
        [0,2,2,0,0,0,2,2,0,0,0],
        [0,0,2,2,0,2,2,0,0,0,0],
        [0,0,0,2,3,2,0,0,0,0,0],
        [0,0,0,0,0,13,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0]
    ],
    [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,3,3,3,2,2,2,0,0,0,0],
        [0,3,14,14,2,0,2,0,0,0,0],
        [0,3,3,3,2,0,2,0,0,0,0],
        [0,0,0,0,2,0,2,0,0,0,0],
        [1,2,2,0,2,0,2,2,2,2,1],
        [0,0,2,0,2,0,2,2,0,0,0],
        [0,0,2,0,2,0,2,2,0,0,0],
        [0,0,2,0,2,0,2,2,0,0,0],
        [0,0,2,0,2,0,2,2,0,0,0],
        [0,14,2,2,2,0,2,2,0,0,0]
    ],
    [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,3,2,2,2,2,2,3,0,0],
        [0,0,2,1,1,1,1,1,2,0,0],
        [0,0,2,1,1,1,1,1,2,0,0],
        [0,0,2,1,1,1,1,0,2,3,0],
        [1,1,2,0,14,3,3,0,2,1,1],
        [0,0,2,1,14,3,3,2,0,0,0],
        [0,0,2,1,1,1,1,2,0,0,0],
        [0,0,2,1,1,1,1,2,0,0,0],
        [0,0,3,2,2,2,2,2,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0]
    ],
    [
        [0,2,2,2,2,2,2,2,2,0,0],
        [0,2,0,0,0,0,0,0,2,0,0],
        [0,2,0,3,3,3,0,0,2,0,0],
        [0,2,0,0,3,0,0,0,2,0,0],
        [0,2,0,0,0,0,0,0,2,0,0],
        [1,2,0,3,3,3,0,0,2,2,1],
        [0,2,0,0,3,0,0,0,0,2,0],
        [0,2,0,0,0,0,3,3,3,2,0],
        [0,2,0,0,0,0,0,3,0,2,0],
        [0,2,0,0,0,0,0,0,0,2,0],
        [0,2,2,2,2,2,2,2,2,2,0]
    ],
    [
        [0,0,14,0,0,0,0,0,0,0,0],
        [0,0,2,2,2,2,3,3,3,3,3],
        [0,0,2,0,0,2,0,3,3,3,3],
        [0,0,2,0,0,2,0,3,3,3,13],
        [0,0,2,0,0,2,0,0,0,0,3],
        [1,1,2,2,2,2,0,0,2,1,1],
        [0,0,2,0,0,3,0,0,2,0,0],
        [0,0,2,0,0,3,0,0,2,0,0],
        [0,0,2,14,14,14,0,0,2,0,0],
        [0,0,2,2,2,2,2,2,2,0,0],
        [0,0,0,0,0,0,0,0,0,0,0]
    ],
    [
        [0,0,0,13,13,0,0,0,0,0,0],
        [0,0,3,2,3,0,0,0,0,0,0],
        [0,0,2,0,2,0,0,0,0,0,0],
        [0,0,2,0,2,2,0,0,0,0,0],
        [0,0,2,0,0,2,2,0,0,0,0],
        [1,1,3,0,0,0,2,2,3,1,1],
        [0,2,0,0,0,0,0,0,3,0,0],
        [0,2,0,0,13,2,2,2,2,0,0],
        [0,1,1,1,2,3,0,0,0,0,0],
        [0,0,0,0,0,14,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0]
    ],
    [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,3,3,3,3,2,0,0,0,0],
        [0,0,3,3,3,1,2,0,0,0,0],
        [0,0,14,3,3,1,3,0,0,0,0],
        [1,1,2,2,2,2,2,0,2,2,1],
        [0,0,0,0,0,0,2,2,3,0,0],
        [0,0,0,0,0,0,0,0,3,0,0],
        [0,13,3,3,3,3,3,3,3,0,0],
        [0,0,3,3,3,3,3,3,3,0,0],
        [0,0,3,3,3,3,3,3,13,0,0]
    ],
    [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [1,2,2,2,0,2,1,2,1,3,1],
        [0,0,0,2,1,2,0,0,0,0,0],
        [0,0,0,2,1,2,0,0,14,0,0],
        [0,0,0,2,2,2,0,3,3,0,0],
        [0,0,0,0,0,3,0,3,3,0,0],
        [0,0,0,0,0,3,3,3,3,0,0]
    ],
    [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,3,0,0,0,0,0],
        [0,0,0,0,3,3,3,0,0,0,0],
        [0,0,0,3,3,3,3,3,0,0,0],
        [0,3,3,3,3,3,3,3,3,3,0],
        [1,1,3,3,3,3,3,3,3,1,1],
        [0,0,0,3,3,3,3,3,0,0,0],
        [0,0,0,3,3,3,3,3,0,0,0],
        [0,0,3,3,3,0,3,3,3,0,0],
        [0,0,3,3,0,0,0,3,3,0,0],
        [0,0,3,0,0,0,0,0,3,0,0]
    ],
    [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,14,0,0,0,3,3,13,0],
        [0,0,0,3,0,0,0,0,3,3,0],
        [0,0,0,3,0,0,0,2,3,2,0],
        [1,1,0,3,0,0,0,3,0,1,1],
        [0,2,2,2,0,1,1,2,0,0,0],
        [0,0,0,3,2,2,2,3,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0]
    ],
    [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,13,0,0,0,0,0],
        [0,0,14,3,2,3,0,0,0,0,0],
        [0,0,14,2,1,2,0,0,0,0,0],
        [0,0,0,2,1,2,0,0,0,0,0],
        [1,1,3,3,0,2,0,2,2,1,1],
        [0,0,0,0,13,2,2,2,0,0,0],
        [0,0,0,0,0,0,0,14,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0]
    ],
    [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,14,0,0,0,0,0,0,0,0,0],
        [0,3,0,0,0,0,0,0,0,0,0],
        [1,2,0,0,0,0,0,14,2,2,1],
        [0,2,2,0,2,2,2,2,0,2,0],
        [0,0,2,2,2,0,0,2,2,2,0],
        [0,0,0,0,14,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0]
    ],
    [
        [13,2,2,2,2,0,0,0,0,0,0],
        [0,2,1,1,2,0,0,0,0,0,0],
        [0,2,0,2,2,0,0,0,0,0,0],
        [0,2,0,2,1,2,2,2,0,0,0],
        [0,2,0,2,2,2,0,2,0,0,0],
        [1,1,0,0,0,0,14,2,2,2,1],
        [0,3,0,0,0,0,0,2,2,0,0],
        [0,3,0,0,0,0,0,2,2,0,0],
        [13,3,3,14,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0]
    ],
    [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,13,13,13,0,0,0,0,0,0],
        [1,1,2,2,2,0,0,14,2,2,1],
        [0,0,0,0,2,2,2,2,2,0,0],
        [0,0,0,0,0,0,14,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0]
    ],
    [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,14,0,0,0,0,0],
        [0,3,3,3,3,3,0,0,0,0,0],
        [0,3,0,0,0,3,13,3,0,0,0],
        [1,1,0,0,0,0,0,0,0,1,1],
        [0,1,1,0,0,0,0,0,1,2,0],
        [0,0,2,1,0,0,0,1,2,0,0],
        [0,0,0,2,1,0,1,2,0,0,0],
        [0,0,0,0,1,2,1,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0]
    ],
    [
        [0,0,0,0,14,2,2,2,0,0,0],
        [0,0,0,14,0,2,1,2,0,0,0],
        [0,2,2,2,0,2,1,2,0,0,0],
        [0,2,13,2,2,2,0,2,2,2,2],
        [0,2,0,0,0,0,0,0,0,14,2],
        [1,2,0,0,0,0,0,0,0,2,1],
        [0,3,3,3,3,3,3,3,3,3,0],
        [0,0,0,0,0,0,0,0,0,13,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0]
    ],
    [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,3,3,3,3,3,3,3,0,0],
        [0,0,3,13,13,3,3,3,3,0,0],
        [0,0,3,3,3,3,0,0,0,0,0],
        [0,0,0,0,0,3,0,0,0,0,0],
        [1,2,2,2,2,2,0,0,2,3,1],
        [0,0,0,0,14,2,2,2,2,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0]
    ],
    [
        [0,0,0,0,0,0,3,3,3,0,0],
        [0,0,0,0,0,0,3,3,3,0,0],
        [0,1,1,1,1,0,3,3,3,0,0],
        [0,1,0,1,1,3,3,3,13,0,0],
        [2,1,0,1,0,0,0,3,0,0,0],
        [1,0,1,1,3,3,14,3,3,3,1],
        [0,0,2,0,0,0,0,0,2,0,0],
        [0,0,2,0,0,0,0,0,2,0,0],
        [0,0,1,2,0,2,1,2,2,0,0],
        [0,0,0,1,2,2,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0]
    ],
    [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,3,3,3,3,0,0],
        [0,0,0,0,0,3,1,1,3,0,0],
        [0,0,0,0,0,2,0,0,14,3,3],
        [0,0,0,2,2,2,0,0,0,3,3],
        [1,2,2,2,0,2,2,2,2,2,1],
        [0,0,3,3,0,2,2,0,3,0,0],
        [0,0,3,3,0,0,0,0,3,0,0],
        [0,0,3,3,3,3,3,3,3,0,0],
        [0,0,0,3,3,3,3,3,3,0,0],
        [0,0,0,14,0,0,0,0,0,0,0]
    ],
    [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,3,3,3,13,3,3,0],
        [0,0,13,3,3,0,0,0,0,3,0],
        [0,0,0,3,0,0,0,0,0,3,0],
        [1,2,2,2,0,0,3,3,3,3,1],
        [0,0,1,3,3,3,3,14,0,0,0],
        [0,0,1,0,0,0,2,0,0,0,0],
        [0,0,2,2,2,2,3,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0]
    ],
    [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,2,2,2,2,0,0],
        [0,0,2,2,2,2,0,0,2,0,0],
        [0,0,1,0,0,0,14,0,2,2,2],
        [0,0,1,1,2,3,3,0,0,0,2],
        [1,2,2,2,2,0,3,3,3,13,1],
        [0,0,0,0,2,0,3,0,0,0,0],
        [0,0,0,14,2,3,3,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0]
    ]/*,
    [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0]
    ]
    */
]
