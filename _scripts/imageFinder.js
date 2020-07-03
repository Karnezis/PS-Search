function buscar() {
    const imageType = /image.*/;
    const val = 255;
    let arq = document.getElementById('img-srch').files[0];   // Pega o arquivo da imagem
    console.log(arq);
    if (!arq.type.match(imageType)) { // Verifica se é uma imagem
        window.alert(`O arquivo ${arq.name} não é uma imagem válida.`);
        return; // Se não for, retorna e espera outro upload.
    } else {
        var fileTyp = arq.type;
    }
    let leitor = new FileReader();
    leitor.onloadend = function () {  // Quando tentar carregar uma imagem
        let image = new Image();  // Faz um novo elemento da classe Imagem
        image.src = leitor.result;  // Pega a imagem do arquivo lido
        image.onload = async function () {  // Quando carregamos a imagem com sucesso
            let canvas = document.createElement('canvas');  // Cria um Canvas
            canvas.width = 224;  // Define a altura do canvas como a desejada
            canvas.height = 224;  // Define a largura do canvas como a desejada
            let ctx = canvas.getContext("2d");  // Pega o contexto do Canvas
            ctx.drawImage(this, 0, 0, 224, 224);  // Desenha a imagem no contexto
            canvas.toDataURL(fileTyp);  // O arquivo final é jogado no Canvas

            let imagem = ctx.getImageData(0, 0, canvas.height, canvas.width);  // Escreve a imagem num Canvas
            let inputTensor = tf.browser.fromPixels(imagem);  // Converte o conteúdo do Canvas para Tensor
            inputTensor = inputTensor.toFloat().div(val);  // Normaliza o vetor convertido
            let prom = new Promise(
                async function (resolve, reject) {
                    var tensor = await vggPredict(inputTensor);  // Passa o tensor pelo modelo
                    tensor.name = leitor.result;  // Adiciona o nome do arquivo ao tensor
                    resolve(tensor);
                }
            );
            prom.then((tensor) => {
                let tensors = getTensores();
                var similares = [];
                let k = document.getElementById('setK').value;
                tensors.forEach(element => {
                    element.distance = tf.norm((tf.sub(tensor, element)), 'euclidean');
                    console.log(`A distância é ${element.distance}.`);
                    if (similares.length < k || element.distance < similares[k-1].distance) {
                        similares.splice((k-1), 1);
                        similares.push(element);
                        similares.sort(function(a, b){return a.distance < b.distance ? -1 : a.distance > b.distance ? 1 : 0;});
                    }
                });
                hideElements();
                populate(similares);
                /*window.location.replace('result.html');*/
            });
        }
    }
    leitor.readAsDataURL(arq);
}

function hideDirectory() { // Esconde os botões de processar diretório
    let dict = document.querySelector('div#dir-div');
    dict.classList.add('hidden');
}

function createElements() { // Cria os elementos de buscar imagem
    let lbl = document.querySelector('div#usrlbl');
    lbl.innerHTML = `<p>Escolha a imagem que deseja buscar por similaridade.</p>`;
    //Acha a div com o id 'file-div'
    let search = document.querySelector('div#file-div');
    //Cria o botão onde o usuário irá escolher a imagem desejada
    let srch = document.createElement('input');
    srch.setAttribute('type', 'file');
    srch.setAttribute('id', 'img-srch');
    srch.setAttribute('accept', 'image/*');
    //Adicionando o campo para escolher o número K
    let setK = document.createElement('input');
    setK.setAttribute('type', 'number');
    setK.setAttribute('id', 'setK');
    setK.setAttribute('min', '1');
    //Adicionando botão de buscar por arquivo.
    let srchbttn = document.createElement('input');
    srchbttn.setAttribute('type', 'button')
    srchbttn.setAttribute('value', 'Buscar Imagem');
    srchbttn.setAttribute('id', 'img-bttn');
    srchbttn.setAttribute('onclick', 'buscar()');
    search.appendChild(srch);
    search.innerHTML += '<br><br> Defina o número de resultados: ';
    search.appendChild(setK);
    search.innerHTML += '<br><br>';
    search.appendChild(srchbttn);
}

function hideElements() {
    let search = document.querySelector('div#file-div');
    search.classList.add('hidden');
}