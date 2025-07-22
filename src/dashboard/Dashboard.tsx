import { useOutletContext } from "react-router-dom";
import { Home } from "../home/Home";
import { DashboardSkeleton } from "../skeleton/DashboardSkeleton";

interface LayoutContextType {
  loading: boolean;
}

export const Dashboard = () => {
  const { loading } = useOutletContext<LayoutContextType>();
  return (
    <>
      <h2>Dashboard</h2>
      {loading ? <DashboardSkeleton></DashboardSkeleton> : <Home></Home>}
    </>
  );
};
