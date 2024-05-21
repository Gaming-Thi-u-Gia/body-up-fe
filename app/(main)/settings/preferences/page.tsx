"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUpSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import defaultProfile from "/public/default-iProfile.png";
import { useAvatarModal } from "@/stores/use-avatar-model";
import { useUserStore } from "@/stores/use-user";

const PreferencesPage = () => {
    const { avatar } = useUserStore((store) => store);
    const { open } = useAvatarModal();
    const [profileTitle, setProfileTitle] = useState([]);
    const formSchema = z.object({
        username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
    });
    const form = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            username: "",
            bio: "",
            profileTitle: "",
        },
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-2 mt-2'
            >
                <div className=' flex m-0'>
                    <div className=' w-[604px] shrink-0 flex flex-col m-[64px] py-5'>
                        <h1 className='flex w-[124.753px] h-[31.43px] items-center text-[20px] leading-[31.3px] text-black font-semibold'>
                            Personal Info
                        </h1>
                        <label className='text-[#303033] font-medium text-md mt-5'>
                            Your name
                        </label>

                        <div className='flex flex-row justify-between '>
                            <div className='w-[294px] h-10 gap-[10px]'>
                                <FormField
                                    control={form.control}
                                    name='firstName'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder='First Name'
                                                    className='bg-white hover:ring-1 hover:ring-black '
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                ></FormField>
                            </div>
                            <div className='w-[294px] h-10 mb-5'>
                                <FormField
                                    control={form.control}
                                    name='lastName'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder='Last Name'
                                                    className='bg-white hover:ring-1 hover:ring-black'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                ></FormField>
                            </div>
                        </div>
                        <label className='text-[#303033] font-medium text-md leading-[22px]'>
                            Username
                        </label>
                        <div className='flex w-[604px] flex-col pt-1 pb-[10px] gap-[13px] mb-5 '>
                            <span className='block text-[#868A93] text-sm'>
                                Changing your username will also change your
                                profile link
                            </span>
                            <FormField
                                control={form.control}
                                name='username'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder='chloeting.com/'
                                                className='bg-white hover:ring-1 hover:ring-black'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                        </div>
                        <div className='w-full flex justify-between'>
                            <div className='w-[294.39px] '>
                                <label
                                    htmlFor=''
                                    className='text-[#303033] h-[22.4px]'
                                >
                                    Bio
                                </label>
                                <FormField
                                    control={form.control}
                                    name='username'
                                    render={({ field }) => (
                                        <Textarea
                                            placeholder='Add your bio...'
                                            className='bg-white hover:ring-1 hover:ring-black p-4'
                                        />
                                    )}
                                ></FormField>
                            </div>
                            <div className='w-[270px] flex flex-col items-start justify-start mr-6'>
                                <label
                                    htmlFor=''
                                    className='text-[#303033] h-[22.4px] flex-shrink-0'
                                >
                                    Profile Title
                                </label>

                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select a title to display' />
                                    </SelectTrigger>
                                    {profileTitle.length > 0 ? (
                                        <SelectContent>
                                            <SelectItem value='light'>
                                                Light
                                            </SelectItem>
                                            <SelectItem value='dark'>
                                                Dark
                                            </SelectItem>
                                            <SelectItem value='system'>
                                                System
                                            </SelectItem>
                                        </SelectContent>
                                    ) : (
                                        <SelectContent>
                                            <SelectItem value='null' disabled>
                                                No Title To select
                                            </SelectItem>
                                        </SelectContent>
                                    )}
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col m-[40px] justify-between h-[470px]'>
                        <div className='flex flex-col gap-3 m-[26px]'>
                            <Image
                                src={avatar || defaultProfile}
                                alt='profile'
                                width={100}
                                height={100}
                                className='rounded-full ml-6'
                            />
                            {/* <label
                              htmlFor=""
                              className="text-[#303033] h-[22.4px] font-medium flex-shrink-0 cursor-pointer"
                            >
                              Upload Profile Photo
                            </label> */}
                            <Button
                                type='button'
                                variant='primary'
                                size='full'
                                className='bg-transparent text-[#303033] font-medium ring-0 hover:ring-1'
                                onClick={open}
                            >
                                Upload Profile Photo
                            </Button>
                            <label
                                htmlFor=''
                                className='text-[#FF5858] h-[22.4px] flex-shrink-0 cursor-pointer'
                            >
                                Remove Profile Photo
                            </label>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <Button
                                type='button'
                                variant='primary'
                                size='full'
                                className='bg-transparent text-gray-500 ring-0 hover:ring-1'
                            >
                                Cancel
                            </Button>
                            <Button
                                type='submit'
                                variant='primary'
                                size='full'
                                className='p-3'
                            >
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default PreferencesPage;
