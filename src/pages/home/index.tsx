import { useContext, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/client";
import DashboardLayout from "@/components/DashboardLayout";
import { useRouter } from "next/dist/client/router";
import { UserContext } from "@/context/UserContext";
import CustomHead from "@/components/CustomHead";
import { axiosGet } from "@/lib/api";
import { MENTORSHIP, PROFILE, USER } from "@/config/Routes";
import { CalendarIcon, UserRemoveIcon } from "@heroicons/react/outline";
import CancelModal from "@/components/CancelModal";
import { IMentorhip } from "@/interfaces/mentorship.interface";
import { formatMentorshipDate } from "@/helpers/formatDate";

const Home: React.FC = () => {
  const [mentorships, setMentorships] = useState<IMentorhip[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [session, loading] = useSession();
  const { dispatch } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && session) {
      const userID = session.user.id.toString();
      const getUserData = async (id: string) =>
        await axiosGet(`${USER}?id=${id}`);
      const getMentorshipsData = async (id: string) =>
        await axiosGet(`${MENTORSHIP}?id=${id}`);
      // Get user data and verify if the profile is configured,
      // if not, go to the profile settings
      getUserData(userID)
        .then((res) => {
          !res.data.full_name && session.user.role !== "0"
            ? router.push(PROFILE)
            : dispatch({ type: "SET", payload: { ...res.data } });
        })
        .catch((err) => {
          signOut({ callbackUrl: "/" });
        });
      // Get user mentorships data
      getMentorshipsData(userID)
        .then(({ data }) => {
          setMentorships(data);
        })
        .catch((err) => {
          signOut({ callbackUrl: "/" });
        });
    }
  }, [loading, session, router, dispatch]);

  return (
    <>
      <CustomHead title="Inicio" />
      <DashboardLayout title="Inicio">
        <div className="px-4 py-5 rounded-t-lg bg-cardHeader sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-mainTextColor">
            Próximas Mentorías
          </h3>
        </div>
        <div className="pt-5 bg-cardContent">
          {mentorships.map((m) => (
            <div key={m.id} className="px-4 pb-5 sm:px-6">
              <div className="flex border-t border-b border-r border-green-500 rounded-lg">
                <div
                  className={`bg-green-500 flex-shrink-0 flex items-center justify-center w-14 text-cardContentLight text-sm font-medium rounded-l-md`}
                >
                  <CalendarIcon style={{ padding: 12 }} />
                </div>
                <div className="flex justify-between w-full">
                  <div className="flex flex-col justify-center p-3">
                    <p className="text-sm font-medium text-mainTextColor">
                      {formatMentorshipDate(m.time_slot_info.date)}
                    </p>
                    <p className="text-sm text-gray-300">
                      <span className="font-medium text-mainTextColor">
                        Mentee:
                      </span>{" "}
                      {m.mentee_username_discord}
                    </p>
                    <p className="text-sm text-gray-300">
                      <span className="font-medium text-mainTextColor">
                        ID:
                      </span>{" "}
                      {m.mentee_id}
                    </p>
                    <p className="text-sm text-gray-300">
                      <span className="font-medium text-mainTextColor">
                        Email:
                      </span>{" "}
                      {m.mentee_email}
                    </p>
                  </div>
                  <div className="flex max-w-2xl p-3">
                    <p className="text-sm text-gray-300">
                      <span className="font-medium text-mainTextColor">
                        Información:
                      </span>{" "}
                      {m.info}
                    </p>
                  </div>
                  <div className="flex p-3 ">
                    <button
                      type="button"
                      className="relative inline-flex items-center px-2 py-2 -ml-px text-5xl text-red-500 bg-transparent"
                      onClick={() => setIsOpen(true)}
                    >
                      <UserRemoveIcon className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <CancelModal
          open={isOpen}
          menteeID="121437193309782017"
          mentee="TuVieja#1234"
          confirmAction={() => {}}
          setModal={setIsOpen}
        />
      </DashboardLayout>
    </>
  );
};

export default Home;
