"use client";

import React, { useEffect, useState } from "react";
import { fetchWorkoutProgramWithTopicByTopicIdData } from "@/utils/video/workoutVideoCollection";
import Link from "next/link";
import ProgramTitle from "../../program-title";
import ProgramCard from "../../program-card";
import { usePathname } from "next/navigation";
import HeaderNavWorkoutPrograms from "../../header-nav-workout-program";
import SkeletonProgramCard from "../../skeleton-program";
import TableProgramCategory from "../../filter-workout-program";

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

// interface HeaderNavWorkoutProgramsProps {
//     onFilterClick: () => void;
// }

const CategoryModelProgramById = () => {
   const [workoutProgramsTopic, setWorkoutProgramsTopic] = useState<
      TopicType[]
   >([]);
   const [query, setQuery] = useState("");
   const [loading, setLoading] = useState(true);
   const pathname = usePathname();
   const [showFilterModal, setShowFilterModal] = useState(false);

   useEffect(() => {
      if (pathname) {
         const pathSegments = pathname.split("/");
         const lastSegment = pathSegments[pathSegments.length - 1] ?? "";
         //@ts-ignore
         if (!isNaN(lastSegment)) {
            setQuery(lastSegment);
         }
      }
   }, [pathname]);

   console.log("CategoryModelProgramById", query);

   useEffect(() => {
      const getWorkoutProgram = async () => {
         setLoading(true);
         try {
            const data = await fetchWorkoutProgramWithTopicByTopicIdData(
               parseInt(query, 10) || 0
            );
            if (data && data.length > 0) {
               console.log("Data loaded:", data);
               setWorkoutProgramsTopic(data);
            }
         } catch (error) {
            console.error("Failed to fetch data:", error);
         } finally {
            setLoading(false);
         }
      };

      if (query) {
         getWorkoutProgram();
      }
   }, [query]);

   //@ts-ignore
   function formatDate(dateString) {
      const date = new Date(dateString);
      return date
         .toLocaleString("en-US", { month: "long", year: "numeric" })
         .toUpperCase();
   }

   const toggleFilterModal = () => setShowFilterModal(!showFilterModal);

   return (
      <div className="max-w-7xl mx-auto">
         <HeaderNavWorkoutPrograms onFilterClick={toggleFilterModal} />
         {showFilterModal && (
            <TableProgramCategory
               onClose={() => setShowFilterModal(false)}
               onFilterClick={toggleFilterModal}
            />
         )}
         {loading ? (
            <div className="grid grid-cols-5 gap-4 h-[430px]">
               <SkeletonProgramCard />
               <SkeletonProgramCard />
               <SkeletonProgramCard />
               <SkeletonProgramCard />
               <SkeletonProgramCard />
            </div>
         ) : (
            workoutProgramsTopic.map((programTopic) => (
               <div key={programTopic.id}>
                  <ProgramTitle
                     id={programTopic.id}
                     name={programTopic.name}
                     description={programTopic.description}
                  />
                  <div className="grid grid-cols-5 gap-4 h-[430px]">
                     {programTopic.workoutPrograms.map((program) => (
                        <Link href={`/program/${program.id}`} key={program.id}>
                           <ProgramCard
                              id={program.id}
                              key={program.id}
                              name={program.name}
                              type={program.workoutProgramCategories
                                 .filter((cat) => cat.type === "FOCUS AREA")
                                 .map((cat) => cat.name)
                                 .join(",")}
                              equipment={program.workoutProgramCategories
                                 .filter((cat) => cat.type === "EQUIPMENT")
                                 .map((cat) => cat.name)
                                 .join(",")}
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
            ))
         )}
      </div>
   );
};

export default CategoryModelProgramById;
