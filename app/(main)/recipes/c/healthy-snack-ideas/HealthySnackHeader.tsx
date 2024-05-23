"use client";
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { title } from 'process';
import Image from 'next/image'
import { category } from '@/constants';
import HeaderNavRecipes from '../../HeaderNavRecipes';
const HealthySnackHeader = () => {
    const list =
    {
        id: 1,
        title: "Featured Recipes",
        detail:
            "Here is a list of the most popular recipes that people are loving! Try out some of these recipes to find out why everyone is raving about them.",
        categoryURL: "#",
        recipes: [
            {
                id: 1,
                title: "Baked Avocado Eggs",
                star: 4,
                dietary: ["V g", "D F", "L F"],
                img: "https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg",
            },
            {
                id: 2,
                title: "Baked Avocado Eggs",
                star: 4,
                dietary: ["V g", "D F", "L F"],
                img: "https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg",
            },
            {
                id: 3,
                title: "Baked Avocado Eggs",
                star: 4,
                dietary: ["V g", "D F", "L F"],
                img: "https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg",
            },
            {
                id: 4,
                title: "Baked Avocado Eggs",
                star: 4,
                dietary: ["V g", "D F", "L F"],
                img: "https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg",
            },
            {
                id: 1,
                title: "Baked Avocado Eggs",
                star: 4,
                dietary: ["Vg", "DF", "LF"],
                img: "https://chloeting.com/_next/image?url=https%3A%2F%2Fstatic.chloeting.com%2Frecipes%2F6458633750181861834e8f59%2Fimages%2Fone-pot-rice-cooker-fried-rice-1683514169461-cover.jpeg&w=1920&q=90",
            },
            {
                id: 3,
                title: "Baked Avocado Eggs",
                star: 4,
                dietary: ["Vg", "DF", "LF"],
                img: "https://chloeting.com/_next/image?url=https%3A%2F%2Fstatic.chloeting.com%2Frecipes%2F6458633750181861834e8f59%2Fimages%2Fone-pot-rice-cooker-fried-rice-1683514169461-cover.jpeg&w=1920&q=90",
            },
            {
                id: 4,
                title: "Baked Avocado Eggs",
                star: 4,
                dietary: ["Vg", "DF", "LF"],
                img: "https://chloeting.com/_next/image?url=https%3A%2F%2Fstatic.chloeting.com%2Frecipes%2F6458633750181861834e8f59%2Fimages%2Fone-pot-rice-cooker-fried-rice-1683514169461-cover.jpeg&w=1920&q=90",
            },
        ],
    };

    return (
        <div>
            <HeaderNavRecipes />
            <div className='h-full mx-auto mt-10'>
                <div className='flex justify-between mb-10'>
                    <div>
                        <text className='text-[#303033] text-[22px] font-semibold leading-[36px]'>{list.title}</text>
                        <p className="text-[14px] font-normal leading-[140%] h-[50%]">
                            {list.detail}
                        </p>
                    </div>
                    <text className='flex text-[#303033] items-center cursor-pointer'>Sort By<Image src="/moredown.svg" width={10.72} height={10}></Image></text>
                </div>
            </div>
            <div>

            </div>

        </div>
    )
}

export default HealthySnackHeader
