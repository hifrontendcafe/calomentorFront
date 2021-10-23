import { useSession } from "next-auth/client";
import { useContext, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Session } from "next-auth";
import { useRouter } from "next/dist/client/router";
import { UserContext } from "@/context/UserContext";
import CustomHead from "@/components/CustomHead";
import { axiosGet } from "@/lib/api";
import { PROFILE, USER } from "@/config/Routes";

const Home: React.FC = () => {
  const [session, loading] = useSession();
  const { dispatch } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && session) {
      const getUserData = async (session: Session) =>
        await axiosGet(`${USER}?id=${session.user.id.toString()}`);
      // Get user data and verify if the profile is configured,
      // if not, go to the profile settings
      getUserData(session)
        .then((res) => {
          !res.data.full_name && session.user.role !== "0"
            ? router.push(PROFILE)
            : dispatch({ type: "SET", payload: { ...res.data } });
        })
        .catch((err) => console.log(err));
    }
  }, [loading, session, router, dispatch]);

  return (
    <>
      <CustomHead title="Inicio" />
      <DashboardLayout>chubaca</DashboardLayout>
    </>
  );
};

export default Home;
