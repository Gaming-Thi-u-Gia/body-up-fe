import { Button } from "@/components/ui/button";
import React from "react";

const ButtonPage = () => {
    return (
        <div className='mt-10 p-4'>
            <Button variant='default' size='sm'>
                Default
            </Button>
            <Button className='ml-4' variant='defaultOutline' size='sm'>
                Default Outline
            </Button>
            <br />
            <Button className='mt-4' variant='primary' size='sm'>
                Primary
            </Button>
            <Button className='mt-4 ml-4' variant='primaryOutline' size='sm'>
                Primary Outline
            </Button>
            <br />
            <Button className='mt-6' variant='secondary' size='sm'>
                Secondary
            </Button>
            <br />
            <Button className='mt-8' variant='disabled' size='sm'>
                Disabled
            </Button>
            <Button className='mt-8 ml-8' variant='active' size='default'>
                Active
            </Button>
        </div>
    );
};

export default ButtonPage;
