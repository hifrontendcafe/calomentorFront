import { useSession } from "next-auth/client";
import { useContext, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { getUserByID } from "@/lib/userAPI";
import { Session } from "next-auth";
import { useRouter } from "next/dist/client/router";
import { UserContext } from "@/context/UserContext";
import CustomHead from "@/components/CustomHead";

const Home: React.FC = () => {
  const [session, loading] = useSession();
  const { dispatch } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && session) {
      const getUserData = async (session: Session) =>
        await getUserByID(session.user.id.toString());
      // Get user data and verify if the profile is configured,
      // if not, go to the profile settings
      getUserData(session).then((res) => {
        res.data.full_name === "" && session.user.role !== "0"
          ? router.push("/settings/profile")
          : dispatch({ type: "SET", payload: { ...res.data } });
      });
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
