import React, { useEffect, useState } from "react";
import ProgramCard from "./program-card";
import ProgramTitle from "./program-title";
import { fetchWorkoutProgramWithTopicData } from "@/utils/video/workoutVideoCollection";
import Link from "next/link";
import SkeletonProgramCard from "./skeleton-program";
import InfiniteScroll from "react-infinite-scroll-component";

type WorkoutProgramCategory = {
   id: number;
   name: string;
   type: string;
};

type WorkoutProgram = {
   id: number;
   name: string;
   type: string;
   equipment: string;
   detail: string;
   day: string;
   time: string;
   year: string;
   img: string;
   releaseDate: string;
   workoutProgramCategories: WorkoutProgramCategory[];
};

type TopicType = {
   id: number;
   name: string;
   description: string;
   workoutPrograms: WorkoutProgram[];
};

const CategoryModelProgram = () => {
   const [workoutProgramsTopic, setWorkoutProgramsTopic] = useState<
      TopicType[]
   >([]);
   const [loading, setLoading] = useState(true);
   const [hasMoreWorkout, setHasMoreWorkout] = useState(false);
   const [pageNo, setPageNo] = useState<number>(0);

   useEffect(() => {
      getPrograms();
   }, []);

   const getPrograms = async () => {
      try {
         setLoading(true);
         const programs = await fetchWorkoutProgramWithTopicData(pageNo);
         if (programs.totalElements === 0) {
            setHasMoreWorkout(false);
         } else {
            setWorkoutProgramsTopic((prev) => [...prev, ...programs.content]);
            setPageNo((prevPageNo) => prevPageNo + 1);
            setHasMoreWorkout(!programs.last);
         }
      } catch (error) {
         console.error("Error fetching programs:", error);
      } finally {
         setLoading(false);
      }
   };

   const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date
         .toLocaleString("en-US", { month: "long", year: "numeric" })
         .toUpperCase();
   };

   return (
      <div className="overflow-hidden">
         {loading && workoutProgramsTopic.length === 0 ? (
            <ListSkeleton />
         ) : (
            <InfiniteScroll
               className="w-full overflow-auto"
               dataLength={workoutProgramsTopic.length}
               next={getPrograms}
               hasMore={hasMoreWorkout}
               loader={<ListSkeleton />}
               style={{ height: "100%", overflow: "hidden" }}
            >
               {workoutProgramsTopic.map((programTopic) => (
                  <div
                     key={programTopic.id}
                     className="w-full max-w-7xl mx-auto"
                  >
                     <ProgramTitle
                        id={programTopic.id}
                        name={programTopic.name}
                        description={programTopic.description}
                     />
                     <div className="grid grid-cols-5 gap-4 h-[430px]">
                        {programTopic.workoutPrograms.map((program) => (
                           <Link
                              href={`/program/${program.id}`}
                              key={program.id}
                           >
                              <ProgramCard
                                 key={program.id}
                                 id={program.id}
                                 name={program.name}
                                 type={program.type}
                                 equipment={program.equipment}
                                 detail={program.detail}
                                 day={program.day}
                                 time={program.time}
                                 year={program.year}
                                 img={program.img}
                                 releaseDate={
                                    program.releaseDate
                                       ? formatDate(program.releaseDate)
                                       : ""
                                 }
                              />
                           </Link>
                        ))}
                     </div>
                  </div>
               ))}
            </InfiniteScroll>
         )}
      </div>
   );
};

export default CategoryModelProgram;

export const ListSkeleton = () => {
   return (
      <div className="w-full">
         <div className="grid grid-cols-5 gap-4 h-[430px]">
            <SkeletonProgramCard />
            <SkeletonProgramCard />
            <SkeletonProgramCard />
            <SkeletonProgramCard />
            <SkeletonProgramCard />
         </div>
      </div>
   );
};
