//Este arquivo é um script que vai tratar de carregar as imagens.
function generate_db() {
    //Atualizando a label de usuário para dizer que estamos processando.
    let lbl = document.querySelector('div#usrlbl');
    lbl.innerHTML = `Estamos processando o seu diretório.`;

    //Fazer processamento e barra de progresso.

    //Adicionando botão de buscar por arquivo.
    let search = document.querySelector('div#file-div');
    let srch = document.createElement('input');
    srch.setAttribute('type', 'file');
    srch.setAttribute('id', 'img-srch');
    let srchbttn = document.createElement('input');
    srchbttn.setAttribute('type', 'button')
    srchbttn.setAttribute('value', 'Buscar Imagem');
    srchbttn.setAttribute('id', 'img-bttn');
    srchbttn.setAttribute('onclick', 'buscar()');
    search.appendChild(srch);
    search.innerHTML += '<br><br>';
    search.appendChild(srchbttn);

    //Chamando subfunção
    dirProcess();
}

function buscar() {
    var file = document.getElementById('img-srch').files[0];
    document.getElementById('img-srch').onchange = function (evt) {
        var tgt = evt.target || window.event.srcElement,
            files = tgt.files;

        // FileReader support
        if (FileReader && files && files.length) {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById(outImage).src = fr.result;
            }
            fr.readAsDataURL(files[0]);
        }

        // Not supported
        else {
            console.log('Não há suporte.')
        }
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