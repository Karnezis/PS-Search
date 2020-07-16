function readDict() {
    let userLabel = document.querySelector('div#usrlbl');
    userLabel.innerHTML = 'Estamos processando a sua busca. Por favor, aguarde.';
    let data = document.getElementById('data').files[0]; // Pega o arquivo JSON do input
    let fr = new FileReader();

    fr.onload = function(e) {
        let result = JSON.parse(e.target.result);
        //console.log(result);
        //let formatted = JSON.stringify(result, null, 2);
        //console.log(formatted);
        createTensorArray(result);
    }
    fr.readAsText(data);
}

function createTensorArray(jsonArray) {
    let auxArray = jsonArray.map(el => Object.values(el));
    let novoArray = [];
    //console.log(auxArray);
    auxArray.forEach(element => {
        //console.log(element);
        let name = element[20];
        let src = element[21];
        element.splice(20, 2);
        //let aux = Array.from(element.value);
        //console.log(aux);
        let tensorJSON = tf.tensor1d(element);
        tensorJSON.name = name;
        tensorJSON.src = src;
        tensorJSON.print();
        //console.log(tensorJSON.name);
        novoArray.push(tensorJSON);
    });
    //console.log(novoArray);
    setTensores(novoArray);
    hideDirectory();
    buscar();
    //createElements();
}