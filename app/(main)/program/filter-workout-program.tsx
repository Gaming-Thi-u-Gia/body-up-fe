'use client'

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { fetchAllFilterCategoryWorkoutProgram } from "@/utils/video/category";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type WorkoutCategoryType = {
    id: number;
    name: string;
    type: string;
};

type TableFilterCategoryType = {
    length: number;
    type: string;
    workoutCategories: WorkoutCategoryType[];
};

interface HeaderNavWorkoutProgramsProps {
    onFilterClick: () => void;
    onClose: () => void;
}

const TableProgramCategory: React.FC<HeaderNavWorkoutProgramsProps> = ({onClose}) => {
    const router = useRouter();
    const [tableFilter, setTableFilter] = useState<TableFilterCategoryType[]>([]);
    const [listFilter, setListFilter] = useState<Record<string, number | null>>({});
    const [selectedIdPerGroup, setSelectedIdPerGroup] = useState<{ [groupName: string]: number }>({});

    useEffect(() => {
        const getTableFilter = async () => {
            try {
                const response = await fetchAllFilterCategoryWorkoutProgram();
                const sortedResponse = response.sort((a: TableFilterCategoryType, b: TableFilterCategoryType) => a.type.localeCompare(b.type))
                    .map((table: TableFilterCategoryType) => ({
                        ...table,
                        workoutCategories: table.workoutCategories.sort((a: WorkoutCategoryType, b: WorkoutCategoryType) => a.name.localeCompare(b.name))
                    }));
                setTableFilter(sortedResponse);
            } catch (error) {
                toast.error("Failed to fetch categories. Please try again.");
            }
        };
        getTableFilter();
    }, []);

    const handleFilterChange = (type: string, id: number) => {
        setListFilter(prev => ({
            ...prev,
            [type]: prev[type] === id ? null : id
        }));
    };

    const handleFilter = () => {
        const queryParams = Object.entries(listFilter)
            .filter(([, value]) => value !== null)
            .map(([key, value]) => `categoryId${value}`)
            .join("");

        if (!queryParams) {
            toast.error("Please select at least one filter");
            return;
        }
        router.push(`/program/filterCategory/${queryParams}`);
        onClose();
    };

    const clearFilters = () => {
        setListFilter({});
    };

    return (
        <div className="w-full bg-white">
            <div className="flex flex-col max-w-7xl mx-auto">
                <div className="grid grid-cols-5 gap-4">
                    {tableFilter.map((table) => (
                        <div key={table.type} className="flex flex-col border-r last:border-r-0 px-4 my-6">
                            <div className="flex items-center py-2">
                                <h1 className="text-xs uppercase font-bold text-gray-600">{table.type}</h1>
                            </div>
                            {table.workoutCategories.map((category) => (
                                <div key={category.id} className="flex items-center py-1">
                                    <input
                                        type="checkbox"
                                        id={`checkbox-${category.id}`}
                                        className="hidden"
                                        checked={listFilter[table.type] === category.id}
                                        onChange={() => handleFilterChange(table.type, category.id)}
                                    />
                                    <label htmlFor={`checkbox-${category.id}`} className="flex items-center cursor-pointer w-full justify-between">
                                        <span>{category.name}</span>
                                        {listFilter[table.type] === category.id && <Check color="#7065cd" width={18} height={18} />}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center px-4 py-6">
                    <button className="text-red-700 cursor-pointer" onClick={clearFilters}>
                        Clear Filters
                    </button>
                    <div>
                        <span className="pr-2 cursor-pointer" onClick={onClose}>Cancel</span>
                        <Button variant="active" onClick={handleFilter}> 
                            Apply
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableProgramCategory;
