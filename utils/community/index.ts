import { BeforeAfterPostSchema, CommentSchema, PostSchema } from "@/schemas";
import { z } from "zod";

export const fetchBadgesData = async () => {
   try {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/badges`
      );
      console.log(process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1);

      const data = await response.json();
      return data;
   } catch (error) {
      throw new Error("Error while fetching badges");
   }
};

export const createPostNoImage = async (
   data: z.infer<typeof PostSchema>,
   sessionToken: string,
   badgeId: number,
   categoryId: number
) => {
   try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/posts/create?&badgeId=${badgeId}&categoryId=${categoryId}`,
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${sessionToken}`,
               credentials: "include",
            },
            body: JSON.stringify(data),
         }
      ).then(async (res) => {
         const payload = await res.json();
         const data = {
            status: res.status,
            payload,
         };
         if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
         }
         return data;
      });
   } catch (error) {
      throw new Error("Something went wrong");
   }
};

export const fetchDeletePost = async (postId: number, sessionToken: string) => {
   try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/posts/deletePost?postId=${postId}`,
         {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${sessionToken}`,
            },
         }
      );
      if (!res.ok) {
         throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res;
   } catch (error) {
      throw new Error("Error while deleting post");
   }
};

export const fetchPostData = async (
   categoryId: number,
   sessionToken: string,
   page: number,
   size: number
) => {
   const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(sessionToken && { Authorization: `Bearer ${sessionToken}` }),
   };
   try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/posts/getAllPostByCategory?categoryId=${categoryId}&page=${page}&size=${size}`,
         {
            method: "GET",
            headers: headers,
            next: { revalidate: 3600 },
         }
      ).then(async (res) => {
         if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
         }
         const data = res.json();
         console.log(data);
         return data;
      });

      return res;
   } catch (error) {
      throw new Error("Error while fetching posts");
   }
};

export const fetchPostById = async (postId: number, sessionToken: string) => {
   const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(sessionToken && { Authorization: `Bearer ${sessionToken}` }),
   };
   try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/posts/getPostById?postId=${postId}`,
         {
            method: "GET",
            headers: headers,
         }
      ).then(async (res) => {
         if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
         }
         const data = res.json();
         return data;
      });
      return res;
   } catch (error) {
      throw new Error("Error while fetching post");
   }
};
export const createComment = async (
   sessionToken: string,
   postId: number,
   data: z.infer<typeof CommentSchema>
) => {
   try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/comments/create?postId=${postId}`,
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${sessionToken}`,
               credentials: "include",
            },
            body: JSON.stringify(data),
         }
      ).then(async (res) => {
         const payload = await res.json();
         const data = {
            status: res.status,
            payload,
         };
         if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
         }
         return data;
      });
      return res;
   } catch (error) {
      throw new Error("Something went wrong");
   }
};

export const fetchEditComment = async (
   commentId: number,
   data: z.infer<typeof CommentSchema>,
   sessionToken: string
) => {
   try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/comments/editComment?commentId=${commentId}`,
         {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${sessionToken}`,
            },
            body: JSON.stringify(data),
         }
      ).then(async (res) => {
         const payload = await res.json();
         const data = {
            status: res.status,
            payload,
         };
         if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
         }
         return data;
      });
      return res;
   } catch (error) {
      throw new Error("Something went wrong");
   }
};

export const fetchDeleteComment = async (
   commentId: number,
   sessionToken: string
) => {
   const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/comments/deleteComment?commentId=${commentId}`,
      {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken}`,
         },
      }
   );
   if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
   }
   return res;
};

export const fetchCommentData = async (postId: number) => {
   try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/comments/getAllComments?postId=${postId}`,
         {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
            },
         }
      ).then(async (res) => {
         if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
         }
         const data = res.json();
         return data;
      });
      return res;
   } catch (error) {
      throw new Error("Error while fetching comments");
   }
};

