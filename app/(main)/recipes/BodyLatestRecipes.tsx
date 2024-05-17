"use client";
import React from 'react'
import { Button } from '@/components/ui/button';
import { title } from 'process';
import Image from 'next/image'
import { category } from '@/constants';
import { FaStar } from "react-icons/fa";
const BodyLatestRecipes = () => {
  const listLastestRecipes = [
    {
        id_food: 1,
        title: 'Chocolate sweet potato pancakes',
        avgStar:4,
        details:'Who says sweet potato is only for Autumn? Boost your breakfast nutrition with these delicious sweet potato pancakes, topped with crunchy roasted pecans, banana and a healthier chocolate syrup. You’d think you’re having dessert for breakfast!',
        dietary: ['Vg','DF','LF'],
        img :"/recipe1.png"
    },
    {
        id_food: 2,
        title: 'Once pot rice Cooker Fried Rice',
        avgStar:4.2,
        details:'Who says sweet potato is only for Autumn? Boost your breakfast nutrition with these delicious sweet potato pancakes, topped with crunchy roasted pecans, banana and a healthier chocolate syrup. You’d think you’re having dessert for breakfast!',
        dietary: ['LF'],
        img :"/recipe2.png"
    }
  ];
  return (
    <div  className=' max-w-7xl h-full mx-auto'>
      {/* Latest Title */}
      <div className='flex justify-between py-[40px]'>
        <div>
            <text className='text-[#303033] text-[22px] font-semibold leading-[30px]'>Latest Recipes</text>
        </div>
        <div>
            <Button variant="primaryOutline" size="default">View All</Button>
        </div>
      </div>
      <div className='flex gap-10'>
      {/* Recipe1 */}
        <div className='flex relative gap-10 w-[925px] h-[450px] px-4 pt-[24px] pb-[24px] justify-self-start bg-white border-solid border-[1px] border-[#E9E9EF] rounded-[15px]'>
          <div className='relative'>
            <Image className='h-[90%]  cursor-pointer' width={660}  height={1} src="/recipe1.png" alt="Recipe image" />
            <div className='absolute bottom-[10%] left-3 flex-wrap-reverse w-[32px]'>
              {listLastestRecipes[0].dietary.map((dietary,index) =>(
                <Button className='my-1' key={index} variant="secondary" size="icon" ><a  href="#">{dietary}</a></Button>
              ))}
          </div>
          </div>
          <div className='flex-1 ml-10px relative'>
            <p className='text-[18px] font-medium leading-[150%] tracking-wide max-w-[155px] h-[15%] text-[#303033] cursor-pointer'><a href="#">{listLastestRecipes[0].title}</a></p>
            <div className='h-[10%]'>
              {/* Star */}
            </div>
            <p className='text-[14px] font-normal leading-[140%] h-[50%]'>{listLastestRecipes[0].details}</p>
            <div className='absolute bottom-0 flex h-[12.5%]  w-full justify-between items-center'>
              <Button className='cursor-pointer' variant="primaryOutline" size="default"><a href="#">View Recipe</a></Button>
              <Image className='cursor-pointer' width={20} height={20} src="/add.svg" alt="add"/>
              <Image  className='text-[#000000] cursor-pointer' width={24} height={25} src="/heart.svg" alt="hert"/>
            </div>
          </div>
        </div>
        {/* Recipe2 */}
        <div className='flex-1 justify-self-end relative bg-white border-solid border-[1px] border-[#E9E9EF] rounded-[15px] cursor-pointer'>
          <img style={{height:"90%"}} src="/recipe1.png" alt="Recipe image" />
          <p className=' text-[18px] font-medium leading-[150%] tracking-wide h-[10%] text-[#303033] flex items-center '>{listLastestRecipes[0].title}</p>
          <div className='flex w-full justify-between absolute top-3 px-5'>
            <div>
              {/* {
                [...Array(5)].map((star,index) =>{
                  const currentRating = index + 1;
                  return (
                    <label key={star}>
                      <input type="radio" name="rating" value={currentRating} onClick={()=>setRating(currentRating)} />
                      <FaStar size={50} color={currentRating <= (hover||rating) ? "#ffc107" : "e4e5e9"}/>
                    </label>
                  );
                })
              } */}
            </div>
            <div className='flex'>
              <Button className='mr-4' variant="secondary" size="icon"><Image width={20} height={20} src="/add.svg" alt="add"/></Button>
              <Button variant="secondary" size="icon"><Image width={24} height={25} src="/heart.svg" alt="heart"/></Button>
            </div>
            </div>
            <div className='absolute bottom-[10%] left-3 flex-wrap-reverse w-[32px]'>
              {listLastestRecipes[0].dietary.map((dietary,index) =>(
                <Button className='my-1' key={index} variant="secondary" size="icon" ><a  href="#">{dietary}</a></Button>
              ))}
            </div>
        </div>
      </div>
      <div className='flex justify-center items-center w-full h-11 rounded-xl border border-[#EFF0F4] bg-white cursor-pointer my-5'>
        <p className='text-[#868A93] text-center text-base lead'>Load More Latest Recipes</p>
      </div>
    </div>
  )
}
export default BodyLatestRecipes
