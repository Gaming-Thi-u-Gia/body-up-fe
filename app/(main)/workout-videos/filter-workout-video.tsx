import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { fetchAllFilterCategory } from "@/utils/video/category";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type VideoCategoryType = {
    id: number;
    type: string;
    name: string;
};

type CategoryType = {
    type: string;
    videoCategories: VideoCategoryType[];
};

type GroupedCategories = {
    [key: string]: VideoCategoryType[];
};

interface HeaderNavWorkoutVideosProps {
    onClose: () => void;
}

const TableVideoCategory: React.FC<HeaderNavWorkoutVideosProps> = ({onClose}) => {
    const [selectedIdPerGroup, setSelectedIdPerGroup] = useState<{ [groupName: string]: number }>({});
    const [groupedCategories, setGroupedCategories] = useState<GroupedCategories>({});
    const router = useRouter();

    useEffect(() => {
        const getTableFilter = async () => {
            try {
                const data: CategoryType[] = await fetchAllFilterCategory();
                const groupedData = groupCategoriesByName(data);
                setGroupedCategories(groupedData);
            } catch (error) {
                toast.error("Failed to fetch categories. Please try again.");
            }
        };

        getTableFilter();
    }, []);

    const groupCategoriesByName = (categories: CategoryType[]): GroupedCategories => {
        let grouped = categories.reduce<GroupedCategories>((acc, category) => {
            category.videoCategories.forEach((videoCategory) => {
                const groupName = videoCategory.name;
                if (!acc[groupName]) {
                    acc[groupName] = [];
                }
                acc[groupName].push(videoCategory);
            });
            return acc;
        }, {});

        const sortedGroupNames = Object.keys(grouped).sort();
        const sortedGroups: GroupedCategories = {};
        sortedGroupNames.forEach(name => {
            sortedGroups[name] = grouped[name];
        });

        return sortedGroups;
    };

    const handleFilter = () => {
        if (!selectedIdPerGroup) {
            toast.error("Please select at least one filter");
        } else {
            const categoryIds = Object.keys(selectedIdPerGroup).map(key => `categoryId${selectedIdPerGroup[key]}`).join("");
            router.push(`/workout-videos/filter/${categoryIds}`);
        }
    };

    const handleCheckboxChange = (groupName: string, id: number) => {
        setSelectedIdPerGroup(prev => ({
            ...prev,
            [groupName]: prev[groupName] === id ? undefined : id
        }));
    };

    const clearFilters = () => {
        setSelectedIdPerGroup({});
    };

    return (
        <div className="w-full bg-[#ffffff]">
            <div className="flex flex-col m-auto max-w-7xl">
                <div className="grid gap-4 w-full grid-cols-6">
                    {Object.entries(groupedCategories).map(([name, categories]) => (
                        <div key={name} className="flex flex-col border-r border-gray-300 last:border-r-0 px-4 my-6">
                            <div className="flex items-center py-2">
                                <h1 className="text-xs uppercase text-[#868A93] font-bold">{name}</h1>
                            </div>
                            {categories.map((category) => (
                                <div key={category.id} className="flex items-center py-1">
                                    <input
                                        type="checkbox"
                                        id={`checkbox-${category.id}`}
                                        className="hidden"
                                        checked={selectedIdPerGroup[name] === category.id}
                                        onChange={() => handleCheckboxChange(name, category.id)}
                                    />
                                    <label htmlFor={`checkbox-${category.id}`} className="flex items-center cursor-pointer w-full justify-between">
                                        <span>{category.type}</span>
                                        {selectedIdPerGroup[name] === category.id && <Check color="#7065cd" width={18} height={18} />}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="flex justify-between w-full items-center px-4 py-6">
                    <span className="text-red-700 cursor-pointer" onClick={clearFilters}>
                        Clear Filter
                    </span>
                    <div>
                        <span className="pr-2 cursor-pointer" onClick={onClose}>Cancel</span>
                        <Button variant="active" onClick={(handleFilter)}>
                            Apply
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableVideoCategory;
