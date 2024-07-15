"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Posts } from "./user-post-no-image";
import {
   fetchFilterPost,
   fetchPostData,
   fetchSearchPost,
} from "@/utils/community";
import { useAuthStore } from "@/components/providers/auth-provider";
import moment from "moment";
import { Skeleton } from "@/components/ui/skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSharePostModal } from "@/stores/use-share-model";
import { useFilterStore } from "@/stores/use-filter-community";
import useSearchStore from "@/stores/use-search-post";
import UserInfo from "./user-info";
const BeforAfterPost = () => {
   const pathname = usePathname();
   const pathParts = pathname.split("/");
   const title = pathParts[2];
   const [posts, setPosts] = useState<Posts[]>([]);
   const { sessionToken } = useAuthStore((store) => store);
   const [isLoading, setIsLoading] = useState(false);
   const [page, setPage] = useState(0);
   const [hasMorePosts, setHasMorePosts] = useState(false);
   const { open, setPosts: setPostsZustand } = useSharePostModal(
      (store) => store
   );
   const router = useRouter();
   const { selectedFilter } = useFilterStore();
   const { searchText } = useSearchStore();

   useEffect(() => {
      setPosts([]);
      setPage(0);
   }, [selectedFilter, searchText]);

   useEffect(() => {
      if (page === 0) {
         getPostsByCategory();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [page, selectedFilter, searchText]);

   const getPostsByCategory = async () => {
      try {
         setIsLoading(true);
         const size = 4;
         let data: Posts[] = [];
         if (searchText === "") {
            if (selectedFilter === "All") {
               data = await fetchPostData(2, sessionToken!, page, size);
            } else {
               data = await fetchFilterPost(
                  sessionToken!,
                  selectedFilter,
                  2,
                  page,
                  size
               );
            }
         } else {
            data = await fetchSearchPost(
               sessionToken!,
               searchText,
               2,
               page,
               size
            );
         }
         console.log(data);

         if (data.length === 0) {
            setHasMorePosts(false);
            setIsLoading(false);
         }
         setPosts((prevPosts) => {
            const newPosts = [...prevPosts, ...data];
            const uniquePosts = newPosts.filter(
               (post, index, self) =>
                  index === self.findIndex((p) => p.id === post.id)
            );
            setPostsZustand(uniquePosts);
            return uniquePosts;
         });
         setHasMorePosts(data.length > 0);
         setPage((prevPage) => prevPage + 1);
      } catch (error) {
         console.log(error);
      } finally {
         setIsLoading(false);
      }
   };
   return (
      <>
         {isLoading && posts.length === 0 ? (
            <div className="flex flex-col items-center gap-4 w-full">
               <div className="w-full grid grid-cols-2 gap-4">
                  <BeforeAfterPostSkeleton />
                  <BeforeAfterPostSkeleton />
               </div>
               <div className="w-full grid grid-cols-2 gap-4">
                  <BeforeAfterPostSkeleton />
                  <BeforeAfterPostSkeleton />
               </div>
            </div>
         ) : (
            <InfiniteScroll
               dataLength={posts.length}
               next={getPostsByCategory}
               hasMore={hasMorePosts}
               loader={
                  <div className="flex flex-col istems-center gap-4 mt-4">
                     <div className="w-full grid grid-cols-2 gap-4">
                        <BeforeAfterPostSkeleton />
                        <BeforeAfterPostSkeleton />
                     </div>
                  </div>
               }
               endMessage={
                  <p style={{ textAlign: "center" }}>
                     <b>Yay! You have seen it all</b>
                  </p>
               }
            >
               <div className="w-full grid grid-cols-2 gap-4">
                  {posts.map((post) => (
                     <div
                        key={post.id}
                        className=" bg-white rounded-md px-2 py-3"
                     >
                        <div className="flex items-center justify-between ">
                           <div className="flex gap-2 items-center">
                              <UserInfo user={post.user} />
                              <div className="flex flex-col text-sm items-start">
                                 <label className="font-bold text-black">
                                    {post.user.userName2}
                                 </label>
                                 <span className="font-light text-black ">
                                    {post.createdAt
                                       ? moment(post.createdAt).fromNow()
                                       : "No date provided"}
                                 </span>
                              </div>
                           </div>
                           <div className="flex gap-2 items-center">
                              {post.createdAt &&
                              moment().diff(moment(post.createdAt), "days") <
                                 1 ? (
                                 <div className="flex rounded-full bg-[#E1E6FA] p-3 h-7 justify-center items-center">
                                    <span className="text-[12px] font-medium">
                                       NEW
                                    </span>
                                 </div>
                              ) : null}
                           </div>
                        </div>
                        <h1 className="text-sm font-bold px-2 my-2 line-clamp-1">
                           {post.title}
                        </h1>

                        <Link
                           href={`/community/${title}/${post.id}`}
                           className="flex gap-2 rounded-md items-center justify-center px-1"
                        >
                           <Image
                              src={post.imgBefore}
                              alt="image_before"
                              className="w-[50%] h-[378px] object-cover rounded-xl"
                              width={0}
                              height={0}
                              sizes="100"
                           />
                           <Image
                              src={post.imgAfter}
                              className="w-[50%] h-[378px] object-cover rounded-xl"
                              alt="image_after"
                              width={0}
                              height={0}
                              sizes="100"
                           />
                        </Link>
                     </div>
                  ))}
               </div>
            </InfiniteScroll>
         )}
      </>
   );
};

export default BeforAfterPost;

const BeforeAfterPostSkeleton = () => {
   return (
      <div className="bg-white rounded-md px-2 py-3 space-y-4 w-full">
         {/* User details and new tag placeholder */}
         <div className="flex items-center justify-between ">
            <div className="flex gap-2 items-center">
               {/* User avatar skeleton */}
               <Skeleton className="h-12 w-12 rounded-full" />
               {/* User name and email skeletons */}
               <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
               </div>
            </div>
            {/* New tag skeleton */}
            <Skeleton className="h-7 w-20 rounded-full" />
         </div>
         {/* Post title skeleton */}
         <Skeleton className="h-6 w-[75%]" />
         {/* Images placeholders */}
         <div className="flex gap-4">
            <Skeleton className="w-[49%] h-[378px] rounded-xl" />
            <Skeleton className="w-[49%] h-[378px] rounded-xl" />
         </div>
      </div>
   );
};
