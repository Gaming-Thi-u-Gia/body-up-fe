"use client";
import { Button } from "@/components/ui/button";
import {
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import React from "react";
import defaultProfile from "/public/default-iProfile.png";
import { UserReal } from "./user-post-no-image";
import before_after from "/public/before-after-icon.svg";
import challenges_icon from "/public/challenges-icon.svg";
import useUserFirebaseStore from "@/stores/user-firebase-store";
import {
   arrayUnion,
   collection,
   doc,
   getDocs,
   query,
   serverTimestamp,
   setDoc,
   updateDoc,
   where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

const UserInfo = ({ user }: { user: UserReal }) => {
   const { currentUser } = useUserFirebaseStore((store) => store);
   const router = useRouter();
   const handleAddUserChat = async (user: UserReal) => {
      if (!currentUser) {
         toast.error("You need to login to view this page", {
            description: `${new Date().toLocaleString()}`,
            action: {
               label: "Close",
               onClick: () => console.log("Close"),
            },
         });
         router.push("/login");
         return;
      }
      if (user.email === currentUser?.email) {
         toast.error("You can't send a message to yourself", {
            description: `${new Date().toLocaleString()}`,
            action: {
               label: "Close",
               onClick: () => console.log("Close"),
            },
         });
         return;
      }
      if (user) {
         const chatRef = collection(db, "chats");
         const userChatsRef = collection(db, "userchats");
         const userRef = collection(db, "users");
         const username = user.email.split("@")[0];
         try {
            const q = query(userRef, where("username", "==", username));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
               // @ts-ignore
               const foundUser = querySnapshot.docs[0].data();
               console.log(foundUser);
               const newChatRef = doc(chatRef); // Create a new chat document reference
               await setDoc(newChatRef, {
                  createdAt: serverTimestamp(),
                  messages: [],
               });

               // Check if the user and currentUser are properly set
               if (!foundUser || !currentUser) {
                  console.log("User data is missing");
                  return;
               }

               await updateDoc(doc(userChatsRef, foundUser.id), {
                  chats: arrayUnion({
                     chatId: newChatRef.id,
                     lastMessage: "",
                     receiverId: currentUser.id,
                     updatedAt: Date.now(),
                  }),
               });

               await updateDoc(doc(userChatsRef, currentUser.id), {
                  chats: arrayUnion({
                     chatId: newChatRef.id,
                     lastMessage: "",
                     receiverId: foundUser.id,
                     updatedAt: Date.now(),
                  }),
               });
               router.push("/inbox");
            } else {
               console.log("No user found with the provided username");
            }
         } catch (error) {
            console.log(error);
         }
      }
   };
   return (
      <Sheet>
         <SheetTrigger>
            <Image
               src={user.avatar || defaultProfile}
               alt="logo"
               width={32}
               height={32}
               className="cursor-pointer rounded-full"
            />
         </SheetTrigger>
         <SheetContent className="w-[350px]">
            <SheetHeader>
               <SheetTitle className="text-sm font-medium border-b border-gray-200 pb-4">
                  {user.userName2}
               </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col">
               <Image
                  src={user.avatar || defaultProfile}
                  alt="logo"
                  width={40}
                  height={40}
                  className="cursor-pointer mt-2 rounded-full"
               />
               <label className="text-[16px] font-semibold mt-2" htmlFor="">
                  {user.userName2}
               </label>
               <div className="flex flex-col gap-2 mt-1">
                  <span className="text-sm">{user.email}</span>

                  {/* <div className="flex gap-1">
                     <Image
                        src={before_after}
                        width={18}
                        height={18}
                        alt="logo"
                     />
                     <label htmlFor="" className="text-sm">
                        0 Challenges Completed
                     </label>
                  </div> */}
                  <div className="flex gap-1">
                     <Image
                        src={challenges_icon}
                        width={18}
                        height={18}
                        alt="logo"
                     />
                     <label htmlFor="" className="text-sm">
                        120 Achievement Points
                     </label>
                  </div>
               </div>
               <div className="flex gap-2 mt-4">
                  <Link href={`/${user.userName2}`}>
                     <Button variant="primary">View Profile</Button>
                  </Link>
                  <Button
                     variant="default"
                     className="bg-[#EFF0F4]"
                     onClick={() => handleAddUserChat(user)}
                  >
                     Send Message
                  </Button>
               </div>
            </div>
         </SheetContent>
      </Sheet>
   );
};

export default UserInfo;
