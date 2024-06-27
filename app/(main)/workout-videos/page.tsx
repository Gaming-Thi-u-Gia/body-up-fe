"use client";

import React, { useState } from "react";
import HeaderNavWorkoutVideos from "./header-nav-workout-videos";
import BodyLatestWorkoutVideos from "./body-latest-workout-videos";
import CategoryWorkoutVideos from "./category-workout-videos";
import TableVideoCategory from "./filter-workout-video";

const WourkoutVideoPage = () => {
    const [showFilterModal, setShowFilterModal] = useState(false);
    const handleCategoryChange = (categoryName: string) => {
        console.log("Category Name:", categoryName);
    };
    const toggleFilterModal = () => setShowFilterModal(!showFilterModal);
    return (
        <>
            <div className="max-w-7xl mx-auto">
                <HeaderNavWorkoutVideos
                    onCategoryChange={handleCategoryChange}
                    onFilterClick={toggleFilterModal}
                />
            </div>
            {showFilterModal && (
                <TableVideoCategory onClose={() => setShowFilterModal(false)} />
            )}
            <div className="max-w-7xl mx-auto">
                <BodyLatestWorkoutVideos />
                <CategoryWorkoutVideos />
            </div>
        </>
    );
};

export default WourkoutVideoPage;
