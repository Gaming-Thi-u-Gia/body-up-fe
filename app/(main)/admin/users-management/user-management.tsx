"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { MoveVertical, Users } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchGetUser } from "@/utils/admin/fetch";
import { useAuthStore } from "@/components/providers/auth-provider";

type UserType = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | null;
  bio: string | null;
  role: string;
  createAt: string;
};

const UserManagement = () => {
  const { sessionToken } = useAuthStore((store) => store);
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMoreUsers, setHasMoreUsers] = useState(true);
  const [pageNo, setPageNo] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  useEffect(() => {
    getUsers(pageNo, searchQuery);
  }, [pageNo, searchQuery]);

  const getUsers = async (page: number, query: string) => {
    setIsLoading(true);
    try {
      const pageSize = 10;
      const data = await fetchGetUser(page, pageSize, query, sessionToken!);
      if (data.totalElements === 0) {
        setIsLoading(false);
        setHasMoreUsers(false);
      }
      console.log(data.content);
      const sortedData = data.content.sort((a: any, b: any) => b.id - a.id);
      setUsers((prevUsers) =>
        page === 0 ? sortedData : [...prevUsers, ...sortedData]
      );
      setHasMoreUsers(!data.last);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setPageNo(0);
    setUsers([]);
  };

  return (
    <div className="flex flex-col max-w-7xl m-auto min-h-screen">
      <header className="flex items-center rounded-lg h-16 px-4 border-b shrink-0 md:px-6 bg-slate-700 text-white fixed top-[60px] left-1/2 transform -translate-x-1/2 w-full max-w-screen-2xl z-50">
        <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
            prefetch={false}
          >
            <Users className="w-6 h-6" />
            <span>User Management</span>
          </Link>
        </nav>
        <div className="ml-auto">
          <Link href="/admin" className="text-lg font-semibold">
            Home
          </Link>
        </div>
      </header>

      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <Card>
          <CardContent>
            <div className="flex mt-10 items-center">
              <Input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search users..."
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
              dataLength={users.length}
              next={() => setPageNo(pageNo + 1)}
              hasMore={hasMoreUsers}
              loader={<h4>Loading...</h4>}
              endMessage={<p>No more users to show</p>}
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Avatar</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Avatar>
                          <AvatarImage
                            src={user.avatar || "/default-avatar.png"}
                          />
                          <AvatarFallback>{user.firstName[0]}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="default" size="icon">
                              <MoveVertical className="h-4 w-4" />
                              <span className="sr-only">More</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => setSelectedUser(user)}
                            >
                              View Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </InfiniteScroll>
          </CardContent>
        </Card>
      </main>
      {selectedUser && (
        <Dialog
          open={!!selectedUser}
          onOpenChange={() => setSelectedUser(null)}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>
                View and manage the details of this user.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="id" className="text-right">
                  ID
                </Label>
                <div className="col-span-3">{selectedUser.id}</div>
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="userName" className="text-right">
                  User Name
                </Label>
                <div className="col-span-3">{selectedUser.userName}</div>
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <div className="col-span-3">{`${selectedUser.firstName} ${selectedUser.lastName}`}</div>
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <div className="col-span-3">{selectedUser.email}</div>
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <div className="col-span-3">{selectedUser.role}</div>
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="joined" className="text-right">
                  Joined
                </Label>
                <div className="col-span-3">
                  {new Date(selectedUser.createAt).toLocaleDateString()}
                </div>
              </div>
              {selectedUser.bio && (
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="bio" className="text-right">
                    Bio
                  </Label>
                  <div className="col-span-3">{selectedUser.bio}</div>
                </div>
              )}
              {selectedUser.avatar && (
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="avatar" className="text-right">
                    Avatar
                  </Label>
                  <div className="col-span-3">
                    <img
                      src={selectedUser.avatar}
                      alt="Avatar"
                      className="w-20 h-20 rounded-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default UserManagement;
