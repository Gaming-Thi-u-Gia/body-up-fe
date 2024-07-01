"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  fetchDeletePost,
  fetchGetPostDetailById,
  fetchGetPosts,
} from "@/utils/admin/fetch";
import { useAuthStore } from "@/components/providers/auth-provider";
import InfiniteScroll from "react-infinite-scroll-component";

interface UserType {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string | null;
}

interface BadgeType {
  id: number;
  name: string;
}

interface PostCard {
  id: number;
  title: string;
  description: string;
  badge: BadgeType;
}

interface Post extends PostCard {
  user: UserType;
  imgBefore: string | null;
  imgAfter: string | null;
  dayBefore: string | null;
  dayAfter: string | null;
  createdAt: string;
}

export function PostManagement() {
  const { sessionToken } = useAuthStore((store) => store);
  const [posts, setPosts] = useState<PostCard[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasMorePost, setHasMorePost] = useState<boolean>(false);
  const [pageNo, setPageNo] = useState<number>(0);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      setIsLoading(true);
      const pageSize = 12;
      const data = await fetchGetPosts(pageNo, pageSize, sessionToken!);
      if (data.totalElements === 0) {
        setHasMorePost(false);
        setIsLoading(false);
      }
      setPosts((prev) => [...prev, ...data.content]);
      setPageNo((previous) => previous + 1);
      setHasMorePost(!data.last);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = async (postId: number) => {
    setIsLoading(true);
    const postDetails = await fetchGetPostDetailById(postId, sessionToken!);
    console.log(postDetails);
    setSelectedPost(postDetails);
    setIsLoading(false);
  };

  const handleDeletePost = async (postId: number) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the post with ID ${postId}?`
    );
    if (!isConfirmed) return;
    try {
      const response = await fetchDeletePost(postId, sessionToken!);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.log("Error when delete post Id" + postId);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Post Management</h1>
      {isLoading && posts.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(9)
            .fill(0)
            .map((_, index) => (
              <PostCardSkeleton key={index} />
            ))}
        </div>
      ) : (
        <InfiniteScroll
          dataLength={posts.length}
          next={getPosts}
          hasMore={hasMorePost}
          loader={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold line-clamp-2 overflow-hidden">
                    {post.title}
                  </h2>
                  <Badge variant="secondary">{post.badge.name}</Badge>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-4 overflow-hidden">
                  {post.description}
                </p>
                <div className="flex justify-end">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleViewDetails(post.id)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="ml-2"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}

      {isLoading && <p>Loading...</p>}
      {selectedPost && !isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl w-full">
            <div className="flex items-center mb-4">
              <img
                src={selectedPost.user.avatar || "/placeholder.svg"}
                alt={`${selectedPost.user.firstName + " " + selectedPost.user.lastName}'s avatar`}
                className="rounded-full w-16 h-16 mr-4"
              />
              <h2 className="text-xl font-bold">
                {selectedPost.user.firstName + " " + selectedPost.user.lastName}
              </h2>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-600">ID: {selectedPost.id}</p>
              <Badge variant="secondary">{selectedPost.badge.name}</Badge>
            </div>
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-2">{selectedPost.title}</h2>
              <p className="text-gray-600 mb-2">
                Description: {selectedPost.description}
              </p>
              <p className="text-gray-600 mb-2">
                Created At:{" "}
                {new Date(selectedPost.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-4">
              {selectedPost.imgBefore && (
                <div>
                  <img
                    src={selectedPost.imgBefore}
                    alt="Before"
                    width={400}
                    height={300}
                    className="rounded-lg"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-gray-600">Before</p>
                    <p className="text-gray-600">
                      {new Date(selectedPost.dayBefore!).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
              {selectedPost.imgAfter && (
                <div>
                  <img
                    src={selectedPost.imgAfter}
                    alt="After"
                    width={400}
                    height={300}
                    className="rounded-lg"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-gray-600">After</p>
                    <p className="text-gray-600">
                      {new Date(selectedPost.dayAfter!).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end mt-6">
              <Button
                variant="default"
                size="sm"
                onClick={() => setSelectedPost(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const PostCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <div className="h-8 bg-gray-300 rounded w-2/3"></div>
        <div className="h-6 bg-gray-300 rounded w-16"></div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
      <div className="flex justify-end space-x-2">
        <div className="h-10 bg-gray-300 rounded w-24"></div>
        <div className="h-10 bg-gray-300 rounded w-24"></div>
      </div>
    </div>
  );
};
