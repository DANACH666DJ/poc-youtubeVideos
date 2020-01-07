// Parámetros del request a la API de YouTube
const query = {
    baseUrl: 'https://www.googleapis.com/youtube/v3/search?',
    part: 'snippet',
    type: {videos: 'video', canales: 'channel'},
    order: {visualizaciones: 'viewCount', relevancia: 'relevance'},
    busqueda: '',
    maxResults: {videos: 20, canales: 34},
    key: "TU API KEY AQUÍ",
    // prevPageToken: '',
    // nextPageToken: ''
};

// Configuración de la App
const config = {
    desarrollo: false,
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