/*  Pega todos os arquivos de um diretório, transforma em um tensor, prediz o tensor no modelo VGG,
acopla o nome do arquivo no tensor e faz um arquivo com todos os dados que é baixado pelo usuário.
    */
var tensores = [];
async function processDict() {
    tf.dispose();
    var arqvs = document.getElementById('dir').files; // Pega os arquivos do input
    const val = 255;
    let proms = [];
    //Atualizando a label de usuário para dizer que estamos processando.
    let lbl = document.querySelector('div#usrlbl');
    lbl.innerHTML = `<p>Estamos processando o seu diretório. <br>Ao final desta operação, você receberá um arquivo para utilizar em sua busca na Opção 2.</p>`;

    //Fazer processamento e barra de progresso.

    hideDirectory(); // Esconde os botões de processar diretório
    let prog = document.querySelector('div#progress-div'); // Localiza a div da barra de progresso.
    prog.classList.remove('hidden'); // Deixa a barra de progresso visível.
    let actProg = 0;

    for (let i = 0; i < arqvs.length; i++) { // Itera a FileList
        var bgnTime = new Date();
        let file = arqvs[i]; // Recebe um único File da lista
        const imageType = /image.*/;

        if (!file.type.match(imageType)) { // Verifica se é uma imagem
            window.alert(`O arquivo ${file.name} não é uma imagem válida.`);
            continue; // Se não for, pula o redimensionamento.
        } else {
            var fileType = file.type;
        }

        let reader = new FileReader(); // Redimensionando a Imagem
        proms[i] = await new Promise(
            async function(resolve, reject) {
                reader.onloadend = function() { // Quando tentar carregar uma imagem
                    tf.engine().startScope();
                    let image = new Image(); // Faz um novo elemento da classe Imagem
                    image.src = reader.result; // Pega a imagem do arquivo lido
                    image.onload = async function(e) { // Quando carregamos a imagem com sucesso
                        let canvas = document.createElement('canvas'); // Cria um Canvas
                        canvas.width = 224; // Define a altura do canvas como a desejada
                        canvas.height = 224; // Define a largura do canvas como a desejada
                        let ctx = canvas.getContext("2d"); // Pega o contexto do Canvas
                        ctx.drawImage(this, 0, 0, 224, 224); // Desenha a imagem no contexto
                        canvas.toDataURL(fileType); // O arquivo final é jogado no Canvas

                        // Teste de função da vetorização
                        let imagem = ctx.getImageData(0, 0, canvas.height, canvas.width);
                        let inputTensor = tf.browser.fromPixels(imagem);
                        inputTensor = inputTensor.toFloat().div(val);
                        tensores[i] = await vggPredict(inputTensor);
                        //console.log(tensores[i].toString());
                        tensores[i].name = file.name;
                        console.log(tensores[i].name);
                        tensores[i].src = reader.result;
                        resolve(tensores[i]);
                        tf.disposeVariables();
                        tf.engine().endScope();
                    }
                }
                reader.readAsDataURL(file);
            }).then(() => {
            let endTime = new Date();
            let progTime = endTime.getTime() - bgnTime.getTime();
            update((++actProg), progTime, arqvs.length);
            tf.dispose();
        });
    }
    Promise.all(proms).then(function(results) { // Quando todas as promessas forem feitas.
        let jsonName = prompt("Dê um nome ao arquivo do dataset processado.", "dataset");
        if (!jsonName)
            jsonName = 'dataset';
        jsonName = jsonName + '.json';
        download(jsonName, JSON.stringify(tensores)); // Baixa os tensores.
        prog.classList.add('hidden'); // Esconde novamente a barra de progresso.
        //createElements(); // Cria os elementos de buscar imagem
        showDirectory();
    });
}

function update(completed, time, total) {
    var progressEl = document.querySelector('progress#prog-bar'); // Pega a barra de progresso.
    var valueEl = document.querySelector('span#prog-span'); // Pega o span de progresso.
    progressEl.value = Math.round(completed / total * 100); // Atualiza a barra.
    valueEl.innerHTML = 'Foram processadas ' + completed + ' imagens de ' + total + '. <br>'
    let milliToEnd = (time * (total - completed)) / 1000;
    if (milliToEnd < 60) { // Se o tempo que falta é menor que 1 minuto
        valueEl.innerHTML += 'Faltam aproximadamente ' + Math.round(milliToEnd) + ' segundos até o fim do processamento.'; // Atualiza o span.
    } else if (milliToEnd >= 60 && milliToEnd < 3600) { // Se está entre 1 minuto e 1 hora
        valueEl.innerHTML += 'Faltam aproximadamente ' + Math.round((milliToEnd / 60)) + ' minutos até o fim do processamento.'; // Atualiza o span.
    } else { //Se é mais que 1 hora
        if (milliToEnd < (3600 * 2)) {
            valueEl.innerHTML += 'Falta aproximadamente ' + Math.round((milliToEnd / 3600)) + ' hora e ';
            valueEl.innerHTML += Math.round(((milliToEnd - 3600) / 60)) + ' minutos até o fim do processamento.'; // Atualiza o span.
        } else {
            valueEl.innerHTML += 'Faltam aproximadamente ' + Math.round((milliToEnd / 3600)) + ' horas até o fim do processamento.'; // Atualiza o span.
        }
    }
}

function download(filename, text) {
    var pom = document.createElement('a'); // Cria um elemento a.
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text)); // Cria um blob.
    pom.setAttribute('download', filename); // Atribui download a blob.

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    } else {
        pom.click();
    }
}

function getTensores() {
    return tensores;
}

function setTensores(tensoresJSON) {
    tensores = tensoresJSON;
}