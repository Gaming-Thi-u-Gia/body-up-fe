"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function VideoManagement() {
  const [videos, setVideos] = useState([
    {
      id: 1,
      name: "Introduction to React",
      url: "https://example.com/react-intro",
      videoTopics: [
        { id: 1, name: "React" },
        { id: 2, name: "JavaScript" },
      ],
      videoCategories: [
        { id: 1, name: "Web Development" },
        { id: 2, name: "Frontend" },
      ],
    },
    {
      id: 2,
      name: "Mastering CSS Grid",
      url: "https://example.com/css-grid-tutorial",
      videoTopics: [
        { id: 2, name: "CSS" },
        { id: 3, name: "Layout" },
      ],
      videoCategories: [
        { id: 1, name: "Web Development" },
        { id: 3, name: "Design" },
      ],
    },
  ])
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [editingVideo, setEditingVideo] = useState(null)
  const handleAddVideo = (newVideo) => {
    setVideos([...videos, newVideo])
  }
  const handleUpdateVideo = (updatedVideo) => {
    const updatedVideos = videos.map((video) => (video.id === updatedVideo.id ? updatedVideo : video))
    setVideos(updatedVideos)
    setEditingVideo(null)
  }
  const handleDeleteVideo = (id) => {
    const updatedVideos = videos.filter((video) => video.id !== id)
    setVideos(updatedVideos)
  }
  const handleViewVideo = (id) => {
    const video = videos.find((v) => v.id === id)
    setSelectedVideo(video)
  }
  const handleEditVideo = (id) => {
    const video = videos.find((v) => v.id === id)
    setEditingVideo(video)
  }
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Manage Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <div key={video.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{video.name}</h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleViewVideo(video.id)}>
                  <EyeIcon className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleEditVideo(video.id)}>
                  <PenIcon className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteVideo(video.id)}>
                  <TrashIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{video.url}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {video.videoTopics.map((topic) => (
                <div key={topic.id} className="bg-gray-100 rounded-md px-3 py-1 text-sm font-medium">
                  {topic.name}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {video.videoCategories.map((category) => (
                <div key={category.id} className="bg-gray-100 rounded-md px-3 py-1 text-sm font-medium">
                  {category.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-3xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{selectedVideo.name}</h2>
              <Button variant="ghost" size="icon" onClick={() => setSelectedVideo(null)}>
                <XIcon className="w-6 h-6" />
              </Button>
            </div>
            <p className="text-gray-600 mb-4">{selectedVideo.url}</p>
            <h3 className="text-lg font-bold mb-2">Topics</h3>
            <div className="flex flex-wrap gap-2">
              {selectedVideo.videoTopics.map((topic) => (
                <div key={topic.id} className="bg-gray-100 rounded-md px-3 py-1 text-sm font-medium">
                  {topic.name}
                </div>
              ))}
            </div>
            <h3 className="text-lg font-bold mb-2 mt-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {selectedVideo.videoCategories.map((category) => (
                <div key={category.id} className="bg-gray-100 rounded-md px-3 py-1 text-sm font-medium">
                  {category.name}
                </div>
              ))}
            </div>
          </div>
          )}
        </div>
      )}
      {editingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-3xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Edit Video</h2>
              <Button variant="ghost" size="icon" onClick={() => setEditingVideo(null)}>
                <XIcon className="w-6 h-6" />
              </Button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleUpdateVideo(editingVideo)
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    value={editingVideo.name}
                    onChange={(e) => setEditingVideo({ ...editingVideo, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="url">URL</Label>
                  <Input
                    type="text"
                    id="url"
                    value={editingVideo.url}
                    onChange={(e) => setEditingVideo({ ...editingVideo, url: e.target.value })}
                    required
                  />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2 mt-4">Topics</h3>
              <div className="space-y-4">
                {editingVideo.videoTopics.map((topic, index) => (
                  <div key={index} className="grid grid-cols-[1fr_auto] gap-4">
                    <Input
                      type="text"
                      placeholder="Topic Name"
                      value={topic.name}
                      onChange={(e) => {
                        const updatedTopics = [...editingVideo.videoTopics]
                        updatedTopics[index].name = e.target.value
                        setEditingVideo({ ...editingVideo, videoTopics: updatedTopics })
                      }}
                      required
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const updatedTopics = [...editingVideo.videoTopics]
                        updatedTopics.splice(index, 1)
                        setEditingVideo({ ...editingVideo, videoTopics: updatedTopics })
                      }}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingVideo({
                      ...editingVideo,
                      videoTopics: [...editingVideo.videoTopics, { id: Date.now(), name: "" }],
                    })
                  }}
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Add Topic
                </Button>
              </div>
              <h3 className="text-lg font-bold mb-2 mt-4">Categories</h3>
              <div className="space-y-4">
                {editingVideo.videoCategories.map((category, index) => (
                  <div key={index} className="grid grid-cols-[1fr_auto] gap-4">
                    <Input
                      type="text"
                      placeholder="Category Name"
                      value={category.name}
                      onChange={(e) => {
                        const updatedCategories = [...editingVideo.videoCategories]
                        updatedCategories[index].name = e.target.value
                        setEditingVideo({ ...editingVideo, videoCategories: updatedCategories })
                      }}
                      required
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const updatedCategories = [...editingVideo.videoCategories]
                        updatedCategories.splice(index, 1)
                        setEditingVideo({ ...editingVideo, videoCategories: updatedCategories })
                      }}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingVideo({
                      ...editingVideo,
                      videoCategories: [
                        ...editingVideo.videoCategories,
                        {
                          id: Date.now(),
                          name: "",
                        },
                      ],
                    })
                  }}
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Add Category
                </Button>
              </div>
              <div className="flex justify-end mt-4">
                <Button type="submit">Save</Button>
              </div>
            </form>
          </div>
          )}
        </div>
      )}
    </div>
  )
}

function EyeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function PenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  )
}


function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
