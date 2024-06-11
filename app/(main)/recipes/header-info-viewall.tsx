import { Button } from "@/components/ui/button";

const HeaderInfoViewAll = ({
  name,
}: {
  name: String;
  // detail: String;
}) => {
  return (
    <>
      <div className="flex justify-between py-5">
        <div>
          <p className="text-[#303033] text-[22px] font-semibold leading-[30px]">
            {name}
          </p>
          {/* <p className="text-[14px] font-normal leading-[140%] h-[50%]">
            {detail}
          </p> */}
        </div>
        <div>
          <Button variant="primaryOutline" size="default">
            <a href="#">View All</a>
          </Button>
        </div>
      </div>
    </>
  );
};

export default HeaderInfoViewAll;
