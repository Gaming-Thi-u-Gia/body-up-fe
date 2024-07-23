import { title } from "process";
import { convertDuration, formatDate, formatViews } from ".";
import page from "@/app/(main)/recipes/page";

export const fetchVideoCategoryData = async () => {
   try {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/getTopicForVideo`
      );
      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Error fetching video category data:", error);
      return [];
   }
};

export const fetchWorkoutCategoryData = async () => {
   try {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/getTopicForWorkout`
      );
      console.log(process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1);

      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Error fetching video category data:", error);
      return [];
   }
};

export const fetchWorkoutProgramData = async () => {
   try {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/getAllWorkoutProgram`
      );
      console.log(process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1);

      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Error fetching video category data:", error);
      return [];
   }
};

export const fetchLatestWorkoutProgramData = async () => {
   try {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/getLatestWorkoutPrograms`
      );
      console.log(process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1);

      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Error fetching video category data:", error);
      return [];
   }
};

export const fetchWorkoutProgramDataById = async (id: number) => {
   try {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/getWorkoutProgramById?id=${id}`
      );
      console.log(process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1);

      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Error fetching video category data:", error);
      return [];
   }
};

export const fetchWorkoutProgramDataByTopic = async (topicId: number) => {
   if (!topicId || typeof topicId !== "number") {
      console.error(
         "fetchWorkoutProgramDataByTopic was called without a valid topicId."
      );
      return [];
   }

   try {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/getWorkoutProgramByTopic?topicId=${topicId}`
      );
      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
   } catch (error) {
      console.error("Error fetching video category data:", error);
      return [];
   }
};

export const fetchWorkoutProgramWithTopicData = async (pageNo: number) => {
   try {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/getTopicWithWorkoutProgram?pageNo=${pageNo}`
      );
      console.log(process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1);

      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Error fetching video category data:", error);
      return [];
   }
};

export const fetchWorkoutProgramWithTopicByTopicIdData = async (
   topicId: number
) => {
   try {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/getTopicWithWorkoutProgramById?topicId=${topicId}`
      );
      console.log(process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1);

      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Error fetching video category data:", error);
      return [];
   }
};

export const fetchVideoWithTopicByTopicIdData = async (topicId: number) => {
   try {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/getVideoByTopic?topicId=${topicId}`
      );
      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Error fetching video category data:", error);
      return [];
   }
};

export const fetchSearchProgramData = async (name: string) => {
   try {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/searchWorkoutProgram?name=${name}`
      );
      console.log(process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1);

      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Error fetching video category data:", error);
      return [];
   }
};

export const fetchBookmarkVideo = async (id: number, sessionToken: string) => {
   try {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/getBookmark?id=${id}`,
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${sessionToken}`,
            },
         }
      );

      if (!response.ok) {
         const errorText = await response.text();
         throw new Error(
            `HTTP error! status: ${response.status}, response: ${errorText}`
         );
      }

      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Error while sending bookmark video request:", error);
      throw error;
   }
};

export const fetchSearchVideoData = async (name: string) => {
   try {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/searchVideo?name=${name}`
      );
      console.log(process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1);

      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Error fetching video category data:", error);
      return [];
   }
};

export const fetchDailyExerciseData = async (
   workoutProgramId: number,
   selectDay: number
) => {
   try {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/getVideosByDay?workoutProgramId=${workoutProgramId}&day=${selectDay}`
      );
      console.log(process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1);

      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Error fetching video category data:", error);
      return [];
   }
};

