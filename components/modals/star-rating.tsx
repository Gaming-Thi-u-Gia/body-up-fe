import React from "react";

const StarRating = ({ rating, setRating }: { rating: any; setRating: any }) => {
   return (
      <div className="flex justify-center my-4">
         {[1, 2, 3, 4, 5].map((star) => (
            <svg
               key={star}
               onClick={() => setRating(star)}
               className={`w-8 h-8 cursor-pointer ${rating >= star ? "text-yellow-500" : "text-gray-300"}`}
               fill="currentColor"
               viewBox="0 0 20 20"
            >
               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.907c.969 0 1.371 1.24.588 1.81l-3.977 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.977-2.89a1 1 0 00-1.175 0l-3.977 2.89c-.784.57-1.839-.197-1.54-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.085 10.1c-.783-.57-.38-1.81.588-1.81h4.907a1 1 0 00.95-.69l1.518-4.674z" />
            </svg>
         ))}
      </div>
   );
};

export default StarRating;
