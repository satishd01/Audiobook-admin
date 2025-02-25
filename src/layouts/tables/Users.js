import { useEffect, useState } from "react";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Grid,
  Card,
  Box,
} from "@mui/material";

// BLISSIQ ADMIN React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// BLISSIQ ADMIN React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

function UserInfo() {
  const [userInfo, setUserInfo] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [newUserInfo, setNewUserInfo] = useState({
    id: null,
    user_id: null,
    name: "",
    email: "",
    mobile_number: "",
    genre: "",
    created_at: "",
    updated_at: "",
  });

  // Fetch user info data
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://audiobook.shellcode.cloud/api/userinfo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data) {
          setUserInfo(data); // Ensure it's an array
        } else {
          setUserInfo([]); // Set to an empty array if no data
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        alert("Failed to fetch user info. Please check your network connection and try again.");
        setUserInfo([]); // Set to an empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleUpdateUserInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://audiobook.shellcode.cloud/api/userinfo/${newUserInfo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newUserInfo.name,
          email: newUserInfo.email,
          mobileNumber: newUserInfo.mobile_number,
          genre: newUserInfo.genre,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();

      if (result.success) {
        setUserInfo([result.data]); // Update the state with the new data
        setOpenModal(false);
        setNewUserInfo({
          id: null,
          user_id: null,
          name: "",
          email: "",
          mobile_number: "",
          genre: "",
          created_at: "",
          updated_at: "",
        });
        alert("User information updated successfully!");
      } else {
        alert(result.message || "Failed to update user information");
      }
    } catch (error) {
      console.error("Error updating user information:", error);
      alert("Failed to update user information. Please check your network connection and try again.");
    }
  };

  const handleDeleteUserInfo = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user information?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`https://audiobook.shellcode.cloud/api/userinfo/${userId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();

        if (result.success) {
          setUserInfo(userInfo.filter((user) => user.id !== userId));
          alert("User information deleted successfully!");
        } else {
          alert(result.message || "Failed to delete user information");
        }
      } catch (error) {
        console.error("Error deleting user information:", error);
        alert("Failed to delete user information. Please check your network connection and try again.");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserInfo({ ...newUserInfo, [name]: value });
  };

  const handleOpenModal = (user = null) => {
    if (user) {
      setNewUserInfo({
        ...user,
      });
    } else {
      setNewUserInfo({
        id: null,
        user_id: null,
        name: "",
        email: "",
        mobile_number: "",
        genre: "",
        created_at: "",
        updated_at: "",
      });
    }
    setOpenModal(true);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
                  <MDTypography variant="h6" color="white">
                    Loading User Information...
                  </MDTypography>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "User ID", accessor: "user_id" },
    { Header: "Name", accessor: "name" },
    { Header: "Email", accessor: "email" },
    { Header: "Mobile Number", accessor: "mobile_number" },
    { Header: "Genre", accessor: "genre" },
    // { Header: "Created At", accessor: "created_at" },
    // { Header: "Updated At", accessor: "updated_at" },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleOpenModal(row.original)}
            sx={{ marginLeft: 1 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteUserInfo(row.original.id)}
            sx={{ marginLeft: 1 }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
                <MDTypography variant="h6" color="white">
                  Users
                </MDTypography>
              </MDBox>
              <MDBox pt={3} sx={{ display: "flex", flexDirection: "column", height: "400px" }}>
                <MDBox sx={{ flex: 1, overflow: "auto" }}>
                  <DataTable table={{ columns, rows: userInfo }} isSorted={false} entriesPerPage={false} showTotalEntries={false} noEndBorder />
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />

      {/* Modal for editing user information */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Edit User Information</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            name="name"
            value={newUserInfo.name}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Email"
            fullWidth
            name="email"
            value={newUserInfo.email}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Mobile Number"
            fullWidth
            name="mobile_number"
            value={newUserInfo.mobile_number}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Genre"
            fullWidth
            name="genre"
            value={newUserInfo.genre}
            onChange={handleInputChange}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateUserInfo} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default UserInfo;