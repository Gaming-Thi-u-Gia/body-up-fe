import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoveVerticalIcon, SendIcon } from "lucide-react";
import { useAuthStore } from "@/components/providers/auth-provider";
import moment from "moment";
import {
   GoogleGenerativeAI,
   HarmCategory,
   HarmBlockThreshold,
} from "@google/generative-ai";
import { Textarea } from "@/components/ui/textarea";
import logo_ai from "/public/Ailogo.png";
import Image from "next/image";
interface Message {
   text: string;
   role: "user" | "bot";
   timestamp: Date;
   parts: Part[];
}
interface Part {
   text: string;
}

const ChatAI = () => {
   const [chat, setChat] = useState<any>(null);
   const { user } = useAuthStore((store) => store);
   const [userInput, setUserInput] = useState("");
   const [messages, setMessages] = useState<Message[]>([]);
   const [isTyping, setIsTyping] = useState(false);
   const api_key = process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY || "";
   const MODEL_NAME = "gemini-1.0-pro-001";
   const genAI = new GoogleGenerativeAI(api_key);
   const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
   };
   const safetySettings = [
      {
         category: HarmCategory.HARM_CATEGORY_HARASSMENT,
         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
         category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
         category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
         category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
   ];
   useEffect(() => {
      const initChat = async () => {
         try {
            const newChat = await genAI
               .getGenerativeModel({ model: MODEL_NAME })
               .startChat({
                  generationConfig,
                  safetySettings,
                  history: messages.map((msg) => ({
                     text: msg.text,
                     role: msg.role,
                     parts: msg.parts,
                  })),
               });
            setChat(newChat);
         } catch (error) {
            console.log(error);
         }
      };
      initChat();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const handleSendMessage = async () => {
      try {
         const userMessage = {
            text: userInput,
            role: "user",
            timestamp: new Date(),
         };
         setMessages((prevMessages: any) => [...prevMessages, userMessage]);
         setUserInput("");
         setIsTyping(true);
         if (chat) {
            const result = await chat.sendMessage(userInput);
            const botMessage = {
               text: result.response.text(),
               role: "bot",
               timestamp: new Date(),
            };
            setMessages((prevMessages: any) => [...prevMessages, botMessage]);
         }
         setIsTyping(false);
      } catch (error) {
         console.log(error);
         setIsTyping(false);
      }
   };

   const handleKeyPress = (e: any) => {
      if (e.key === "Enter") {
         handleSendMessage();
      }
   };

   return (
      <>
         <div className="flex flex-col">
            <div className="sticky top-0 flex h-[60px] items-center justify-between border-b bg-background px-4">
               <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 border">
                     <Image
                        src={logo_ai}
                        alt="Profile"
                        width={0}
                        height={0}
                        sizes="100"
                     />
                     <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <div className="text-sm font-medium">Health Assistance</div>
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
                        {/* <Link href={`/${user?.username}`}>View profile</Link> */}
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
            <div className="flex-1 overflow-auto p-4">
               <div className="grid gap-4">
                  {messages.map((message, index) => (
                     <div key={index}>
                        {message.role === "user" ? (
                           <div className="flex items-start gap-3 justify-end">
                              <div className="flex flex-col w-[60%]  rounded-md bg-primary p-3 text-sm text-primary-foreground">
                                 <p className="">{message.text}</p>
                                 <div className="mt-2 text-xs text-primary-foreground/80">
                                    {moment(message.timestamp).fromNow()}
                                 </div>
                              </div>
                              <Avatar className="h-8 w-8 border">
                                 <AvatarImage src={user?.avatar || ""} />
                                 <AvatarFallback>AC</AvatarFallback>
                              </Avatar>
                           </div>
                        ) : (
                           <div className="flex items-start gap-3">
                              <Avatar className="h-8 w-8 border">
                                 <Image
                                    src={logo_ai}
                                    alt="Profile"
                                    width={0}
                                    height={0}
                                    sizes="100"
                                 />
                                 <AvatarFallback>AC</AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col w-[60%] rounded-md bg-gray-300 p-3 text-sm">
                                 <p>{message.text}</p>
                                 <div className="mt-2 text-xs text-muted-foreground">
                                    {moment(message.timestamp).fromNow()}
                                 </div>
                              </div>
                           </div>
                        )}
                     </div>
                  ))}
                  {isTyping && (
                     <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8 border">
                           <Image
                              src={logo_ai}
                              alt="Profile"
                              width={0}
                              height={0}
                              sizes="100"
                           />
                           <AvatarFallback>AC</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col w-[60%] rounded-md bg-gray-300 p-3 text-sm">
                           <p>...</p>
                           <div className="mt-2 text-xs text-muted-foreground">
                              Typing...
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            </div>
            <div className="sticky bottom-0 border-t bg-background px-4 py-3">
               <div className="relative">
                  <Textarea
                     placeholder="Type your message..."
                     className="min-h-[48px] w-full rounded-2xl border border-neutral-400 bg-muted px-4 py-2 pr-16 text-sm shadow-sm"
                     onChange={(e) => setUserInput(e.target.value)}
                     onKeyDown={handleKeyPress}
                     value={userInput}
                  />
                  <Button
                     size="icon"
                     className="absolute right-3 top-3 h-8 w-8"
                     onClick={handleSendMessage}
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

export default ChatAI;
