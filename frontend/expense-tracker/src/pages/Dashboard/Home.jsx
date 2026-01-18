import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import {useUserAuth} from "../../hooks/useUserAuth";
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import InfoCard from '../../components/Cards/InfoCard';

import { LuHandCoins, LuWalletMinimal  } from 'react-icons/lu';
import { IoMdCard } from "react-icons/io";
import { addThousandsSeparator } from '../../utils/helper';
import { useNavigate } from 'react-router-dom';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses';
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart';
import RecentIncome from '../../components/Dashboard/RecentIncome';



const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
  totalBalance: 0,
  totalIncome: 0,
  totalExpenses: 0,
  recentTransactions: []
});

      const [loading, setLoading] = useState(false);

    const fetchDashboardData = async () => {
      console.log("FETCH DASHBOARD DATA CALLED");

      setLoading(true);

    try {
      console.log("SENDING REQUEST...");

      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      console.log("DASHBOARD RESPONSE:", response.data);

      if (response.data) {
      setDashboardData(prev => ({
        ...prev,
        ...response.data,
        recentTransactions: response.data.recentTransactions ?? prev.recentTransactions
      }));
}

    } catch (error) {
      console.log("ERROR FETCHING DASHBOARD:", error);
    }
    finally {
        setLoading(false);
      }
};


  useEffect(() => {
  fetchDashboardData();
  return () => {};
}, []);
  

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
       <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <InfoCard
          icon={<IoMdCard/>}
          label="Total Balance"
          value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
          color="bg-primary"
        />

        <InfoCard
          icon={<LuWalletMinimal/>}
          label="Total Income"
          value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
          color="bg-orange-500"
        />

        <InfoCard
          icon={<LuHandCoins/>}
          label="Total Expense"
          value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
          color="bg-red-500"
        />

        
       </div>


      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
        <RecentTransactions
          transactions={dashboardData?.recentTransactions}
        
        />

      <FinanceOverview
        totalBalance ={dashboardData?.totalBalance || 0}
        totalIncome={dashboardData?.totalIncome || 0}
        totalExpenses={dashboardData?.totalExpenses || 0}
      /> 

      <ExpenseTransactions
      transactions={dashboardData?.last30DaysExpenses?.transactions || []}
      onSeeMore={() => navigate("/expense")}
      />

      <Last30DaysExpenses
        data={dashboardData?.last30DaysExpenses?.transactions || []}
      /> 

      <RecentIncomeWithChart
      data={dashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []}
      totalIncome={dashboardData?.totalIncome || 0}
      />

      <RecentIncome
      transactions={dashboardData?.last60DaysIncome?.transactions || []}
      onSeeMore={() => navigate("/income")}
      />
      </div>
     </div>
    </DashboardLayout>
  );
};

export default Home;