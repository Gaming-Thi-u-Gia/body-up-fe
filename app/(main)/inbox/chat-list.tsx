"use client";
/* eslint-disable react/no-unescaped-entities */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { db } from "@/firebase";
import useUserFirebaseStore, { User } from "@/stores/user-firebase-store";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import defaultProfile from "/public/default-iProfile.png";
import { Button } from "@/components/ui/button";
import useChatFireBaseStore from "@/stores/chat-firebase-store";
import { useAddChatModel } from "@/stores/add-chat-user";
import logo_ai from "/public/Ailogo.png";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type ChatListProps = {
   chatId: string;
   lastMessage: string;
   isSeen: boolean;
   updatedAt: number;
   receiverId: string;
   user: User;
};

const ChatList = () => {
   const [chats, setChats] = useState<ChatListProps[]>([]);
   const { currentUser } = useUserFirebaseStore((store) => store);
   const [username, setUsername] = useState("");
   const { open } = useAddChatModel();
   const { changeChat } = useChatFireBaseStore((store) => store);
   const router = useRouter();
   useEffect(() => {
      if (currentUser?.id) {
         const unsub = onSnapshot(
            doc(db, "userchats", currentUser.id),
            async (res) => {
               const data = res.data();
               if (data && data.chats) {
                  const items = data.chats;

                  const promises = items.map(async (item: ChatListProps) => {
                     const userDocRef = doc(db, "users", item.receiverId);
                     const userDocSnap = await getDoc(userDocRef);
                     const user = userDocSnap.data();
                     return { ...item, user };
                  });
                  const chatData = await Promise.all(promises);
                  setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
               }
            }
         );
         return () => {
            unsub();
         };
      }
   }, [currentUser?.id]);

   console.log(username);
   const handleSelect = async (chat: ChatListProps) => {
      const userChats = chats.map((item) => {
         const { user, ...rest } = item;
         return rest;
      });
      const chatIndex = userChats.findIndex(
         (item) => item.chatId === chat.chatId
      );
      userChats[chatIndex].isSeen = true;
      if (currentUser?.id) {
         const userChatsRef = doc(db, "userchats", currentUser?.id);
         try {
            await updateDoc(userChatsRef, {
               chats: userChats,
            });
         } catch (error) {
            console.log(error);
         }
      }
      if (chat) {
         changeChat(chat.chatId, chat.user);
      }
   };
   const filteredChats = chats.filter((chat) =>
      chat.user.username?.toLowerCase().includes(username.toLowerCase())
   );

   const handleAIChatId = async (id: string) => {
      changeChat(id, currentUser!);
   };

   if (!currentUser) {
      toast.error("Please login to continue");
      router.push("/login");
      return null;
   }

   return (
      <div className="flex-1 overflow-auto">
         <div className="border-b bg-background px-4 py-3 flex items-center gap-2">
            <Input
               type="search username"
               placeholder="Search contacts..."
               className="w-full rounded-md bg-muted px-3 py-2 text-sm"
               onChange={(e) => setUsername(e.target.value)}
               value={username}
            />
            <Button
               type="button"
               variant={"secondary"}
               onClick={open}
               className=" p-2 bg-primary flex items-center justify-center rounded-md text-primary-foreground"
            >
               Add
            </Button>
         </div>

         <div className="grid gap-2">
            <Link
               href="#"
               className={`flex  items-center gap-3 rounded-md bg-muted/50 px-3 py-2 transition-colors hover:bg-muted`}
               prefetch={false}
               onClick={() => handleAIChatId("AI")}
            >
               <Avatar className="h-8 w-8 border">
                  <Image
                     src={logo_ai}
                     alt="logo"
                     width={32}
                     height={32}
                     className="cursor-pointer rounded-full"
                  />
               </Avatar>
               <div className="flex-1 overflow-hidden">
                  <div className="font-medium truncate">Health Care</div>
                  <div className="text-sm text-muted-foreground line-clamp-1 break-all">
                     Ask me anything...
                  </div>
               </div>
            </Link>

            {filteredChats.map((chat) => (
               <Link
                  href="#"
                  className={`flex ${
                     chat?.isSeen ? "bg-transparent" : "bg-[#5886fc]"
                  } items-center gap-3 rounded-md bg-muted/50 px-3 py-2 transition-colors hover:bg-muted`}
                  prefetch={false}
                  key={chat.chatId}
                  onClick={() => handleSelect(chat)}
               >
                  <Avatar className="h-8 w-8 border">
                     <Image
                        src={
                           chat.user.blocked?.includes(currentUser?.id!)
                              ? defaultProfile
                              : chat.user.avatar ?? ""
                        }
                        alt="logo"
                        width={32}
                        height={32}
                        className="cursor-pointer rounded-full"
                     />
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                     <div className="font-medium truncate">
                        {chat.user.blocked?.includes(currentUser?.id!)
                           ? "User"
                           : chat.user.username}
                     </div>
                     <div className="text-sm text-muted-foreground line-clamp-1 break-all">
                        {chat.lastMessage}
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </div>
   );
};

export default ChatList;
