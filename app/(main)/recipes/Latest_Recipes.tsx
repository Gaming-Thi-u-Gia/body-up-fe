"use client";
import { Button } from '@/components/ui/button';
import { title } from 'process';
import Image from 'next/image'
import { category } from '@/constants';
import { FaStar } from "react-icons/fa";
import React,{ useState} from 'react';
 

    

const Latest_Recipes = () => {
    const [rating, setRating] =useState(0);
    const [hover, setHover] =useState(0);
    
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
  const popularCategories = [
    {
      title : "Hight protein",
      imgURL: "https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1597821998048-538UNQI253SYL3KE9NGD/chup-anh-mon-an-breakfast-10.jpg",
      amount: 10
    },
    {
      title : "Hight protein",
      imgURL: "https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1597821998048-538UNQI253SYL3KE9NGD/chup-anh-mon-an-breakfast-10.jpg",
      amount: 10
    },
    {
      title : "Hight protein",
      imgURL: "https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1597821998048-538UNQI253SYL3KE9NGD/chup-anh-mon-an-breakfast-10.jpg",
      amount: 10
    },
    {
      title : "Hight protein",
      imgURL: "https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1597821998048-538UNQI253SYL3KE9NGD/chup-anh-mon-an-breakfast-10.jpg",
      amount: 10
    },
  ];
  const listCategoryItems= [
    {
      id: 1,
      title: "Featured Recipes",
      detail: "Here is a list of the most popular recipes that people are loving! Try out some of these recipes to find out why everyone is raving about them.",
      categoryURL:"#",
      recipes:[
          {
          id: 1,
          title: "Baked Avocado Eggs",
          star: 4,
          dietary: ['Vg','DF','LF'],
          img: "https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg"
        },
        {
          id: 2,
          title: "Baked Avocado Eggs",
          star: 4,
          dietary: ['Vg','DF','LF'],
          img: "https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg"
        },
        {
          id: 3,
          title: "Baked Avocado Eggs",
          star: 4,
          dietary: ['Vg','DF','LF'],
          img: "https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg"
        },
        {
          id: 4,
          title: "Baked Avocado Eggs",
          star: 4,
          dietary: ['Vg','DF','LF'],
          img: "https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg"
        },
      ]
    },
    {
      id: 2,
      title: "Featured Recipes",
      detail: "Here is a list of the most popular recipes that people are loving! Try out some of these recipes to find out why everyone is raving about them.",
      categoryURL:"#",
      recipes:[
          {
          id: 1,
          title: "Baked Avocado Eggs",
          star: 4,
          dietary: ['Vg','DF','LF'],
          img: "https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg"
        },
        {
          id: 3,
          title: "Baked Avocado Eggs",
          star: 4,
          dietary: ['Vg','DF','LF'],
          img: "https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg"
        },
        {
          id: 4,
          title: "Baked Avocado Eggs",
          star: 4,
          dietary: ['Vg','DF','LF'],
          img: "https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg"
        },
      ]
    },
  ];
  return (
    // HeaderRecipe
    <div className=' max-w-7xl h-full mx-auto'>
      <div className='flex justify-between py-[40px]'>
        <div>
            <text className='text-[#303033] text-[22px] font-semibold leading-[30px]'>Latest Recipes</text>
        </div>
        <div>
            <Button variant="primaryOutline" size="default">View All</Button>
        </div>
      </div>
      {/* Display Recipe */}
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
              {
                [...Array(5)].map((star,index) =>{
                  const currentRating = index + 1;
                  return (
                    <label key={star}>
                      <input type="radio" name="rating" value={currentRating} onClick={()=>setRating(currentRating)} />
                      <FaStar size={50} color={currentRating <= (hover||rating) ? "#ffc107" : "e4e5e9"}/>
                    </label>
                  );
                })
              }
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
      <div>
        <div>
            <text className='text-[#303033] text-[22px] font-semibold leading-[30px]'>Popular Categories</text>
        </div>
        <div className='grid grid-cols-4 gap-10 h-[90px] my-5'>
          {
            popularCategories.map((category,index)=>(
              <div key={index}className='flex items-center bg-white rounded-[15px] rounded-xl border border-[#EFF0F4] bg-white cursor-pointer '>
                <img className='h-[90px] rounded-[15px]' src={category.imgURL} alt="pupular food"/>
                <div className='pl-4'>
                  <p className='text-[#303033] text-[18px] font-medium leading-[140%] text-center pb-1 '>{category.title}</p>
                  <p className='text-[14px] font-normal leading-[140%] h-[50%]'>{category.amount} recipes</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <div>
        {
          listCategoryItems.map((listCategoryItem,index)=>(
            <div key={listCategoryItem.id}>
              <div className='flex justify-between py-[40px]'>
                <div>
                    <text className='text-[#303033] text-[22px] font-semibold leading-[30px]'>{listCategoryItem.title}</text>
                    <p className='text-[14px] font-normal leading-[140%] h-[50%]'>{listCategoryItem.detail}</p>
                </div>
                <div>
                    <Button variant="primaryOutline" size="default"><a href='#'>View All</a></Button>
                </div>
              </div>
              {/* img */}
              <div className='grid grid-cols-4 gap-10 my-10'>
                  {
                    listCategoryItem.recipes.map((recipe,index)=>(
                      <div key={index} className='relative bg-white border-solid border-[1px] border-[#E9E9EF] rounded-[15px] cursor-pointer h-[445px]'>
                        <div className='relative'>
                          <img style={{width:"100%",borderRadius:"15px",height:"390px"}} src={recipe.img} alt="Recipe image" />
                          <div className='absolute bottom-3 left-3 flex-wrap-reverse w-[32px]'>
                            {recipe.dietary.map((dietary,index) =>(
                              <Button className='my-1' key={index} variant="secondary" size="icon" ><a  href="#">{dietary}</a></Button>
                            ))}
                          </div>
                        </div>
                        <p className='text-[18px] font-medium leading-[150%] pl-3 h-[10%] text-[#303033] flex items-center '>{recipe.title}</p>
                        <div className='flex w-full justify-between absolute top-3 px-5'>
                          <div>
                          <Button variant="secondary" size="icon" ><a  href="#">&#x2605;</a></Button>
                          </div>
                          <div className='flex'>
                          <Button className='mr-4' variant="secondary" size="icon"><Image  width={20} height={20} src="/add.svg" alt="add"/></Button>
                          <Button variant="secondary" size="icon"><Image  width={24} height={25} src="/heart.svg" alt="heart"/></Button>
                          </div>
                        </div>
                        
                      </div>
                    ))
                  }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Latest_Recipes
