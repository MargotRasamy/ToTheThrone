/*
-----------
Global
-----------
*/
const KEY_tttScore = "ttt_score"
function element(selector) {
    return document.querySelector(selector)
}
function elements(selector) {
    return document.querySelectorAll(selector)
}
Object.prototype.clone = function() {
    let newObj = (this instanceof Array) ? [] : {}
    for (let i in this) {
        if (i == 'clone')
            continue
        if (this[i] && typeof this[i] == "object") {
            newObj[i] = this[i].clone()
        }
        else
            newObj[i] = this[i]
    } return newObj
}