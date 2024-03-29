//Este arquivo é de tipo módulo e trata de carregar os modelos para o site.
async function vggPredict(image) {
    tf.engine().startScope();
    console.table(tf.memory());
    const image_reshaped = image.reshape([-1, 224, 224, 3]);
    let vggmodel = await tf.loadLayersModel('_models/vgg16ft/model.json');
    let predict = await vggmodel.predict(image_reshaped);
    //let promise = Promise.resolve(predict.data());
    //console.log(promise);
    return predict.data();
    tf.engine().endScope();
}