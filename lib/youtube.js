const axios = require("axios")

module.exports = async function youtubeAPI(channelID, key, amountVideos){
    try {

        const channelIDData = await axios(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelID}&key=${key}`)

        let description = channelIDData.data.items[0].snippet.description.split('');
        
        description = description.slice(0, 160); 
        description = description.join('');
        description = description + " ..."

        const videoData = await axios(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelIDData.data.items[0].id}&maxResults=${amountVideos}&order=date&type=video&key=${key}`); 

        const eachVideoData = await videoData.data.items.map((item) =>  item.id.videoId)

        const data = await Promise.all(
            eachVideoData.map(async (item) => 
                await axios(`https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet,statistics&id=${item}&key=${key}`)
            )
        );


        const channelData = { 
            channel: {
                channelID: channelIDData.data.items[0].id || 0,
                channelTitle: channelIDData.data.items[0].snippet.title || 0,
                description: description || 0,
                country: channelIDData.data.items[0].snippet.country || 0,
                views: channelIDData.data.items[0].statistics.viewCount || 0,
                subscriber: channelIDData.data.items[0].statistics.subscriberCount || 0,
                comments: channelIDData.data.items[0].statistics.commentCount || 0,
                hiddenSubscriberCount: channelIDData.data.items[0].statistics.hiddenSubscriberCount || false,
                videoCount: channelIDData.data.items[0].statistics.videoCount || 0,
            },
            videos: {
                0: {
                    title: data[0].data.items[0].snippet.title || '',
                    description: data[0].data.items[0].snippet.description || '',
                    category: data[0].data.items[0].snippet.categoryId || 0,
                    lang: data[0].data.items[0].snippet.defaultLanguage || '',
                    audio: data[0].data.items[0].snippet.defaultAudioLanguage || '',
                    views: data[0].data.items[0].statistics.viewCount || 0,
                    likes: data[0].data.items[0].statistics.likeCount || 0,
                    dislikes: data[0].data.items[0].statistics.dislikeCount || 0,
                    comments: data[0].data.items[0].statistics.commentCount || 0,
                },
                1: {
                    title: data[1].data.items[0].snippet.title || '',
                    description: data[1].data.items[0].snippet.description || '',
                    category: data[1].data.items[0].snippet.categoryId || 0,
                    lang: data[1].data.items[0].snippet.defaultLanguage || '',
                    audio: data[1].data.items[0].snippet.defaultAudioLanguage || '',
                    views: data[1].data.items[0].statistics.viewCount || 0,
                    likes: data[1].data.items[0].statistics.likeCount || 0,
                    dislikes: data[1].data.items[0].statistics.dislikeCount || 0,
                    comments: data[1].data.items[0].statistics.commentCount || 0,
                },
                2: {
                    title: data[2].data.items[0].snippet.title || '',
                    description: data[2].data.items[0].snippet.description || '',
                    category: data[2].data.items[0].snippet.categoryId || 0,
                    lang: data[2].data.items[0].snippet.defaultLanguage || '',
                    audio: data[2].data.items[0].snippet.defaultAudioLanguage || '',
                    views: data[2].data.items[0].statistics.viewCount || 0,
                    likes: data[2].data.items[0].statistics.likeCount || 0,
                    dislikes: data[2].data.items[0].statistics.dislikeCount || 0,
                    comments: data[2].data.items[0].statistics.commentCount || 0,
                },
                3: {
                    title: data[3].data.items[0].snippet.title || '',
                    description: data[3].data.items[0].snippet.description || '',
                    category: data[3].data.items[0].snippet.categoryId || 0,
                    lang: data[3].data.items[0].snippet.defaultLanguage || '',
                    audio: data[3].data.items[0].snippet.defaultAudioLanguage || '',
                    views: data[3].data.items[0].statistics.viewCount || 0,
                    likes: data[3].data.items[0].statistics.likeCount || 0,
                    dislikes: data[3].data.items[0].statistics.dislikeCount || 0,
                    comments: data[3].data.items[0].statistics.commentCount || 0,
                },
                4: {
                    title: data[4].data.items[0].snippet.title || '',
                    description: data[4].data.items[0].snippet.description || '',
                    category: data[4].data.items[0].snippet.categoryId || 0,
                    lang: data[4].data.items[0].snippet.defaultLanguage || '',
                    audio: data[4].data.items[0].snippet.defaultAudioLanguage || '',
                    views: data[4].data.items[0].statistics.viewCount || 0,
                    likes: data[4].data.items[0].statistics.likeCount || 0,
                    dislikes: data[4].data.items[0].statistics.dislikeCount || 0,
                    comments: data[4].data.items[0].statistics.commentCount || 0,
                },
            },
        }
        return channelData;
    }

    catch(err) {
        console.error(err); 
    }
}