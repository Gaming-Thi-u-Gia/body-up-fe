import Image from "next/image";

const Slider = ({ foodName }: { foodName: string }) => {
  const food = {
    title: "Baked Avocado Eggs",
    prep: 5,
    cook: 10,
  };
  return (
    <div>
      <div className="relative w-full">
        <img
          className="w-[100vw] h-[calc(100vh-56px)] object-cover"
          src="https://static.chloeting.com/recipes/627605807a2bc9cd25c38ebf/images/banana-oatmeal-pancakes-1673229768598-feature.webp"
          alt="cover"
        />
        <div className="absolute left-1/2 top-0 w-[1280px] -translate-x-1/2 h-full flex flex-col justify-between">
          <div className="mt-5 ml-[45px]">
            <p className="text-[14px] text-[#fff] font-semibold leading-6">
              Recipes / {foodName}
            </p>
          </div>
          <div className="mb-[15%] ml-[45px] flex flex-col">
            <p className=" text-white text-[64px] font-bold">
              {" "}
              Vegan Mocha Yogurt Bowl
            </p>
            <div className="flex items-center justify-start text-white text-center">
              <div className="mr-5">
                <div className="w-[50px] h-[50px] rounded-full bg-[#AFB4B8] mb-1 text-[14px] font-semibold border-white border-[2px]">
                  <div>{food.prep}</div>
                  <div>min</div>
                </div>
                <text className="text-[11px] ">Prep Time</text>
              </div>
              <div className="mr-5 ">
                <div className="w-[50px] h-[50px] rounded-full bg-[#AFB4B8] mb-1 text-[14px] font-semibold border-white border-[2px]">
                  <div>{food.cook}</div>
                  <div>min</div>
                </div>
                <text className="text-[11px] ">Cook</text>
              </div>
              <div>
                <div className="w-[50px] h-[50px] rounded-full bg-[#AFB4B8] mb-1 text-[14px] font-semibold border-white border-[2px]">
                  <div>{food.prep + food.cook}</div>
                  <div>min</div>
                </div>
                <text className="text-[11px] ">Total</text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
