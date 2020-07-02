function populate(tensors) {
    let lbl = document.querySelector('div#usrlbl');
    lbl.innerHTML = `<p>Acabamos de buscar por sua imagem.<br>Estes são os resultados que obtivemos.</p>`;
    var gallery = document.getElementById('albumfotos');
    for (let index = 0; index < tensors.length; index++) {
        const element = tensors[index];
        let li = document.createElement('li');
        let imagem = document.createElement('img');
        imagem.setAttribute('src', element.name);
        let legenda = document.createElement('span');
        li.setAttribute('class', 'foto');
        legenda.innerHTML = 'Número '+(index+1)+' em similaridade.';
        li.appendChild(imagem);
        li.appendChild(legenda);
        gallery.appendChild(li);
    }
}