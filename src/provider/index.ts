import { FEEDBACK, MENTORS_API } from '@/config/Routes';
import { IFeedback } from '@/interfaces/mentorship.interface';
import { Mentor } from '@/interfaces/user.interface';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
  }),
  endpoints: builder => ({
    getAllMentors: builder.query<
      (Mentor & { label: string; value: string })[],
      {}
    >({
      query: () => MENTORS_API,
      transformResponse: ({ data }: { data: Mentor[] }) => {
        const mentors = data.map(mentor => {
          return {
            value: mentor.persona.discordID.current,
            label: mentor.name,
            ...mentor,
          };
        });
        return mentors;
      },
    }),
    getFeedbackByMentorId: builder.query<IFeedback[], { id: string }>({
      query: ({ id }) => `${FEEDBACK}?id=${id}`,
      transformResponse: ({ data }) => {
        return data;
      },
    }),
    sendFeeback: builder.mutation<any, any>({
      query: body => ({
        url: FEEDBACK,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetAllMentorsQuery,
  useSendFeebackMutation,
  useGetFeedbackByMentorIdQuery,
} = api;
