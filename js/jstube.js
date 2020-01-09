// Params of request the Youtube Api
const query = {
    baseUrl: 'https://www.googleapis.com/youtube/v3/search?',
    part: 'snippet',
    type: {videos: 'video', canales: 'channel'},
    order: {visualizaciones: 'viewCount', relevancia: 'relevance'},
    busqueda: '',
    maxResults: {videos: 20, canales: 34},
    key: "AIzaSyBXAv85Wh8aLTayYuYV7ogzgVdimWibdlE",
    // prevPageToken: '',
    // nextPageToken: ''
};

// Desestructurar para obtener valores
const { baseUrl, part, type, order, maxResults, key} = query;

// Config App
const config = {
    desarrollo: true,
    canales : {
        url: () => {
            return `${baseUrl}part=${part}&type=${type.canales}
            &order=${order.relevancia}&q=JavaScript+${query.busqueda}
            &maxResults=${maxResults.canales}&key=${key}&fields=items(snippet(channelId,channelTitle,thumbnails))`;
        },
        css: "canal",
        dom: document.querySelector(".canales"),
    },
    videos : {
        url: () => { 
            return `${baseUrl}part=${part}&type=${type.videos}
            &order=${order.relevancia}&q=JavaScript+${query.busqueda}
            &maxResults=${maxResults.videos}&key=${key}&fields=items(id, snippet(channelTitle,title,thumbnails))`;
        },
        css: "video",
        dom: document.querySelector(".videos"),
    },
};


// Request info api youtube (channel or video)

const sendYT  = (type) => {
    return fetch(config.desarrollo ? `../json/${type}.json` : config[type].url())
        .then(res => {
            return res.json()
                .then(json => {
                    return {json, type };
                });
        })
        .catch(error => console.log(error));
}

// Functionality of the channels and videos searching

const search = (text) => {
    console.log(text)
    query.busqueda = text;
    deleteElements();
    JSTube();
}

const deleteElements = () => {
    let videos = document.querySelectorAll(".video"),
        canales = document.querySelectorAll(".canal");

    videos.length && videos.forEach(video => video.remove());
    canales.length && canales.forEach(canal => canal.remove());
}

document.querySelector(".cabecera__formulario").onsubmit = event => {
    event.preventDefault();
    search(document.querySelector(".cabecera__formulario__busqueda").value)
}


// Create and add channels or videos to the DOM

const createElement = (elements, type) => {
    // console.log(elements, type);
    elements.forEach(el => {
        // console.log(el);
        // img element
        let fontImg = el.snippet.thumbnails.medium.url,
            img = document.createElement("img");
        img.src = fontImg;
        img.classList.add(`${config[type].css}__imagen`);
        // link
        let link = document.createElement("a");
        link.classList.add(`${config[type].css}__enlace`);

        if (type === "videos") {
            link.title = el.snippet.title;
            link.href = `https://www.youtube.com/watch?v=${el.id.videoId}`
        } else if (type === "canales"){
            link.title = el.snippet.channelTitle;
            link.href = `https://www.youtube.com/channel/${el.snippet.channelId}`
        }

        link.target = "_blank";
        link.appendChild(img);
        // add to div
        let item = document.createElement("div");
        item.classList.add(config[type].css);
        item.appendChild(link);

        // add it to yout container element
        config[type].dom.appendChild(item);
    });
}

// Public piece that unites and starts everything
export const JSTube = () => {
    Promise.all([sendYT("canales"), sendYT("videos")])
        .then(responses => { 
            responses.forEach(res => {
                createElement(res.json.items, res.type);
            });
        })
        .catch(error => console.error(error));
}


