"use client";
import React, { useEffect, useState } from "react";
import HeaderNavWorkoutPrograms from "../../header-nav-workout-program";
import TableProgramCategory from "../../filter-workout-program";
import { usePathname } from "next/navigation";
import { fetchGetWorkoutByCategories } from "@/utils/video/category";
import ProgramCard from "../../program-card";
import Link from "next/link";
import SkeletonProgramCard from "../../skeleton-program";

interface ProgramCardProps {
   id: number;
   key: number;
   name: string;
   type: string;
   equipment: string;
   detail: string;
   day: string;
   time: string;
   year: string;
   img: string;
   releaseDate: string;
}

// interface HeaderNavWorkoutProgramsProps {
//     onFilterClick: () => void;
// }

const WorkoutFilter = () => {
   const [programCard, setProgramCard] = useState<ProgramCardProps[]>([]);
   const [showFilterModal, setShowFilterModal] = useState(false);
   const toggleFilterModal = () => setShowFilterModal(!showFilterModal);
   const [loading, setLoading] = useState(true);
   const [hasMoreWorkout, setHasMoreWorkout] = useState(true);
   const [pageNo, setPageNo] = useState<number>(0);
   const [totalSearchResult, setTotalSearchResult] = useState(0);
   const pathname = usePathname();
   const parts = pathname.split("categoryId").slice(1);

   useEffect(() => {
      getPrograms();
   }, [pageNo]);

   useEffect(() => {
      const handleScroll = () => {
         if (
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight
         ) {
            if (hasMoreWorkout && !loading) {
               setPageNo((prevPageNo) => prevPageNo + 1);
            }
         }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, [hasMoreWorkout, loading]);

   const getPrograms = async () => {
      const pageSize = 30;
      try {
         setLoading(true);
         const filterData = await fetchGetWorkoutByCategories(
            parts,
            pageNo,
            pageSize
         );

         console.log("API Response Data:", filterData);

         if (!filterData || !filterData.content) {
            throw new Error("Invalid data format returned");
         }

         if (
            filterData.totalElements === 0 ||
            filterData.content.length === 0
         ) {
            setHasMoreWorkout(false);
         } else {
            setProgramCard((prev) => [...prev, ...filterData.content]);
            setHasMoreWorkout(!filterData.last);
            setTotalSearchResult(filterData.totalElements);
         }
      } catch (error) {
         console.error("Error fetching data:", error);
         setHasMoreWorkout(false);
      } finally {
         setLoading(false);
      }
   };

   const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
         month: "long",
         day: "numeric",
         year: "numeric",
      });
   };

   return (
      <div className="max-w-7xl mx-auto">
         <HeaderNavWorkoutPrograms onFilterClick={toggleFilterModal} />
         {showFilterModal && (
            <TableProgramCategory
               onClose={() => setShowFilterModal(false)}
               onFilterClick={toggleFilterModal}
            />
         )}
         <div className="flex-1 bg-white py-2 my-3 flex justify-between items-center px-5 rounded-2xl">
            <div>
               Showing <b>{totalSearchResult}</b> matching{" "}
               <b>Search Criteria</b>
            </div>
            <div>
               <Link
                  href="http://localhost:3000/program"
                  className="text-red-500 cursor-pointer"
               >
                  Clear
               </Link>
            </div>
         </div>
         <div className="py-2 my-3 flex justify-between items-center px-5 rounded-2xl">
            {loading && pageNo === 0 ? (
               <div className="w-full grid grid-cols-5 gap-9">
                  <SkeletonProgramCard />
                  <SkeletonProgramCard />
                  <SkeletonProgramCard />
                  <SkeletonProgramCard />
                  <SkeletonProgramCard />
               </div>
            ) : (
               <div className="grid grid-cols-5 gap-4">
                  {programCard.map((program) => (
                     <Link
                        href={`/program/${program.id}`}
                        key={program.id}
                        className="hover:cursor-pointer"
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
            )}
         </div>
         {loading && pageNo > 0 && (
            <div className="grid grid-cols-5 gap-9">
               <SkeletonProgramCard />
               <SkeletonProgramCard />
               <SkeletonProgramCard />
               <SkeletonProgramCard />
               <SkeletonProgramCard />
            </div>
         )}
      </div>
   );
};

export default WorkoutFilter;
