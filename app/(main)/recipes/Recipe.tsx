// "use client";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { category } from "@/constants";
// import { FaStar } from "react-icons/fa";
// import React, { useState } from "react";
// import { Link } from "lucide-react";

// const Recipe = (props) => {
//     const { listCategoryItems } = props;
//     return (
//         <div>
//             <div className="grid grid-cols-4 gap-5">
//                 {listCategoryItems.recipes.map((recipe, index) => (
//                     <div
//                         key={index}
//                         className="relative bg-white border-solid border-[1px] border-[#E9E9EF] rounded-[15px] cursor-pointer h-[450px]"
//                     >
//                         <div className="relative h-full">
//                             <img
//                                 className="h-[87%] rounded-[15px]"
//                                 src={recipe.img}
//                                 alt="Recipe image"
//                             />
//                             <div className="absolute bottom-[calc(13%+12px)] left-3 flex-wrap-reverse w-[32px]">
//                                 {recipe.dietary.map((dietary, index) => (
//                                     <Button
//                                         className="my-1"
//                                         key={index}
//                                         variant="secondary"
//                                         size="icon"
//                                     >
//                                         <a href="#">{initialName(dietary)}</a>
//                                     </Button>
//                                 ))}
//                             </div>
//                             <div className="flex w-full justify-between absolute top-3 px-5">
//                                 <div>
//                                     <Button variant="secondary" size="icon">
//                                         <a href="#">&#x2605;</a>
//                                     </Button>
//                                 </div>
//                                 <div className="flex">
//                                     <Button className="mr-4" variant="secondary" size="icon">
//                                         <Image
//                                             width={20}
//                                             height={20}
//                                             src="/add.svg"
//                                             alt="add"
//                                         />
//                                     </Button>
//                                     <Button variant="secondary" size="icon">
//                                         <Image
//                                             width={24}
//                                             height={25}
//                                             src="/heart.svg"
//                                             alt="heart"
//                                         />
//                                     </Button>
//                                 </div>
//                             </div>
//                             <p className="text-[18px]  font-medium leading-[150%] pl-3 h-[13%] text-[#303033] flex items-center ">
//                                 {recipe.title}
//                             </p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default Recipe
