"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  fetchDeleteWorkoutProgram,
  fetchGetWorkoutPrograms,
} from "@/utils/admin/fetch";
import { useAuthStore } from "@/components/providers/auth-provider";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";

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

export function ViewAll() {
  const { sessionToken } = useAuthStore((store) => store);
  const router = useRouter();
  const [workoutPrograms, setWorkoutPrograms] = useState<WorkoutProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMoreWorkoutProgram, setHasMoreWorkoutProgram] = useState(true);
  const [pageNo, setPageNo] = useState(0);

  useEffect(() => {
    getWorkoutProgram();
  }, []);

  const getWorkoutProgram = async () => {
    setIsLoading(true);
    try {
      const pageSize = 4;
      const data = await fetchGetWorkoutPrograms(
        pageNo,
        pageSize,
        sessionToken!
      );

      if (data.totalElements === 0) {
        setHasMoreWorkoutProgram(false);
        setIsLoading(false);
        return;
      }
      const sortedData = data.content.sort((a: any, b: any) => b.id - a.id);
      setWorkoutPrograms((prev) => [...prev, ...sortedData]);
      setPageNo((previous) => previous + 1);
      setHasMoreWorkoutProgram(!data.last);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/workout-program-management/edit-program/${id}`);
  };

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the workout program with ${id}?`
    );
    if (!isConfirmed) return;
    try {
      const response = await fetchDeleteWorkoutProgram(id, sessionToken!);
      console.log(response);
      setWorkoutPrograms((prevPrograms) =>
        prevPrograms.filter((program) => program.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewDetail = (id: number) => {
    router.push(
      `/admin/workout-program-management/workout-program-detail/${id}`
    );
  };

  return (
    <div className="max-w-7xl m-auto h-full flex flex-col">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6 bg-black text-white">
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
      <main className="flex-1 overflow-auto p-6">
        <InfiniteScroll
          dataLength={workoutPrograms.length}
          next={getWorkoutProgram}
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
}
function SkeletonLoader() {
  return (
    <div className="grid gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}

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
