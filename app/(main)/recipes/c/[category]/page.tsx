import HeaderInfoSort from "./header-info-sort";
import ListItemCategory from "./list-item-category";
const page = () => {
  return (
    <div className=" max-w-7xl h-full mx-auto mb-10">
      <HeaderInfoSort
        title="Featured Recipes"
        detail="Here is a list of the most popular recipes that people are loving! Try out some of these recipes to find out why everyone is raving about them"
      />
      <ListItemCategory />
    </div>
  );
};

export default page;
