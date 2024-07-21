import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@radix-ui/react-accordion";
import UserInfo from "../../community/user-info";

interface CommentCourseProps {
   averageStar: number;
   //@ts-ignore
   feedbackWorkouts: FeedBackWorkouts[];
}

const CommentCourse: React.FC<CommentCourseProps> = ({
   averageStar,
   feedbackWorkouts,
}) => {
   console.log("feedback", feedbackWorkouts);
   return (
      <div className="w-full py-[30px] px-[18px] bg-white border-[#c4c4c4] border-[1px] rounded-lg items-start my-4">
         <Accordion type="single" collapsible>
            <AccordionItem value="comment" className="border-none">
               <AccordionTrigger className="flex justify-between w-full text-center items-center">
                  <h4 className="text-[22px] font-semibold">Comments</h4>
                  <p className="text-[14px] text-[#868A93]">
                     {averageStar} Average Star |{" "}
                     {feedbackWorkouts?.length || 0} Comments
                  </p>
               </AccordionTrigger>
               <AccordionContent>
                  {feedbackWorkouts?.length ? (
                     feedbackWorkouts.map((feedback) => (
                        <div
                           key={feedback.id}
                           className="flex items-start bg-gray-100 py-2 px-2 my-4 rounded-lg"
                        >
                           <div className="rounded-full mr-2">
                              {feedback && <UserInfo user={feedback.user} />}
                           </div>
                           <div className="flex-1">
                              <div className="flex justify-between">
                                 <h3 className="text-lg font-semibold">
                                    {feedback.user.firstName || "Anonymous"}
                                 </h3>
                                 <span className="cursor-pointer flex">
                                    {[...Array(5)].map((_, index) => (
                                       <span key={index} className="star-label">
                                          <Star
                                             fill={
                                                index <
                                                feedback.ratingWorkout.star
                                                   ? "#FEE58E"
                                                   : "null"
                                             }
                                             strokeWidth={
                                                index <
                                                feedback.ratingWorkout.star
                                                   ? 0
                                                   : 1
                                             }
                                             width={34}
                                          />
                                       </span>
                                    ))}
                                 </span>
                              </div>
                              <p className="text-gray-700">
                                 {feedback.feedback}
                              </p>
                           </div>
                        </div>
                     ))
                  ) : (
                     <p className="text-gray-700">No comments available.</p>
                  )}
               </AccordionContent>
            </AccordionItem>
         </Accordion>
      </div>
   );
};

export default CommentCourse;
