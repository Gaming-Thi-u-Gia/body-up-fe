'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { fetchWorkoutCategoryData } from '@/utils/video/workoutVideoCollection';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

interface VideoCategory {
  id: number;
  topic: string;
  name: string;
}

interface HeaderNavWorkoutProgramsProps {
  onFilterClick: () => void;
}

const HeaderNavWorkoutPrograms: React.FC<HeaderNavWorkoutProgramsProps> = ({onFilterClick}) => {
  const [titleWorkoutVideos, setTitleWorkoutVideos] = useState<VideoCategory[]>([]);
  const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);
  const [searchProgram, setSearchProgram] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const getVideoCategories = async () => {
      const categories = await fetchWorkoutCategoryData();
      setTitleWorkoutVideos([
        { id: -2, topic: 'workout-program', name: 'View All Collections' },
        { id: -1, topic: 'workout-program', name: 'Latest Workouts' },
        { id: 0, topic: 'workout-program', name: 'Most Popular' },
        ...categories,
      ]);
    };
    getVideoCategories();
  }, []);

  useEffect(() => {
    const pathSegments = pathname.split('/');
    const id = parseInt(pathSegments[pathSegments.length - 1], 10);
    const selected = titleWorkoutVideos.find(category => category.id === id);
    setSelectedCategory(selected || null);
  }, [pathname, titleWorkoutVideos]);

  const toggleCategoriesVisibility = () => {
    setIsCategoriesVisible(prev => !prev);
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      router.push(`/program/search/${searchProgram}`);
    }
  };

  const handleCategoryClick = (category: VideoCategory) => {
    setSelectedCategory(category);
    setIsCategoriesVisible(false);
    router.push(`/program/c/${category.id}`);
  };
  

  return (
    <div className="border-b border-[#E3E4EB]">
      <div className="h-full mx-auto flex py-[20px] justify-between items-center">
        <div className="py-[5px] relative">
          <Button
            id="current__cate"
            onClick={toggleCategoriesVisibility}
            variant="secondary"
            className="px-5"
            size="default"
          >
            {selectedCategory ? selectedCategory.name : 'Browse By Collection'}
            <Image width={15} height={14} src="/more.svg" alt="More" />
          </Button>
          <div
            id="list__cate"
            className={`${isCategoriesVisible ? '' : 'hidden'} mt-2 absolute bg-white z-10 rounded-[15px] w-[220px] py-4`}
          >
            <ul>
              {titleWorkoutVideos.map((category) => (
                <li
                  key={category.id}
                  className={`cursor-pointer py-2 px-4 hover:bg-gray-200 ${selectedCategory?.id === category.id ? 'bg-gray-300' : ''}`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex h-8 space-x-2">
        <div className="group relative">
    <Button
      className="group-hover:opacity-0 group-hover:invisible transition-opacity duration-500 ease-in-out"
      variant="defaultOutline"
      size="default"
    >
      <Image width={20} height={20} src="/search.svg" alt="Search" /> Search
    </Button>
    <input
      className="absolute top-0 right-0 group-hover:w-[240px] group-hover:opacity-100 opacity-0 w-[0px] transition-all duration-500 ease-in-out rounded-[15px] border-solid border-[1px] border-[#E9E9EF] px-3 py-2"
      placeholder="Search"
      onChange={(e) => setSearchProgram(e.target.value)}
      onKeyDown={handleSearchKeyDown}
    />
</div>

          <div>
            <Button
              className="bg-transparent mr-1 cursor-not-allowed"
              variant="disabled"
              size="default"
            >
              <Image width={20} height={20} src="/heart.svg" alt="Favorites" />
              Favorites
            </Button>
          </div>
          <div>
            <Button variant="default" size="default" onClick={onFilterClick}>
              <Image width={20} height={20} src="/filter.svg" alt="Filter" /> Filter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderNavWorkoutPrograms;
