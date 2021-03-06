const PalavrasF = ["REACT", "HTML", "CSS", "LS", "JAVA"] 
const PalavrasN = ["REACT", "VARIAVEL", "FUNCAO", "PYTHON", "JAVA", "STRING"]
const PalavrasD = ["JAVASCRIPT", "VARIAVEL", "STRING", "PYTHON", "PROGRAMAR"]

let score = 0;
let taken = [];
let nCorreta = 0;
let nErrada = 0;
let saveInterval;

const startingMinutes = 3;
let time = startingMinutes * 60;

function myFunction() {
    document.getElementById("botaoDrop").classList.toggle("show");
}

window.onclick = function(event) {
    
    if (!event.target.matches('.oBotao')) {
      let dropdowns = document.getElementsByClassName("dropdown-content");
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
}

function update(){
    document.getElementById('Certas').innerHTML = `Palavras Certas: ${nCorreta}`;
    document.getElementById('Erradas').innerHTML = `Palavras Erradas: ${nErrada}`;
}

function refresh(){
    setTimeout(() => {
        console.log("refreshing");
        window.location.reload();
    });
}

function Preparar(tipo) {

    if(tipo == 0 || tipo == 1 || tipo == 2 ){
        document.getElementById('botaoDisplay').classList.add('display');
        document.getElementById('Palavras').classList.remove('display');
        document.getElementById('Pontuacao').classList.remove('display');
    }
    let container = document.getElementById('Contentor');
    let tbl = document.createElement('table');
    update();
    saveInterval = setInterval(updateCountdown, 1000);
    
    switch(tipo){
        case 0:
            for (let i = 0; i < 6; i++) {
                let tr = tbl.insertRow();
                for (let j = 0; j < 6; j++) {
                    let td = tr.insertCell();
                        td.appendChild(document.createTextNode('X'));
                    td.setAttribute('id', `cell[${i}][${j}]`);
                }
            }
            container.appendChild(tbl); 

            for(let p of document.querySelectorAll('p')){
                if(taken.length === 2){
                    break;
                }
                let n = Math.floor(Math.random() * 5);
                while(taken.includes(PalavrasF[n])){
                    n = Math.floor(Math.random() * 5);
                }
                taken.push(PalavrasF[n]);
                p.textContent = PalavrasF[n];
                p.className = PalavrasF[n];
            } 
            break;

        case 1: 
            for (let i = 0; i < 9; i++) {
                let tr = tbl.insertRow();
                for (let j = 0; j < 9; j++) {
                    let td = tr.insertCell();
                        td.appendChild(document.createTextNode('X'));
                    td.setAttribute('id', `cell[${i}][${j}]`);
                }
            }
            container.appendChild(tbl); 

            for(let p of document.querySelectorAll('p')){
                if(taken.length === 4){
                    break;
                }
                let n = Math.floor(Math.random() * 6);
                while(taken.includes(PalavrasN[n])){
                    n = Math.floor(Math.random() * 6);
                }
                taken.push(PalavrasN[n]);
                p.textContent = PalavrasN[n];
                p.className = PalavrasN[n];
            }
            break;

        case 2: 
            for (let i = 0; i < 12; i++) {
                let tr = tbl.insertRow();
                for (let j = 0; j < 12; j++) {
                    let td = tr.insertCell();
                        td.appendChild(document.createTextNode('X'));
                    td.setAttribute('id', `cell[${i}][${j}]`);
                }
            }
            container.appendChild(tbl); 

            for(let p of document.querySelectorAll('p')){
                if(taken.length === 5){
                    break;
                }
                let n = Math.floor(Math.random() * 5);
                while(taken.includes(PalavrasD[n])){
                    n = Math.floor(Math.random() * 5);
                }
                taken.push(PalavrasD[n]);
                p.textContent = PalavrasD[n];
                p.className = PalavrasD[n];
            }
            break;
        

        default: break;
    }
    
    console.log(taken);
    displayWords(tipo);
    let array = [];
    let startCell, endCell, SstartCell, SendCell;
    let startRow, startCol, endRow, endCol;
    for (let node of document.querySelectorAll("td")) {
        node.onclick = function handleClicks(){
            if(node.className == ""){
                node.className = "Selecionado"
                if(startCell === undefined){ 
                    startCell = node.id;
                    SstartCell = String(startCell);
                    startCell = SstartCell.split("cell")[1];
                    console.log(startCell);
                    startRow = parseInt(startCell.match(/(?<=\[).+?(?=\])/g)[0]);
                    console.log("startRow: "+ startRow);
                    startCol = parseInt(startCell.match(/(?<=\[).+?(?=\])/g)[1]);
                    console.log("startCol: "+ startCol);
                }else if(endCell === undefined){  
                    endCell = node.id;
                    SendCell = String(endCell);
                    endCell = SendCell.split("cell")[1];
                    console.log(endCell);
                    endRow = parseInt(endCell.match(/(?<=\[).+?(?=\])/g)[0])
                    console.log("endRow: "+ endRow);
                    endCol = parseInt(endCell.match(/(?<=\[).+?(?=\])/g)[1]);
                    console.log("endCol: "+ endCol);
                    array = getWordAndPos(startRow, startCol, endRow, endCol); 
                    console.log(array);
                    if(taken.includes(array[1])){
                        document.querySelector(`.${array[1]}`).classList.add('risca');
                        displayColor(startRow, startCol, array, true);
                        pontuacao(true, tipo);
                        nCorreta++;
                        update();
                        checkEnd();
                        console.log(score);
                    }
                    else{
                        displayColor(startRow, startCol, array, false);
                        pontuacao(false, tipo);
                        nErrada++;
                        update();
                        console.log(score);
                    }
                    startCell = undefined;
                    endCell = undefined;
                }
            }
        }
        if (node.textContent !== 'X') {
            continue;
        }
        let charCode = Math.round(65 + Math.random() * 25);
        node.textContent = String.fromCharCode(charCode);
    }
}

function displayWords(tipo) {
    
    //let tipo = 1;
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
                        if(document.getElementById(`cell[${startRow}][${testCol}]`).textContent !== 'X' && document.getElementById(`cell[${startRow}][${testCol}]`).textContent !== taken[i].charAt(k)){
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
                        document.getElementById(`cell[${startRow}][${startCol}]`).innerHTML = taken[i].charAt(j);
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
                        if(document.getElementById(`cell[${testRow}][${startCol}]`).textContent !== 'X' && document.getElementById(`cell[${testRow}][${startCol}]`).textContent !== taken[i].charAt(k)){
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
                        document.getElementById(`cell[${startRow}][${startCol}]`).innerHTML = taken[i].charAt(j);
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
                        if(document.getElementById(`cell[${testRow}][${testCol}]`).textContent !== 'X' && document.getElementById(`cell[${testRow}][${testCol}]`).textContent !== taken[i].charAt(k)){
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
                        document.getElementById(`cell[${startRow}][${startCol}]`).innerHTML = taken[i].charAt(j);
                        //document.getElementById(`cell${startRow}${startCol}`).style.backgroundColor = "red";
                        j++;
                        startRow++;
                        startCol++;
                    }
                    i++;
                }
                break;
            
            case 1:
                random = Math.floor(Math.random() * 4) + 1;
                startRow = Math.floor(Math.random() * 9);
                startCol = Math.floor(Math.random() * 9);
                testRow = startRow;
                testCol = startCol;
                    
                if(random === 1){ //Horizontal ->
                    if((taken[i].length + startCol) > 8){
                        continue;
                   }
                    for(let k = 0; k < taken[i].length; k++){
                        if(document.getElementById(`cell[${startRow}][${testCol}]`).textContent !== 'X' && document.getElementById(`cell[${startRow}][${testCol}]`).textContent !== taken[i].charAt(k)){
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
                        document.getElementById(`cell[${startRow}][${startCol}]`).innerHTML = taken[i].charAt(j);
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
                        if(document.getElementById(`cell[${startRow}][${testCol}]`).textContent !== 'X' && document.getElementById(`cell[${startRow}][${testCol}]`).textContent !== taken[i].charAt(k)){
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
                        document.getElementById(`cell[${startRow}][${startCol}]`).innerHTML = taken[i].charAt(j);
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
                        if(document.getElementById(`cell[${testRow}][${startCol}]`).textContent !== 'X' && document.getElementById(`cell[${testRow}][${startCol}]`).textContent !== taken[i].charAt(k)){
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
                        document.getElementById(`cell[${startRow}][${startCol}]`).innerHTML = taken[i].charAt(j);
                        //document.getElementById(`cell${startRow}${startCol}`).style.backgroundColor = "red";
                        j++;
                        startRow++;
                    }
                    i++;
                }else{ //Diagonal \ v
                    if((taken[i].length + startCol) > 8 || (taken[i].length + startRow) > 8){
                        continue;
                    }
                    for(let k = 0; k < taken[i].length; k++){
                        if(document.getElementById(`cell[${testRow}][${testCol}]`).textContent !== 'X' && document.getElementById(`cell[${testRow}][${testCol}]`).textContent !== taken[i].charAt(k)){
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
                        document.getElementById(`cell[${startRow}][${startCol}]`).innerHTML = taken[i].charAt(j);
                        //document.getElementById(`cell${startRow}${startCol}`).style.backgroundColor = "red";
                        j++;
                        startRow++;
                        startCol++;
                    }
                    i++;
                }
                break;
                
                case 2:
                
                random = Math.floor(Math.random() * 11) + 1;
                startRow = Math.floor(Math.random() * 12);
                startCol = Math.floor(Math.random() * 12);
                testRow = startRow;
                testCol = startCol;
                    
                if(random === 1){ //Horizontal ->
                    if((taken[i].length + startCol) > 11){
                        continue;
                   }
                    for(let k = 0; k < taken[i].length; k++){
                        if(document.getElementById(`cell[${startRow}][${testCol}]`).textContent !== 'X' && document.getElementById(`cell[${startRow}][${testCol}]`).textContent !== taken[i].charAt(k)){
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
                        document.getElementById(`cell[${startRow}][${startCol}]`).innerHTML = taken[i].charAt(j);
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
                        if(document.getElementById(`cell[${startRow}][${testCol}]`).textContent !== 'X' && document.getElementById(`cell[${startRow}][${testCol}]`).textContent !== taken[i].charAt(k)){
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
                        document.getElementById(`cell[${startRow}][${startCol}]`).innerHTML = taken[i].charAt(j);
                        //document.getElementById(`cell${startRow}${startCol}`).style.backgroundColor = "red";
                        j++;
                        startCol--;
                    }
                    i++;

                    
                }else if(random === 3){ //Vertical ->
                    if((taken[i].length + startRow) > 11){
                        continue;
                    }
                    for(let k = 0; k < taken[i].length; k++){
                        if(document.getElementById(`cell[${testRow}][${startCol}]`).textContent !== 'X' && document.getElementById(`cell[${testRow}][${startCol}]`).textContent !== taken[i].charAt(k)){
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
                        document.getElementById(`cell[${startRow}][${startCol}]`).innerHTML = taken[i].charAt(j);
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
                        if(document.getElementById(`cell[${testRow}][${startCol}]`).textContent !== 'X' && document.getElementById(`cell[${testRow}][${startCol}]`).textContent !== taken[i].charAt(k)){
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
                        document.getElementById(`cell[${startRow}][${startCol}]`).innerHTML = taken[i].charAt(j);
                        //document.getElementById(`cell${startRow}${startCol}`).style.backgroundColor = "red";
                        j++;
                        startRow--;
                    }
                    i++;
                        
                }else if(random === 5){ //Diagonal \ v
                    if((taken[i].length + startCol) > 11 || (taken[i].length + startRow) > 11){
                        continue;
                    }
                    for(let k = 0; k < taken[i].length; k++){
                        if(document.getElementById(`cell[${testRow}][${testCol}]`).textContent !== 'X' && document.getElementById(`cell[${testRow}][${testCol}]`).textContent !== taken[i].charAt(k)){
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
                        document.getElementById(`cell[${startRow}][${startCol}]`).innerHTML = taken[i].charAt(j);
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
                        if(document.getElementById(`cell[${testRow}][${testCol}]`).textContent !== 'X' && document.getElementById(`cell[${testRow}][${testCol}]`).textContent !== taken[i].charAt(k)){
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
                        document.getElementById(`cell[${startRow}][${startCol}]`).innerHTML = taken[i].charAt(j);
                        //document.getElementById(`cell${startRow}${startCol}`).style.backgroundColor = "red";
                        j++;
                        startRow--;
                        startCol--;
                    }
                    i++;
                }else if(random === 7){ //Diagonal / ^
                    if((taken[i].length + startCol) > 11 || (startRow - taken[i].length) < 0){
                        continue;
                    }
                    for(let k = 0; k < taken[i].length; k++){
                        if(document.getElementById(`cell[${testRow}][${testCol}]`).textContent !== 'X' && document.getElementById(`cell[${testRow}][${testCol}]`).textContent !== taken[i].charAt(k)){
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
                        document.getElementById(`cell[${startRow}][${startCol}]`).innerHTML = taken[i].charAt(j);
                        //document.getElementById(`cell${startRow}${startCol}`).style.backgroundColor = "red";
                        j++;
                        startRow--;
                        startCol++;
                    }
                    i++;
                }else{ //
                    if((taken[i].length + startRow) > 11 || (startCol - taken[i].length) < 0){
                        continue;
                    }
                    for(let k = 0; k < taken[i].length; k++){
                        if(document.getElementById(`cell[${testRow}][${testCol}]`).textContent !== 'X' && document.getElementById(`cell[${testRow}][${testCol}]`).textContent !== taken[i].charAt(k)){
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
                        document.getElementById(`cell[${startRow}][${startCol}]`).innerHTML = taken[i].charAt(j);
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

function getWordAndPos(startRow, startCol, endRow, endCol){
    let diff;
    let palavra;
    let x = 1;

    if(startRow === endRow){
        if(startCol > endCol){
            diff = startCol - endCol;
            palavra = document.getElementById(`cell[${startRow}][${startCol}]`).textContent;
            for(i = diff; i > 0; i--){
                if(document.getElementById(`cell[${startRow}][${startCol-x}]`).className === "plvCorreta"){
                    palavra += document.getElementById(`cell[${startRow}][${startCol-x}]`).textContent;
                    x++;
                    continue;
                }
                palavra += document.getElementById(`cell[${startRow}][${startCol-x}]`).textContent;
                document.getElementById(`cell[${startRow}][${startCol-x}]`).className = "Selecionado"
                x++;
            }
            console.log(palavra);
            return [2, palavra];
        }else if(startCol < endCol){
            diff = endCol - startCol;
            palavra = document.getElementById(`cell[${startRow}][${startCol}]`).textContent;
            for(i = diff; i > 0; i--){
                if(document.getElementById(`cell[${startRow}][${startCol+x}]`).className === "plvCorreta"){
                    palavra += document.getElementById(`cell[${startRow}][${startCol+x}]`).textContent;
                    x++;
                    continue;
                }
                palavra += document.getElementById(`cell[${startRow}][${startCol+x}]`).textContent;
                document.getElementById(`cell[${startRow}][${startCol+x}]`).className = "Selecionado"
                x++;
            }
            console.log(palavra);
            return [1, palavra];
        }  
    }else if(startCol === endCol){
        if(startRow < endRow){
            diff = endRow - startRow;
            palavra = document.getElementById(`cell[${startRow}][${startCol}]`).textContent;
            for(i = diff; i > 0; i--){
                if(document.getElementById(`cell[${startRow+x}][${startCol}]`).className === "plvCorreta"){
                    palavra += document.getElementById(`cell[${startRow+x}][${startCol}]`).textContent;
                    x++;
                    continue;
                }
                palavra += document.getElementById(`cell[${startRow+x}][${startCol}]`).textContent;
                document.getElementById(`cell[${startRow+x}][${startCol}]`).className = "Selecionado"
                x++;
            }
            console.log(palavra);
            return [3, palavra];
        }else if(startRow > endRow){
            diff = startRow - endRow;
            palavra = document.getElementById(`cell[${startRow}][${startCol}]`).textContent;
            for(i = diff; i > 0; i--){
                if(document.getElementById(`cell[${startRow-x}][${startCol}]`).className === "plvCorreta"){
                    palavra += document.getElementById(`cell[${startRow-x}][${startCol}]`).textContent;
                    x++;
                    continue;
                }
                palavra += document.getElementById(`cell[${startRow-x}][${startCol}]`).textContent;
                document.getElementById(`cell[${startRow-x}][${startCol}]`).className = "Selecionado"
                x++;
            }
            console.log(palavra);
            return [4, palavra];
        }
    }else{
        if(startCol > endCol){
            if(startRow < endRow){
                if((startCol-endCol) === (endRow-startRow)){
                    diff = startCol - endCol;
                    palavra = document.getElementById(`cell[${startRow}][${startCol}]`).textContent;
                    for(i = diff; i > 0; i--){
                        if(document.getElementById(`cell[${startRow+x}][${startCol-x}]`).className === "plvCorreta"){
                            palavra += document.getElementById(`cell[${startRow+x}][${startCol-x}]`).textContent;
                            x++;
                            continue;
                        }
                        palavra += document.getElementById(`cell[${startRow+x}][${startCol-x}]`).textContent;
                        document.getElementById(`cell[${startRow+x}][${startCol-x}]`).className = "Selecionado"
                        x++;
                    }
                    console.log(palavra);
                    return [8, palavra];
                }
            }else if(startRow > endRow){
                if((startCol-endCol) === (startRow-endRow)){
                    diff = startCol - endCol;
                    palavra = document.getElementById(`cell[${startRow}][${startCol}]`).textContent;
                    for(i = diff; i > 0; i--){
                        if(document.getElementById(`cell[${startRow-x}][${startCol-x}]`).className === "plvCorreta"){
                            palavra += document.getElementById(`cell[${startRow-x}][${startCol-x}]`).textContent;
                            x++;
                            continue;
                        }
                        palavra += document.getElementById(`cell[${startRow-x}][${startCol-x}]`).textContent;
                        document.getElementById(`cell[${startRow-x}][${startCol-x}]`).className = "Selecionado"
                        x++;
                    }
                    console.log(palavra);
                    return [6, palavra];
                }
            }
        }else if(startCol < endCol){
            if(startRow < endRow){
                if((endCol-startCol) === (endRow-startRow)){
                    diff = endCol - startCol;
                    palavra = document.getElementById(`cell[${startRow}][${startCol}]`).textContent;
                    for(i = diff; i > 0; i--){
                        if(document.getElementById(`cell[${startRow+x}][${startCol+x}]`).className === "plvCorreta"){
                            palavra += document.getElementById(`cell[${startRow+x}][${startCol+x}]`).textContent;
                            x++;
                            continue;
                        }
                        palavra += document.getElementById(`cell[${startRow+x}][${startCol+x}]`).textContent;
                        document.getElementById(`cell[${startRow+x}][${startCol+x}]`).className = "Selecionado"
                        x++;
                    }
                    console.log(palavra);
                    return [5, palavra];
                }
            }else if(startRow > endRow){
                if((endCol-startCol) === (startRow-endRow)){
                    diff = startCol - endCol;
                    palavra = document.getElementById(`cell[${startRow}][${startCol}]`).textContent;
                    for(i = diff; i > 0; i--){
                        if(document.getElementById(`cell[${startRow-x}][${startCol+x}]`).className === "plvCorreta"){
                            palavra += document.getElementById(`cell[${startRow-x}][${startCol+x}]`).textContent;
                            x++;
                            continue;
                        }
                        palavra += document.getElementById(`cell[${startRow-x}][${startCol+x}]`).textContent;
                        document.getElementById(`cell[${startRow-x}][${startCol+x}]`).className = "Selecionado"
                        x++;
                    }
                    console.log(palavra);
                    return [7, palavra];
                }
            }
        }
    }
}

function updateCountdown(){
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if(minutes === 0 && seconds === 0){
        clearInterval(saveInterval);
        checkEnd();
    }
    seconds = seconds < 3 ? '0' + seconds : seconds;
    document.getElementById("timer").innerHTML = `${minutes}: ${seconds}`;
    time--;
    checkEnd();
}

function displayColor(startRow, startCol, array, contem){
    let posicao = array[0];
    let palavra = array[1];
    switch(posicao){
        case 1: {
            for(let i = palavra.length-1; i >= 0;i--){
                if(contem === true){
                    document.getElementById(`cell[${startRow}][${startCol}]`).className = "plvCorreta";
                    startCol++;
                }else{
                    if(document.getElementById(`cell[${startRow}][${startCol}]`).className === "plvCorreta"){
                        startCol++;
                        continue;
                    }
                    document.getElementById(`cell[${startRow}][${startCol}]`).classList.remove("Selecionado");
                    startCol++;
                }
            }
        }break;
        case 2: {
            for(let i = palavra.length-1; i >= 0;i--){
                if(contem === true){
                    document.getElementById(`cell[${startRow}][${startCol}]`).className = "plvCorreta";
                    startCol--;
                }else{
                    if(document.getElementById(`cell[${startRow}][${startCol}]`).className === "plvCorreta"){
                        startCol--;
                        continue;
                    }
                    document.getElementById(`cell[${startRow}][${startCol}]`).classList.remove("Selecionado");
                    startCol--;
                }
            }
        }break;
        case 3: {
            for(let i = palavra.length-1; i >= 0;i--){
                if(contem === true){
                    document.getElementById(`cell[${startRow}][${startCol}]`).className = "plvCorreta";
                    startRow++;
                }else{
                    if(document.getElementById(`cell[${startRow}][${startCol}]`).className === "plvCorreta"){
                        startRow++;
                        continue;
                    }
                    document.getElementById(`cell[${startRow}][${startCol}]`).classList.remove("Selecionado");
                    startRow++;
                }
            }
        }break;
        case 4: {
            for(let i = palavra.length-1; i >= 0;i--){
                if(contem === true){
                    document.getElementById(`cell[${startRow}][${startCol}]`).className = "plvCorreta";
                    startRow--;
                }else{
                    if(document.getElementById(`cell[${startRow}][${startCol}]`).className === "plvCorreta"){
                        startRow--;
                        continue;
                    }
                    document.getElementById(`cell[${startRow}][${startCol}]`).classList.remove("Selecionado");
                    startRow--;
                }
            }
        }break;
        case 5: {
            for(let i = palavra.length-1; i >= 0;i--){
                if(contem === true){
                    document.getElementById(`cell[${startRow}][${startCol}]`).className = "plvCorreta";
                    startRow++;
                    startCol++;
                }else{
                    if(document.getElementById(`cell[${startRow}][${startCol}]`).className === "plvCorreta"){
                        startRow++;
                        startCol++;
                        continue;
                    }
                    document.getElementById(`cell[${startRow}][${startCol}]`).classList.remove("Selecionado");
                    startRow++;
                    startCol++;
                }
            }
        }break;
        case 6: {
            for(let i = palavra.length-1; i >= 0;i--){
                if(contem === true){
                    document.getElementById(`cell[${startRow}][${startCol}]`).className = "plvCorreta";
                    startRow--;
                    startCol--;
                }else{
                    if(document.getElementById(`cell[${startRow}][${startCol}]`).className === "plvCorreta"){
                        startRow--;
                        startCol--;
                        continue;
                    }
                    document.getElementById(`cell[${startRow}][${startCol}]`).classList.remove("Selecionado");
                    startRow--;
                    startCol--;
                }
            }
        }break;
        case 7: {
            for(let i = palavra.length-1; i >= 0;i--){
                if(contem === true){
                    document.getElementById(`cell[${startRow}][${startCol}]`).className = "plvCorreta";
                    startRow--;
                    startCol++;
                }else{
                    if(document.getElementById(`cell[${startRow}][${startCol}]`).className === "plvCorreta"){
                        startRow--;
                        startCol++;
                        continue;
                    }
                    document.getElementById(`cell[${startRow}][${startCol}]`).classList.remove("Selecionado");
                    startRow--;
                    startCol++;
                }
            }
        }break;
        case 8: {
            for(let i = palavra.length-1; i >= 0;i--){
                if(contem === true){
                    document.getElementById(`cell[${startRow}][${startCol}]`).className = "plvCorreta";
                    startRow++;
                    startCol--;
                }else{
                    if(document.getElementById(`cell[${startRow}][${startCol}]`).className === "plvCorreta"){
                        startRow++;
                        startCol--;
                        continue;
                    }
                    document.getElementById(`cell[${startRow}][${startCol}]`).classList.remove("Selecionado");
                    startRow++;
                    startCol--;
                }
            }
        }break;
    }
}

function pontuacao(x, tipo){
    switch(tipo){
        case 0:
            if(x === true){
                score += 10 * 0.5;
            }else{
                score -= 5 * 0.5;
            } 
         break;
        
        case 1: 
            if(x === true){
                score += 10 * 1;
            }else{
                score -= 5 * 1;
            }
         break;

        case 2: 
            if(x === true){
                score += 10 * 1.5;
            }else{
                score -= 5 * 1.5;
            }
            break;
    }
}

function checkEnd(){
    if(document.getElementById('timer').innerHTML === "0: 00"  || taken.length === nCorreta){
        clearInterval(saveInterval);
        document.getElementById('timer').innerHTML = `Score: ${score}`;
        document.getElementById('Palavras').classList.add('display');
        document.querySelector('table').classList.add('display');
        document.getElementById('refresh').style.visibility = "visible";
    }
}
