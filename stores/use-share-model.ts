import { Posts } from "@/app/(main)/community/user-post-no-image";
import { create } from "zustand";

type ShareModel = {
    isOpen: boolean;
    postId: number;
    posts: Posts[];
    setPosts: (newPosts: Posts[]) => void;
    open: (postId: number) => void;
    close: () => void;
};

export const useSharePostModal = create<ShareModel>((set) => ({
    isOpen: false,
    postId: 0,
    posts: [],
    setPosts: (newPosts: Posts[]) => set({ posts: newPosts }),
    open: (postId: number) => set({ isOpen: true, postId }),
    close: () => set({ isOpen: false }),
}));
