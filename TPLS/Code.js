
//let node = document.querySelectorAll("td");

let PalavrasF = ["REACT", "HTML", "CSS", "PYTHON"] 
let PalavrasN = ["REACT", "VARIAVEL", "FUNCAO", "PYTHON", "JAVA", "STRING", "SCRIPT"]
let PalavrasD = ["JAVASCRIPT", "VARIAVEL", "STRING", "PYTHON", "PROGRAMAR"]

window.onload = function Preparar() {
    tableCreate();
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
    console.log(taken);
    displayWords(taken);
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

function displayWords(taken) {
    let i = 0;
    while(i !== taken.length){
        let random =  1;//Math.floor(Math.random() * 5) + 1;
        let startRow =  Math.floor(Math.random() * 8)  + 1;
        let startCol =  Math.floor(Math.random() * 8) + 1;
        if(random === 1){ //Horizontal ->
            if((taken[i].length + startCol) > 9){
                continue;
            }
            let end = false;
            let j = 0;
            while (!end) {
                if (j >= taken[i].length) {
                    end = true;
                    break;
                }
                console.log(taken[i].charAt(j));
                document.getElementById(`cell${startRow}${j}`).innerHTML = taken[i].charAt(j);
                j++;
                startCol++;
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

function tableCreate() {
    let container = document.getElementById('tableContainer');
    let tbl = document.createElement('table');

    for (let i = 0; i < 9; i++) {
        let tr = tbl.insertRow();
        for (let j = 0; j < 9; j++) {
            let td = tr.insertCell();
            td.appendChild(document.createTextNode('X'));
            td.setAttribute('id', `cell${i}${j}`);
        }
    }
    container.appendChild(tbl);
}
