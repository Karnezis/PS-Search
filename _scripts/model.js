//Este arquivo é de tipo módulo e trata de carregar os modelos para o site.
async function load_Models() {
    //Carrega os modelos da pasta de modelos, retornando um objeto "tf.Model".
    const psmodel = await tf.loadLayersModel('_models/pspotter/model.json');
    const vggmodel = await tf.loadLayersModel('_models/vgg16ft/model.json');
    console.log('Modelos carregados.');
}