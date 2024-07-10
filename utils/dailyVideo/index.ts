export interface VideoItem {
    id: string;
    title: string;
    img: string;
    views: string;
    date: string;
    duration: string;
}

const fetchVideos = async (videos: any) => {
    try {
        const videoDataFromDb = videos;

        const playlistId = "UUCgLoMYIyP0U56dEhEL1wXQ";
        const apiKey = "AIzaSyBCM2AezbVyQI-JKej57iHCT8GfIMH4Pwc";

        let matchedVideos: VideoItem[] = [];
        let nextPageToken = "";

        do {
            const playlistResponse = await fetch(
                `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}&pageToken=${nextPageToken}`
            );
            if (!playlistResponse.ok) {
                throw new Error(
                    `HTTP error! status: ${playlistResponse.status}`
                );
            }
            const playlistData = await playlistResponse.json();

            const videoDetails = await Promise.all(
                playlistData.items.map(async (item: any) => {
                    const videoId = item.snippet.resourceId.videoId;
                    const videoData = videoDataFromDb.find(
                        (video: any) => video.url === videoId
                    );
                    if (videoData) {
                        const videoResponse = await fetch(
                            `https://youtube.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoId}&key=${apiKey}`
                        );
                        if (!videoResponse.ok) {
                            throw new Error(
                                `HTTP error! status: ${videoResponse.status}`
                            );
                        }
                        const videoResponseData = await videoResponse.json();
                        const videoInfo = videoResponseData.items[0];

                        return {
                            id: videoId,
                            title: videoData.name, // Sử dụng name làm title
                            img: item.snippet.thumbnails.high.url,
                            views: formatViews(videoInfo.statistics.viewCount),
                            date: formatDate(
                                new Date(item.snippet.publishedAt)
                            ),
                            duration: convertDuration(
                                videoInfo.contentDetails.duration
                            ),
                        };
                    }
                    return null;
                })
            );
            matchedVideos = matchedVideos.concat(
                videoDetails.filter((video) => video !== null)
            );
            nextPageToken = playlistData.nextPageToken;
        } while (nextPageToken);
        return matchedVideos;
    } catch (error) {
        console.error("Error fetching videos:", error);
        return [];
    }
};

const convertDuration = (duration: string) => {
    const regex = /PT(\d+H)?(\d+M)?(\d+S)?/;
    const matches = duration.match(regex);

    if (!matches) {
        return "00:00";
    }

    const hours = matches[1] ? parseInt(matches[1].slice(0, -1)) : 0;
    const minutes = matches[2] ? parseInt(matches[2].slice(0, -1)) : 0;
    const seconds = matches[3] ? parseInt(matches[3].slice(0, -1)) : 0;

    const totalMinutes = hours * 60 + minutes;
    const formattedMinutes = totalMinutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
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

const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
        month: "long",
        day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
};

export default fetchVideos;
