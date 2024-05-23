/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { title } from 'process';
import Image from 'next/image'
import { category } from '@/constants';
import CategoryItemHeader from './CategoryItemHeader';
import Star from './Star';
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
    <div className=' h-full mx-auto mt-10'>
      <CategoryItemHeader title='Latest Recipes' detail={''} />
      <div className='flex gap-5 '>
        {/* Recipe1 */}
        <div className='flex relative gap-5 w-[75%] h-[450px] bg-white border-solid border-[1px] border-[#E9E9EF] rounded-[15px] box-border py-5 px-4'>
          <div className='relative'>
            <img className='h-[90%]  cursor-pointer object-cover' src="/recipe1.png" alt="Recipe image" />
            <div className='absolute bottom-[calc(10%+12px)] left-3 flex-wrap-reverse w-[32px]'>
              {listLastestRecipes[0].dietary.map((dietary, index) => (
                <Button className='my-1' key={index} variant="secondary" size="icon" ><a href="#">{dietary}</a></Button>
              ))}
            </div>
          </div>
          <div className='flex-1 ml-10px relative h-[90%]'>
            <p className='text-[18px] font-medium leading-[150%] tracking-wide h-[15%] text-[#303033] cursor-pointer'><a href="#">{listLastestRecipes[0].title}</a></p>
            <div className='h-[10%] '>
              <Star avgStar={listLastestRecipes[0].avgStar} />
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
            <img className='h-[calc(450px*0.9-24px)] object-cover' src="/recipe1.png" alt="Recipe image" />
            <div className='absolute bottom-3 left-3 flex-wrap-reverse w-[32px]'>
              {listLastestRecipes[1].dietary.map((dietary, index) => (
                <Button className='my-1' key={index} variant="secondary" size="icon" ><a href="#">{dietary}</a></Button>
              ))}
            </div>
            <div className='flex w-full justify-between absolute top-3 px-5'>
              <Star avgStar={listLastestRecipes[1].avgStar} />
              <div className='flex'>
                <Button className='mr-4' variant="secondary" size="icon"><Image width={20} height={20} src="/add.svg" alt="add" /></Button>
                <Button variant="secondary" size="icon"><Image width={24} height={25} src="/heart.svg" alt="heart" /></Button>
              </div>
            </div>
          </div>
          <p className='flex h-[calc(450px*0.1+24px)] items-center pl-3 text-[18px] font-medium text-[#303033]'>{listLastestRecipes[0].title}</p>
        </div>
      </div>
    </div>
  )
}
export default BodyLatestRecipes
