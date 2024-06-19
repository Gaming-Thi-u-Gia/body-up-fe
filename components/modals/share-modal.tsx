"use client";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSharePostModal } from "@/stores/use-share-model";
import { Button } from "../ui/button";
import Image from "next/image";
import share_icon from "/public/share-icon.svg";
import { Posts } from "@/app/(main)/community/user-post-no-image";
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailShareButton,
    FacebookIcon,
    WhatsappIcon,
    EmailIcon,
    TwitterIcon,
} from "react-share";

export function SharePostModal({ post }: { post: Posts }) {
    const { isOpen, close, open } = useSharePostModal((store) => store);
    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);
    const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/community/${post.categoryCommunity.name}/${post.id}`;
    // useEffect(() => {
    //     console.log("Domain:", process.env.NEXT_PUBLIC_DOMAIN);
    //     console.log("Post ID:", post.id);
    //     console.log("Share URL:", shareUrl);
    // }, [post.id, shareUrl]);

    return (
        <AlertDialog open={isOpen} onOpenChange={close}>
            <Button
                type="button"
                variant="secondary"
                size="default"
                className="flex gap-1 rounded-full bg-[#EFF0F4] p-4 h-7 justify-center items-center"
                onClick={open}
            >
                <Image src={share_icon} alt="logo" width={20} height={20} />
                <span className="text-[12px]">Share</span>
            </Button>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Share</AlertDialogTitle>
                    <AlertDialogDescription>
                        <div className="flex gap-5 justify-center pb-5 mt-4">
                            <FacebookShareButton
                                url="https://chloeting.com/c/fitness-discussions"
                                title={post.title}
                                hashtag={`#${post.badge.name.replace(
                                    /\s/g,
                                    ""
                                )}ForLife`}
                            >
                                <FacebookIcon size={40} round={true} />
                            </FacebookShareButton>
                            <WhatsappShareButton
                                url="https://chloeting.com/c/fitness-discussions"
                                title={post.title}
                                separator=":: "
                            >
                                <WhatsappIcon size={40} round={true} />
                            </WhatsappShareButton>
                            <TwitterShareButton
                                url={shareUrl}
                                title={post.title}
                                hashtags={[
                                    `#${post.badge.name.replace(
                                        /\s/g,
                                        ""
                                    )}ForLife`,
                                ]}
                            >
                                <TwitterIcon size={40} round={true} />
                            </TwitterShareButton>
                            <EmailShareButton
                                url="https://chloeting.com/c/fitness-discussions"
                                subject={post.title}
                                body={`Check out this property listing: ${shareUrl}`}
                            >
                                <EmailIcon size={40} round={true} />
                            </EmailShareButton>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
