function readDict() {
    let data = document.getElementById('data').files[0]; // Pega o arquivo JSON do input
    let fr = new FileReader();

    fr.onload = function (e) {
        let result = JSON.parse(e.target.result);
        let formatted = JSON.stringify(result, null, 2);
        createTensorArray(formatted);
    }
    fr.readAsText(data);
}

function createTensorArray(jsonArray) {
    var novoArray = [];
    let auxArray = [];
    auxArray = JSON.parse(jsonArray);
    console.log(auxArray);
    auxArray.forEach(element => {
        delete element['name'];
        delete element['src'];
        console.log(element);
        let aux = Array.from(element);
        console.log(aux);
        let tensorJSON = tf.tensor1d(element).print();
        novoArray.push(tensorJSON);
    });
    console.log(novoArray);
    setTensores(novoArray);
    hideDirectory();
    createElements();
}