import React from "react";
import PostUser from "@/app/(main)/community/user-post-no-image";
const AnnoucementPage = () => {
    const categoryId = 8;
    return (
        <div className="w-[823px] mt-3">
            <PostUser categoryId={categoryId} />
        </div>
    );
};

export default AnnoucementPage;