import CustomHead from '@/components/CustomHead';
import DashboardLayout from '@/components/DashboardLayout';
import { useRouter } from 'next/dist/client/router';
import Spinner from '@/components/Spinner';
import { useGetFeedbackByMentorIdQuery } from '@/provider';
import Image from 'next/image';
import Star from '@/assets/img/Star.svg';
import { formatDate } from '@/helpers/formatDate';

const SelfFeedback = () => {
  const {
    query: { name, userId },
  } = useRouter();

  const { data: feedbacks, isLoading } = useGetFeedbackByMentorIdQuery(
    { id: String(userId) },
    { skip: !Boolean(userId) },
  );

  return (
    <>
      <CustomHead title={String(`Feedback de ${name}`)} />
      <DashboardLayout>
        {!isLoading && (!feedbacks || feedbacks.length === 0) && (
          <div
            className={
              'border-green-500 mx-4 flex items-center justify-between my-5 border bg-cardContentLight rounded-md'
            }
          >
            <div className="flex-1 px-4 py-2 text-sm">
              <p className="py-2 text-center text-mainTextColor">
                Aún no se ha recibido feedback de {name}
              </p>
            </div>
          </div>
        )}
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-8">
            {feedbacks?.map(
              ({
                id,
                mentee_name,
                mentee_username_discord,
                feedback_stars,
                feedback_mentee,
                feedback_date,
              }) => {
                return (
                  <div
                    key={id}
                    className="bg-topbar p-4 rounded text-slate-100 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between">
                        <p className="font-bold">
                          {mentee_name}{' '}
                          {mentee_name !== 'Anónimo' && (
                            <span className="font-light text-xs">
                              - {mentee_username_discord}
                            </span>
                          )}
                        </p>
                        <div className="flex">
                          {Array.from(
                            { length: feedback_stars },
                            (_, index) => (
                              <div
                                key={index.toString()}
                                className="flex items-center mr-1"
                              >
                                <Image
                                  src={Star}
                                  width={12}
                                  height={12}
                                  alt="Star"
                                />
                              </div>
                            ),
                          )}
                          {Array.from(
                            { length: feedback_stars ? feedback_stars - 5 : 5 },
                            (_, index) => (
                              <div
                                key={index.toString()}
                                className="flex items-center mr-1 opacity-20"
                              >
                                <Image
                                  src={Star}
                                  width={12}
                                  height={12}
                                  alt="Star"
                                />
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                      <hr className="border-fecGreen opacity-30 my-6" />
                      <div className="flex flex-col gap-6">
                        {Object.entries(feedback_mentee).map(
                          ([question, answer]) => {
                            return answer ? (
                              <div key={question}>
                                <p className="font-medium text-lg mb-2">
                                  {question}
                                </p>
                                <p className="font-thin">{answer}</p>
                              </div>
                            ) : null;
                          },
                        )}
                      </div>
                    </div>
                    <p className="italic font-thin text-xs mt-8 self-end">
                      Realizada el: {formatDate(feedback_date)}
                    </p>
                  </div>
                );
              },
            )}
          </div>
        )}
      </DashboardLayout>
    </>
  );
};

export default SelfFeedback;
