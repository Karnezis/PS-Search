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

function img_resize() { //
    var arqvs = document.getElementById('dir').files; // Pega os arquivos do input
    const val = 255;
    var tensores = [];
    for (let i = 0; i < arqvs.length; i++) { // Itera a FileList
        let file = arqvs[i]; // Recebe um único File da lista
        let imageType = /image.*/;

        if (!file.type.match(imageType)) { // Verifica se é uma imagem
            continue; // Se não for, pula o redimensionamento.
        } else {
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
                canvas.toDataURL(fileType);  // O arquivo final é jogado no Canvas

                // Teste de função da vetorização
                let imagem = ctx.getImageData(0, 0, canvas.height, canvas.width);
                let inputTensor = tf.browser.fromPixels(imagem);
                inputTensor.toFloat();
                inputTensor = inputTensor.div(val);
                tensores[i] = inputTensor.dataSync();
            }
        }
        reader.readAsDataURL(file);
    }
    console.log(tensores);
    setTimeout(function(){ download('tensores.json', JSON.stringify(tensores)) }, 2000);
}

async function saveTensor(tensor) {
    Promise.resolve(tensor[0]).then(download('tensores.json', JSON.stringify(tensor)));
}

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}