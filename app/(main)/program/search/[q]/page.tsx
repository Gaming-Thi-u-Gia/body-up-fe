'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import SearchProgram from './search-program';
import HeaderNavWorkoutPrograms from '../../header-nav-workout-program';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      const pathNameSegment = pathname.split('/').pop() ?? '';
      setQuery(decodeURIComponent(pathNameSegment));
    }
  }, [pathname]);

  return (
    <div className='w-full px-[140px] pb-[47px]'>
      <SearchProgram query={query} />
    </div>
  );
};

export default SearchPage;
