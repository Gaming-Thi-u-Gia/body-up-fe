"use client";
import { Button } from "@/components/ui/button";
import {
  Computer,
  CookingPot,
  Highlighter,
  Tags,
  Users,
  Video,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  fetchGetMonthlyUserChallengeCompletedCount,
  fetchGetMonthlyUserChallengeUncompletedCount,
  fetchGetMonthlyUserCount,
  fetchGetTopUserCompletedChallenge,
  fetchGetTotalElements,
} from "@/utils/admin/fetch";
import { useAuthStore } from "@/components/providers/auth-provider";
import Link from "next/link";
import { Card } from "@/components/ui/cart";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";

export type TotalElementsType = {
  totalUser: number;
  totalUserChallengeUncompleted: number;
  totalUserChallengeCompleted: number;
  totalWorkoutProgram: number;
  totalVideo: number;
  totalRecipe: number;
  totalPost: number;
};

export type MonthlyUserCountType = {
  name: string;
  count: number;
};

export type UserLeaderboardType = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  userChallengeCompletedCount: number;
};

const Dashboard = () => {
  const { sessionToken } = useAuthStore((store) => store);
  const [totalElements, setTotalElements] = useState<TotalElementsType | null>(
    null
  );
  const [monthlyUserCount, setMonthlyUserCount] = useState<
    MonthlyUserCountType[]
  >([]);
  const [userLeaderboard, setUserLeaderboard] = useState<UserLeaderboardType[]>(
    []
  );
  const [userChallengeCompleted, setUserChallengeCompleted] = useState<
    MonthlyUserCountType[]
  >([]);
  const [userChallengeUncompleted, setUserChallengeUncompleted] = useState<
    MonthlyUserCountType[]
  >([]);

  useEffect(() => {
    const getTotalElements = async () => {
      try {
        const response = await fetchGetTotalElements(sessionToken!);
        setTotalElements(response);
      } catch (error) {
        console.log(error);
      }
    };

    const getMonthlyUserCount = async () => {
      try {
        const response = await fetchGetMonthlyUserCount(sessionToken!);
        if (Array.isArray(response)) {
          setMonthlyUserCount(response);
        } else {
          console.error("Expected array but got:", response);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getUserLeaderboard = async () => {
      try {
        const response = await fetchGetTopUserCompletedChallenge(sessionToken!);
        if (Array.isArray(response)) {
          setUserLeaderboard(response);
        } else {
          console.error("Expected array but got:", response);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getUserChallengeUncomplete = async () => {
      try {
        const response = await fetchGetMonthlyUserChallengeUncompletedCount(
          sessionToken!
        );
        if (Array.isArray(response)) {
          setUserChallengeUncompleted(response);
        } else {
          console.error("Expected array but got:", response);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getUserChallengeCompleted = async () => {
      try {
        const response = await fetchGetMonthlyUserChallengeCompletedCount(
          sessionToken!
        );
        if (Array.isArray(response)) {
          setUserChallengeCompleted(response);
        } else {
          console.error("Expected array but got:", response);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getTotalElements();
    getMonthlyUserCount();
    getUserLeaderboard();
    getUserChallengeUncomplete();
    getUserChallengeCompleted();
  }, [sessionToken]);

  if (!totalElements) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <main className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="flex items-center justify-center p-4">
            <div className="text-center">
              <Users className="h-6 w-6 mx-auto mb-2" />
              <h2 className="text-xl font-bold">Total Users</h2>
              <p className="text-2xl font-bold">{totalElements.totalUser}</p>
            </div>
          </Card>
          <Card className="flex items-center justify-center p-4">
            <div className="text-center">
              <Computer className="h-6 w-6 mx-auto mb-2" />
              <h2 className="text-xl font-bold">Total Workout Programs</h2>
              <p className="text-2xl font-bold">
                {totalElements.totalWorkoutProgram}
              </p>
            </div>
          </Card>
          <Card className="flex items-center justify-center p-4">
            <div className="text-center">
              <Video className="h-6 w-6 mx-auto mb-2" />
              <h2 className="text-xl font-bold">Total Workout Videos</h2>
              <p className="text-2xl font-bold">{totalElements.totalVideo}</p>
            </div>
          </Card>
          <Card className="flex items-center justify-center p-4">
            <div className="text-center">
              <CookingPot className="h-6 w-6 mx-auto mb-2" />
              <h2 className="text-xl font-bold">Total Recipes</h2>
              <p className="text-2xl font-bold">{totalElements.totalRecipe}</p>
            </div>
          </Card>
          <Card className="flex items-center justify-center p-4">
            <div className="text-center">
              <Tags className="h-6 w-6 mx-auto mb-2" />
              <h2 className="text-xl font-bold">Total Posts</h2>
              <p className="text-2xl font-bold">{totalElements.totalPost}</p>
            </div>
          </Card>
          <Card className="flex items-center justify-center p-4">
            <div className="text-center">
              <Highlighter className="h-6 w-6 mx-auto mb-2" />
              <h2 className="text-xl font-bold">
                Total User Challenge Uncompleted
              </h2>
              <p className="text-2xl font-bold">
                {totalElements.totalUserChallengeUncompleted}
              </p>
            </div>
          </Card>
          <Card className="flex items-center justify-center p-4">
            <div className="text-center">
              <Highlighter className="h-6 w-6 mx-auto mb-2" />
              <h2 className="text-xl font-bold">
                Total User Challenge Completed
              </h2>
              <p className="text-2xl font-bold">
                {totalElements.totalUserChallengeCompleted}
              </p>
            </div>
          </Card>
        </div>
        <aside className="lg:col-span-1 space-y-4">
          <Card className="p-4">
            <h2 className="text-xl font-bold mb-4">Actions</h2>
            <div className="space-y-2">
              <Button className="w-full" variant="default">
                <Link className="w-full" href="/admin/create-workout-program">
                  + Create Workout Program
                </Link>
              </Button>
              <Button className="w-full" variant="default">
                <Link className="w-full" href="/admin/add-new-video">
                  + Add New Video
                </Link>
              </Button>
              <Button className="w-full" variant="default">
                <Link className="w-full" href="/admin/add-new-recipe">
                  + Add New Recipe
                </Link>
              </Button>
            </div>
          </Card>
          <Card className="p-4">
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            <div className="space-y-2">
              <Button className="w-full" variant="default">
                <Link className="w-full" href="/admin/user-management">
                  Users Management
                </Link>
              </Button>
              <Button className="w-full" variant="default">
                <Link
                  className="w-full"
                  href="/admin/workout-program-management"
                >
                  Workout Programs Management
                </Link>
              </Button>
              <Button className="w-full" variant="default">
                <Link className="w-full" href="/admin/workout-video-management">
                  Workout Videos Management
                </Link>
              </Button>
              <Button className="w-full" variant="default">
                <Link className="w-full" href="/admin/recipes-management">
                  Recipes Management
                </Link>
              </Button>
              <Button className="w-full" variant="default">
                <Link className="w-full" href="/admin/posts-management">
                  Posts Management
                </Link>
              </Button>
            </div>
          </Card>
        </aside>
      </main>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">User Statistic</h2>
          <BarChart monthlyUserCount={monthlyUserCount} />
        </Card>
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">User Challenge</h2>
          <CurvedlineChart
            userChallengeCompleted={userChallengeCompleted}
            userChallengeUncompleted={userChallengeUncompleted}
          />
        </Card>
      </section>
      <section className="grid grid-cols-1 gap-4 mt-4">
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">Top User Challenges</h2>
          <UserLeaderboard userLeaderboard={userLeaderboard} />
        </Card>
      </section>
    </div>
  );
};
export default Dashboard;

function BarChart({
  monthlyUserCount,
}: {
  monthlyUserCount: MonthlyUserCountType[];
}) {
  return (
    <div className="aspect-[3]">
      <ResponsiveBar
        data={monthlyUserCount}
        keys={["count"]}
        indexBy="name"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={["#2563eb"]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A bar chart showing data"
      />
    </div>
  );
}

function CurvedlineChart({
  userChallengeCompleted,
  userChallengeUncompleted,
}: {
  userChallengeCompleted: MonthlyUserCountType[];
  userChallengeUncompleted: MonthlyUserCountType[];
}) {
  return (
    <div className="w-full aspect-[3]">
      <ResponsiveLine
        data={[
          {
            id: "Completed",
            data: userChallengeCompleted,
          },
          {
            id: "Uncompleted",
            data: userChallengeUncompleted,
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
        }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
      <div>
        <div className="flex">
          <span className="flex justify-center items-center rounded-full w-3 h-3 bg-[#2563eb] text-nowrap"></span>
          <span className="flex pl-2">User Challenge Uncompleted</span>
        </div>
        <div className="flex pt-2">
          <span className="flex justify-center items-center rounded-full w-3 h-3 bg-[#e11d48] text-nowrap"></span>
          <span className="flex pl-2">User Challenge Completed</span>
        </div>
      </div>
    </div>
  );
}

function UserLeaderboard({
  userLeaderboard,
}: {
  userLeaderboard: UserLeaderboardType[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b border-gray-200 text-left">ID</th>
            <th className="py-2 px-4 border-b border-gray-200 text-left">
              Username
            </th>
            <th className="py-2 px-4 border-b border-gray-200 text-left">
              First Name
            </th>
            <th className="py-2 px-4 border-b border-gray-200 text-left">
              Last Name
            </th>
            <th className="py-2 px-4 border-b border-gray-200 text-left">
              Email
            </th>
            <th className="py-2 px-4 border-b border-gray-200 text-left">
              User Challenge Completed Count
            </th>
          </tr>
        </thead>
        <tbody>
          {userLeaderboard.map((user, index) => (
            <tr key={user.id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
              <td className="py-2 px-4 border-b border-gray-200">{user.id}</td>
              <td className="py-2 px-4 border-b border-gray-200">
                {user.userName}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {user.firstName}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {user.lastName}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {user.email}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {user.userChallengeCompletedCount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
