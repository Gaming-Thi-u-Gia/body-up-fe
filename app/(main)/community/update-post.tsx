// "use client";
// import React from "react";
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { PostSchema } from "@/schemas";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { z } from "zod";
// import { Textarea } from "@/components/ui/textarea";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";

// const EditPost = () => {
//     const form = useForm({
//         resolver: zodResolver(PostSchema),
//         defaultValues: {
//             title: "",
//             description: "",
//             badge: {},
//         },
//     });
//     const onSubmit = (data: z.infer<typeof PostSchema>) => {
//         console.log(data);
//     };
//     return (
//         <div className="w-full bg-white rounded-lg py-7">
//             <h1 className="px-5 py-2 text-[20px] font-semibold ">
//                 Update Your Post
//             </h1>

//             <Form {...form}>
//                 <form
//                     onSubmit={form.handleSubmit(onSubmit)}
//                     className="space-y-5 mt-2"
//                 >
//                     <div className="flex items-center justify-center px-8 py-5 w-[95%] bg-[#FAFAFA] mx-auto rounded-lg border border-[#E3E4EB]">
//                         <div className="space-y-2 w-[746px]">
//                             <span className="text-[10px] pt-2 font-bold flex items-center">
//                                 Post title
//                             </span>
//                             <FormField
//                                 control={form.control}
//                                 name="title"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormControl>
//                                             <Input
//                                                 {...field}
//                                                 type="input"
//                                                 placeholder="Write meaningfull post title"
//                                                 className=" text-[12px] bg-white hover:ring-1 hover:ring-black"
//                                             />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             ></FormField>
//                             <span className="text-[10px] pt-2 font-bold flex items-center">
//                                 Post details
//                             </span>

//                             <FormField
//                                 control={form.control}
//                                 name="description"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormControl>
//                                             <Textarea
//                                                 {...field}
//                                                 placeholder="Write a detailed post"
//                                                 className="rounded-lg bg-white p-3 text-[12px] h-[146px]"
//                                             />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             ></FormField>
//                             <span className="text-[10px] pt-2 font-bold flex items-center">
//                                 Select A Tag
//                             </span>

//                             <FormField
//                                 control={form.control}
//                                 name="badge"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormControl>
//                                             <Select
//                                                 onValueChange={field.onChange}
//                                                 value={field.value}
//                                             >
//                                                 <SelectTrigger className="w-full rounded-lg">
//                                                     <SelectValue placeholder="Select a tag" />
//                                                 </SelectTrigger>
//                                                 <SelectContent>
//                                                     <SelectItem value="Workout">
//                                                         Workout
//                                                     </SelectItem>
//                                                     <SelectItem value="Food">
//                                                         Food
//                                                     </SelectItem>
//                                                     <SelectItem value="Chloe's Programs">
//                                                         Chloe's Programs
//                                                     </SelectItem>
//                                                     <SelectItem value="Misc">
//                                                         Misc
//                                                     </SelectItem>
//                                                 </SelectContent>
//                                             </Select>
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             ></FormField>
//                         </div>
//                     </div>
//                     <div className=" flex items-center justify-end gap-2 mt-3 mr-5">
//                         <Button variant="default" type="button">
//                             Cancel
//                         </Button>
//                         <Button
//                             type="submit"
//                             variant="primary"
//                             className="px-10 py-2 flex"
//                         >
//                             Update
//                         </Button>
//                     </div>
//                 </form>
//             </Form>
//         </div>
//     );
// };

// export default EditPost;
