"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from 'react'
const Info = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const title = 'Baked.. avocado? Promise me you won’t knock it till you try it! A fantastic indulgent brunch dish, these baked eggs in avocado are quick, delicious and nutritious. Dress them up with your favorite toppings, and serve with toasted sourdough bread to mop up all the glorious runny yolk and creamy avocado.';
    const star = {
        numberOfRate: 200,
        avgStar: 4.5,
    }
    const categorys = ["Vegetarian", "Daily free", "Gluten free",];
    const ingidients = {
        main: [
            {
                mount: "120g",
                unit: "Greek style soy yogurt",
            },
            {
                mount: "1/4 tsp",
                unit: "instant coffee powder",
            },
            {
                mount: "1/2 tsp",
                unit: "cocoa powder",
            },
            {
                mount: "5 drops",
                unit: "stevia extract",
            },
            {
                mount: "1/4 tsp",
                unit: "vanilla extract",
            },

        ],
        optional: [
            {
                mount: "30g",
                unit: "raspberries",
            },
            {
                mount: "30g",
                unit: "strawberries, chopped",
            },
            {
                mount: "1",
                unit: "small banana, sliced",
            },
            {
                mount: "10g ",
                unit: "sugar-free dark chocolate chips",
            },
            {
                mount: "1 tbsp",
                unit: "hemp seeds",
            },
            {
                mount: "1/4 tsp",
                unit: "cocoa powder",
            },
        ]
    }
    return (
        <div className="border-b-2 border-[#C4C4C4 ">
            <div className='flex m-auto  max-w-7xl h-[auto]  box-border'>
                <div className='grid grid-cols-2 w-full h-full '>
                    <div className='w-full h-full border-r-2 border-[#C4C4C4]'>
                        <div className="mt-[10%]">
                            {
                                categorys.map((category, index) => (
                                    <a key={index} href="#" className='inline-flex bg-black text-white rounded-[54px] px-3 py-1 text-[12px] mr-[10px]'>{category}</a>
                                ))
                            }
                        </div>
                        <p className='text-[32px] leading-[45px] #303033 my-10'>{title}</p>
                        <div>
                            <div className='flex text-[#868A93] text-[13px] items-stretch'>
                                <div>
                                    <span className='cursor-pointer'>
                                        {
                                            [...Array(5)].map((star, index) => {
                                                const currentRating = index + 1;
                                                return (
                                                    <span key={currentRating} className='star-label'>
                                                        <span
                                                            className={`text-[34px] ${currentRating <= (hover || rating) ? 'text-[#FEE58E]' : ''}`}
                                                            onMouseEnter={() => setHover(currentRating)}
                                                            onMouseLeave={() => setHover(0)}
                                                            onClick={() => setRating(currentRating)}
                                                        >
                                                            &#9733;
                                                        </span>
                                                    </span>
                                                );
                                            })
                                        }
                                    </span>
                                    <div className='pl-5'>
                                        <p>Avg {star.avgStar} starts({star.numberOfRate})</p>
                                    </div>
                                </div>
                                <span>
                                    <p>Rate this recipe</p>
                                </span>
                            </div>
                        </div>
                        <div className='flex my-10'>
                            <Button className="mr-4" variant="secondary" size="icon">
                                <Image
                                    width={20}
                                    height={20}
                                    src="../add.svg"
                                    alt="add"
                                />
                            </Button>
                            <Button variant="secondary" size="icon">
                                <Image
                                    width={24}
                                    height={25}
                                    src="../heart.svg"
                                    alt="heart"
                                />
                            </Button>
                        </div>
                        <img className="w-[90%] h-[700px] object-cover mb-[10%]" src="https://static.chloeting.com/recipes/64215da10b0e98db5eafe951/images/vegan-mocha-yogurt-bowl-1679908260906-1.webp" alt="avocado" />
                    </div>
                    <div className='w-full h-full'>
                        <div className="pl-[15%] pt-[10%]">
                            <div>
                                <p className="text-[26px] font-medium mb-5">Ingridients</p>
                                <div className="text-[14px]">
                                    {
                                        ingidients.main.map((ing, index) => (
                                            <div key={index} className='flex py-1'  >
                                                <p className="min-w-20">{ing.mount}</p>
                                                <p className="flex-1">{ing.unit}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="pt-10">
                                <p className="text-[18px] font-bold">Toppings (optional)</p>
                                <div className="text-[18px]">
                                    {
                                        ingidients.optional.map((ing, index) => (
                                            <div key={index} className='flex py-1'>
                                                <p className="min-w-20">{ing.mount}</p>
                                                <p className="flex-1">{ing.unit}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Info
