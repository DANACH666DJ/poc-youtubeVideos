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

export const solicitarYT  = (tipo) => {
    fetch(config.desarrollo ? `../json/${tipo}.json` : config[tipo].url())
        .then(res => {
            return res.json()
                .then(json => {
                    console.log(json)
                });
        });
}
