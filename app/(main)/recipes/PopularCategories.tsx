import React from 'react'

const PopularCategories = () => {
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
    return (
    <div >
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
    </div>
  )
}

export default PopularCategories
