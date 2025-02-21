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

function NEWDashboard() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("https://bluecollar.sndktech.online/api/dashboard/data");
        if (response.data) {
          setDashboardData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        alert("Failed to fetch dashboard data. Please check your network connection and try again.");
      }
    };

    fetchDashboardData();
  }, []);

  if (!dashboardData) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox py={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
                <MDTypography variant="h6" color="white">
                  Loading Dashboard Data...
                </MDTypography>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

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
                title="Genre Count"
                count={dashboardData.genreCount}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Creator Count"
                count={dashboardData.creatorCount}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="User Count"
                count={dashboardData.usersCount}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Story Count"
                count={dashboardData.storyCount}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon="audiobook"
                title="Audiobook Count"
                count={dashboardData.audiobookCount}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="warning"
                icon="podcast_play"
                title="Podcast Count"
                count={dashboardData.podcastCount}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="error"
                icon="episode"
                title="Episode Count"
                count={dashboardData.episodeCount}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default NEWDashboard;