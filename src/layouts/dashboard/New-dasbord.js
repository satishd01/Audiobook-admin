import { useEffect, useState } from "react";
import axios from "axios";

// @mui material components
import Grid from "@mui/material/Grid";

// BLISSIQ ADMIN React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// BLISSIQ ADMIN React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import DataTable from "examples/Tables/DataTable";

function NEWDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [lastBookings, setLastBookings] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("https://bluecollar.sndktech.online/api/dashboard/data");
        if (response.data) {
          setDashboardData(response.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        alert("Failed to fetch dashboard data. Please check your network connection and try again.");
      }
    };

    const fetchLastBookings = async () => {
      try {
        const response = await axios.get("https://bluecollar.sndktech.online/api/dashboard/last/bookings");
        if (response.data && response.data.bookings) {
          setLastBookings(response.data.bookings);
        }
      } catch (error) {
        console.error("Error fetching last bookings:", error);
        alert("Failed to fetch last bookings. Please check your network connection and try again.");
      }
    };

    fetchDashboardData();
    fetchLastBookings();
  }, []);

  if (!dashboardData || !lastBookings) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox py={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
                {/* Loading message can be uncommented if needed */}
                {/* <MDTypography variant="h6" color="white">
                  Loading Dashboard Data...
                </MDTypography> */}
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  const columns = [
    { Header: "Booking ID", accessor: "booking_id" },
    { Header: "User ID", accessor: "user_id" },
    { Header: "Total Amount", accessor: "total_amount" },
    { Header: "Service Name", accessor: "service_name" },
    { Header: "Worker Name", accessor: "worker_name" },
    { Header: "Service Charge", accessor: "service_charge" },
    { Header: "Service Date", accessor: "service_date" },
    { Header: "Status", accessor: "status" },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Bookings"
                count={dashboardData.totalBookings}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than last week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Users"
                count={dashboardData.totalUsers}
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Vendors"
                count={dashboardData.totalVendors}
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Workers"
                count={dashboardData.totalWorkers}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                {/* Placeholder for ReportsBarChart */}
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                {/* Placeholder for ReportsLineChart */}
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                {/* Placeholder for ReportsLineChart */}
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={0}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <MDBox mb={3}>
                <MDTypography variant="h5" color="text">
                  Last 10 Bookings
                </MDTypography>
                <DataTable
                  table={{ columns, rows: lastBookings }}
                  isSorted={false}
                  entriesPerPage={true}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default NEWDashboard;