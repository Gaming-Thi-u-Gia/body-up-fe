"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
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
import { MoveVertical, Search, Users } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchGetUser } from "@/utils/admin/fetch";
import { useAuthStore } from "@/components/providers/auth-provider";

type UserType = {
  id: number;
  userName: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  createAt: string;
};

export function ManagementUser() {
  const { sessionToken } = useAuthStore((store) => store);
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMoreUsers, setHasMoreUsers] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const pageSize = 10;
      const data = await fetchGetUser(pageNo, pageSize, sessionToken!);

      if (data.totalElements === 0) {
        setHasMoreUsers(false);
        setIsLoading(false);
        return;
      }

      setUsers((prevUsers) => [
        ...prevUsers,
        ...data.content.map((user: any) => ({
          ...user,
          name: `${user.firstName} ${user.lastName}`,
        })),
      ]);

      setPageNo((previous) => previous + 1);
      setHasMoreUsers(!data.last);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col max-w-7xl m-auto min-h-screen">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6 bg-black text-white">
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
          <CardHeader>
            <CardTitle className="text-2xl">Users</CardTitle>
            <CardDescription>Manage your users here.</CardDescription>
          </CardHeader>
          <CardContent>
            <InfiniteScroll
              dataLength={users.length}
              next={getUsers}
              hasMore={hasMoreUsers}
              loader={<h4>Loading...</h4>}
              endMessage={<p>No more users to show</p>}
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead>userName</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Avatar</TableHead>
                    <TableHead>Bio</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.userName}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Avatar>
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="text-ellipsis text-nowrap max-w-3 overflow-hidden">
                        {user.bio}
                      </TableCell>
                      <TableCell>{user.createAt}</TableCell>
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
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <div className="col-span-3">{selectedUser.name}</div>
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
                <div className="col-span-3">Admin</div>
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="joined" className="text-right">
                  Joined
                </Label>
                <div className="col-span-3">{selectedUser.createAt}</div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
