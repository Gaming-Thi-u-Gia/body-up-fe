"use client";

import React, { useEffect, useState } from "react";
import HeaderNavWorkoutPrograms from "../../header-nav-workout-program";
import TableProgramCategory from "../../filter-workout-program";
import { usePathname } from "next/navigation";
import { fetchGetWorkoutByCategories } from "@/utils/video/category";

import ProgramCard from "../../program-card";
import Link from "next/link";

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

interface HeaderNavWorkoutProgramsProps {
    onFilterClick: () => void;
}

const WorkoutFilter: React.FC<HeaderNavWorkoutProgramsProps>  = ({onFilterClick}) => {
    const [programCard, setProgramCard] = useState<ProgramCardProps[]>([]);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const toggleFilterModal = () => setShowFilterModal(!showFilterModal);
    const [loading, setLoading] = useState(true);
    const [hasMoreWorkout, setHasMoreWorkout] = useState(false);
    const [pageNo, setPageNo] = useState<number>(0);

    const pathname = usePathname();
    const parts = pathname.split("categoryId");

    console.log(parts.slice(1));

    useEffect(() => {
        getPrograms();
    }, [pageNo]);

    const getPrograms = async () => {
        const pageSize = 5;
        try {
            setLoading(true);
            const filterData = await fetchGetWorkoutByCategories(parts.slice(1), pageNo, pageSize);
            
            console.log("API Response Data:", filterData);
    
            // Since the API structure has been confirmed, adjust how data is accessed:
            if (!filterData || !filterData.content) {
                throw new Error("Invalid data format returned");
            }
    
            // Check for empty content array
            if (filterData.totalElements === 0 || filterData.content.length === 0) {
                setHasMoreWorkout(false);
            } else {
                // Update state with the content array from the response
                setProgramCard((prev) => [...prev, ...filterData.content]); // Use 'content' not 'programs'
                setHasMoreWorkout(!filterData.last);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setHasMoreWorkout(false);  // Ensure no further pages are requested
        } finally {
            setLoading(false);
        }
    };
    

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
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
            <div className="grid grid-cols-5 gap-4 h-[430px]">
                {programCard.slice(0, 5).map((program) => (
                    <Link href={`/program/${program.id}`} key={program.id}>
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
    );
};

export default WorkoutFilter;
