

const fetchVideoIdsFromDatabase = async () => {
    try {
        const response = await fetch("http://localhost:8080/api/v1/workout-video/getVideoAll");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (!data || !Array.isArray(data)) {
            throw new Error("Invalid data format");
        }

        return data.map((item) => ({
            id: item.id,
            name: item.name,
            url: item.url
        })); 
    } catch (error) {
        console.error("Error fetching videoIds from database:", error);
        return [];
    }
};


interface VideoItem {
    id: string;
    title: string;
    img: string;
    views: string;
    date: string;
    duration: string;
}

const fetchVideos = async (fetchVideo : Promise<any>) => {
    try {
        const videoDataFromDb = await fetchVideo;
        console.log("videoDataFromDb", videoDataFromDb);
        if (!videoDataFromDb.length) {
            console.error("No video data found");
            return [];
        }

        const playlistId = "UUCgLoMYIyP0U56dEhEL1wXQ";
        const apiKey = "AIzaSyCK_pKQdZhpHFnBgXDxslUsjdP3QJyNOCU"; 

        let matchedVideos: VideoItem[] = [];
        let nextPageToken = "";

        do {
            const playlistResponse = await fetch(
                `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}&pageToken=${nextPageToken}`
            );
            if (!playlistResponse.ok) {
                throw new Error(`HTTP error! status: ${playlistResponse.status}`);
            }
            const playlistData = await playlistResponse.json();

            const videoDetails = await Promise.all(
                playlistData.items.map(async (item: any) => {
                    const videoId = item.snippet.resourceId.videoId;
                    const videoData = videoDataFromDb.find(video => video.video.url === videoId);
                    console.log("videoData", videoData);
                    if (videoData) {
                        const videoResponse = await fetch(
                            `https://youtube.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoData.video.url}&key=${apiKey}`
                        );
                        if (!videoResponse.ok) {
                            throw new Error(`HTTP error! status: ${videoResponse.status}`);
                        }
                        const videoResponseData = await videoResponse.json();
                        const videoInfo = videoResponseData.items[0];
                        const categories = videoData.video.videoCategories.map(cat => cat.name).join(', ');
                        return {
                            id: videoId,
                            title: videoData.video.name,
                            img: item.snippet.thumbnails.high.url,
                            views: formatViews(videoInfo.statistics.viewCount),
                            date: formatDate(new Date(item.snippet.publishedAt)),
                            duration: convertDuration(videoInfo.contentDetails.duration),
                            categories: categories,
                            decription: videoData.description,
                            bookmarked: videoData.video.bookmarked,
                            name: videoData.name,
                            url: videoData.video.url,
                        };
                    }
                    return null; 
                })
            );

            matchedVideos = matchedVideos.concat(videoDetails.filter(video => video !== null));
            nextPageToken = playlistData.nextPageToken;
        } while (nextPageToken);

        console.log(matchedVideos);
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
    const formattedMinutes = totalMinutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

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
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

export default fetchVideos;
