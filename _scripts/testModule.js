// Testa o vetor gerado pelo Tensorflow JS para a imagem
function tensorTest() {
    var images = document.images;
    for (let i = 0; i < images.length; i++) {
        const element = images[i];
        console.log(`O vetor do Tensorflow é: \n${tf.browser.fromPixels(element)}\n Fim.`);
    }
}

// Testa a preview dos arquivos carregados do diretório
function handleFiles() {
    var files = document.getElementById('dir').files; // Pega os arquivos do input
    var preview = document.getElementById('file-div'); // Pega o div que testa o resultado
    for (var i = 0; i < files.length; i++) { // Itera a FileList
        var file = files[i]; // Recebe um único File da lista
        var imageType = /image.*/;

        if (!file.type.match(imageType)) { // Verifica se é uma imagem
            continue;
        }

        // Cria um preview da imagem para teste
        var img = document.createElement("img");
        img.classList.add("obj");
        img.file = file;
        preview.appendChild(img);

        var reader = new FileReader();
        reader.onload = (function (aImg) { return function (e) { aImg.src = e.target.result; }; })(img);
        reader.readAsDataURL(file);
    }
}