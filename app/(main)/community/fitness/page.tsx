import React from "react";
import PostUser from "@/app/(main)/community/user-post-no-image";
const FitnessPage = () => {
    const categoryId = 1;
    return (
        <div className="w-[823px] mt-3">
            <PostUser categoryId={categoryId} />
        </div>
    );
};

export default FitnessPage;
