"use client";
import { Button } from "@/components/ui/button";
import { fetchGetTableFilter } from "@/utils/recipe/fetch";
import { RecipesCategoriesType } from "@/utils/recipe/type";
import { Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type TableFilterType = {
  length: number;
  type: string;
  recipeCategories: RecipesCategoriesType[];
};

const FilterRecipe = () => {
  const [tableFilter, setTableFilter] = useState<TableFilterType[]>([]);
  const [listFilter, setListFilter] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const getTableFilter = async () => {
      try {
        const response = await fetchGetTableFilter();
        setTableFilter(response);
        console.log(response);
      } catch (error) {
        toast.error("Table filter not exists", {
          description: `${new Date().toLocaleString()}`,
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
      }
    };

    getTableFilter();
  }, []);

  const handleFilterChange = (type: string, id: number) => {
    setListFilter((prevListFilter) => {
      const newListFilter = { ...prevListFilter };
      if (newListFilter[type] === id) {
        delete newListFilter[type];
      } else {
        newListFilter[type] = id;
      }
      return newListFilter;
    });
  };

  return (
    <div className="w-full bg-white">
      <div className="flex flex-col m-auto max-w-7xl">
        <div className={`grid gap-4 w-full grid-cols-${tableFilter.length} `}>
          {tableFilter.map((table, index) => (
            <div
              key={index}
              className={`flex flex-col ${index + 1 !== tableFilter.length ? "border-r-2" : ""}`}
            >
              <div className="flex items-center py-2">
                <h1 className="text-3 uppercase text-[#868A93] font-bold">
                  {table.type}
                </h1>
              </div>
              <div className="flex flex-col ">
                {table.recipeCategories.map((recipeCategory) => (
                  <div
                    key={recipeCategory.id}
                    className="flex items-center px-2 py-1"
                  >
                    <input
                      type="checkbox"
                      id={`checkbox-${recipeCategory.id}`}
                      name={`${table.type}`}
                      className="hidden"
                      checked={listFilter[table.type] === recipeCategory.id}
                      onChange={() =>
                        handleFilterChange(table.type, recipeCategory.id)
                      }
                    />
                    <label
                      htmlFor={`checkbox-${recipeCategory.id}`}
                      className="flex items-center cursor-pointer w-full"
                    >
                      <span className="flex text-4 font-normal leading-6">
                        {recipeCategory.name}
                      </span>
                      {listFilter[table.type] === recipeCategory.id && (
                        <Check color="#7065cd" />
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div
            className={`${Object.keys(listFilter).length > 0 ? " text-red-300 cursor-pointer rounded-3xl" : ""}`}
            onClick={() => setListFilter({})}
          >
            <span>Clear Filter</span>
          </div>
          <div className="flex justify-center items-center">
            <div className="pr-2">Cancel</div>
            <Button variant="active">Apply</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterRecipe;
