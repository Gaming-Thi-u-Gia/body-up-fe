import { DailyCarousel } from '@/components/shared/daily-carousel';
import fetchVideos from '@/utils/video';
import { fetchDailyExerciseData } from '@/utils/video/workoutVideoCollection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion';
import React, { useEffect, useState } from 'react';
import { VideoDaily } from './daily-video';


interface VideoItem {
    id: string;
    title: string;
    img: string;
    views: string;
    date: string;
    duration: string;
    bookmarked: boolean;
    url: string;
    status: string;
    category: VideoCategories[];
}

interface VideoCategories {
    id: number,
    name: string,
    type: string
}

interface DailyExerciseData {
    id: number;
    day: string;
    dailyVideos: VideoItem[];
}

interface DailyCoursesProps {
    workoutProgramId: number;
}

const DailyCourses: React.FC<DailyCoursesProps> = ({ workoutProgramId }) => {
    const [dailyExercises, setDailyExercises] = useState<DailyExerciseData[]>([]);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const fetchedVideos = await fetchVideos();
    
            if (workoutProgramId) {
                const searchUrls = await fetchDailyExerciseData(workoutProgramId);
                const mappedExercises = searchUrls.map((dayExercise: DailyExerciseData) => {
                    const dailyVideos = dayExercise.dailyVideos.map(dv => {
                        const videoDetails = fetchedVideos.find(video => video.id === dv.video.url);
                        const videoCategories = dv.video.videoCategories.map(vc => vc.type).join(', ');
                        return {
                            ...videoDetails,
                            ...dv.video,
                            category: videoCategories
                        };
                    }).filter(video => video);
                    return { ...dayExercise, dailyVideos };
                });
                setDailyExercises(mappedExercises);
            } else {
                setDailyExercises([]);
            }
            setLoading(false);
        };
        fetchData();
    }, [workoutProgramId]);

    console.log(dailyExercises);
    
    const onClick = (index: number) => {
        const selected = dailyExercises.find(exercise => exercise.id === index);
        if (selected) {
            setSelectedDay(selected.day);
        }
    };

    const filteredExercise = dailyExercises.find(exercise => exercise.day === selectedDay);

    return (
        <div>
            <div className="py-[10px] px-[18px] bg-white border-[#c4c4c4] border-[1px] rounded-full items-start">
                <DailyCarousel day={selectedDay || 'Select a Day'} title='Test' onClick={onClick} />
            </div>
            {filteredExercise && (
                <div className="w-full py-[30px] px-[18px] bg-white border-[#c4c4c4] border-[1px] rounded-lg items-start my-4">
                    <Accordion type="single" collapsible>
                        <AccordionItem value={`day-${filteredExercise.day}`} className="border-none">
                            <AccordionTrigger className="flex justify-between w-full text-center items-center">
                                <h4 className="text-[22px] font-semibold">
                                    Day {filteredExercise.day} Workout
                                </h4>
                                <p className="text-[14px] text-[#868A93]">
                                    {filteredExercise.dailyVideos.length} Workouts
                                </p>
                            </AccordionTrigger>
                            <AccordionContent>
                                {filteredExercise.dailyVideos.map((video, index) => (
                                    <VideoDaily
                                        videoId={video.id}
                                        key={index}
                                        title={video.title}
                                        bannerUrl={video.img}
                                        duration={video.duration}
                                        releaseDate={video.date}
                                        target=""
                                        view={video.views}
                                        isOptional={video.bookmarked}
                                        url={video.url}
                                        initialStatus={video.status}
                                        category={video.category}
                                    />
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            )}
        </div>
    );
};

export default DailyCourses;
