import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"
export function AddNewVideo() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Add New Video</h1>
      <form className="space-y-6">
        <div>
          <label htmlFor="name" className="block font-medium mb-2">
            Video Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Enter video name"
          />
        </div>
        <div>
          <label htmlFor="url" className="block font-medium mb-2">
            Video URL
          </label>
          <input
            type="text"
            id="url"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Enter video URL"
          />
        </div>
        <div>
          <label htmlFor="is-featured" className="block font-medium mb-2">
            Featured
          </label>
          <input type="checkbox" id="is-featured" className="mr-2" />
          <label htmlFor="is-featured">Is this video featured?</label>
        </div>
        <div>
          <label htmlFor="video-topics" className="block font-medium mb-2">
            Video Topics
          </label>
          <div className="grid grid-cols-2 gap-4">
            <Select>
              <SelectTrigger className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <SelectValue placeholder="Select Video Topics" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fitness">Fitness</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="nutrition">Nutrition</SelectItem>
                <SelectItem value="wellness">Wellness</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center">
              <Button variant="default" className="ml-auto">
                <Plus className="w-4 h-4 mr-2" />
                Add Topic
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-gray-100 rounded-md p-4">
              <span className="font-medium">Fitness</span>
              <Button variant="default" size="icon" className="ml-auto">
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="bg-gray-100 rounded-md p-4">
              <span className="font-medium">Health</span>
              <Button variant="default" size="icon" className="ml-auto">
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="bg-gray-100 rounded-md p-4">
              <span className="font-medium">Nutrition</span>
              <Button variant="default" size="icon" className="ml-auto">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="video-categories" className="block font-medium mb-2">
            Video Categories
          </label>
          <div className="grid grid-cols-2 gap-4">
            <Select>
              <SelectTrigger className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <SelectValue placeholder="Select Video Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cardio">Cardio</SelectItem>
                <SelectItem value="strength">Strength</SelectItem>
                <SelectItem value="yoga">Yoga</SelectItem>
                <SelectItem value="pilates">Pilates</SelectItem>
                <SelectItem value="hiit">HIIT</SelectItem>
                <SelectItem value="stretching">Stretching</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center">
              <Button variant="default" className="ml-auto">
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-gray-100 rounded-md p-4">
              <span className="font-medium">Cardio</span>
              <Button variant="default" size="icon" className="ml-auto">
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="bg-gray-100 rounded-md p-4">
              <span className="font-medium">Strength</span>
              <Button variant="default" size="icon" className="ml-auto">
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="bg-gray-100 rounded-md p-4">
              <span className="font-medium">Yoga</span>
              <Button variant="default" size="icon" className="ml-auto">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-primary-500 text-white px-6 py-2 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Add Video
          </Button>
        </div>
      </form>
    </div>
  )
}