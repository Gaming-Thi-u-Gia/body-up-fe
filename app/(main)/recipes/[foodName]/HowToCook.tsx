"use client"
import React from 'react'

const HowToCook = () => {
    const howToCook = {
        steps: [
            "In a small bowl, mix together 1 tbsp yogurt, instant coffee powder, cocoa powder, stevia extract and vanilla extract until combined.",
            "Mix in the rest of the yogurt until combined.",
            "Top with raspberries, strawberries, banana, sugar-free chocolate chips and hemp seeds. Dust cocoa powder on top. Enjoy!",
        ],
        node: [
            "When buying soy or any plant-based yogurt, pay attention to the ingredient list and try to choose one that is high in protein, low in fat with minimal or no added sugar.",
            "If you can tolerate dairy, feel free to use any plain, unsweetened Greek yogurt.",
            "Make sure you use an unsweetened cocoa powder and instant coffee powder.",
            "Feel free to substitute stevia extract with any other sweetener you like. And feel free to adjust the amount used according to your taste preference.",
            "Feel free to switch up the toppings! I like a mix of fruits and nuts/ seeds such as hemp seeds to give an extra boost of healthy fats, minerals and protein.",

        ]
    }
    return (
        <div className='flex max-w-7xl text-[18px] m-auto my-20 items-center'>
            <div className='w-[60%]'>
                {
                    howToCook.steps.map((step, index) => {
                        return (
                            <div key={index} className='flex items-center py-2'>
                                <span className=' flex justify-center items-center text-[#303033] font-medium border-[1px] w-7 h-7 border-[#333] rounded-full'>{index + 1}.</span>
                                <span className='flex-1 pl-2'>{step}</span>
                            </div>
                        )
                    })
                }
            </div>
            <div className='w-[40%] bg-[#EEF4FF] box-border'>
                <div className='px-[30px] py-5'>
                    <p className='text-[12px] text-[#868A93]'>Node</p>
                    <ul className='list-disc'>
                        {
                            howToCook.node.map((note, index) => {
                                return (
                                    <li key={index} className='py-2 px-4'>{note}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default HowToCook
