"use client";
import {
   AlertDialog,
   AlertDialogContent,
   AlertDialogHeader,
   AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";

import { useAddChatModel } from "@/stores/add-chat-user";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import defaultProfile from "/public/default-iProfile.png";
import Image from "next/image";
import useUserFirebaseStore, { User } from "@/stores/user-firebase-store";
import {
   arrayUnion,
   collection,
   doc,
   getDoc,
   getDocs,
   query,
   serverTimestamp,
   setDoc,
   updateDoc,
   where,
} from "firebase/firestore";
import { db } from "@/firebase";
// export type ChatUser = {
//    id: string;
//    username: string;
//    avatar?: string;
//    // add any other fields that exist in your user document
// };
export function AddChatUser() {
   const { isOpen, close } = useAddChatModel();
   const [isClient, setIsClient] = useState(false);
   const [username, setUsername] = useState("");
   const [user, setUser] = useState<User>();
   const { currentUser } = useUserFirebaseStore((store) => store);
   useEffect(() => setIsClient(true), []);
   const handleKeyPress = (e: any) => {
      if (e.key === "Enter") {
         handleSearch();
      }
   };
   console.log("Current User", currentUser);

   const handleSearch = async () => {
      if (username !== "") {
         const userRef = collection(db, "users");
         const q = query(userRef, where("username", "==", username));
         const querySnapshot = await getDocs(q);
         if (!querySnapshot.empty) {
            // @ts-ignore
            setUser(querySnapshot.docs[0].data());
            console.log(user);
         }
      }
   };
   const handleAddUserChat = async () => {
      const chatRef = collection(db, "chats");
      const userChatsRef = collection(db, "userchats");
      try {
         const newChatRef = doc(chatRef);
         await setDoc(newChatRef, {
            createdAt: serverTimestamp(),
            messages: [],
         });

         await updateDoc(doc(userChatsRef, user?.id), {
            chats: arrayUnion({
               chatId: newChatRef.id,
               lastMessage: "",
               receiverId: currentUser?.id,
               updatedAt: Date.now(),
            }),
         });

         await updateDoc(doc(userChatsRef, currentUser?.id), {
            chats: arrayUnion({
               chatId: newChatRef.id,
               lastMessage: "",
               receiverId: user?.id,
               updatedAt: Date.now(),
            }),
         });
         close();
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <AlertDialog open={isOpen} onOpenChange={close}>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Add User To Chat</AlertDialogTitle>
               <div className="flex flex-col">
                  <div className="border-b bg-background px-4 py-3 flex items-center gap-2">
                     <Input
                        type="search"
                        placeholder="Search contacts..."
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={handleKeyPress}
                        value={username}
                     />
                     <Button
                        type="button"
                        variant={"secondary"}
                        className=" bg-primary rounded-md text-primary-foreground"
                        onClick={handleSearch}
                     >
                        Search
                     </Button>
                  </div>
                  {user && (
                     <div className="flex justify-between items-center mt-5">
                        <div className="flex items-center gap-4">
                           <Image
                              src={user.avatar || defaultProfile}
                              alt="logo"
                              width={32}
                              height={32}
                              className="cursor-pointer rounded-full"
                           />
                           <span className="text-[16px] font-medium">
                              {user.username}
                           </span>
                        </div>
                        <div className="flex items-center gap-3">
                           <Button variant="secondary" onClick={close}>
                              Cancel
                           </Button>
                           <Button
                              type="button"
                              variant="secondary"
                              className=" bg-primary rounded-md text-primary-foreground"
                              onClick={handleAddUserChat}
                           >
                              Add
                           </Button>
                        </div>
                     </div>
                  )}
               </div>
            </AlertDialogHeader>
         </AlertDialogContent>
      </AlertDialog>
   );
}
