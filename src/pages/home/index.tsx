import { useSession } from "next-auth/client";
import { useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { getUserByID } from "../../lib/userAPI";

const Home: React.FC = () => {
  const [session, loading] = useSession();
  useEffect(() => {
    if (!loading && session) {
      getUserByID(session.user.id.toString());
    }
  }, [loading, session]);
  return <DashboardLayout>chubaca</DashboardLayout>;
};

export default Home;
