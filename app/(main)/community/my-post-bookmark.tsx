"use client";
import React, { useEffect, useState } from "react";
import { BookmarkStatus, Posts } from "./user-post-no-image";
import {
   fetchBookmarkPost,
   fetchFilterBookmarkPost,
   fetchPostsBookmark,
   fetchSearchBookmarkPost,
} from "@/utils/community";
import { useAuthStore } from "@/components/providers/auth-provider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Bookmark } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import moment from "moment";
import fitness_icon from "/public/fitness-icon.svg";
import message_icon from "/public/message-icon.svg";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import share_icon from "/public/share-icon.svg";
import { useSharePostModal } from "@/stores/use-share-model";
import useSearchStore from "@/stores/use-search-post";
import { useFilterStore } from "@/stores/use-filter-community";
import UserInfo from "./user-info";
const MyPostsBookmark = () => {
   const [posts, setPosts] = useState<Posts[]>([]);
   const [isBookmarked, setIsBookmarked] = useState<{
      [key: number]: boolean;
   }>({});
   const { sessionToken } = useAuthStore((store) => store);
   const router = useRouter();
   const [isLoading, setIsLoading] = useState(true);
   const [page, setPage] = useState(0);
   const [hasMorePosts, setHasMorePosts] = useState(false);
   const { searchText } = useSearchStore();
   const { selectedFilter, setSelectedFilter } = useFilterStore();

   useEffect(() => {
      setPosts([]);
      setPage(0);
   }, [selectedFilter, searchText]);

   useEffect(() => {
      if (page === 0) {
         fetchPosts();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [page, selectedFilter, searchText]);
   const {
      open,
      posts: postZustand,
      setPosts: setPostsZustand,
   } = useSharePostModal((store) => store);

   const fetchPosts = async () => {
      try {
         setIsLoading(true);
         const limit = 4;
         let res: Posts[] = [];
         if (searchText === "") {
            if (selectedFilter === "All") {
               res = await fetchPostsBookmark(sessionToken!, page, limit);
            } else {
               res = await fetchFilterBookmarkPost(
                  sessionToken!,
                  selectedFilter,
                  page,
                  limit
               );
            }
         } else {
            res = await fetchSearchBookmarkPost(
               sessionToken!,
               searchText,
               page,
               limit
            );
            setSelectedFilter("All");
         }
         if (res.length === 0) {
            setHasMorePosts(false);
            setIsLoading(false);
         }
         console.log(res);

         //* Sort By Day
         const sortPosts = res.sort((a: any, b: any) => {
            return (
               new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
         });

         //* Filter out duplicate posts
         setPosts((prevPosts) => {
            const newPosts = [...prevPosts, ...sortPosts];
            const uniquePosts = newPosts.filter(
               (post, index, self) =>
                  index === self.findIndex((p) => p.id === post.id)
            );
            const bookmarkStatus: BookmarkStatus = {};
            uniquePosts.forEach((post: Posts) => {
               bookmarkStatus[post.id] = post.bookmarked;
               setIsBookmarked(bookmarkStatus);
            });
            setPostsZustand(uniquePosts);
            return uniquePosts;
         });
         setHasMorePosts(res.length > 0);
         setPage((prevPage) => prevPage + 1);
      } catch (error) {
         toast.error("Something Went Wrong!", {
            description: `${new Date().toLocaleString()}`,
            action: {
               label: "Close",
               onClick: () => console.log("Close"),
            },
         });
      } finally {
         setIsLoading(false);
      }
   };
   useEffect(() => {
      console.log("Page State Updated to:", page);
      console.log("Data Load", posts);
   }, [page, posts]);

   const handleBookmark = async (id: number) => {
      try {
         if (!sessionToken) {
            toast.error("You Need To Sign In To Bookmark!", {
               description: `${new Date().toLocaleString()}`,
               action: {
                  label: "Close",
                  onClick: () => console.log("Close"),
               },
            });
            return;
         }

         const response = await fetchBookmarkPost(id, sessionToken!);
         if (response && response.bookmarked !== undefined) {
            const updatedPosts = posts.map((post) =>
               post.id === id
                  ? { ...post, bookmarked: response.bookmarked }
                  : post
            );
            setPosts(updatedPosts);
            setIsBookmarked({
               ...isBookmarked,
               [id]: response.bookmarked,
            });
            if (response.bookmarked) {
               toast.success("Post Bookmarked!", {
                  description: `${new Date().toLocaleString()}`,
                  action: {
                     label: "Close",
                     onClick: () => console.log("Close"),
                  },
               });
            } else {
               toast.success("Post Unbookmarked!", {
                  description: `${new Date().toLocaleString()}`,
                  action: {
                     label: "Close",
                     onClick: () => console.log("Close"),
                  },
               });
            }
         } else {
            throw new Error("Invalid response structure from backend");
         }
      } catch (error) {
         toast.error("Something Went Wrong!", {
            description: `${new Date().toLocaleString()}`,
            action: {
               label: "Close",
               onClick: () => console.log("Close"),
            },
         });
      }
   };

   if (!sessionToken) {
      toast.error("You need to login to view this page", {
         description: `${new Date().toLocaleString()}`,
         action: {
            label: "Close",
            onClick: () => console.log("Close"),
         },
      });
      router.push("/login");
      return null;
   }
   return (
      <div className="w-[823px] mt-3">
         {isLoading && posts.length === 0 ? (
            <div>
               <PostSkeleton />
               <PostSkeleton />
               <PostSkeleton />
            </div>
         ) : (
            <InfiniteScroll
               dataLength={posts.length}
               next={fetchPosts}
               hasMore={hasMorePosts}
               loader={
                  <div>
                     <PostSkeleton />
                  </div>
               }
               endMessage={
                  <p className="">
                     <b>Yay! You have seen it all</b>
                  </p>
               }
            >
               {posts.map((post) => (
                  <div
                     key={post.id}
                     className="w-full mb-10 flex flex-col p-2 gap-2 bor hover:bg-[#f5f5f5] rounded-lg"
                  >
                     <div className="w-full flex justify-between items-center ">
                        <div className="flex gap-2 items-center ">
                           <UserInfo user={post.user} />
                           <label
                              className="text-[#303033] text-sm font-bold cursor-pointer"
                              htmlFor=""
                           >
                              {post.user.userName2}
                           </label>
                           <span className="text-sm">
                              {post.createdAt
                                 ? moment(post.createdAt).fromNow()
                                 : "No date provided"}
                           </span>
                        </div>
                        <div className="flex gap-2 items-center">
                           <div className="flex gap-1 rounded-full bg-[#EFF0F4] px-3 py-2 justify-center items-center">
                              <Image
                                 src={fitness_icon}
                                 alt="logo"
                                 width={13}
                                 height={12}
                              />
                              <span className="text-[12px]">
                                 {post.badge.name}
                              </span>
                           </div>
                        </div>
                     </div>
                     <Link
                        href={`/community/${post.categoryCommunity.name}/${post.id}`}
                        className="text-black text-lg font-medium"
                     >
                        {post.title}
                     </Link>
                     {post.imgBefore !== null ? (
                        <div></div>
                     ) : (
                        <Link
                           href={`/community/${post.categoryCommunity.name}/${post.id}`}
                           className="text-[#303033] text-[16px] h-[48px] mt-1 line-clamp-2 break-all "
                        >
                           {post.description}
                        </Link>
                     )}

                     {post.imgBefore !== null ? (
                        <Link
                           href={`/community/${post.categoryCommunity.name}/${post.id}`}
                           className="flex gap-2 rounded-md items-center justify-center px-1"
                        >
                           <Image
                              src={post.imgBefore || ""}
                              alt="image_before"
                              className="w-[50%] h-[378px] object-cover rounded-xl"
                              width={0}
                              height={0}
                              sizes="100"
                           />
                           <Image
                              src={post.imgAfter || ""}
                              className="w-[50%] h-[378px] object-cover rounded-xl"
                              alt="image_after"
                              width={0}
                              height={0}
                              sizes="100"
                           />
                        </Link>
                     ) : (
                        <div></div>
                     )}

                     <div className="flex gap-2 items-center mt-3">
                        <Button
                           variant="secondary"
                           className="flex gap-1 rounded-full bg-[#EFF0F4] p-4 h-7 justify-center items-center"
                        >
                           <Image
                              src={message_icon}
                              alt="logo"
                              width={20}
                              height={20}
                           />
                           <Link
                              href={`/community/${post.categoryCommunity.name}/${post.id}`}
                              className="text-[12px]"
                           >
                              <span>{post.comments.length}</span> Replies
                           </Link>
                        </Button>
                        <Button
                           variant="secondary"
                           className="flex gap-1 rounded-full bg-[#EFF0F4] p-4 h-7 justify-center items-center"
                           onClick={() => handleBookmark(post.id)}
                        >
                           <Bookmark
                              size={20}
                              fill={
                                 isBookmarked[post.id]
                                    ? "#7065cd"
                                    : "transparent"
                              }
                              strokeWidth={1}
                           />
                           <span className="text-[12px]">Saved</span>
                        </Button>
                        <Button
                           type="button"
                           variant="secondary"
                           size="default"
                           className="flex gap-1 rounded-full bg-[#EFF0F4] p-4 h-7 justify-center items-center"
                           onClick={() => open(post.id)}
                        >
                           <Image
                              src={share_icon}
                              alt="logo"
                              width={20}
                              height={20}
                           />
                           <span className="text-[12px]">Share</span>
                        </Button>
                     </div>

                     <hr className="mt-3" />
                  </div>
               ))}
            </InfiniteScroll>
         )}
      </div>
   );
};

export default MyPostsBookmark;

const PostSkeleton = () => (
   <div className="w-full mb-10 flex flex-col p-2 gap-2 rounded-lg">
      <div className="w-full flex justify-between items-center ">
         <div className="flex gap-2 items-center">
            {/* User avatar and username */}
            <Skeleton className="h-8 w-8 bg-gray-200 rounded-full" />
            <Skeleton className="h-6 bg-gray-200 w-40" />
            {/* Timestamp skeleton */}
            <Skeleton className="h-4 w-20 bg-gray-200" />
         </div>
         {/* Badge area */}
         <Skeleton className="h-6 w-24 bg-gray-200 rounded-full" />
      </div>
      {/* Title skeleton */}
      <Skeleton className="h-6 w-full mt-3 bg-gray-200" />
      {/* Description skeleton */}
      <Skeleton className="h-4 w-full mt-2 bg-gray-200" />
      <Skeleton className="h-4 w-[90%] bg-gray-200" />
      {/* Buttons for replies and save */}
      <div className="flex gap-2 mt-3">
         <Skeleton className="h-7 w-32 rounded-full bg-gray-200" />
         <Skeleton className="h-7 w-32 rounded-full bg-gray-200" />
      </div>
      {/* Bottom separator */}
      <Skeleton className="h-1 w-full mt-3 bg-gray-200" />
   </div>
);
