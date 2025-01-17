"use client";
import { useCallback, useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { CalendarIcon, Eye, EyeOff, Router, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { UploadPhotoSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
    addProgressPhoto,
    getProgressPhotoById,
    updateProgreePhoto,
} from "@/utils/user";
import { useAuthStore } from "@/components/providers/auth-provider";
import { useUploadPhotoModal } from "@/stores/use-upload-photo";
import { useRouter } from "next/navigation";
type Props = {
    progressPhotoId?: number;
};
export const UploadPhotoForm = () => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const { close, progressPhotoId, update } = useUploadPhotoModal(
        (store) => store
    );
    const { sessionToken } = useAuthStore((store) => store);
    const form = useForm({
        resolver: zodResolver(UploadPhotoSchema),
        defaultValues: {
            photoAngle: "front",
            visibility: false,
            date: new Date(),
            caption: "",
            imgUrl: null,
        },
    });
    const [preview, setPreview] = useState<string | null>(null);
    useEffect(() => {
        if (!progressPhotoId || progressPhotoId < 0) return;
        getProgressPhotoById(sessionToken!, progressPhotoId!).then((res) => {
            form.setValue("photoAngle", res.payload.photoAngle);
            form.setValue("visibility", res.payload.visibility);
            form.setValue("date", new Date(res.payload.date));
            form.setValue("caption", res.payload.caption);
            setPreview(res.payload.imgUrl);
        });
    }, [progressPhotoId, sessionToken, form]);
    const onDrop = useCallback(
        (acceptedFiles: FileList, fileRejections: FileList) => {
            // Do something with the files
            if (fileRejections.length > 0) {
                toast.error("Invalid file type or file size is too large");
                return;
            }
            const file = new FileReader();
            file.onload = () => {
                setPreview(file.result as string);
            };

            file.readAsDataURL(acceptedFiles[0]);
        },
        []
    );
    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps,
        isDragActive,
    } = useDropzone({
        //@ts-ignore
        onDrop,
        accept: {
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"],
        },
        maxSize: 10 * 1024 * 1024,
    });
    const handleDelete = () => {
        setPreview(null);
        form.setValue("imgUrl", null);
    };
    const onSubmit = (data: z.infer<typeof UploadPhotoSchema>) => {
        data.imgUrl = acceptedFiles[0];
        startTransition(async () => {
            try {
                if (progressPhotoId > 0) {
                    const res = await updateProgreePhoto(
                        sessionToken!,
                        data,
                        preview!,
                        progressPhotoId
                    );
                    toast.success("Update Success!", {
                        description: `${new Date().toLocaleString()}`,
                        action: {
                            label: "Close",
                            onClick: () => console.log("Close"),
                        },
                    });
                } else {
                    const res = await addProgressPhoto(
                        sessionToken!,
                        data,
                        preview!
                    );
                    toast.success("Save Photo Success!", {
                        description: `${new Date().toLocaleString()}`,
                        action: {
                            label: "Close",
                            onClick: () => console.log("Close"),
                        },
                    });
                    update(res.payload);
                }
                close();
                //TODO: refresh page
            } catch (error) {
                toast.error("Save Photo Failed!", {
                    description: `${new Date().toLocaleString()}`,
                    action: {
                        label: "Close",
                        onClick: () => console.log("Close"),
                    },
                });
                console.log(error);
            }
        });
    };
    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-5 mt-2'
                >
                    <div className='flex justify-between'>
                        {!preview ? (
                            <div className='w-[298px] h-[366px] rounded-xl overflow-hidden'>
                                <FormField
                                    control={form.control}
                                    name='imgUrl'
                                    render={({ field }) => (
                                        <FormItem className='w-full h-full'>
                                            <FormControl>
                                                <div
                                                    className='flex flex-col justify-center items-center w-[298px] h-[366px] py-[16px] border-dashed border-[#D9D9D9] hover:border-[#c1e2ff] border-2 rounded-xl cursor-pointer group '
                                                    {...getRootProps()}
                                                >
                                                    {/* @ts-ignore */}
                                                    <Input
                                                        {...field}
                                                        className='bg-transparent'
                                                        type='file'
                                                        value={undefined}
                                                        {...getInputProps()}
                                                    />

                                                    <div className='flex justify-center items-center p-3 border border-black rounded-full w-fit group-hover:border-[#96ceff] group-hover:text-[#4fadff]'>
                                                        <Upload
                                                            width={16}
                                                            height={16}
                                                        />
                                                    </div>
                                                    <h4 className='text-base font-semibold group-hover:text-[#4fadff]'>
                                                        Choose a file or drag it
                                                        here
                                                    </h4>
                                                    <p className='text-center mt-2 group-hover:text-[#4fadff] text-sm'>
                                                        {isDragActive
                                                            ? "Drop it here..."
                                                            : "Upload JPEG or PNG image files up to 10MB"}
                                                    </p>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                ></FormField>
                                {/* TODO */}
                            </div>
                        ) : (
                            <div className='w-[298px] h-[366px] rounded-xl bg bg-[#fff7f7] flex items-center overflow-hidden'>
                                <Image
                                    src={preview!}
                                    alt='preview'
                                    width={298}
                                    height={366}
                                    layout='responsive'
                                    objectFit='cover'
                                />
                            </div>
                        )}
                        <div className='space-y-4 ml-4'>
                            <div className='photo-direction'>
                                <h4 className='text-xs text-[#868a93] font-bold'>
                                    PHOTO ANGLE
                                </h4>
                                <div className='flex gap-2 mt-2'>
                                    <FormField
                                        control={form.control}
                                        name='photoAngle'
                                        render={({ field }) => (
                                            <FormItem>
                                                <Button
                                                    variant={
                                                        form.watch(
                                                            "photoAngle"
                                                        ) === "front"
                                                            ? "active"
                                                            : "default"
                                                    }
                                                    size='smP4'
                                                    asChild
                                                >
                                                    <FormLabel>
                                                        FRONT ANGLE
                                                    </FormLabel>
                                                </Button>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type='radio'
                                                        value='front'
                                                        className='hidden'
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    ></FormField>
                                    <FormField
                                        control={form.control}
                                        name='photoAngle'
                                        render={({ field }) => (
                                            <FormItem>
                                                <Button
                                                    variant={
                                                        form.watch(
                                                            "photoAngle"
                                                        ) === "side"
                                                            ? "active"
                                                            : "default"
                                                    }
                                                    size='smP4'
                                                    asChild
                                                >
                                                    <FormLabel>
                                                        SIDE ANGLE
                                                    </FormLabel>
                                                </Button>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type='radio'
                                                        value='side'
                                                        className='hidden'
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    ></FormField>
                                    <FormField
                                        control={form.control}
                                        name='photoAngle'
                                        render={({ field }) => (
                                            <FormItem>
                                                <Button
                                                    variant={
                                                        form.watch(
                                                            "photoAngle"
                                                        ) === "back"
                                                            ? "active"
                                                            : "default"
                                                    }
                                                    size='smP4'
                                                    asChild
                                                >
                                                    <FormLabel>
                                                        BACK ANGLE
                                                    </FormLabel>
                                                </Button>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type='radio'
                                                        value='back'
                                                        className='hidden'
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    ></FormField>
                                </div>
                            </div>
                            <div className='flex gap-4 max-w-[335px] bg-[#ebf4ff] py-[15px] px-[20px] rounded-lg'>
                                <Image
                                    src={
                                        form.watch("photoAngle") === "front"
                                            ? "/front-angle.svg"
                                            : form.watch("photoAngle") ===
                                              "side"
                                            ? "/side-angle.svg"
                                            : "/back-angle.svg"
                                    }
                                    alt='angle'
                                    width={20}
                                    height={0}
                                    className='h-[49px]'
                                />
                                <div>
                                    <h4 className='text-xs text-black leading-6 font-semibold'>
                                        This is a {form.watch("photoAngle")}{" "}
                                        angle photo
                                    </h4>
                                    <p className='text-[#868a93] text-xs leading-5'>
                                        Take photos with good lighting in either
                                        full or half body with a consistent
                                        background
                                    </p>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <div className='w-[50%] space-y-1'>
                                    <h4 className='text-xs text-[#868a93] font-bold'>
                                        PHOTO VISIBILITY
                                    </h4>
                                    <FormField
                                        control={form.control}
                                        name='visibility'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    <div
                                                        className={cn(
                                                            "flex py-[10px] px-[10px] border-[#303033] border rounded-md",
                                                            form.watch(
                                                                "visibility"
                                                            )
                                                                ? "bg-white"
                                                                : "bg-[#303033]"
                                                        )}
                                                    >
                                                        {!form.watch(
                                                            "visibility"
                                                        ) ? (
                                                            <div className='flex items-center justify-between w-full text-white'>
                                                                <span className='text-[10px] font-bold'>
                                                                    PRIVATE
                                                                </span>
                                                                <EyeOff
                                                                    width={16}
                                                                    height={16}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className='flex items-center justify-between w-full text-[#303033]'>
                                                                <span className='text-[10px] font-bold'>
                                                                    PUBLIC
                                                                </span>
                                                                <Eye
                                                                    width={16}
                                                                    height={16}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </FormLabel>
                                                <FormControl>
                                                    {/*@ts-ignore */}
                                                    <Input
                                                        {...field}
                                                        type='checkbox'
                                                        className='bg-transparent hidden'
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    ></FormField>
                                </div>
                                <div className='w-[50%] space-y-1'>
                                    <h4 className='text-xs text-[#868a93] font-bold'>
                                        DATE PHOTO TAKEN
                                    </h4>
                                    <FormField
                                        control={form.control}
                                        name='date'
                                        render={({ field }) => (
                                            <FormItem className='flex flex-col'>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={
                                                                    "secondary"
                                                                }
                                                                className={cn(
                                                                    "w-full text-left font-normal rounded-md",
                                                                    !field.value &&
                                                                        "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(
                                                                        field.value,
                                                                        "PPP"
                                                                    )
                                                                ) : (
                                                                    <span>
                                                                        Pick a
                                                                        date
                                                                    </span>
                                                                )}
                                                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent
                                                        className='w-auto p-0'
                                                        align='start'
                                                    >
                                                        <Calendar
                                                            mode='single'
                                                            selected={
                                                                field.value
                                                            }
                                                            onSelect={
                                                                field.onChange
                                                            }
                                                            disabled={(date) =>
                                                                date >
                                                                    new Date() ||
                                                                date <
                                                                    new Date(
                                                                        "1900-01-01"
                                                                    )
                                                            }
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name='caption'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Caption</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder='Tell us a little bit about yourself'
                                                className='resize-none'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        {preview && (
                            <Button
                                variant='danger'
                                type='button'
                                onClick={handleDelete}
                            >
                                Delete Image
                            </Button>
                        )}
                        <Button
                            type='submit'
                            variant='primary'
                            className='ml-auto'
                            disabled={isPending}
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
};
