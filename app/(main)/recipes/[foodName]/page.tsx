import { title } from "process";
import Slider from "./Slider";
import Info from "./Info";
import HowToCook from "./HowToCook";
/* eslint-disable @next/next/no-img-element */
const page = ({ params }) => {
    const { foodName } = params;

    //Fake data

    return (
        <div>
            <Slider foodName={foodName} />
            <Info />
            <HowToCook />
        </div >
    )
}

export default page