export const fetchUpvote = async (commentId: number, upVote: number) => {
   try {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/comments/upvoteComment?commentId=${commentId}&upVote=${upVote}`,
         {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
         }
      ).then(async (res) => {
         if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
         }
         const data = res.json();
         return data;
      });
      return response;
   } catch (error) {
      throw new Error("Error while fetching upvote");
   }
};

export const fetchBookmarkPost = async (
   postId: number,
   sessionToken: string
) => {
   try {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/bookmarkPosts?postId=${postId}`,
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${sessionToken}`,
            },
         }
      );
      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
   } catch (error) {
      throw new Error("Error while fetching bookmark post");
   }
};

export const createBeforeAfterPost = async (
   sessionToken: string,
   data: z.infer<typeof BeforeAfterPostSchema>,
   badgeId: number,
   categoryId: number,
   preview: string,
   preview2: string
) => {
   const { imgBefore, imgAfter, ...rest } = data;
   const resultFromSv = await fetch(
      `${process.env.NEXT_PUBLIC_API}/before-after-image/`,
      {
         method: "POST",
         body: JSON.stringify({
            base64Img: preview,
            base64Img1: preview2,
         }),
         headers: {
            "Content-Type": "application/json",
         },
      }
   ).then(async (res) => {
      const payload = await res.json();
      const datas = {
         status: res.status,
         payload,
      };
      if (!res.ok) {
         throw new Error(`HTTP error! status: ${res.status}`);
      }
      console.log(datas);

      return datas;
   });
   try {
      console.log(resultFromSv.payload.results.secure_url);

      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/posts/create?&badgeId=${badgeId}&categoryId=${categoryId}`,
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${sessionToken}`,
            },
            body: JSON.stringify({
               ...rest,
               imgBefore: resultFromSv.payload.results.secure_url,
               imgAfter: resultFromSv.payload.results1.secure_url,
            }),
         }
      ).then(async (res) => {
         const payload = await res.json();
         const data = {
            status: res.status,
            payload,
         };
         if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
         }
         return data;
      });
   } catch (error) {
      throw new Error("Something went wrong");
   }
};
export const editBeforeAfterPost = async (
   sessionToken: string,
   postId: number,
   data: z.infer<typeof BeforeAfterPostSchema>,
   preview: string,
   preview2: string
) => {
   const { imgBefore, imgAfter, ...rest } = data;
   const resultFromSv = await fetch(
      `${process.env.NEXT_PUBLIC_API}/before-after-image/`,
      {
         method: "POST",
         body: JSON.stringify({
            base64Img: preview,
            base64Img1: preview2,
         }),
         headers: {
            "Content-Type": "application/json",
         },
      }
   ).then(async (res) => {
      const payload = await res.json();
      const datas = {
         status: res.status,
         payload,
      };
      if (!res.ok) {
         throw new Error(`HTTP error! status: ${res.status}`);
      }
      console.log(datas);

      return datas;
   });
   try {
      console.log(resultFromSv.payload.results.secure_url);

      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/posts/editPost?postId=${postId}`,
         {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${sessionToken}`,
            },
            body: JSON.stringify({
               ...rest,
               imgBefore: resultFromSv.payload.results.secure_url,
               imgAfter: resultFromSv.payload.results1.secure_url,
            }),
         }
      ).then(async (res) => {
         const payload = await res.json();
         const data = {
            status: res.status,
            payload,
         };
         if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
         }
         return data;
      });
   } catch (error) {
      throw new Error("Something went wrong");
   }
};

export const fetchMyPosts = async (
   sessionToken: string,
   page: number,
   size: number
) => {
   try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/posts/getAllPostByUser?page=${page}&size=${size}`,
         {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${sessionToken}`,
            },
         }
      );
      if (!res.ok) {
         throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = res.json();
      return data;
   } catch (error) {
      throw new Error("Error while fetching my posts");
   }
};

export const fetchPostsBookmark = async (
   sessionToken: string,
   offset: number,
   limit: number
) => {
   try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/posts/getAllPostBookmark?page=${offset}&size=${limit}`,
         {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${sessionToken}`,
            },
         }
      );
      if (!res.ok) {
         throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = res.json();
      return data;
   } catch (error) {
      throw new Error("Error while fetching my posts");
   }
};

export const fetchPostsCommented = async (sessionToken: string) => {
   try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/posts/getPostsCommented`,
         {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${sessionToken}`,
            },
         }
      );
      if (!res.ok) {
         throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = res.json();
      return data;
   } catch (error) {
      throw new Error("Error while fetching!");
   }
};

export const fetchChildCommentData = async (parentId: number) => {
   try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/comments/getChildComments?parentId=${parentId}`,
         {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
            },
         }
      );
      if (!res.ok) {
         throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = res.json();
      return data;
   } catch (error) {
      throw new Error("Error while fetching comments");
   }
};

export const fetchCommentById = async (parentId: number) => {
   try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/comments/getCommentById?commentId=${parentId}`,
         {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
            },
         }
      );
      if (!res.ok) {
         throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = res.json();
      return data;
   } catch (error) {
      throw new Error("Error while fetching comments");
   }
};

export const fetchEditPost = async (
   sessionToken: string,
   postId: number,
   data: z.infer<typeof PostSchema>
) => {
   try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/posts/editPost?postId=${postId}`,
         {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${sessionToken}`,
            },
            body: JSON.stringify(data),
         }
      ).then(async (res) => {
         const payload = await res.json();
         const data = {
            status: res.status,
            payload,
         };
         if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
         }
         return data;
      });
      return res;
   } catch (error) {
      throw new Error("Something went wrong");
   }
};
export const fetchSearchPost = async (
   sessionToken: string,
   searchText: string,
   categoryId: number,
   page: number,
   size: number
) => {
   const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(sessionToken && { Authorization: `Bearer ${sessionToken}` }),
   };
   try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/posts/searchPost?title=${searchText}&categoryId=${categoryId}&page=${page}&size=${size}`,
         {
            method: "GET",
            headers: headers,
         }
      ).then(async (res) => {
         if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
         }
         const data = res.json();
         return data;
      });
      return res;
   } catch (error) {
      throw new Error("Error while fetching posts");
   }
};

export const fetchFilterPost = async (
   sessionToken: string,
   badgeName: string,
   categoryId: number,
   page: number,
   size: number
) => {
   const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(sessionToken && { Authorization: `Bearer ${sessionToken}` }),
   };
   try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/posts/filterPost?badgeName=${badgeName}&categoryId=${categoryId}&page=${page}&size=${size}`,
         {
            method: "GET",
            headers: headers,
         }
      ).then(async (res) => {
         if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
         }
         const data = res.json();
         return data;
      });
      return res;
   } catch (error) {
      throw new Error("Error while fetching posts");
   }
};

export const fetchFilterMyPost = async (
   sessionToken: string,
   badgeName: string,
   page: number,
   size: number
) => {
   try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/posts/filterMyPost?badgeName=${badgeName}&page=${page}&size=${size}`,
         {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${sessionToken}`,
            },
         }
      ).then(async (res) => {
         if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
         }
         const data = res.json();
         return data;
      });
      return res;
   } catch (error) {
      throw new Error("Error while fetching posts");
   }
};
export const fetchSearchMyPost = async (
   sessionToken: string,
   searchText: string,
   page: number,
   size: number
) => {
   try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/posts/searchMyPost?title=${searchText}&page=${page}&size=${size}`,
         {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${sessionToken}`,
            },
         }
      ).then(async (res) => {
         if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
         }
         const data = res.json();
         return data;
      });
      return res;
   } catch (error) {
      throw new Error("Error while fetching posts");
   }
};

export const fetchFilterBookmarkPost = async (
   sessionToken: string,
   badgeName: string,
   page: number,
   size: number
) => {
   try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/posts/filterBookmarkPost?badgeName=${badgeName}&page=${page}&size=${size}`,
         {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${sessionToken}`,
            },
         }
      ).then(async (res) => {
         if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
         }
         const data = res.json();
         return data;
      });
      return res;
   } catch (error) {
      throw new Error("Error while fetching posts");
   }
};
export const fetchSearchBookmarkPost = async (
   sessionToken: string,
   searchText: string,
   page: number,
   size: number
) => {
   try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/posts/searchBookmarkPost?title=${searchText}&page=${page}&size=${size}`,
         {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${sessionToken}`,
            },
         }
      ).then(async (res) => {
         if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
         }
         const data = res.json();
         return data;
      });
      return res;
   } catch (error) {
      throw new Error("Error while fetching posts");
   }
};
