import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
const header_navbar = () => {
  return (
    <div className='border-b border-[#E3E4EB]'>     
        <div className=' max-w-7xl h-full mx-auto flex py-[20px] justify-between items-center'>
            <div className='flex items-center py-[5px]' >
                <Button variant="secondary" size="default">Browse By Collection<Image width={15} height={14} src="/more.svg" alt="More"/></Button>
            </div>
            <div className='flex h-8 '>
                <div className='group'>
                  <Button className='group-hover:opacity-0 group-hover:invisible transition-opacity duration-500 ease-in-out' variant="defaultOutline"  size="default"><Image width={20} height={20} src="/search.svg" alt="More"/>Search</Button>
                  <input className='group-hover:w-[240px] group-hover:opacity-100 opacity-0 group-hover:inline-flex w-[0px] transition-all duration-500 ease-in-out rounded-[15px] border-solid border-[1px] border-[#E9E9EF]' placeholder='Search'/>
                </div>
                <div >
                <Button className='bg-transparent mr-1 cursor-not-allowed' variant="disabled" size="default"><Image width={20} height={20} src="/heart.svg" alt="More"/>Saved Recipes</Button>
                </div>
                <div>
                <Button variant="default"  size="default"><Image width={20} height={20} src="/filter.svg" alt="More"/> Filter</Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default header_navbar
