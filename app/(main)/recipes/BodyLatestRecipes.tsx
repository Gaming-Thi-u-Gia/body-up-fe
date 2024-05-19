/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { title } from 'process';
import Image from 'next/image'
import { category } from '@/constants';
import { FaStar } from "react-icons/fa";
const BodyLatestRecipes = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const listLastestRecipes = [
    {
      id_food: 1,
      title: 'One Pot Rice Cooker Fried Rice',
      avgStar: 4,
      details: 'Who says sweet potato is only for Autumn? Boost your breakfast nutrition with these delicious sweet potato pancakes, topped with crunchy roasted pecans, banana and a healthier chocolate syrup. You’d think you’re having dessert for breakfast!',
      dietary: ['Vg', 'DF', 'LF'],
      img: "/recipe1.png"
    },
    {
      id_food: 2,
      title: 'Once pot rice Cooker Fried Rice',
      avgStar: 4.2,
      details: 'Who says sweet potato is only for Autumn? Boost your breakfast nutrition with these delicious sweet potato pancakes, topped with crunchy roasted pecans, banana and a healthier chocolate syrup. You’d think you’re having dessert for breakfast!',
      dietary: ['LF'],
      img: "https://chloeting.com/_next/image?url=https%3A%2F%2Fstatic.chloeting.com%2Frecipes%2F6200d5a52e702a81e5803c59%2Fimages%2Fbaked-avocado-eggs-1675831846729-cover.jpeg&w=1920&q=90"
    }
  ];
  return (
    <div className=' max-w-7xl h-full mx-auto mt-10'>
      <div className='flex justify-between mb-10'>
        <text className='text-[#303033] text-[22px] font-semibold leading-[30px]'>Latest Recipes</text>
        <Button variant="primaryOutline" size="default">View All</Button>
      </div>
      <div className='flex gap-5 '>
        {/* Recipe1 */}
        <div className='flex relative gap-5 w-[75%] h-[450px] bg-white border-solid border-[1px] border-[#E9E9EF] rounded-[15px] box-border py-5 px-4'>
          <div className='relative'>
            <Image className='h-[90%]  cursor-pointer' width={660} height={1} src="/recipe1.png" alt="Recipe image" />
            <div className='absolute bottom-[calc(10%+12px)] left-3 flex-wrap-reverse w-[32px]'>
              {listLastestRecipes[0].dietary.map((dietary, index) => (
                <Button className='my-1' key={index} variant="secondary" size="icon" ><a href="#">{dietary}</a></Button>
              ))}
            </div>
          </div>
          <div className='flex-1 ml-10px relative h-[90%]'>
            <p className='text-[18px] font-medium leading-[150%] tracking-wide h-[15%] text-[#303033] cursor-pointer'><a href="#">{listLastestRecipes[0].title}</a></p>
            <div className='h-[10%]'>
              <div className='group inline-flex cursor-pointer text-[#D5D5D5]' >
                <span className={`group-hover:opacity-100 group-hover:w-auto w-0 transition-all opacity-0 flex `} >
                  {
                    [...Array(5)].map((star, index) => {
                      const currentRating = index + 1;
                      return (
                        <span key={currentRating} className='star-label'>
                          <span
                            className={`text-[22px] px-1 ${currentRating <= (hover || rating) ? 'text-[#ffc107]' : ''}`}
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
                <span className='group-hover:opacity-0 group-hover:w-0  px-2 text-[22px]'>
                  &#9733;
                </span>
              </div>
            </div>
            <p className='text-[14px] font-normal leading-[140%] h-[65%]'>{listLastestRecipes[0].details}</p>
            <div className='absolute bottom-0 flex h-[10%]  w-full justify-between items-center'>
              <Button className='cursor-pointer' variant="primaryOutline" size="default"><a href="#">View Recipe</a></Button>
              <Image className='cursor-pointer' width={20} height={20} src="/add.svg" alt="add" />
              <Image className='text-[#000000] cursor-pointer' width={24} height={25} src="/heart.svg" alt="hert" />
            </div>
          </div>
        </div>
        {/* Recipe2 */}
        <div className='flex-1 h-[450px] relative bg-white border-solid border-[1px] border-[#E9E9EF] rounded-[15px] cursor-pointer box-border'>
          <div className='relative'>
            <img className='h-[calc(450px*0.9-24px)]' src="/recipe1.png" alt="Recipe image" />
            <div className='absolute bottom-3 left-3 flex-wrap-reverse w-[32px]'>
              {listLastestRecipes[0].dietary.map((dietary, index) => (
                <Button className='my-1' key={index} variant="secondary" size="icon" ><a href="#">{dietary}</a></Button>
              ))}
            </div>
            <div className='flex w-full justify-between absolute top-3 px-5'>
              <div className='group inline-flex cursor-pointer text-[#D5D5D5]' >
                <span className={`group-hover:opacity-100 group-hover:w-auto w-0 transition-all opacity-0 flex bg-[#EEF1F2] rounded-[15px] `} >
                  {
                    [...Array(5)].map((star, index) => {
                      const currentRating = index + 1;
                      return (
                        <span key={currentRating} className='star-label'>
                          <span
                            className={`text-[22px] px-1 ${currentRating <= (hover || rating) ? 'text-[#ffc107]' : ''}`}
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
                <span className='group-hover:opacity-0 group-hover:w-0 bg-[#EEF1F2] rounded-[15px] px-2 text-[22px]'>
                  &#9733;
                </span>
              </div>
              <div className='flex'>
                <Button className='mr-4' variant="secondary" size="icon"><Image width={20} height={20} src="/add.svg" alt="add" /></Button>
                <Button variant="secondary" size="icon"><Image width={24} height={25} src="/heart.svg" alt="heart" /></Button>
              </div>
            </div>
          </div>
          <p className='flex h-[calc(450px*0.1+24px)] items-center pl-3 text-[18px] font-medium text-[#303033]'>{listLastestRecipes[0].title}</p>

        </div>
      </div>
      <div className='flex justify-center items-center w-full h-11 rounded-xl border border-[#EFF0F4] bg-white cursor-pointer my-5'>
        <p className='text-[#868A93] text-center text-base lead'>Load More Latest Recipes</p>
      </div>
    </div>
  )
}
export default BodyLatestRecipes
