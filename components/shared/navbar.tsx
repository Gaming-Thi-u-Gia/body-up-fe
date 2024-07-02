"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { category } from "@/constants";
import message from "/public/message.svg";
import notifications from "/public/notifications.svg";
import Image from "next/image";
import { LogOut, Settings, User } from "lucide-react";
import defaultProfile from "/public/default-iProfile.png";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuPortal,
   DropdownMenuSeparator,
   DropdownMenuSub,
   DropdownMenuSubContent,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "../providers/auth-provider";
import { handleLogout } from "@/utils/auth";
import { auth, db } from "@/firebase";
import useUserFirebaseStore from "@/stores/user-firebase-store";
import { Avatar } from "../ui/avatar";
import { useEffect, useState } from "react";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { ChatListProps } from "@/app/(main)/inbox/chat-list";
import useChatFireBaseStore from "@/stores/chat-firebase-store";

// import Notification from "/Notification.svg";
export const Navbar = () => {
   const router = useRouter();
   const { isLoggedIn, logout, user } = useAuthStore((store) => store);
   const { setUser } = useUserFirebaseStore((store) => store);
   const pathname = usePathname();
   const [chats, setChats] = useState<ChatListProps[]>([]);
   const { currentUser } = useUserFirebaseStore((store) => store);
   const [countIsSeenMessage, setCountIsSeenMessage] = useState<number>(0);
   const { changeChat } = useChatFireBaseStore();
   const onClick = async (event: React.MouseEvent) => {
      event.preventDefault();
      await handleLogout().then(() => {
         logout();
         auth.signOut();
         setUser(null);
         router.push("/");
      });
   };
   console.log("chatsData:", chats);

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
                  setCountIsSeenMessage(
                     chatData.filter((chat) => chat.isSeen === false).length
                  );
                  setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
               }
            }
         );
         return () => {
            unsub();
         };
      }
   }, [currentUser?.id]);

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
      router.push("/inbox");
   };

   return (
      <nav className="bg-[#F7F7F7] border-b border-[#C4C4C4] fixed w-full z-50">
         <div className="max-w-7xl px-2 sm:px-6 lg:px-8 mx-auto ">
            <div className="h-[56px] flex justify-between items-center font-medium">
               <Link href="/" className="font-bold text-[20px]">
                  BODY UP!!!
               </Link>
               <ul className="flex justify-between items-center sm:items-stretch text-sm gap-6 h-full">
                  {category.map((item) => (
                     <li
                        key={item.category}
                        className="flex flex-col items-center justify-center leading-[54px] relative"
                     >
                        <Link href={item.url}>{item.category}</Link>
                        <hr
                           className={cn(
                              `bg-[#303033] h-[2px] rounded-[10px] w-full absolute bottom-0`,
                              pathname !== item.url && "hidden"
                           )}
                        />
                     </li>
                  ))}
               </ul>
               {!isLoggedIn ? (
                  <div className="flex gap-2">
                     <Button variant="default" size="sm" asChild>
                        <Link href="/signup">Sign up</Link>
                     </Button>
                     <Button variant="primary" size="sm" asChild>
                        <Link href="/login">Log in</Link>
                     </Button>
                  </div>
               ) : (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-4">
                     <div className="relative">
                        <button
                           type="button"
                           className="relative rounded-full p-1 text-gray-400 hover:text-white"
                        >
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                 <Image
                                    src={message || defaultProfile}
                                    alt="Profile"
                                    width={0}
                                    height={0}
                                    sizes="100"
                                 />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                 className="w-64 mt-[20%] ml-[5%]"
                                 side="left"
                              >
                                 <DropdownMenuLabel>
                                    Your Message
                                 </DropdownMenuLabel>
                                 <DropdownMenuSeparator />
                                 <DropdownMenuGroup>
                                    {chats.map((chat) => (
                                       <DropdownMenuItem key={chat.chatId}>
                                          <Link
                                             href="#"
                                             className={`flex
                                              ${
                                                 chat?.isSeen
                                                    ? "bg-transparent"
                                                    : "bg-[#4d7aeb]"
                                              } items-center w-full gap-3 rounded-md bg-muted/50 px-3 py-2 transition-colors hover:bg-muted`}
                                             prefetch={false}
                                             onClick={() => handleSelect(chat)}
                                          >
                                             <Avatar className="h-8 w-8 border">
                                                <Image
                                                   src={
                                                      chat.user.blocked?.includes(
                                                         currentUser?.id!
                                                      )
                                                         ? defaultProfile
                                                         : chat.user.avatar ??
                                                           ""
                                                   }
                                                   alt="logo"
                                                   width={32}
                                                   height={32}
                                                   className="cursor-pointer rounded-full"
                                                />
                                             </Avatar>
                                             <div className="flex-1 overflow-hidden">
                                                <div className="font-medium truncate">
                                                   {chat.user.blocked?.includes(
                                                      currentUser?.id!
                                                   )
                                                      ? "User"
                                                      : chat.user.username}
                                                </div>
                                                <div
                                                   className={`${
                                                      chat.isSeen
                                                         ? "text-muted-foreground"
                                                         : "font-bold text-black"
                                                   } text-sm  line-clamp-1 break-all`}
                                                >
                                                   {chat.lastMessage}
                                                </div>
                                             </div>
                                          </Link>
                                       </DropdownMenuItem>
                                    ))}
                                 </DropdownMenuGroup>
                                 <DropdownMenuSeparator />
                              </DropdownMenuContent>
                           </DropdownMenu>
                        </button>
                        <span
                           className={`${
                              countIsSeenMessage === 0
                                 ? "hidden"
                                 : "inline-flex"
                           } absolute top-1 right-1  items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full`}
                        >
                           {countIsSeenMessage}
                        </span>
                     </div>
                     <div className="relative">
                        <button
                           type="button"
                           className="relative rounded-full p-1 text-gray-400 hover:text-white"
                        >
                           <Image src={notifications} alt="message" />
                        </button>
                        <span className="absolute top-1 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                           3
                        </span>
                     </div>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <Image
                              src={user?.avatar || defaultProfile}
                              alt="Profile"
                              width={40}
                              height={40}
                              className="rounded-full cursor-pointer"
                           />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                           <DropdownMenuLabel>My Account</DropdownMenuLabel>
                           <DropdownMenuSeparator />
                           <DropdownMenuGroup>
                              <DropdownMenuItem>
                                 <Link
                                    href="/profile"
                                    className="w-full flex items-center"
                                 >
                                    <User className="mr-2 h-4 w-4" />
                                    Profile
                                 </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                 <Link
                                    href="/settings/preferences "
                                    className="w-full flex items-center"
                                 >
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                 </Link>
                              </DropdownMenuItem>
                           </DropdownMenuGroup>
                           <DropdownMenuSeparator />
                           <DropdownMenuGroup>
                              <DropdownMenuSub>
                                 <DropdownMenuPortal>
                                    <DropdownMenuSubContent></DropdownMenuSubContent>
                                 </DropdownMenuPortal>
                              </DropdownMenuSub>
                           </DropdownMenuGroup>
                           <DropdownMenuItem
                              onClick={(e) => {
                                 onClick(e);
                              }}
                           >
                              <span className="w-full flex items-center cursor-pointer">
                                 <LogOut className="mr-2 h-4 w-4" />
                                 Log out
                              </span>
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  </div>
               )}
            </div>
         </div>
      </nav>
   );
};
