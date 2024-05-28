import CardAchivements from "./card-achivements";

const AboutPage = () => {
    return (
        <div className="w-full px-[150px]">
            <div className="flex w-full h-644 bg-white rounded-xl">
                <div className="w-[67%] py-20 px-16">
                    <h1 className="text-[40px] leading-[63px] font-bold py-3">CHLOE TING</h1>
                    <span className="text-[22px] leading-[35px] font-bold">Certified Personal Trainer,<br />
                    YouTube Content Creator</span>

                    <p className="text-[22px] font-normal leading-[35px] pt-[144px] pb-[40px]">Chloe is a leading fitness creator on YouTube with over 24M
                    subscribers. Her goal is to make health and fitness accessible to all by
                    providing free workout programs and sharing free recipes with her
                    audience.</p>
                </div>
                <div className="w-[33%] pt-10">
                    <img src="https://chloeting.com/_next/static/media/chloeting-header.86d83b0f.png" alt="" className="w-full h-auto"/>
                </div>
            </div>

            <div className="flex py-[75px] gap-11 justify-center items-center">
                <div className="w-[50%]">
                    <img src="https://chloeting.com/_next/static/media/walmart.fba3ac3b.png" alt="" className="w-100% h-auto"/>
                </div>
                <div className="w-[50%]">
                    <p className="text-[22px] font-normal pb-4">In 2022, Chloe launched her range of fitness equipment in over 3,000 stores across the US in <span className="font-semibold">Walmart</span>.</p>
                    <p className="text-[22px] font-normal pt-4">This stylish collection was developed to ensure people have access to quality fitness equipment at a reasonable price, so that they can continue challenging themselves as they progress in their fitness journey.</p>
                </div>
            </div>

            <div className="w-full bg-white rounded-xl">
                <div className="flex items-center justify-center">
                    <h1 className="text-[40px] leading-[63px] font-medium pb-[75px] pt-[50px]">Awards & Achievements</h1>
                </div>

                <div className="flex">
                    <div className="flex w-[40%] items-center justify-center">
                        <img src="https://chloeting.com/_next/static/media/chloeting-clapping.3227cd05.svg" alt="" className="h-[365px]"/>
                    </div>
                    <div className="w-[60%] pr-[70px]">
                        <div className="grid grid-cols-3 gap-4">
                            <CardAchivements/>
                            <CardAchivements/>
                            <CardAchivements/>
                            <CardAchivements/>
                            <CardAchivements/>
                            <CardAchivements/>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="flex items-center justify-center">
                        <h1 className="text-[36px] leading-[57px] font-medium pb-[30px] pt-[50px]">Academic Achievements</h1>
                    </div>

                    <ul className="grid grid-cols-2 list-disc px-16 gap-10 pb-20">
                        <li className="text-[18px] font-bold leading-7">Master of Philosophy</li>
                        <li className="text-[18px] font-bold leading-7">1st Class Honours in Econometrics</li>
                        <li className="text-[18px] font-bold leading-7">Bachelor of Commerce (Economics & Business Statistics)</li>
                        <li className="text-[18px] font-bold leading-7">Received 3 Postgraduate Scholarships</li>
                        <li className="text-[18px] font-bold leading-7">Published a Thesis on the Financial Markets</li>
                        <li className="text-[18px] font-bold leading-7">Presenter & Chairperson at the Australasian Finance & Banking Conference</li>
                    </ul>
                </div>
            </div>

            <div className="flex py-[75px]">
                <div className="w-[40%]">
                    <img src="https://chloeting.com/_next/static/media/chloeting-footer.7e7ae817.png" alt="" className="w-full h-auto rounded-xl"/>
                </div>
                <div className="flex flex-col w-[60%] justify-center items-center px-20 gap-24">
                    <div>
                        <span className="text-[25px] font-bold">Ok that's it. Do your workouts, watch the ads and remember to engage that core!</span>
                    </div>
                    <div>
                        <img src="https://chloeting.com/_next/static/media/chloeting-signature.70b02a3e.svg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
