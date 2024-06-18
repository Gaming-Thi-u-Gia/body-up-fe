"use client";

import { RecipesNoteType } from "@/utils/recipe/type";
import React from "react";

const CookingDirection = ({
  cookingInstruction,
  noteRecipes,
}: {
  cookingInstruction: string;
  noteRecipes: RecipesNoteType;
}) => {
  return (
    <div className="flex max-w-7xl text-[22px] m-auto my-20 items-center">
      <div className="w-[60%] pr-20 leading-10">
        <p className="text-[25px] font-bold">Cooking instructions</p>
        <p>{cookingInstruction}</p>
      </div>
      <div className="w-[40%] bg-[#EEF4FF] box-border px-[30px] py-5">
        <p className="text-[25px] text-[#868A93]">Node</p>
        <ul className="list-disc">
          {noteRecipes.map((note, index) => {
            return (
              <li key={index} className="py-2 px-4">
                {note.detail}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CookingDirection;
