//Este arquivo é de tipo módulo e trata de carregar os modelos para o site.
async function load_Models() {
    //Carrega os modelos da pasta de modelos, retornando um objeto "tf.Model".
    var psmodel = await tf.loadLayersModel('_models/pspotter/model.json');
    var vggmodel = await tf.loadLayersModel('_models/vgg16ft/model.json');
    console.log('Modelos carregados.');
}

async function getModel(modelNum, image) {
    const image_reshaped = image.reshape([-1, 224, 224, 3]);
    switch (modelNum) {
        case 1:
            var psmodel = await tf.loadLayersModel('_models/pspotter/model.json');
            return psmodel.predict(image_reshaped);
            break;
        case 2:
            var vggmodel = await tf.loadLayersModel('_models/vgg16ft/model.json');
            return vggmodel.predict(image_reshaped);
            break;
        default:
            break;
    }
}