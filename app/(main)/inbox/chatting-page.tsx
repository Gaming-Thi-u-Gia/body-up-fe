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
import ChatList from "./chat-list";
import Chat from "./chat";
import useChatFireBaseStore from "@/stores/chat-firebase-store";
import ChatAI from "./chat-ai";

export function ChattingPage() {
   const { chatId } = useChatFireBaseStore((store) => store);

   return (
      <div className="grid min-h-screen w-full grid-cols-[260px_1fr] bg-background">
         <div className="flex flex-col border-r bg-muted/40">
            <div className="sticky top-0 flex h-[60px] items-center justify-between border-b bg-background px-4">
               <div className="flex items-center gap-2 ">
                  <Avatar className="h-8 w-8 border">
                     <AvatarImage src="/placeholder-user.jpg" />
                     <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <div className="text-sm font-medium">BodyUp Chat</div>
               </div>
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button
                        variant="default"
                        size="icon"
                        className="rounded-full"
                     >
                        <MoveVerticalIcon className="h-4 w-4" />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                     <DropdownMenuItem>Settings</DropdownMenuItem>
                     <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>

            <ChatList />
         </div>
         {chatId === "AI" ? <ChatAI /> : <Chat />}
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
