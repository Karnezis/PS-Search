function previewFile() {
    var file = document.getElementById('img-srch').files[0]; // Pega o arquivos do input
    var imageType = /image.*/;

    if (!file.type.match(imageType)) { // Verifica se é uma imagem
        window.alert(`O arquivo ${file.name} não é uma imagem válida. Escolha outro arquivo.`);
        return;
    }

    // Cria um preview da imagem para teste
    var img = document.querySelector('img#prevImg');
    img.file = file;
    img.classList.remove('hidden');

    var reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(file);
}