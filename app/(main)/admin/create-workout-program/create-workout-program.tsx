import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"

export function CreateWorkoutProgram() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Create a Workout Program</h1>
      <form className="space-y-6">
        <div>
          <label htmlFor="name" className="block font-medium mb-2">
            Program Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Enter program name"
          />
        </div>
        <div>
          <label htmlFor="description" className="block font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            rows={4}
            placeholder="Enter program description"
          />
        </div>
        <div>
          <label htmlFor="workout-date" className="block font-medium mb-2">
            Workout Date
          </label>
          <input
            type="date"
            id="workout-date"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <label htmlFor="equipment" className="block font-medium mb-2">
            Equipment
          </label>
          <input
            type="text"
            id="equipment"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Enter required equipment"
          />
        </div>
        <div>
          <label htmlFor="workout-type" className="block font-medium mb-2">
            Workout Type
          </label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <input type="checkbox" id="abs" className="mr-2" />
              <label htmlFor="abs">Abs</label>
            </div>
            <div>
              <input type="checkbox" id="booty" className="mr-2" />
              <label htmlFor="booty">Booty</label>
            </div>
            <div>
              <input type="checkbox" id="legs" className="mr-2" />
              <label htmlFor="legs">Legs</label>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="duration" className="block font-medium mb-2">
            Duration
          </label>
          <input
            type="text"
            id="duration"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Enter workout duration"
          />
        </div>
        <div>
          <label htmlFor="created-year" className="block font-medium mb-2">
            Created Year
          </label>
          <input
            type="number"
            id="created-year"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Enter the year the program was created"
          />
        </div>
        <div>
          <label htmlFor="image" className="block font-medium mb-2">
            Program Image
          </label>
          <input
            type="file"
            id="image"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <label htmlFor="banner" className="block font-medium mb-2">
            Program Banner
          </label>
          <input
            type="file"
            id="banner"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <label htmlFor="themes" className="block font-medium mb-2">
            Themes
          </label>
          <div className="grid grid-cols-2 gap-4">
            <Select>
              <SelectTrigger className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <SelectValue placeholder="Select Themes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="abs">Abs</SelectItem>
                <SelectItem value="booty">Booty</SelectItem>
                <SelectItem value="legs">Legs</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center">
              <Button variant="default" className="ml-auto">
                <Plus className="w-4 h-4 mr-2" />
                Add Theme
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-gray-100 rounded-md p-4">
              <span className="font-medium">Abs</span>
              <Button variant="default" size="icon" className="ml-auto">
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="bg-gray-100 rounded-md p-4">
              <span className="font-medium">Booty</span>
              <Button variant="default" size="icon" className="ml-auto">
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="bg-gray-100 rounded-md p-4">
              <span className="font-medium">Legs</span>
              <Button variant="default" size="icon" className="ml-auto">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="categories" className="block font-medium mb-2">
            Categories
          </label>
          <div className="grid grid-cols-2 gap-4">
            <Select>
              <SelectTrigger className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <SelectValue placeholder="Select Categories" />
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
            Create Program
          </Button>
        </div>
      </form>
    </div>
  )
}
