import { title } from "process";
import Slider from "./Slider";
import Info from "./Info";
import CookInfo from "./CookInfo";
import ImageSwipe from "./ImageSwipe";
/* eslint-disable @next/next/no-img-element */
const page = ({ params }) => {
    const { foodName } = params;

    const images = [
        "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep.jpg",
        "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep.jpg",
        "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep.jpg",
    ]

    return (
        <div>
            <Slider foodName={foodName} />
            <Info />
            <CookInfo />
            <ImageSwipe images={images} />

        </div >
    )
}

export default page
