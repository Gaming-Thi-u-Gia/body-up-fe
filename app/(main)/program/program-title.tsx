import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const ProgramTitle = () => {
  return (
    <div className="flex w-full justify-between py-5 items-center">
                <div>
                    <span className="leading-loose font-semibold text-2xl text-black">
                        Moderate to Advanced
                    </span>
                    <p className="max-w-[1000px] text-sm">
                        If you're looking for something that pushes you a little
                        harder, try any of these moderate to advanced challenges
                        to help you progress further.
                    </p>
                </div>
                <div>
                    <Button variant="primaryOutline" size="lg">
                        <Link href="#">View All</Link>
                    </Button>
                </div>
            </div>
  )
}

export default ProgramTitle