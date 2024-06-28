/* eslint-disable react/no-unescaped-entities */
"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

export function ChattingPage() {
  return (
    <div className="grid min-h-screen w-full grid-cols-[260px_1fr] bg-background">
      <div className="flex flex-col border-r bg-muted/40">
        <div className="sticky top-0 flex h-[60px] items-center justify-between border-b bg-background px-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="text-sm font-medium">Acme Chat</div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" size="icon" className="rounded-full">
                <MoveVerticalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="border-b bg-background px-4 py-3">
            <Input
              type="search"
              placeholder="Search contacts..."
              className="w-full rounded-md bg-muted px-3 py-2 text-sm"
            />
          </div>
          <div className="grid gap-2">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md bg-muted/50 px-3 py-2 transition-colors hover:bg-muted"
              prefetch={false}
            >
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <div className="font-medium truncate">Olivia Smith</div>
                <div className="text-sm text-muted-foreground line-clamp-1 break-all">
                  Hey, how's it going?
                </div>
              </div>
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                3
              </Badge>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md bg-muted/50 px-3 py-2 transition-colors hover:bg-muted"
              prefetch={false}
            >
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <div className="font-medium truncate">Liam Johnson</div>
                <div className="text-sm text-muted-foreground truncate">
                  Let's discuss the project.
                </div>
              </div>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md bg-muted/50 px-3 py-2 transition-colors hover:bg-muted"
              prefetch={false}
            >
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <div className="font-medium truncate">Emma Brown</div>
                <div className="text-sm text-muted-foreground truncate">
                  Did you see the new design?
                </div>
              </div>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md bg-muted/50 px-3 py-2 transition-colors hover:bg-muted"
              prefetch={false}
            >
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <div className="font-medium truncate">Noah Williams</div>
                <div className="text-sm text-muted-foreground truncate">
                  I have a question about the API.
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="sticky top-0 flex h-[60px] items-center justify-between border-b bg-background px-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="text-sm font-medium">Olivia Smith</div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" size="icon" className="rounded-full">
                <MoveVerticalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View profile</DropdownMenuItem>
              <DropdownMenuItem>Mute conversation</DropdownMenuItem>
              <DropdownMenuItem>Delete conversation</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <div className="h-[50%] w-full flex justify-center items-center">
            <div className="flex items-center justify-center w-full gap-2 pt-[200px]">
              <hr className="w-[45%] h-1" />
              <span className="text-gray-400 text-sm font-medium">
                11th Jun 2024
              </span>
              <hr className="w-[45%] h-1" />
            </div>
          </div>
          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <div className="flex-1 rounded-md bg-muted p-3 text-sm">
                <p>Hey, how's it going?</p>
                <div className="mt-2 text-xs text-muted-foreground">
                  3:45 PM
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 justify-end">
              <div className="flex-1 rounded-md bg-primary p-3 text-sm text-primary-foreground">
                <p>I'm doing great, thanks for asking!</p>
                <div className="mt-2 text-xs text-primary-foreground/80">
                  3:46 PM
                </div>
              </div>
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <div className="flex-1 rounded-md bg-muted p-3 text-sm">
                <p>
                  That's great to hear! Did you have a chance to look at the new
                  design?
                </p>
                <div className="mt-2 text-xs text-muted-foreground">
                  3:47 PM
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 justify-end">
              <div className="flex-1 rounded-md bg-primary p-3 text-sm text-primary-foreground">
                <p>
                  Yes, I did! I really like the new look, it's a big
                  improvement.
                </p>
                <div className="mt-2 text-xs text-primary-foreground/80">
                  3:48 PM
                </div>
              </div>
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 border-t bg-background px-4 py-3">
          <div className="relative">
            <Textarea
              placeholder="Type your message..."
              className="min-h-[48px] w-full rounded-2xl border border-neutral-400 bg-muted px-4 py-2 pr-16 text-sm shadow-sm"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-3 top-3 h-8 w-8"
            >
              <SendIcon className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MoveVerticalIcon(props: any) {
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
      <polyline points="8 18 12 22 16 18" />
      <polyline points="8 6 12 2 16 6" />
      <line x1="12" x2="12" y1="2" y2="22" />
    </svg>
  );
}

function SendIcon(props: any) {
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
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
