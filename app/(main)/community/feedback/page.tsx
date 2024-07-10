import React from "react";
import PostUser from "@/app/(main)/community/user-post-no-image";
const FeedbackPage = () => {
   const categoryId = 4;
   return (
      <div className=" w-full mt-3">
         <PostUser categoryId={categoryId} />
      </div>
   );
};

export default FeedbackPage;
