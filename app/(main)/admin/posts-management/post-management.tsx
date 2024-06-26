"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function PostManagement() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Introduction to React",
      description: "Learn the basics of React, a popular JavaScript library for building user interfaces.",
      imgBefore: "https://example.com/react-intro-before.jpg",
      imgAfter: "https://example.com/react-intro-after.jpg",
      dayBefore: new Date("2023-05-01"),
      dayAfter: new Date("2023-05-08"),
      categoryCommunity: { id: 1, name: "Web Development" },
      badge: { id: 1, name: "Beginner" },
      userChallenges: [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
      ],
      createdAt: new Date("2023-04-15"),
      url: "https://example.com/react-intro",
      postTopics: [
        { id: 1, name: "React" },
        { id: 2, name: "JavaScript" },
      ],
      postCategories: [
        { id: 1, name: "Web Development" },
        { id: 2, name: "Frontend" },
      ],
    },
    {
      id: 2,
      title: "Mastering CSS Grid",
      description: "Dive deep into CSS Grid, a powerful layout system for creating complex web designs.",
      imgBefore: "https://example.com/css-grid-before.jpg",
      imgAfter: "https://example.com/css-grid-after.jpg",
      dayBefore: new Date("2023-06-01"),
      dayAfter: new Date("2023-06-15"),
      categoryCommunity: { id: 1, name: "Web Development" },
      badge: { id: 2, name: "Intermediate" },
      userChallenges: [
        { id: 3, name: "Michael Johnson" },
        { id: 4, name: "Emily Davis" },
      ],
      createdAt: new Date("2023-05-20"),
      url: "https://example.com/css-grid-tutorial",
      postTopics: [
        { id: 2, name: "CSS" },
        { id: 3, name: "Layout" },
      ],
      postCategories: [
        { id: 1, name: "Web Development" },
        { id: 3, name: "Design" },
      ],
    },
  ])
  const [selectedPost, setSelectedPost] = useState(null)
  const handleAddPost = (newPost) => {
    setPosts([...posts, newPost])
  }
  const handleDeletePost = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id)
    setPosts(updatedPosts)
  }
  const handleViewPost = (id) => {
    const post = posts.find((p) => p.id === id)
    setSelectedPost(post)
  }
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Manage Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{post.title}</h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleViewPost(post.id)}>
                  <EyeIcon className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDeletePost(post.id)}>
                  <TrashIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{post.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.postTopics.map((topic) => (
                <div key={topic.id} className="bg-gray-100 rounded-md px-3 py-1 text-sm font-medium">
                  {topic.name}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.postCategories.map((category) => (
                <div key={category.id} className="bg-gray-100 rounded-md px-3 py-1 text-sm font-medium">
                  {category.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-3xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{selectedPost.title}</h2>
              <Button variant="ghost" size="icon" onClick={() => setSelectedPost(null)}>
                <XIcon className="w-6 h-6" />
              </Button>
            </div>
            <p className="text-gray-600 mb-4">{selectedPost.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-bold mb-2">Before</h3>
                <img src="/placeholder.svg" alt="Before" width={400} height={300} className="object-cover rounded-lg" />
                <div className="mt-4">
                  <h3 className="text-lg font-bold mb-2">Day Before</h3>
                  <p>{selectedPost.dayBefore.toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">After</h3>
                <img src="/placeholder.svg" alt="After" width={400} height={300} className="object-cover rounded-lg" />
                <div className="mt-4">
                  <h3 className="text-lg font-bold mb-2">Day After</h3>
                  <p>{selectedPost.dayAfter.toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Category</h3>
              <p>{selectedPost.categoryCommunity.name}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Badge</h3>
              <p>{selectedPost.badge.name}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">User Challenges</h3>
              <div className="flex flex-wrap gap-2">
                {selectedPost.userChallenges.map((user) => (
                  <div key={user.id} className="bg-gray-100 rounded-md px-3 py-1 text-sm font-medium">
                    {user.name}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Created At</h3>
              <p>{selectedPost.createdAt.toLocaleDateString()}</p>
            </div>
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
