"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, Pen, Trash, X } from "lucide-react";
import { useAuthStore } from "@/components/providers/auth-provider";
import {
  fetchDeleteVideo,
  fetchGetVideos,
  fetchPutVideo,
  fetchGetVideoDetailById,
} from "@/utils/admin/fetch";
import { fetchAllFilterCategory } from "@/utils/video/category";
import { fetchVideoCategoryData } from "@/utils/video/workoutVideoCollection";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { TableFilterVideoType } from "@/utils/admin/type";
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";
import { toast } from "sonner";
type Topic = {
  id: number;
  name: string;
};

type Category = {
  id: number;
  name: string;
  type: string;
};

export type VideoType = {
  id: number;
  name: string;
  url: string;
  featured: boolean;
  videoTopics: Topic[];
  videoCategories: Category[];
  img: string;
  date: string;
  duration: string;
};

const WorkoutVideoManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { sessionToken } = useAuthStore((store) => store);
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [videoCategories, setVideoCategories] = useState<
    TableFilterVideoType[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMoreVideo, setHasMoreVideo] = useState(true);
  const [pageNo, setPageNo] = useState(0);
  const [isVideoValid, setIsVideoValid] = useState(false);

  useEffect(() => {
    getVideoTopics();
    getVideoCategories();
  }, []);

  useEffect(() => {
    setPageNo(0);
    setVideos([]);
    getVideos(0, searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (pageNo > 0) getVideos(pageNo, searchQuery);
  }, [pageNo]);

  const getVideos = async (page: number, query: string) => {
    try {
      setIsLoading(true);
      const pageSize = 15;
      const data = await fetchGetVideos(page, pageSize, query, sessionToken!);
      if (data.totalElements === 0) {
        setHasMoreVideo(false);
      }
      const sortedData = data.content.sort((a: any, b: any) => b.id - a.id);
      setVideos((prev) => (page === 0 ? sortedData : [...prev, ...sortedData]));
      setHasMoreVideo(!data.last);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getVideoTopics = async () => {
    try {
      const data = await fetchVideoCategoryData();
      setTopics(data);
    } catch (error) {
      console.error("Error fetching video topics:", error);
    }
  };

  const getVideoCategories = async () => {
    try {
      const data = await fetchAllFilterCategory();
      setVideoCategories(data);
    } catch (error) {
      console.error("Error fetching video categories:", error);
    }
  };

  const [selectedVideo, setSelectedVideo] = useState<VideoType | null>(null);
  const [editingVideo, setEditingVideo] = useState<VideoType | null>(null);

  const handleUpdateVideo = async (updatedVideo: VideoType) => {
    try {
      const response = await fetchPutVideo(sessionToken!, updatedVideo);
      const updatedVideos = videos.map((video) =>
        video.id === updatedVideo.id ? updatedVideo : video
      );
      setVideos(updatedVideos);
      setEditingVideo(null);
      toast.success(response, {
        description: `${new Date().toLocaleString()}`,
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
    } catch (error) {
      toast.error("Error while updating the video:", {
        description: `${new Date().toLocaleString()}`,
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
    }
  };

  const handleDeleteVideo = async (id: number) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the video with ID ${id}?`
    );
    if (!isConfirmed) return;

    try {
      const response = await fetchDeleteVideo(id, sessionToken!);
      const updatedVideos = videos.filter((video) => video.id !== id);
      setVideos(updatedVideos);
      console.log(response);
    } catch (error) {
      console.error("Error while deleting the video:", error);
    }
  };

  const handleViewVideo = async (id: number) => {
    try {
      const video = await fetchGetVideoDetailById(id, sessionToken!);
      setSelectedVideo(video);
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  };

  const handleEditVideo = async (id: number) => {
    try {
      const video = await fetchGetVideoDetailById(id, sessionToken!);
      setEditingVideo(video);
    } catch (error) {
      console.error("Error fetching video details for editing:", error);
    }
  };

  const handleFieldChange = (field: string, value: any) => {
    if (editingVideo) {
      setEditingVideo({ ...editingVideo, [field]: value });
      setIsVideoValid(false);
    }
  };

  const handleCategoryChange = (type: string, value: string) => {
    const selectedCategory = videoCategories
      .find((category) => category.type === type)
      ?.videoCategories.find((category) => category.name === value);
    if (selectedCategory && editingVideo) {
      const updatedCategories = editingVideo.videoCategories.filter(
        (category) => category.type !== type
      );
      setEditingVideo({
        ...editingVideo,
        videoCategories: [...updatedCategories, selectedCategory],
      });
    }
  };

  const handleRemoveCategory = (type: string) => {
    if (editingVideo) {
      const updatedCategories = editingVideo.videoCategories.filter(
        (category) => category.type !== type
      );
      setEditingVideo({
        ...editingVideo,
        videoCategories: updatedCategories,
      });
    }
  };

  const handleTopicChange = (value: string) => {
    const selectedTopic = topics.find((topic) => topic.name === value);
    if (
      selectedTopic &&
      editingVideo &&
      !editingVideo.videoTopics.some((topic) => topic.id === selectedTopic.id)
    ) {
      setEditingVideo({
        ...editingVideo,
        videoTopics: [...editingVideo.videoTopics, selectedTopic],
      });
    }
  };

  const handleRemoveTopic = (id: number) => {
    if (editingVideo) {
      const updatedTopics = editingVideo.videoTopics.filter(
        (topic) => topic.id !== id
      );
      setEditingVideo({
        ...editingVideo,
        videoTopics: updatedTopics,
      });
    }
  };

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setPageNo(0);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      setPageNo(0);
    }
  };

  const checkVideoExists = async (videoId: string) => {
    const apiKey = "AIzaSyC7RV-Yf4DiF8L4Xj4DprWjceASn5r-S6s";
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=id&id=${videoId}&key=${apiKey}`
      );
      const data = await response.json();
      if (data.items.length > 0) {
        setIsVideoValid(true);
        toast.success("Video exists", {
          description: `${new Date().toLocaleString()}`,
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
      } else {
        setIsVideoValid(false);
        toast.error("Video does not exists", {
          description: `${new Date().toLocaleString()}`,
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
      }
    } catch (error) {
      setIsVideoValid(false);
      toast.error("Error when checking video", {
        description: `${new Date().toLocaleString()}`,
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
    }
  };

  return (
    <div className="container mx-auto py-12">
      <header className="flex items-center rounded-lg h-16 px-4 border-b shrink-0 md:px-6 bg-slate-700 text-white fixed top-[56px] left-1/2 transform -translate-x-1/2 w-full max-w-screen-2xl z-50">
        <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
            prefetch={false}
          >
            <span>Videos Management</span>
          </Link>
        </nav>
        <div className="ml-auto">
          <Link href="/admin" className="text-lg font-semibold">
            Home
          </Link>
        </div>
      </header>
      <div className="flex mt-5 items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          placeholder="Search videos..."
          className="w-full p-2 border border-gray-300 rounded-l-md"
        />
        <button
          onClick={clearSearch}
          className="bg-transparent border border-gray-300 text-gray-500 hover:text-red-500 p-2 rounded-r-md focus:outline-none"
        >
          Clear
        </button>
      </div>
      {isLoading && videos.length === 0 ? (
        <ListSkeleton />
      ) : (
        <InfiniteScroll
          dataLength={videos.length}
          next={() => setPageNo(pageNo + 1)}
          hasMore={hasMoreVideo}
          loader={<ListSkeleton />}
          endMessage={<p>No more videos to show</p>}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div key={video.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">{video.name}</h2>
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      size="icon"
                      onClick={() => handleViewVideo(video.id)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="default"
                      size="icon"
                      onClick={() => handleEditVideo(video.id)}
                    >
                      <Pen className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="default"
                      size="icon"
                      onClick={() => handleDeleteVideo(video.id)}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">URL: {video.url}</p>
                <p className="text-gray-600 mb-4">
                  Featured: {video.featured ? "Yes" : "No"}
                </p>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}

      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-3xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{selectedVideo.name}</h2>
              <Button
                variant="default"
                size="icon"
                onClick={() => setSelectedVideo(null)}
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
            <img
              src={selectedVideo.img}
              alt={selectedVideo.name}
              className="mb-4"
            />
            <p className="text-gray-600 mb-4">URL: {selectedVideo.url}</p>
            <p className="text-gray-600 mb-4">
              Featured: {selectedVideo.featured ? "Yes" : "No"}
            </p>
            <p className="text-gray-600 mb-4">Date: {selectedVideo.date}</p>
            <p className="text-gray-600 mb-4">
              Duration: {selectedVideo.duration}
            </p>
            <h3 className="text-lg font-bold mb-2">Topics</h3>
            <div className="flex flex-wrap gap-2">
              {selectedVideo.videoTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="bg-gray-100 rounded-md px-3 py-1 text-sm font-medium"
                >
                  {topic.name}
                </div>
              ))}
            </div>
            <h3 className="text-lg font-bold mb-2 mt-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {selectedVideo.videoCategories.map((category) => (
                <div
                  key={category.id}
                  className="bg-gray-100 rounded-md px-3 py-1 text-sm font-medium"
                >
                  {category.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {editingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-3xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Edit Video</h2>
              <Button
                variant="default"
                size="icon"
                onClick={() => setEditingVideo(null)}
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (editingVideo) {
                  handleUpdateVideo(editingVideo);
                }
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    value={editingVideo.name}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="url">Video ID</Label>
                  <div className="flex items-center space-x-4">
                    <Input
                      type="text"
                      id="url"
                      value={editingVideo.url}
                      onChange={(e) => handleFieldChange("url", e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="primary"
                      className="text-lg"
                      onClick={() => checkVideoExists(editingVideo.url)}
                    >
                      Check
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="featured">Featured</Label>
                  <Input
                    type="checkbox"
                    id="featured"
                    checked={editingVideo.featured}
                    onChange={(e) =>
                      handleFieldChange("featured", e.target.checked)
                    }
                  />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2 mt-4">Topics</h3>
              <Select onValueChange={handleTopicChange}>
                <SelectTrigger className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg">
                  <SelectValue placeholder="Select Topics" />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic.id} value={topic.name}>
                      {topic.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {editingVideo.videoTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className="bg-gray-100 rounded-md p-4 flex items-center"
                  >
                    <span className="font-medium">{topic.name}</span>
                    <Button
                      variant="default"
                      size="icon"
                      className="ml-auto"
                      onClick={() => handleRemoveTopic(topic.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <h3 className="text-lg font-bold mb-2 mt-4">Categories</h3>
              <div className="grid grid-cols-2 gap-4">
                {videoCategories.map((category) => (
                  <div
                    key={category.type}
                    className="flex flex-col items-start space-y-2"
                  >
                    <Label className="block text-lg font-medium">
                      {category.type}
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        handleCategoryChange(category.type, value)
                      }
                    >
                      <SelectTrigger className="w-64 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg">
                        <SelectValue
                          placeholder={`Select ${category.type} Category`}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {category.videoCategories.map((subCategory) => (
                          <SelectItem
                            key={subCategory.id}
                            value={subCategory.name}
                          >
                            {subCategory.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex flex-wrap gap-4 mt-4">
                      {editingVideo.videoCategories
                        .filter((cat) => cat.type === category.type)
                        .map((filteredCategory, index) => (
                          <div
                            key={index}
                            className="bg-gray-100 rounded-md p-4 flex items-center space-x-2"
                          >
                            <span className="font-medium">
                              {filteredCategory.name}
                            </span>
                            <Button
                              variant="default"
                              size="icon"
                              onClick={() =>
                                handleRemoveCategory(filteredCategory.type)
                              }
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <Button type="submit" disabled={!isVideoValid}>
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default WorkoutVideoManagement;

export const ListSkeleton = () => {
  return (
    <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(9)].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-gray-300 rounded w-1/2 h-6"></div>
        <div className="flex gap-2">
          <div className="bg-gray-300 rounded-full w-6 h-6"></div>
          <div className="bg-gray-300 rounded-full w-6 h-6"></div>
          <div className="bg-gray-300 rounded-full w-6 h-6"></div>
        </div>
      </div>
      <div className="bg-gray-300 rounded w-full h-4 mb-2"></div>
      <div className="bg-gray-300 rounded w-full h-4 mb-2"></div>
      <div className="bg-gray-300 rounded w-3/4 h-4 mb-2"></div>
    </div>
  );
}