export const fetchDailyRecipeExerciseData = async (
   workoutProgramId: number,
   selectDay: number
) => {
   try {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/recipe/ingredient-recipe/getRecipesByDay?workoutProgramId=${workoutProgramId}&day=${selectDay}`
      );
      console.log(process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1);

      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Error fetching video category data:", error);
      return [];
   }
};
export const fetchGetAllVideoSelectForAdmin = async (sessionToken: string) => {
   try {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/list-video-select`,
         {
            method: "Get",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${sessionToken}`,
            },
         }
      );
      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Error fetching video select data:", error);
      return [];
   }
};

export const fetchLastTestVideo = async () => {
   try {
      const dataFromDB = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/getVideoLatest`
      );
      const apiKey = "AIzaSyC7RV-Yf4DiF8L4Xj4DprWjceASn5r-S6s";
      const data = await dataFromDB.json();

      const updatedData = await Promise.all(
         data.map(async (item: any) => {
            const url = item.url;
            const videoResponse = await fetch(
               `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${url}&key=${apiKey}`
            );

            if (!videoResponse.ok) {
               throw new Error(`HTTP error! status: ${videoResponse.status}`);
            }

            const videoResponseData = await videoResponse.json();
            const videoInfo = videoResponseData.items[0];
            const img = videoInfo.snippet.thumbnails.high.url;
            const date = formatDate(new Date(videoInfo.snippet.publishedAt));
            const duration = convertDuration(videoInfo.contentDetails.duration);
            const views = formatViews(videoInfo.statistics.viewCount);

            if (url === videoInfo.id) {
               item.views = views;
               item.img = img;
               item.date = date;
               item.duration = duration;
            } else {
               console.log("The video IDs do not match.");
            }

            return item;
         })
      );

      return updatedData;
   } catch (error) {
      console.error("Error fetching video category data:", error);
      return [];
   }
};

export const fetchVideoWithTopicData = async (
   sessionToken: string | undefined,
   pageNo: number,
   pageSize: number
) => {
   const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(sessionToken && { Authorization: `Bearer ${sessionToken} ` }),
   };

   try {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/getTopicWithWorkoutVideo?pageNo=${pageNo}&pageSize=${pageSize}`,
         {
            method: "GET",
            headers: headers,
         }
      );

      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const apiKey = "AIzaSyC7RV-Yf4DiF8L4Xj4DprWjceASn5r-S6s";

      const updatedTopics = await Promise.all(
         data.content.map(async (topic: any) => {
            const updatedVideos = await Promise.all(
               topic.videos.map(async (video: any) => {
                  const url = video.url;
                  const videoResponse = await fetch(
                     `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${url}&key=${apiKey}`
                  );

                  if (!videoResponse.ok) {
                     throw new Error(
                        `HTTP error! status: ${videoResponse.status}`
                     );
                  }

                  const videoResponseData = await videoResponse.json();
                  const videoInfo = videoResponseData.items[0];
                  const img = videoInfo.snippet.thumbnails.high.url;
                  const date = formatDate(
                     new Date(videoInfo.snippet.publishedAt)
                  );
                  const duration = convertDuration(
                     videoInfo.contentDetails.duration
                  );
                  const views = formatViews(videoInfo.statistics.viewCount);

                  if (url === videoInfo.id) {
                     return {
                        ...video,
                        views,
                        img,
                        date,
                        duration,
                     };
                  } else {
                     console.log("The video IDs do not match.");
                     return video;
                  }
               })
            );

            return {
               ...topic,
               videos: updatedVideos,
            };
         })
      );

      console.log("updatedTopics", updatedTopics);
      return updatedTopics;
   } catch (error) {
      console.error("Error fetching video category data:", error);
      return [];
   }
};

export const fetchDataBookmarkVideoByUser = async (sessionToken: string) => {
   try {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/getWorkoutVideoWithBookmark`,
         {
            method: "Get",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${sessionToken}`,
            },
         }
      );

      const data = await response.json();
      const apiKey = "AIzaSyC7RV-Yf4DiF8L4Xj4DprWjceASn5r-S6s";

      const updatedVideos = await Promise.all(
         data.map(async (video: any) => {
            const url = video.url;
            const videoResponse = await fetch(
               `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${url}&key=${apiKey}`
            );

            if (!videoResponse.ok) {
               throw new Error(`HTTP error! status: ${videoResponse.status}`);
            }

            const videoResponseData = await videoResponse.json();
            const videoInfo = videoResponseData.items[0];
            const img = videoInfo.snippet.thumbnails.high.url;
            const date = formatDate(new Date(videoInfo.snippet.publishedAt));
            const duration = convertDuration(videoInfo.contentDetails.duration);
            const views = formatViews(videoInfo.statistics.viewCount);

            if (url === videoInfo.id) {
               return {
                  ...video,
                  views,
                  img,
                  date,
                  duration,
                  bookmarked: true,
               };
            } else {
               console.log("The video IDs do not match.");
               return video;
            }
         })
      );

      console.log("updatedData", updatedVideos);
      return updatedVideos;
   } catch (error) {
      console.error("Error while sending bookmark video request:", error);
      throw error;
   }
};
