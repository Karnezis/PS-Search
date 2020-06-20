//Este arquivo é um script que vai tratar de carregar as imagens.
function generate_db() { //Função que irá gerar um novo dataset para um diretório.
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
    //Função que irá buscar as imagens mais semelhantes.
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

function img_resize() { //
    var arqvs = document.getElementById('dir').files; // Pega os arquivos do input
    var prev = document.getElementById('file-div'); // Pega o div que testa o resultado
    for (let i = 0; i < arqvs.length; i++) { // Itera a FileList
        let file = arqvs[i]; // Recebe um único File da lista
        let imageType = /image.*/;

        if (!file.type.match(imageType)) { // Verifica se é uma imagem
            continue; // Se não for, pula o redimensionamento.
        }else{
            var fileType = file.type;
        }
        
        let reader = new FileReader();  // Redimensionando a Imagem
        reader.onloadend = function () {  // Quando tentar carregar uma imagem
            let image = new Image();  // Faz um novo elemento da classe Imagem
            image.src = reader.result;  // Pega a imagem do arquivo lido
            image.onload = function () {  // Quando carregamos a imagem com sucesso
                let canvas = document.createElement('canvas');  // Cria um Canvas
                canvas.width = 224;  // Define a altura do canvas como a desejada
                canvas.height = 224;  // Define a largura do canvas como a desejada
                let ctx = canvas.getContext("2d");  // Pega o contexto do Canvas
                ctx.drawImage(this, 0, 0, 224, 224);  // Desenha a imagem no contexto
                let finalFile = canvas.toDataURL(fileType);  // O arquivo final é jogado no Canvas
                // Cria um preview da imagem para teste
                let img = document.createElement("img");
                img.classList.add("obj");
                img.src = finalFile;
                prev.appendChild(image);
                prev.appendChild(img);

                console.log(`A imagem ${file.name} foi processada. Arquivo ${i} de ${arqvs.length}.`);
            }
        }
        reader.readAsDataURL(file);
    }
}

function tensorTest() {
    var images = document.images;
    for (let i = 0; i < images.length; i++) {
        const element = images[i];
        console.log(`O vetor do Tensorflow é: \n${tf.browser.fromPixels(element)}\n Fim.`);
    }
}