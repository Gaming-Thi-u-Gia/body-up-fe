interface VideoItem {
    id: string;
    title: string;
    img: string;
    views: string;
    date: string;
    duration: string;
}

const fetchVideos = async () => {
    try {
        const playlistId = "UUCgLoMYIyP0U56dEhEL1wXQ";
        const apiKey = "AIzaSyCKQUy2NeFm7Fp8DD9mD5tP8rpnBj48VIs";
        let allVideos: VideoItem[] = [];
        let nextPageToken = "";

        do {
            const playlistResponse = await fetch(
                `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}&pageToken=${nextPageToken}`
            );
            const playlistData = await playlistResponse.json();

            const videoDetails = await Promise.all(
                playlistData.items.map(async (item: any) => {
                    const videoId = item.snippet.resourceId.videoId;
                    const videoResponse = await fetch(
                        `https://youtube.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoId}&key=${apiKey}`
                    );
                    const videoData = await videoResponse.json();
                    const videoInfo = videoData.items[0];

                    return {
                        id: videoId,
                        title: item.snippet.title,
                        img: item.snippet.thumbnails.high.url,
                        views: formatViews(
                            videoInfo.statistics.viewCount
                        ),
                        date: new Date(
                            item.snippet.publishedAt
                        ).toLocaleDateString(),
                        duration: convertDuration(
                            videoInfo.contentDetails.duration
                        ),
                    };
                })
            );

            allVideos = allVideos.concat(videoDetails);
            nextPageToken = playlistData.nextPageToken;
        } while (nextPageToken);

        console.log(allVideos);
        return allVideos;
    } catch (error) {
        console.error("Error fetching videos:", error);
    }
};

const formatViews = (views: string) => {
    const num = parseInt(views);
    if (num >= 1000000) {
        return (num / 1000000).toFixed(0) + "M";
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + "K";
    } else {
        return num.toString();
    }
};

const convertDuration = (duration: string) => {
    return duration
        .replace("PT", "")
        .replace("H", "h ")
        .replace("M", "m ")
        .replace("S", "s");
};

export default fetchVideos;