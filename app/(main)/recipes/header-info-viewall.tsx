import { Button } from "@/components/ui/button";
import { HeaderInfoType } from "@/utils/recipe/type";
import Link from "next/link";

const HeaderInfoViewAll = ({ id, name, description }: HeaderInfoType) => {
  return (
    <div className="flex justify-between py-5">
      <div>
        <p className="text-[#303033] text-[22px] font-semibold leading-[30px]">
          {name}
        </p>
        <p className="text-[14px] text-[#303033]">{description}</p>
      </div>
      <div>
        <Button variant="primaryOutline" size="default">
          <Link href={`/recipes/c/id=${id}`}>View all</Link>
        </Button>
      </div>
    </div>
  );
};

export default HeaderInfoViewAll;
