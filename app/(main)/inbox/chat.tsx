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
import useUserFirebaseStore from "@/stores/user-firebase-store";
import {
   arrayUnion,
   doc,
   getDoc,
   onSnapshot,
   updateDoc,
} from "firebase/firestore";
import { MoveVerticalIcon, SendIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ChatListProps } from "./chat-list";
import { useBlockUserModal } from "@/stores/block-user-model";
import { useAuthStore } from "@/components/providers/auth-provider";
import moment from "moment";
import Link from "next/link";
interface FirebaseTimestamp {
   seconds: number;
   nanoseconds: number;
}
interface Message {
   senderId: string;
   text: string;
   createdAt: FirebaseTimestamp;
}
interface Chat {
   messages: Message[];
}
export type UserChats = {
   chat: Chat;
   chats: ChatListProps[];
};
const Chat = () => {
   const [chat, setChat] = useState<Chat>();
   const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
      useChatFireBaseStore((store) => store);
   const [text, setText] = useState("");
   const { user: userReal } = useAuthStore((store) => store);
   const { currentUser } = useUserFirebaseStore((store) => store);
   console.log("current", currentUser);
   const { open } = useBlockUserModal();
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
   console.log("Chat Data: ", chat);

   const handlePress = (e: any) => {
      if (e.key === "Enter") {
         handleSend();
      }
   };
   const handleSend = async () => {
      if (text === "") return;
      try {
         if (!chatId) return;
         await updateDoc(doc(db, "chats", chatId), {
            messages: arrayUnion({
               senderId: currentUser?.id,
               text,
               createdAt: new Date(),
            }),
         });

         const userIds = [currentUser?.id, user?.id].filter(
            (id): id is string => id !== undefined
         );
         userIds.forEach(async (id) => {
            const userChatsRef = doc(db, "userchats", id);
            const userChatsSnapshot = await getDoc(userChatsRef);
            if (userChatsSnapshot.exists()) {
               const userChatsData = userChatsSnapshot.data() as UserChats;
               console.log("User Chats Data: ", userChatsData);

               const chatIndex = userChatsData.chats.findIndex(
                  (chat: any) => chat.chatId === chatId
               );
               console.log(chatIndex);
               if (chatIndex !== -1) {
                  userChatsData.chats[chatIndex].lastMessage = text;
                  userChatsData.chats[chatIndex].isSeen =
                     id === currentUser?.id ? true : false;
                  userChatsData.chats[chatIndex].updatedAt = Date.now();

                  await updateDoc(userChatsRef, {
                     chats: userChatsData.chats,
                  });
                  console.log("Chat Updated: ", userChatsData.chats);
               }
            }
         });
         setText("");
      } catch (error) {
         console.log(error);
      }
   };
   const formatTimestamp = (timestamp: FirebaseTimestamp) => {
      const date = new Date(
         timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
      );
      return moment(date).fromNow();
   };
   return (
      <>
         <div className="flex flex-col">
            <div className="sticky top-0 flex h-[60px] items-center justify-between border-b bg-background px-4">
               <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 border">
                     <AvatarImage src={user?.avatar} />
                     <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <div className="text-sm font-medium">{user?.username}</div>
                  <Button
                     className="bg-red-500"
                     variant="secondary"
                     onClick={open}
                     disabled={isCurrentUserBlocked}
                  >
                     {isCurrentUserBlocked
                        ? "You are blocked"
                        : isReceiverBlocked
                        ? "User Blocked"
                        : "Block"}
                  </Button>
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
                     <DropdownMenuItem>
                        <Link href={`/${user?.username}`}>View profile</Link>
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
            <div className="flex-1 overflow-auto p-4">
               <div className="grid gap-4">
                  {chat?.messages?.map((message) => (
                     <div key={message?.createdAt.seconds}>
                        {message.senderId === currentUser?.id ? (
                           <div className="flex items-start gap-3 justify-end">
                              <div className="flex flex-col w-[60%]  rounded-md bg-primary p-3 text-sm text-primary-foreground">
                                 <p className="">{message.text}</p>
                                 <div className="mt-2 text-xs text-primary-foreground/80">
                                    {formatTimestamp(message.createdAt)}
                                 </div>
                              </div>
                              <Avatar className="h-8 w-8 border">
                                 <AvatarImage src={userReal?.avatar} />
                                 <AvatarFallback>AC</AvatarFallback>
                              </Avatar>
                           </div>
                        ) : (
                           <div className="flex items-start gap-3">
                              <Avatar className="h-8 w-8 border">
                                 <AvatarImage src={user?.avatar} />
                                 <AvatarFallback>AC</AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col w-[60%] rounded-md bg-gray-300 p-3 text-sm">
                                 <p>{message.text}</p>
                                 <div className="mt-2 text-xs text-muted-foreground">
                                    {formatTimestamp(message.createdAt)}
                                 </div>
                              </div>
                           </div>
                        )}
                     </div>
                  ))}
               </div>
            </div>
            <div className="sticky bottom-0 border-t bg-background px-4 py-3">
               <div className="relative">
                  <Textarea
                     placeholder={
                        isCurrentUserBlocked || isReceiverBlocked
                           ? "You cannot send a message"
                           : "Type your message..."
                     }
                     className="min-h-[48px] w-full rounded-2xl border border-neutral-400 bg-muted px-4 py-2 pr-16 text-sm shadow-sm"
                     onChange={(e) => setText(e.target.value)}
                     value={text}
                     onKeyDown={handlePress}
                     disabled={isCurrentUserBlocked || isReceiverBlocked}
                  />
                  <Button
                     type="button"
                     size="icon"
                     className="absolute right-3 top-3 h-8 w-8"
                     onClick={handleSend}
                     disabled={isCurrentUserBlocked || isReceiverBlocked}
                  >
                     <SendIcon className="h-4 w-4" />
                     <span className="sr-only">Send</span>
                  </Button>
               </div>
            </div>
         </div>
      </>
   );
};

export default Chat;
