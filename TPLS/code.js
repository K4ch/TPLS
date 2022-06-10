//let node = document.querySelectorAll("td");

let PalavrasF = ["REACT", "HTML", "CSS", "LS", "JAVA"] 
let PalavrasN = ["REACT", "VARIAVEL", "FUNCAO", "PYTHON", "JAVA", "STRING"]
let PalavrasD = ["JAVASCRIPT", "VARIAVEL", "STRING", "PYTHON", "PROGRAMAR"]

function myFunction() {
    document.getElementById("botaoDrop").classList.toggle("show");
}

window.onclick = function(event) {
    
    if (!event.target.matches('.oBotao')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
}

window.onload = function Preparar() {
//window.onload = function Preparar(tipo) {
    
    let tipo = 0;
    let container = document.getElementById('Contentor');
    let tbl = document.createElement('table');
    let taken = [];
    
    switch(tipo){
        case 0:
            for (let i = 0; i < 6; i++) {
                let tr = tbl.insertRow();
                for (let j = 0; j < 6; j++) {
                    let td = tr.insertCell();
                        td.appendChild(document.createTextNode('X'));
                    td.setAttribute('id', `cell${i}${j}`);
                }
            }
            container.appendChild(tbl); 

            for(let p of document.querySelectorAll("p")){
                if(taken.length === 2){
                    break;
                }
                let n = Math.floor(Math.random() * 5);
                while(taken.includes(PalavrasN[n])){
                    n = Math.floor(Math.random() * 5);
                }
                taken.push(PalavrasF[n]);
                p.textContent = PalavrasF[n];
            } 
            break

        case 1: 
            for (let i = 0; i < 9; i++) {
                let tr = tbl.insertRow();
                for (let j = 0; j < 9; j++) {
                    let td = tr.insertCell();
                        td.appendChild(document.createTextNode('X'));
                    td.setAttribute('id', `cell${i}${j}`);
                }
            }
            container.appendChild(tbl); 

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
            break;

        case 2: 
            for (let i = 0; i < 12; i++) {
                let tr = tbl.insertRow();
                for (let j = 0; j < 12; j++) {
                    let td = tr.insertCell();
                        td.appendChild(document.createTextNode('X'));
                    td.setAttribute('id', `cell${i}${j}`);
                }
            }
            container.appendChild(tbl); 

            for(let p of document.querySelectorAll("p")){
                if(taken.length === 5){
                    break;
                }
                let n = Math.floor(Math.random() * 5);
                while(taken.includes(PalavrasD[n])){
                    n = Math.floor(Math.random() * 5);
                }
                taken.push(PalavrasD[n]);
                p.textContent = PalavrasD[n];
            }
            break;
        

        default: break;
    }
    
    console.log(taken);
    displayWords(taken, tipo);
    for (let node of document.querySelectorAll("td")) {
        node.onclick = function Clicar(){
            if(node.className == ""){
                node.className = "Selecionado"
            }
            else {
                node.className = ""
            }
        }
        if (node.textContent !== 'X') {
            continue;
        }
        let charCode = Math.round(65 + Math.random() * 25);
        node.textContent = String.fromCharCode(charCode);
    }
}

function displayWords(taken) {
    
    let tipo = 0;
    let i = 0;
    let random = 0;
    let startRow = 0;
    let startCol = 0;
    let testRow = 0;
    let testCol = 0;

    ciclo1: while(i !== taken.length){
        
        switch(tipo){

            case 0:
                
                random = Math.floor(Math.random() * 2) + 1;
                startRow = Math.floor(Math.random() * 6);
                startCol = Math.floor(Math.random() * 6);
                testRow = startRow;
                testCol = startCol;
                    
                if(random === 1){ //Horizontal ->
                    if((taken[i].length + startCol) > 5){
                        continue;
                   }
                    for(let k = 0; k < taken[i].length; k++){
                        if(document.getElementById(`cell${startRow}${testCol}`).textContent !== 'X' && document.getElementById(`cell${startRow}${testCol}`).textContent !== taken[i].charAt(k)){
                            continue ciclo1;
                        }
                        testCol++;
                    }
                    
                    let end = false;
                    let j = 0;
                    
                    while (!end) {
                        if (j >= taken[i].length) {
                            end = true;
                            continue;
                        }
                        
                        console.log(taken[i].charAt(j));
                        document.getElementById(`cell${startRow}${startCol}`).innerHTML = taken[i].charAt(j);
                        //document.getElementById(`cell${startRow}${startCol}`).style.backgroundColor = "red";
                        j++;
                        startCol++;
                    }
                    i++;
                    
                }else if(random === 2){ //Vertical ->
                    if((taken[i].length + startRow) > 5){
                        continue;
                    }
                    for(let k = 0; k < taken[i].length; k++){
                        if(document.getElementById(`cell${testRow}${startCol}`).textContent !== 'X' && document.getElementById(`cell${testRow}${startCol}`).textContent !== taken[i].charAt(k)){
                            continue ciclo1;
                        }
                        testRow++;
                    }
                    let end = false;
                    let j = 0;
                    while (!end) {
                        if (j >= taken[i].length) {
                            end = true;
                            continue;
                        }
                        console.log(taken[i].charAt(j));
                        document.getElementById(`cell${startRow}${startCol}`).innerHTML = taken[i].charAt(j);
                        //document.getElementById(`cell${startRow}${startCol}`).style.backgroundColor = "red";
                        j++;
                        startRow++;
                    }
                    i++;
                        
                }else { //Diagonal \ v
                    if((taken[i].length + startCol) > 5 || (taken[i].length + startRow) > 5){
                        continue;
                    }
                    for(let k = 0; k < taken[i].length; k++){
                        if(document.getElementById(`cell${testRow}${testCol}`).textContent !== 'X' && document.getElementById(`cell${testRow}${testCol}`).textContent !== taken[i].charAt(k)){
                            continue ciclo1;
                        }
                        testRow++;
                        testCol++;                
                    }
                    let end = false;
                    let j = 0;
                    while (!end) {
                        if (j >= taken[i].length) {
                            end = true;
                            continue;
                        }
                        console.log(taken[i].charAt(j));
                        document.getElementById(`cell${startRow}${startCol}`).innerHTML = taken[i].charAt(j);
                        //document.getElementById(`cell${startRow}${startCol}`).style.backgroundColor = "red";
                        j++;
                        startRow++;
                        startCol++;
                    }
                    i++;
                }
                break;
            
            case 1:
                
                random = Math.floor(Math.random() * 8) + 1;
                startRow = Math.floor(Math.random() * 9);
                startCol = Math.floor(Math.random() * 9);
                testRow = startRow;
                testCol = startCol;
                    
                if(random === 1){ //Horizontal ->
                    if((taken[i].length + startCol) > 8){
                        continue;
                   }
                    for(let k = 0; k < taken[i].length; k++){
                        if(document.getElementById(`cell${startRow}${testCol}`).textContent !== 'X' && document.getElementById(`cell${startRow}${testCol}`).textContent !== taken[i].charAt(k)){
                            continue ciclo1;
                        }
                        testCol++;
                    }
                    
                    let end = false;
                    let j = 0;
                    
                    while (!end) {
                        if (j >= taken[i].length) {
                            end = true;
                            continue;
                        }
                        
                        console.log(taken[i].charAt(j));
                        document.getElementById(`cell${startRow}${startCol}`).innerHTML = taken[i].charAt(j);
                        //document.getElementById(`cell${startRow}${startCol}`).style.backgroundColor = "red";
                        j++;
                        startCol++;
                    }
                    i++;

                }else if(random === 2){ //Horizontal <-
                    if((startCol - taken[i].length) < 0){
                        continue;
                    }
                    for(let k = 0; k < taken[i].length; k++){
                        if(document.getElementById(`cell${startRow}${testCol}`).textContent !== 'X' && document.getElementById(`cell${startRow}${testCol}`).textContent !== taken[i].charAt(k)){
                            continue ciclo1;
                        }
                        testCol--;
                    }
                    let end = false;
                    let j = 0;
                    while (!end) {
                        if (j >= taken[i].length) {
                            end = true;
                            continue;
                        }
                        console.log(taken[i].charAt(j));
                        document.getElementById(`cell${startRow}${startCol}`).innerHTML = taken[i].charAt(j);
                        //document.getElementById(`cell${startRow}${startCol}`).style.backgroundColor = "red";
                        j++;
                        startCol--;
                    }
                    i++;

                    
                }else if(random === 3){ //Vertical ->
                    if((taken[i].length + startRow) > 8){
                        continue;
                    }
                    for(let k = 0; k < taken[i].length; k++){
                        if(document.getElementById(`cell${testRow}${startCol}`).textContent !== 'X' && document.getElementById(`cell${testRow}${startCol}`).textContent !== taken[i].charAt(k)){
                            continue ciclo1;
                        }
                        testRow++;
                    }
                    let end = false;
                    let j = 0;
                    while (!end) {
                        if (j >= taken[i].length) {
                            end = true;
                            continue;
                        }
                        console.log(taken[i].charAt(j));
                        document.getElementById(`cell${startRow}${startCol}`).innerHTML = taken[i].charAt(j);
                        //document.getElementById(`cell${startRow}${startCol}`).style.backgroundColor = "red";
                        j++;
                        startRow++;
                    }
                    i++;
                    
                }else if(random === 4){ //Vertical <-
                    if((startRow - taken[i].length) < 0){
                        continue;
                    }
                    for(let k = 0; k < taken[i].length; k++){
                        if(document.getElementById(`cell${testRow}${startCol}`).textContent !== 'X' && document.getElementById(`cell${testRow}${startCol}`).textContent !== taken[i].charAt(k)){
                            continue ciclo1;
                        }
                        testRow--;
                    }
                    let end = false;
                    let j = 0;
                    while (!end) {
                        if (j >= taken[i].length) {
                            end = true;
                            continue;
                        }
                        console.log(taken[i].charAt(j));
                        document.getElementById(`cell${startRow}${startCol}`).innerHTML = taken[i].charAt(j);
                        //document.getElementById(`cell${startRow}${startCol}`).style.backgroundColor = "red";
                        j++;
                        startRow--;
                    }
                    i++;
                        
                }else if(random === 5){ //Diagonal \ v
                    if((taken[i].length + startCol) > 8 || (taken[i].length + startRow) > 8){
                        continue;
                    }
                    for(let k = 0; k < taken[i].length; k++){
                        if(document.getElementById(`cell${testRow}${testCol}`).textContent !== 'X' && document.getElementById(`cell${testRow}${testCol}`).textContent !== taken[i].charAt(k)){
                            continue ciclo1;
                        }
                        testRow++;
                        testCol++;                
                    }
                    let end = false;
                    let j = 0;
                    while (!end) {
                        if (j >= taken[i].length) {
                            end = true;
                            continue;
                        }
                        console.log(taken[i].charAt(j));
                        document.getElementById(`cell${startRow}${startCol}`).innerHTML = taken[i].charAt(j);
                        //document.getElementById(`cell${startRow}${startCol}`).style.backgroundColor = "red";
                        j++;
                        startRow++;
                        startCol++;
                    }
                    i++;
                }else if(random === 6){ //Diagonal \ ^
                    if((startCol - taken[i].length) < 0 || (startRow - taken[i].length) < 0){
                        continue;
                    }
                    for(let k = 0; k < taken[i].length; k++){
                        if(document.getElementById(`cell${testRow}${testCol}`).textContent !== 'X' && document.getElementById(`cell${testRow}${testCol}`).textContent !== taken[i].charAt(k)){
                            continue ciclo1;
                        }
                        testRow--;
                        testCol--;                
                    }
                    let end = false;
                    let j = 0;
                    while (!end) {
                        if (j >= taken[i].length) {
                            end = true;
                            continue;
                        }
                        console.log(taken[i].charAt(j));
                        document.getElementById(`cell${startRow}${startCol}`).innerHTML = taken[i].charAt(j);
                        //document.getElementById(`cell${startRow}${startCol}`).style.backgroundColor = "red";
                        j++;
                        startRow--;
                        startCol--;
                    }
                    i++;
                }else if(random === 7){ //Diagonal / ^
                    if((taken[i].length + startCol) > 8 || (startRow - taken[i].length) < 0){
                        continue;
                    }
                    for(let k = 0; k < taken[i].length; k++){
                        if(document.getElementById(`cell${testRow}${testCol}`).textContent !== 'X' && document.getElementById(`cell${testRow}${testCol}`).textContent !== taken[i].charAt(k)){
                            continue ciclo1;
                        }
                        testRow--;
                        testCol++;                
                    }
                    let end = false;
                    let j = 0;
                    while (!end) {
                        if (j >= taken[i].length) {
                            end = true;
                            continue;
                        }
                        console.log(taken[i].charAt(j));
                        document.getElementById(`cell${startRow}${startCol}`).innerHTML = taken[i].charAt(j);
                        //document.getElementById(`cell${startRow}${startCol}`).style.backgroundColor = "red";
                        j++;
                        startRow--;
                        startCol++;
                    }
                    i++;
                }else{ //
                    if((taken[i].length + startRow) > 8 || (startCol - taken[i].length) < 0){
                        continue;
                    }
                    for(let k = 0; k < taken[i].length; k++){
                        if(document.getElementById(`cell${testRow}${testCol}`).textContent !== 'X' && document.getElementById(`cell${testRow}${testCol}`).textContent !== taken[i].charAt(k)){
                            continue ciclo1;
                        }
                        testRow++;
                        testCol--;                
                    }
                    let end = false;
                    let j = 0;
                    while (!end) {
                        if (j >= taken[i].length) {
                            end = true;
                            continue;
                        }
                        console.log(taken[i].charAt(j));
                        document.getElementById(`cell${startRow}${startCol}`).innerHTML = taken[i].charAt(j);
                        //document.getElementById(`cell${startRow}${startCol}`).style.backgroundColor = "red";
                        j++;
                        startRow++;
                        startCol--;
                    }
                    i++;
                }
                break;
        }
        
    }
}