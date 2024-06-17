// "use client";
// import { Button } from "@/components/ui/button";
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import fetchVideos from "@/utils/video";
// import Modal from "./video";
// import { fetchVideoWithTopicData } from "@/utils/video/workoutVideoCollection";

// type VideoItem = {
//     id: string;
//     title: string;
//     img: string;
//     views: string;
//     date: string;
//     duration: string;
// }

// type TopicType = {
//     id: number;
//     name: string;
//     description: string;
//     video: VideoItem[];
// };

// const CategoryWorkoutVideos = () => {
//     const [videos, setVideos] = useState<VideoItem[]>([]);
//     const [videosTopic, setVideosTopic] = useState<TopicType[]>([]);
//     const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchDataVideoTopic = async () => {
//             const fetchedVideosTopic = await fetchVideoWithTopicData();
//             setVideosTopic(videosTopic)
//         };

//         fetchDataVideoTopic();
//     }, []);

//     useEffect(() => {
//         const fetchData = async () => {
//             const fetchedVideos = await fetchVideos();
//             if (fetchedVideos && fetchedVideos.length > 0) {
//                 setVideos(fetchedVideos);
//             } else {
//                 console.error("No videos found");
//             }
//         };

//         fetchData();
//     }, []);

//     const handleThumnailClick = (videoId: string) => {
//         setSelectedVideoId(videoId);
//     };

//     const closeVideo = () => {
//         setSelectedVideoId(null);
//     };

//     return (
//         <div>
//             <div className="flex justify-between py-2">
//                 <div>
//                     <h2 className="text-[#303033] text-xl font-semibold">
//                         Most Popular
//                     </h2>
//                     <p className="text-sm font-normal">
//                         These are some of the most popular workout videos. Give
//                         them a try and see why people love these routines.
//                     </p>
//                 </div>
//                 <Button variant="primaryOutline" size="default">
//                     View All
//                 </Button>
//             </div>

//             <div className="grid grid-cols-5 gap-5 my-5">
//                 {videos.map((video) => (
//                     <div
//                         key={video.id}
//                         onClick={() => handleThumnailClick(video.id)}
//                         className="relative bg-white border border-solid border-[#E9E9EF] rounded-lg cursor-pointer h-60 w-56"
//                     >
//                         <div className="relative">
//                             <img
//                                 className="rounded-t-lg w-full h-[126px] object-cover rounded-2xl"
//                                 src={video.img}
//                                 alt={video.title}
//                             />
//                             <div className="absolute w-10 right-[10px] bottom-[10px] rounded-[4px] bg-[#303033]">
//                                 <p className="text-[#FAFAFA] text-[10px] font-bold text-center leading-[14px] py-[2px] px-[6px]">
//                                     {video.duration}
//                                 </p>
//                             </div>
//                         </div>
//                         <div className="p-3">
//                             <p className="text-[16px] font-normal leading-[20px] text-[#303033] line-clamp-2">
//                                 {video.title}
//                             </p>
//                         </div>
//                         <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center font-medium text-sm text-[#868A93]">
//                             <span className="truncate">
//                                 {video.views} views • {video.date}
//                             </span>
//                             <div className="flex space-x-2">
//                                 <Image
//                                     width={18}
//                                     height={19}
//                                     src="/i.svg"
//                                     alt="i"
//                                 />
//                                 <Image
//                                     width={20}
//                                     height={20}
//                                     src="/heart.svg"
//                                     alt="heart"
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {selectedVideoId && (
//                 <Modal
//                     isOpen={Boolean(selectedVideoId)}
//                     onClose={closeVideo}
//                     videoId={selectedVideoId}
//                 />
//             )}
//         </div>
//     );
// };

// export default CategoryWorkoutVideos;
