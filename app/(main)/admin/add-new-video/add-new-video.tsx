"use client"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"  
import { AddNewVideoType, TopicType, VideoCategoryType, TableFilterType } from "@/utils/admin/type"
import { fetchGetVideoTopics, fetchGetTableFilterVideo } from "@/utils/admin/fetch"
import { useState, useEffect } from "react"
import { toast } from "sonner"

export function AddNewVideo() {
  const [video, setVideo] = useState<AddNewVideoType>({
    name: "" as string,
    url: "" as string,
    isFeatured: false as boolean,
    topics: [] as TopicType[],
    categories: [] as VideoCategoryType[],
  })

  const [topics, setTopics] = useState<TopicType[]>([]);
  const [tableFilter, setTableFilter] = useState<TableFilterType[]>([]);
  const [errors, setErrors] = useState({
    general: ""
  });

  useEffect(() => {
    const getTableFilter = async () => {
      try {
        const response = await fetchGetTableFilterVideo();
        const sortedResponse = response
          .sort((a: TableFilterType, b: TableFilterType) =>
            a.type.localeCompare(b.type)
          )
          .map((table: TableFilterType) => ({
            ...table,
            recipeCategories: table.recipeCategories.sort((a, b) =>
              a.name.localeCompare(b.name)
            ),
          }));
        setTableFilter(sortedResponse);
      } catch (error) {
        console.error(error);
      }
    };
    getTableFilter();
  }, []);

  useEffect(() => {
    const getTopics = async () => {
      try {
        const data = await fetchGetVideoTopics();
        setTopics(data);
      } catch (error) {
        console.error(error);
      }
    }
    getTopics();
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setVideo(prevVideo => ({
      ...prevVideo,
      [field]: value
    }));
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideo(prevVideo => ({
      ...prevVideo,
      isFeatured: e.target.checked
    }));
  }

  const handleTopicChange = (value: string) => {
    const selectedTopic = topics.find(topic => topic.name === value);
    if (selectedTopic && !video.topics.some(topic => topic.id === selectedTopic.id)) {
      setVideo(prevVideo => ({
        ...prevVideo,
        topics: [...prevVideo.topics, selectedTopic]
      }));
    }
  }

  const handleRemoveTopic = (index: number) => {
    const updatedTopics = [...video.topics];
    updatedTopics.splice(index, 1);
    setVideo(prevVideo => ({
      ...prevVideo,
      topics: updatedTopics
    }));
  }

  const handleCategoryChange = (type: string, value: string) => {
    const selectedCategory = tableFilter
      .find(table => table.type === type)
      ?.recipeCategories.find(category => category.name === value);
    if (selectedCategory) {
      const updatedCategories = video.categories.filter(category => category.type !== type);
      setVideo(prevVideo => ({
        ...prevVideo,
        categories: [...updatedCategories, selectedCategory]
      }));
    }
  }

  const handleRemoveCategory = (type: string) => {
    const updatedCategories = video.categories.filter(category => category.type !== type);
    setVideo(prevVideo => ({
      ...prevVideo,
      categories: updatedCategories
    }));
  }

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const checkEmptyFields = () => {
  //     let hasError = false;
  //     if (!video.name || !video.url) {
  //       setErrors(prevErrors => ({ ...prevErrors, general: "Please fill in all the required fields." }));
  //       hasError = true;
  //     }
  //     return hasError;
  //   }

  //   if (checkEmptyFields()) {
  //     return;
  //   }

  //   try {
  //     const response = await fetchPostVideo(video);
  //     toast.success("Video submitted successfully!");
  //     console.log(response);
  //   } catch (error) {
  //     toast.error("Failed to submit video");
  //     console.error(error);
  //   }
  // }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Add New Video</h1>
      {/* <form className="space-y-6" onSubmit={handleSubmit}> */}
      <form className="space-y-6" >
        <div>
          <label htmlFor="name" className="block font-medium mb-2">
            Video Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Enter video name"
            value={video.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>
        {errors.general && <p className="text-red-500">{errors.general}</p>}
        <div>
          <label htmlFor="url" className="block font-medium mb-2">
            Video URL
          </label>
          <input
            type="text"
            id="url"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Enter video URL"
            value={video.url}
            onChange={(e) => handleInputChange("url", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="is-featured" className="block font-medium mb-2">
            Featured
          </label>
          <input 
            type="checkbox" 
            id="is-featured" 
            className="mr-2" 
            checked={video.isFeatured}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="is-featured">Is this video featured?</label>
        </div>
        <div>
          <label htmlFor="video-topics" className="block font-medium mb-2">
            Video Topics
          </label>
          <div className="grid grid-cols-2 gap-4">
            <Select onValueChange={handleTopicChange}>
              <SelectTrigger className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <SelectValue placeholder="Select Video Topics" />
              </SelectTrigger>
              <SelectContent>
                {topics.map(topic => (
                  <SelectItem key={topic.id} value={topic.name}>
                    {topic.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {video.topics.map((topic, index) => (
              <div key={index} className="bg-gray-100 rounded-md p-4">
                <span className="font-medium">{topic.name}</span>
                <Button variant="default" size="icon" className="ml-auto" onClick={() => handleRemoveTopic(index)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="video-categories" className="block font-medium mb-2">
            Video Categories
          </label>
          <div className="grid grid-cols-2 gap-4">
            {tableFilter.map((table) => (
              <div key={table.type} className="flex flex-col items-start space-y-2">
                <label className="block text-lg font-medium">{table.type}</label>
                <Select onValueChange={(value) => handleCategoryChange(table.type, value)}>
                  <SelectTrigger className="w-64 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg">
                    <SelectValue placeholder={`Select ${table.type} Category`} />
                  </SelectTrigger>
                  <SelectContent>
                    {table.recipeCategories.map(category => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-4 mt-4">
                  {video.categories.filter(cat => cat.type === table.type).map((category, index) => (
                    <div key={index} className="bg-gray-100 rounded-md p-4 flex items-center space-x-2">
                      <span className="font-medium">{category.name}</span>
                      <Button variant="default" size="icon" onClick={() => handleRemoveCategory(category.type)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            className="text-lg">
            Add Video
          </Button>
        </div>
      </form>
    </div>
  )
}
