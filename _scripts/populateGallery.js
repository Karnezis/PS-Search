function populate(tensors) {
    let lbl = document.querySelector('div#usrlbl');
    lbl.innerHTML = `<p>Acabamos de buscar por sua imagem.<br>Estes são os resultados que obtivemos.</p>`;
    var gallery = document.getElementById('albumfotos');

    //Pega a Imagem Buscada e Coloca na Galeria
    let prevFile = document.getElementById('img-srch').files[0];
    let division = document.createElement('div');
    let figure = document.createElement('figure');
    let image = document.createElement('img');
    var reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(image);
    reader.readAsDataURL(prevFile);
    let sub = document.createElement('figcaption');
    figure.setAttribute('class', 'foto');
    sub.innerHTML = 'Imagem originalmente buscada.';
    figure.appendChild(image);
    figure.appendChild(sub);
    division.appendChild(figure);
    gallery.appendChild(division);

    //Popula a Galeria com as demais imagens
    for (let index = 0; index < tensors.length; index++) {
        const element = tensors[index];
        let fig = document.createElement('figure');
        let imagem = document.createElement('img');
        imagem.setAttribute('src', element.src);
        let legenda = document.createElement('figcaption');
        fig.setAttribute('class', 'foto');
        legenda.innerHTML = 'Número ' + (index + 1) + ' em similaridade.<br>Arquivo: ' + (element.name) + '.';
        fig.appendChild(imagem);
        fig.appendChild(legenda);
        gallery.appendChild(fig);
    }

    let footer = document.createElement('div');
    let button = document.createElement('input');
    button.setAttribute('type', 'button')
    button.setAttribute('value', 'Nova Busca');
    button.setAttribute('onclick', 'newSearch()');
    footer.appendChild(button);
    gallery.appendChild(footer);
}

function newSearch() {
    let gallery = document.getElementById('albumfotos');
    gallery.innerHTML = '';
    showDirectory();
}