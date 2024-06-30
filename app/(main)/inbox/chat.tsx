/* eslint-disable react/no-unescaped-entities */
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/firebase";
import useChatFireBaseStore from "@/stores/chat-firebase-store";
import { doc, onSnapshot } from "firebase/firestore";
import { MoveVerticalIcon, SendIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const Chat = () => {
   const [chat, setChat] = useState();
   const { chatId } = useChatFireBaseStore((store) => store);
   useEffect(() => {
      if (!chatId) return;
      const unsub = onSnapshot(doc(db, "chats", chatId), async (res) => {
         //@ts-ignore
         setChat(res.data());
      });
      return () => {
         unsub();
      };
   }, [chatId]);

   return (
      <>
         {chat && (
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
                        <Button
                           variant="default"
                           size="icon"
                           className="rounded-full"
                        >
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
                  <div className="h-[40%] w-full flex justify-center items-center">
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
                              That's great to hear! Did you have a chance to
                              look at the new design?
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
         )}
      </>
   );
};

export default Chat;
