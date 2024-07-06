"use client";
import React, { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import fitness_icon from "/public/fitness-icon.svg";
import message_icon from "/public/message-icon.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import back_Icon from "/public/back-icon.svg";
import { usePathname } from "next/navigation";
import { Bookmark, ChevronDown } from "lucide-react";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
   createComment,
   fetchBookmarkPost,
   fetchCommentData,
   fetchPostById,
} from "@/utils/community";
import { toast } from "sonner";
import { CommentSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from "@/components/ui/form";
import { useAuthStore } from "@/components/providers/auth-provider";
import { Posts } from "./user-post-no-image";
import Comment, { Comments } from "./comment";
import moment from "moment";
import { Skeleton } from "@/components/ui/skeleton";
import share_icon from "/public/share-icon.svg";
import { useSharePostModal } from "@/stores/use-share-model";
import UserInfo from "./user-info";
const Post = () => {
   const pathname = usePathname();
   const pathParts = pathname.split("/");
   const title = pathParts[2];
   const postId = pathParts[3];
   const [posts, setPosts] = useState<Posts>();
   const { sessionToken } = useAuthStore((store) => store);
   const [isPending, startTransition] = useTransition();
   const [comments, setComments] = useState<Comments[]>([]);
   const [isLoading, setIsLoading] = useState(false);
   const [countComments, setCountComments] = useState(0);
   const { open, setPosts: setPostsShare } = useSharePostModal(
      (store) => store
   );
   const form = useForm({
      resolver: zodResolver(CommentSchema),
      defaultValues: {
         detail: "",
         parentId: null,
      },
   });
   const [isBookmarked, setIsBookmarked] = useState(false);
   useEffect(() => {
      const fetchComments = async () => {
         try {
            console.log("render");
            const res = await fetchCommentData(Number(postId));
            console.log(res);
            // check if comment has parentId = null then add to comments array
            const filteredComments = await res.filter(
               (comment: Comments) => comment.parentId === null
            );
            setComments(filteredComments);
            setCountComments(res.length);
         } catch (error) {
            console.log(error);
         }
      };
      fetchComments();
   }, [postId, comments.length]);

   useEffect(() => {
      const fetchFullPost = async () => {
         try {
            setIsLoading(true);
            const data = await fetchPostById(Number(postId), sessionToken!);
            console.log(data);
            setIsBookmarked(data.bookmarked);
            //add post to share modal
            const post = [data];
            setPostsShare(post);
            setPosts(data);
         } catch (error) {
            toast.error("Something went wrong");
         } finally {
            setIsLoading(false);
         }
      };
      fetchFullPost();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [sessionToken, postId]);

   if (isLoading) {
      return <PostSkeleton />;
   }

   const handleBookmark = async () => {
      try {
         if (!sessionToken)
            return toast.error("You Need To Sign In To Bookmark!", {
               description: `${new Date().toLocaleString()}`,
               action: {
                  label: "Close",
                  onClick: () => console.log("Close"),
               },
            });

         const data = await fetchBookmarkPost(Number(postId), sessionToken!);
         console.log(data);
         setIsBookmarked(data.bookmarked);
         console.log(data.bookmarked);
         if (data.bookmarked === true) {
            toast.success("Post Bookmarked Successfully!", {
               description: `${new Date().toLocaleString()}`,
               action: {
                  label: "Close",
                  onClick: () => console.log("Close"),
               },
            });
         } else {
            toast.success("Post Removed Bookmark Successfully!", {
               description: `${new Date().toLocaleString()}`,
               action: {
                  label: "Close",
                  onClick: () => console.log("Close"),
               },
            });
         }
      } catch (error) {
         console.error("Error during API call:", error);
         toast.error("Something Went Wrong!.", {
            description: `${new Date().toLocaleString()}`,
            action: {
               label: "Close",
               onClick: () => console.log("Close"),
            },
         });
      }
   };
   const handleCommentCountChange = (increment: number) => {
      setCountComments((prevCount) => prevCount + increment);
   };

   const onSubmit = (data: z.infer<typeof CommentSchema>) => {
      console.log(data);

      startTransition(async () => {
         try {
            const res = await createComment(
               sessionToken!,
               Number(postId),
               data
            );
            //Check if comment has parentId == null then add to comments array
            if (data.parentId === null) {
               setComments((prev) => [res.payload, ...prev]);
            }

            setCountComments(countComments + 1);
            form.reset();
            toast.success("Create Comment Successfully!", {
               description: `${new Date().toLocaleString()}`,
               action: {
                  label: "Close",
                  onClick: () => console.log("Close"),
               },
            });
         } catch (error) {
            toast.error("You Need To Sign In To Comment!", {
               description: `${new Date().toLocaleString()}`,
               action: {
                  label: "Close",
                  onClick: () => console.log("Close"),
               },
            });
         }
      });
   };

   return (
      <>
         <Link
            href={`/community/${title}`}
            className="flex gap-2 items-center justify-start mb-4"
         >
            <Image src={back_Icon} width={24} height={24} alt="back" />
            <span className="text-[15px] text-black flex gap-2 ">
               Back to <span>#{title}</span>
            </span>
         </Link>

         {posts && (
            <div className="w-full flex flex-col p-2 gap-2 hover:bg-[#f5f5f5] rounded-lg">
               <div className="w-full flex justify-between items-center ">
                  <div className="flex gap-2 items-center ">
                     <UserInfo user={posts.user} />
                     <label
                        className="text-[#303033] text-sm font-bold cursor-pointer"
                        htmlFor=""
                     >
                        {posts?.user.userName2}
                     </label>
                     <span className="text-sm">
                        {posts?.createdAt
                           ? moment(posts?.createdAt).fromNow()
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
                        <span className="text-[12px]">{posts?.badge.name}</span>
                     </div>
                  </div>
               </div>
               <Link
                  href="/community/fitness"
                  className="text-black text-lg font-medium mt-3"
               >
                  {posts?.title}
               </Link>
               <div className="text-[#303033] text-[16px] mt-2 break-all">
                  {posts?.description}
               </div>
               <div className="flex gap-2 items-center mt-6">
                  <Button
                     variant="secondary"
                     className="flex gap-1 rounded-full bg-[#EFF0F4] p-4 justify-center items-center"
                  >
                     <Image
                        src={message_icon}
                        alt="logo"
                        width={20}
                        height={20}
                     />
                     <span className="text-[12px]">
                        <span>{countComments}</span> Replies
                     </span>
                  </Button>
                  <Button
                     variant="secondary"
                     className="flex gap-1 rounded-full bg-[#EFF0F4] p-4 justify-center items-center"
                     onClick={() => handleBookmark()}
                  >
                     <Bookmark
                        size={20}
                        fill={isBookmarked ? "#7065cd" : "transparent"}
                        strokeWidth={1}
                     />
                     <span className="text-[12px]">Saved</span>
                  </Button>
                  <Button
                     type="button"
                     variant="secondary"
                     size="default"
                     className="flex gap-1 rounded-full bg-[#EFF0F4] p-4 h-7 justify-center items-center"
                     onClick={() => {
                        if (posts) {
                           open(posts.id);
                        }
                     }}
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
         )}
         <Form {...form}>
            <form
               onSubmit={form.handleSubmit(onSubmit)}
               className="space-y-5 mt-2"
            >
               <div className="w-full px-2 flex flex-col gap-1">
                  <h1 className="flex items-center p-1 font-bold">
                     Post A Reply
                  </h1>
                  <FormField
                     control={form.control}
                     name="detail"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Textarea
                                 {...field}
                                 placeholder="Write a response for this post"
                                 className="rounded-lg bg-transparent p-3 text-[16px]"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  ></FormField>

                  <div className=" flex items-center justify-end mt-3">
                     <Button
                        type="submit"
                        variant="primary"
                        className="w-[188px] h-9 flex"
                        disabled={isPending}
                     >
                        Reply
                     </Button>
                  </div>
                  <hr className="mt-3" />
               </div>
            </form>
         </Form>
         {/* comment section */}
         <div className="flex items-center mt-10 gap-2">
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <div className="flex items-center cursor-pointer ">
                     <span className="text-sm">Latest</span>
                     <ChevronDown className="text-sm w-[18.72px]" />
                  </div>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="w-35 absolute mt-5 " side="left">
                  <DropdownMenuGroup>
                     <DropdownMenuItem>
                        <span>Latest</span>
                     </DropdownMenuItem>
                     <DropdownMenuItem>
                        <span>Upvotes</span>
                     </DropdownMenuItem>
                  </DropdownMenuGroup>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
         {comments.map((comment: Comments) => (
            <div key={comment.id} className="flex flex-col mt-3 mr-2">
               <Comment
                  comment={comment}
                  countComments={countComments}
                  onCommentAdded={() => handleCommentCountChange(1)}
               />
            </div>
         ))}
      </>
   );
};

export default Post;

const PostSkeleton = () => {
   return (
      <div className="w-full flex flex-col p-2 gap-2 hover:bg-[#f5f5f5] rounded-lg animate-pulse">
         {/* Profile and title section */}
         <div className="flex justify-between items-center ">
            <div className="flex gap-2 items-center">
               <Skeleton className="h-8 w-8 bg-gray-200 rounded-full"></Skeleton>{" "}
               {/* Avatar placeholder */}
               <Skeleton className="h-6 w-32 bg-gray-200 rounded"></Skeleton>{" "}
               {/* Username placeholder */}
            </div>
            <Skeleton className="h-6 w-24 bg-gray-200 rounded-full"></Skeleton>{" "}
            {/* Badge placeholder */}
         </div>
         {/* Post title */}
         <Skeleton className="h-6 w-3/4 bg-gray-200 rounded mt-3"></Skeleton>
         {/* Post description */}
         <Skeleton className="h-4 w-full bg-gray-200 rounded mt-2"></Skeleton>
         {/* Interaction buttons */}
         <div className="flex gap-2 mt-3">
            <Skeleton className="h-7 w-32 bg-gray-200 rounded-full"></Skeleton>{" "}
            {/* Replies button */}
            <Skeleton className="h-7 w-32 bg-gray-200 rounded-full"></Skeleton>{" "}
            {/* Bookmark button */}
         </div>
         <hr className="mt-3" />
      </div>
   );
};
