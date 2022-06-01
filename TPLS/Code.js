
//let node = document.querySelectorAll("td");

let PalavrasF = ["React", "HTML", "CSS", "Python"] 
let PalavrasN = ["React", "Variavel", "Funcao", "Python", "Java", "String", "Script"]
let PalavrasD = ["JavaScript", "Variavel", "String", "Python", "Programar", ""]

window.onload = function Preparar() {
    let taken = [];
    for(let p of document.querySelectorAll("p")){
        if(taken.length === 4){
            break;
        }
        let n = Math.floor(Math.random() * 6);
        while(taken.includes(n)){
            n = Math.floor(Math.random() * 6);
        }
        taken.push(n);
        p.textContent = PalavrasN[n];
    }
    for (let node of document.querySelectorAll("td")) {
        node.onclick = function Clicar(){
            if(node.className == ""){
                node.className = "Selecionado"
            }
            else {
                node.className = ""
            }
        }

        if (node.textContent !== "") {
            continue;
        }
        let charCode = Math.round(65 + Math.random() * 25);
        node.textContent = String.fromCharCode(charCode);
    }
}




