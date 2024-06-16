"use client";

import { usePathname } from 'next/navigation'
import React from 'react'

function Video() {
    const pathname = usePathname();
    const id = pathname.split('/').pop();

    console.log(id);
    
  return (
    <div></div>
  )
}

export default Video