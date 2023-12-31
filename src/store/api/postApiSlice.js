import { apiSlice } from "./apiSlice";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentPost: builder.query({
      query: (postId) => `/post?postId=${postId}`,
    }),
    likePost: builder.mutation({
      query: ({ postId }) => ({
        url: "/post/like",
        method: "POST",
        body: { postId },
      }),
    }),
    deletePost: builder.mutation({
      query: ({ postId }) => ({
        url: `/post/like?postId=${postId}`,
        method: "DELETE",
      }),
    }),
    addComment: builder.mutation({
      query: ({ postId, text }) => ({
        url: "/post/comment",
        method: "POST",
        body: { postId, text },
      }),
    }),
  }),
});

export const {
  useGetCurrentPostQuery,
  useLikePostMutation,
  useDeletePostMutation,
  useAddCommentMutation,
} = postApiSlice;
