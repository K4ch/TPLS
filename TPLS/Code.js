
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
        while(taken.includes(PalavrasN[n])){
            n = Math.floor(Math.random() * 6);
        }
        taken.push(PalavrasN[n]);
        p.textContent = PalavrasN[n];
    }
    oFabioéGay(taken);
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

function oFabioéGay(taken) {
    let i = 0;
    while(i !== taken.length){
        let random =  1;//Math.floor(Math.random() * 5) + 1;
        let startRow = Math.floor(Math.random() * 8)  + 1;
        let startCol =  Math.floor(Math.random() * 8) + 1;
        if(random === 1){ //Horizontal ->
            if((taken[i].length + startCol) > 9){
                continue;
            }
            for(let node of document.querySelectorAll("td")){
                for(let j = 0; j < taken[i].length; j++){
                    let pos = (startRow * 10) + startCol;
                    node.className(pos).textContent = taken[i].charAt(j);
                }
            }
            i++;
        }/*else if(random === 2){ //Horizontal <-

        }else if(random === 3){ //Vertical ->

        }else if(random === 4){ //Vertical <-

        }else if(random === 5){ //Diagonal ->

        }else{ //Diagonal <-
            
        }*/
    }
}


