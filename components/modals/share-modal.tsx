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

export function SharePostModal() {
    const { isOpen, close, postId, posts } = useSharePostModal(
        (store) => store
    );
    const [isClient, setIsClient] = useState(false);
    const post = posts.find((post) => post.id === postId);
    useEffect(() => setIsClient(true), []);
    const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/community/${post?.categoryCommunity.name}/${post?.id}`;
    // useEffect(() => {
    //     console.log("Domain:", process.env.NEXT_PUBLIC_DOMAIN);
    //     console.log("Post ID:", post.id);
    //     console.log("Share URL:", shareUrl);
    // }, [post.id, shareUrl]);

    return (
        <AlertDialog open={isOpen} onOpenChange={close}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Share</AlertDialogTitle>
                    <AlertDialogDescription>
                        <div className="flex gap-5 justify-center pb-5 mt-4">
                            <FacebookShareButton
                                url="https://chloeting.com/c/fitness-discussions"
                                title={post?.title}
                                hashtag={`#${post?.badge.name.replace(
                                    /\s/g,
                                    ""
                                )}ForLife`}
                            >
                                <FacebookIcon size={40} round={true} />
                            </FacebookShareButton>
                            <WhatsappShareButton
                                url="https://chloeting.com/c/fitness-discussions"
                                title={post?.title}
                                separator=":: "
                            >
                                <WhatsappIcon size={40} round={true} />
                            </WhatsappShareButton>
                            <TwitterShareButton
                                url={shareUrl}
                                title={post?.title}
                                hashtags={[
                                    `#${post?.badge.name.replace(
                                        /\s/g,
                                        ""
                                    )}ForLife`,
                                ]}
                            >
                                <TwitterIcon size={40} round={true} />
                            </TwitterShareButton>
                            <EmailShareButton
                                url="https://chloeting.com/c/fitness-discussions"
                                subject={post?.title}
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
