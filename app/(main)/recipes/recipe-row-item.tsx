// /* eslint-disable @next/next/no-img-element */
// import { Button } from "@/components/ui/button";
// import { Heart, Image, Star } from "lucide-react";
// import React from "react";

// type Recipe = {
//   img: string;
//   dietarys: string[];
//   avgStar: number;
//   title: string;
// };

// type Props = {
//   recipes: Recipe[];
// };
//   return (
//     <div>
//       <div className="grid grid-cols-4 gap-5 py-5">
//         {recipes.map((recipe, index) => (
//           <div
//             key={index}
//             className="relative bg-white border-solid border-[1px] border-[#E9E9EF] rounded-[15px] cursor-pointer h-[425px]"
//           >
//             <div className="relative h-full">
//               <img
//                 className="h-[87%] w-full rounded-[15px] object-cover"
//                 src={recipe.img}
//                 alt="Recipe image"
//               />
//               <div className="absolute bottom-[calc(13%+12px)] left-3 flex-wrap-reverse w-[32px]">
//                 {recipe.dietarys.map((dietary, index) => (
//                   <Button
//                     className="my-1"
//                     key={index}
//                     variant="secondary"
//                     size="icon"
//                   >
//                     {dietary}
//                   </Button>
//                 ))}
//               </div>
//               <div className="flex w-full justify-between items-center absolute top-3 px-5">
//                 <Star size={20} />
//                 <div className="flex">
//                   <Button variant="secondary" size="icon">
//                     <Heart width={20} />
//                   </Button>
//                 </div>
//               </div>
//               <p className="text-[18px]  font-medium leading-[150%] pl-3 h-[13%] text-[#303033] flex items-center ">
//                 {recipe.title}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RowRecipeItem;
