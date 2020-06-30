function buscar() {
    const imageType = /image.*/;
    const val = 255;
    var file = document.getElementById('img-srch').files[0];   // Pega o arquivo da imagem
    if (!file.type.match(imageType)) { // Verifica se é uma imagem
        window.alert(`O arquivo ${file.name} não é uma imagem válida.`);
        return; // Se não for, retorna e espera outro upload.
    } else {
        var fileType = file.type;
    }
    let reader = new FileReader();
    reader.onloadend = function () {  // Quando tentar carregar uma imagem
        let image = new Image();  // Faz um novo elemento da classe Imagem
        image.src = reader.result;  // Pega a imagem do arquivo lido
        image.onload = async function () {  // Quando carregamos a imagem com sucesso
            let canvas = document.createElement('canvas');  // Cria um Canvas
            canvas.width = 224;  // Define a altura do canvas como a desejada
            canvas.height = 224;  // Define a largura do canvas como a desejada
            let ctx = canvas.getContext("2d");  // Pega o contexto do Canvas
            ctx.drawImage(this, 0, 0, 224, 224);  // Desenha a imagem no contexto
            canvas.toDataURL(fileType);  // O arquivo final é jogado no Canvas

            let imagem = ctx.getImageData(0, 0, canvas.height, canvas.width);  // Escreve a imagem num Canvas
            let inputTensor = tf.browser.fromPixels(imagem);  // Converte o conteúdo do Canvas para Tensor
            inputTensor = inputTensor.toFloat().div(val);  // Normaliza o vetor convertido
            let prom = new Promise(
                async function (resolve, reject) {
                    var tensor = await vggPredict(inputTensor);  // Passa o tensor pelo modelo
                    tensor.name = file.name;  // Adiciona o nome do arquivo ao tensor
                    resolve(tensor);
                }
            )
            prom.then((tensor) => {
                tf.print(tensor);
            })
        }
    }
    reader.readAsDataURL(file);
}

function hideDirectory() { // Esconde os botões de processar diretório
    let dict = document.querySelector('div#dir-div');
    dict.classList.add('hidden');
}

function createElements() { // Cria os elementos de buscar imagem
    //Acha a div com o id 'file-div'
    let search = document.querySelector('div#file-div');
    //Cria o botão onde o usuário irá escolher a imagem desejada
    let srch = document.createElement('input');
    srch.setAttribute('type', 'file');
    srch.setAttribute('id', 'img-srch');
    srch.setAttribute('accept', 'image/*');
    let srchbttn = document.createElement('input');
    //Adicionando botão de buscar por arquivo.
    srchbttn.setAttribute('type', 'button')
    srchbttn.setAttribute('value', 'Buscar Imagem');
    srchbttn.setAttribute('id', 'img-bttn');
    srchbttn.setAttribute('onclick', 'buscar()');
    search.appendChild(srch);
    search.innerHTML += '<br><br>';
    search.appendChild(srchbttn);
}