'use client'

import React from 'react'
import { Button } from '../ui/button'
import { Weight } from 'lucide-react'
import { useBmiModal } from '@/stores/use-bmi-model'

const BmiCaculate = () => {

    const { open } = useBmiModal();  
  return (
    <div className='absolute bottom-2 right-2 w-[50px] h-[50px]'>
        <Button onClick={open} className='animate-bounce p-2 rounded-full w-full h-full' variant='primary'><Weight width={35} height={35}/></Button>
    </div>
  )
}

export default BmiCaculate