function populate(tensors) {
    let lbl = document.querySelector('div#usrlbl');
    lbl.innerHTML = `<p>Acabamos de buscar por sua imagem.<br>Estes são os resultados que obtivemos.</p>`;
    var gallery = document.getElementById('albumfotos');
    for (let index = 0; index < tensors.length; index++) {
        const element = tensors[index];
        let fig = document.createElement('figure');
        let imagem = document.createElement('img');
        imagem.setAttribute('src', element.src);
        let legenda = document.createElement('figcaption');
        fig.setAttribute('class', 'foto');
        legenda.innerHTML = 'Número '+(index+1)+' em similaridade.<br>Arquivo: '+(element.name)+'.';
        fig.appendChild(imagem);
        fig.appendChild(legenda);
        gallery.appendChild(fig);
    }
}