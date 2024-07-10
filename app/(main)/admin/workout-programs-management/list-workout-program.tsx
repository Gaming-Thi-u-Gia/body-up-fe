"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  fetchDeleteWorkoutProgram,
  fetchGetWorkoutPrograms,
} from "@/utils/admin/fetch";
import { useAuthStore } from "@/components/providers/auth-provider";
import InfiniteScroll from "react-infinite-scroll-component";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
import { toast } from "sonner";

type ProgramTopic = {
  id: number;
  topic: string | null;
  name: string;
  description: string | null;
};

type WorkoutProgramCategory = {
  id: number;
  name: string;
  type: string;
};

type WorkoutProgram = {
  id: number;
  name: string;
  detail: string;
  day: string;
  equipment: string;
  type: string;
  time: string;
  year: string | null;
  img: string;
  banner: string;
  releaseDate: string;
  programTopics: ProgramTopic[];
  workoutProgramCategories: WorkoutProgramCategory[];
};

const ListWorkoutProgram = () => {
  const { sessionToken } = useAuthStore((store) => store);
  const router = useRouter();
  const [workoutPrograms, setWorkoutPrograms] = useState<WorkoutProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMoreWorkoutProgram, setHasMoreWorkoutProgram] = useState(true);
  const [pageNo, setPageNo] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setPageNo(0);
    setWorkoutPrograms([]);
    getWorkoutProgram(0, searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (pageNo > 0) getWorkoutProgram(pageNo, searchQuery);
  }, [pageNo]);

  const getWorkoutProgram = async (page: number, query: string) => {
    setIsLoading(true);
    try {
      const pageSize = 4;
      const data = await fetchGetWorkoutPrograms(
        page,
        pageSize,
        query,
        sessionToken!
      );

      if (data.totalElements === 0) {
        setHasMoreWorkoutProgram(false);
        setIsLoading(false);
        return;
      }
      const sortedData = data.content.sort((a: any, b: any) => b.id - a.id);
      setWorkoutPrograms((prev) =>
        page === 0 ? sortedData : [...prev, ...sortedData]
      );
      setHasMoreWorkoutProgram(!data.last);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (id: number) => {
    router.push(
      `/admin/workout-programs-management/edit-workout-program/${id}`
    );
  };

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the workout program with ${id}?`
    );
    if (!isConfirmed) return;
    try {
      const response = await fetchDeleteWorkoutProgram(id, sessionToken!);
      toast.success(response, {
        description: `${new Date().toLocaleString()}`,
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
      setWorkoutPrograms((prevPrograms) =>
        prevPrograms.filter((program) => program.id !== id)
      );
    } catch (error) {
      toast.error("Error When deleting workout program", {
        description: `${new Date().toLocaleString()}`,
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
    }
  };

  const handleViewDetail = (id: number) => {
    router.push(
      `/admin/workout-programs-management/workout-program-detail/${id}`
    );
  };

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      setPageNo(0);
      setWorkoutPrograms([]);
    }
  };

  return (
    <div className="max-w-7xl m-auto h-full flex flex-col">
      <header className="flex mt-[60px] rounded-lg items-center h-16 px-4 border-b shrink-0 md:px-6 bg-slate-700 text-white fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-2xl z-50">
        <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
            prefetch={false}
          >
            <span>List Workout Program</span>
          </Link>
        </nav>
        <div className="ml-auto">
          <Link href="/admin" className="text-lg font-semibold">
            Home
          </Link>
        </div>
      </header>
      <main className="flex-1 overflow-auto pt-20 p-6">
        {" "}
        <div className="flex items-center mb-4">
          <Input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder="Search workout programs..."
            className="w-full p-2 border border-gray-300 rounded-l-md"
          />
          <Button
            onClick={clearSearch}
            className="bg-transparent border border-gray-300 text-gray-500 hover:text-red-500 p-2 rounded-r-md focus:outline-none"
          >
            Clear
          </Button>
        </div>
        <InfiniteScroll
          dataLength={workoutPrograms.length}
          next={() => setPageNo(pageNo + 1)}
          hasMore={hasMoreWorkoutProgram}
          loader={<SkeletonCard />}
          endMessage={<p>No more workout programs to show</p>}
        >
          <div className="grid gap-6">
            {workoutPrograms.map((program, index) => (
              <Card key={index} className="w-full p-4">
                <div className="grid md:grid-cols-[150px_1fr] gap-4">
                  <div className="relative">
                    <img
                      src={program.img}
                      alt={program.name}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                  <div className="grid gap-2">
                    <h2 className="text-xl font-bold">{program.name}</h2>
                    <p className="text-muted-foreground">{program.detail}</p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      <div className="grid gap-1">
                        <div className="text-sm font-medium">Day</div>
                        <div>{program.day}</div>
                      </div>
                      <div className="grid gap-1">
                        <div className="text-sm font-medium">Equipment</div>
                        <div>{program.equipment}</div>
                      </div>
                      <div className="grid gap-1">
                        <div className="text-sm font-medium">Type</div>
                        <div>{program.type}</div>
                      </div>
                      <div className="grid gap-1">
                        <div className="text-sm font-medium">Time</div>
                        <div>{program.time}</div>
                      </div>
                    </div>
                    <div className="grid gap-2 mt-4">
                      <div className="flex flex-wrap gap-2">
                        <div className="text-sm font-medium">Topics:</div>
                        {program.programTopics.map((topic) => (
                          <span
                            key={topic.id}
                            className="bg-gray-200 text-gray-800 px-2 py-1 rounded"
                          >
                            {topic.name}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <div className="text-sm font-medium">Categories:</div>
                        {program.workoutProgramCategories.map((category) => (
                          <span
                            key={category.id}
                            className="bg-gray-200 text-gray-800 px-2 py-1 rounded"
                          >
                            {category.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <Button
                        variant="default"
                        onClick={() => handleViewDetail(program.id)}
                      >
                        View Detail
                      </Button>
                      <Button
                        variant="default"
                        onClick={() => handleEdit(program.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="default"
                        onClick={() => handleDelete(program.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </InfiniteScroll>
      </main>
    </div>
  );
};
export default ListWorkoutProgram;

function SkeletonCard() {
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <div className="grid md:grid-cols-[150px_1fr] gap-4">
        <div className="relative">
          <div className="w-full h-40 bg-gray-200 animate-pulse"></div>
        </div>
        <div className="grid gap-2">
          <div className="w-1/2 h-6 bg-gray-200 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 animate-pulse"></div>
            <div className="h-6 bg-gray-200 animate-pulse"></div>
            <div className="h-6 bg-gray-200 animate-pulse"></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            <div className="grid gap-1">
              <div className="w-1/3 h-5 bg-gray-200 animate-pulse"></div>
              <div className="w-2/3 h-5 bg-gray-200 animate-pulse"></div>
            </div>
            <div className="grid gap-1">
              <div className="w-1/3 h-5 bg-gray-200 animate-pulse"></div>
              <div className="w-2/3 h-5 bg-gray-200 animate-pulse"></div>
            </div>
            <div className="grid gap-1">
              <div className="w-1/3 h-5 bg-gray-200 animate-pulse"></div>
              <div className="w-2/3 h-5 bg-gray-200 animate-pulse"></div>
            </div>
            <div className="grid gap-1">
              <div className="w-1/3 h-5 bg-gray-200 animate-pulse"></div>
              <div className="w-2/3 h-5 bg-gray-200 animate-pulse"></div>
            </div>
          </div>
          <div className="grid gap-2 mt-4">
            <div className="w-1/3 h-5 bg-gray-200 animate-pulse"></div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="w-16 h-6 bg-gray-200 animate-pulse"
                ></div>
              ))}
            </div>
            <div className="w-1/3 h-5 bg-gray-200 animate-pulse"></div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="w-16 h-6 bg-gray-200 animate-pulse"
                ></div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="w-20 h-8 bg-gray-200 animate-pulse"></div>
            <div className="w-20 h-8 bg-gray-200 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
