import { useContext, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/client";
import DashboardLayout from "@/components/DashboardLayout";
import { useRouter } from "next/dist/client/router";
import { UserContext } from "@/context/UserContext";
import CustomHead from "@/components/CustomHead";
import { axiosGet } from "@/lib/api";
import { MENTORSHIP, PROFILE, USER } from "@/config/Routes";
import CancelModal from "@/components/CancelModal";
import { IMentorhip } from "@/interfaces/mentorship.interface";
import MentorshipCard from "@/components/MentorshipCard";

const Home: React.FC = () => {
  const [mentorships, setMentorships] = useState<IMentorhip[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    mentorshipToken: string;
    menteeName: string;
  }>({ mentorshipToken: "", menteeName: "" });

  const [session, loading] = useSession();
  const { dispatch } = useContext(UserContext);
  const router = useRouter();

  const removeMentorship = () => {
    setMentorships((prev) =>
      prev.filter((m) => m.tokenForCancel !== modalData.mentorshipToken)
    );
  };

  useEffect(() => {
    if (!loading && session) {
      const userID = session.user.id.toString();
      const getMentorshipsData = async (id: string) =>
        await axiosGet(`${MENTORSHIP}?id=${id}&filter=ACTIVE`);
      const getUserData = async (id: string) =>
        await axiosGet(`${USER}?id=${id}`);
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
            <MentorshipCard
              key={m.id}
              mentorship={m}
              setModal={setIsOpen}
              setModalData={setModalData}
            />
          ))}
        </div>
        <CancelModal
          open={isOpen}
          mentorshipToken={modalData.mentorshipToken}
          menteeName={modalData.menteeName}
          setModal={setIsOpen}
          onCancelSubmit={removeMentorship}
        />
      </DashboardLayout>
    </>
  );
};

export default Home;
