"use client";

import { useRouter } from "next/navigation";

import { ShowMoreProps } from "@types";
import { updateSearchParams } from "/utils/index.ts";
import  CustomButton  from "/components/CustomButton";

const ShowMore = ({ pageNumber, isNext,setlimit }: ShowMoreProps) => {

  const handleNavigation = () => {
    // Calculate the new limit based on the page number and navigation type
    const newLimit = (pageNumber + 1) * 10;
    setlimit(limit)

  };

  return (
    <div className="w-full flex-center gap-5 mt-10">
      {!isNext && (
        <CustomButton
          btnType="button"
          title="Show More"
          containerStyles="bg-primary-blue rounded-full text-white"
          handleClick={handleNavigation}
        />
      )}
    </div>
  );
};

export default ShowMore;