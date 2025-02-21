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
  IconButton,
  InputAdornment,
  Checkbox,
  ListItemText,
  Autocomplete,
} from "@mui/material";

// BLISSIQ ADMIN React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// BLISSIQ ADMIN React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

function Creators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [newCreator, setNewCreator] = useState({
    showTitle: "",
    creatorName: "",
    creatorType: "",
    genre_name: "",
    genre_id: null,
    ageRestriction: "",
    starRating: "",
    description: "",
    listens: 0,
    image: null,
  });

  // Fetch creators data
  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://audiobook.shellcode.cloud/api/admin/creator", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data && Array.isArray(data)) {
          setCreators(data);
        }
      } catch (error) {
        console.error("Error fetching creators:", error);
        alert("Failed to fetch creators. Please check your network connection and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCreators();
  }, []);

  const handleCreateCreator = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append('showTitle', newCreator.showTitle);
      formData.append('creatorName', newCreator.creatorName);
      formData.append('creatorType', newCreator.creatorType);
      formData.append('genre_name', newCreator.genre_name);
      formData.append('genre_id', newCreator.genre_id);
      formData.append('ageRestriction', newCreator.ageRestriction);
      formData.append('starRating', newCreator.starRating);
      formData.append('description', newCreator.description);
      formData.append('listens', newCreator.listens);
      if (newCreator.image) {
        formData.append('image', newCreator.image);
      }

      const response = await fetch("https://audiobook.shellcode.cloud/api/admin/creator", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();

      if (result.message === "Creator created successfully") {
        setCreators((prev) => [
          ...prev,
          {
            ...result.data,
          },
        ]);
        setOpenModal(false);
        setNewCreator({
          showTitle: "",
          creatorName: "",
          creatorType: "",
          genre_name: "",
          genre_id: null,
          ageRestriction: "",
          starRating: "",
          description: "",
          listens: 0,
          image: null,
        });
        alert("Creator created successfully!");
      } else {
        alert(result.message || "Failed to create creator");
      }
    } catch (error) {
      console.error("Error creating creator:", error);
      alert("Failed to create creator. Please check your network connection and try again.");
    }
  };

  const handleUpdateCreator = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append('showTitle', newCreator.showTitle);
      formData.append('creatorName', newCreator.creatorName);
      formData.append('creatorType', newCreator.creatorType);
      formData.append('genre_name', newCreator.genre_name);
      formData.append('genre_id', newCreator.genre_id);
      formData.append('ageRestriction', newCreator.ageRestriction);
      formData.append('starRating', newCreator.starRating);
      formData.append('description', newCreator.description);
      formData.append('listens', newCreator.listens);
      if (newCreator.image) {
        formData.append('image', newCreator.image);
      }

      const response = await fetch(
        `https://audiobook.shellcode.cloud/api/admin/creator/${newCreator.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();

      if (result.message === "Creator updated successfully") {
        setCreators((prevCreators) =>
          prevCreators.map((creator) =>
            creator.id === newCreator.id ? { ...creator, ...newCreator } : creator
          )
        );
        setOpenModal(false);
        setNewCreator({
          showTitle: "",
          creatorName: "",
          creatorType: "",
          genre_name: "",
          genre_id: null,
          ageRestriction: "",
          starRating: "",
          description: "",
          listens: 0,
          image: null,
        });
        alert("Creator updated successfully!");
      } else {
        alert(result.message || "Failed to update creator");
      }
    } catch (error) {
      console.error("Error updating creator:", error);
      alert("Failed to update creator. Please check your network connection and try again.");
    }
  };

  const handleDeleteCreator = async (creatorId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this creator?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://audiobook.shellcode.cloud/api/admin/creator/${creatorId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();

        if (result.message === "Creator deleted successfully") {
          setCreators((prevCreators) =>
            prevCreators.filter((creator) => creator.id !== creatorId)
          );
          alert("Creator deleted successfully!");
        } else {
          alert(result.message || "Failed to delete creator");
        }
      } catch (error) {
        console.error("Error deleting creator:", error);
        alert("Failed to delete creator. Please check your network connection and try again.");
      }
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'image') {
      setNewCreator({ ...newCreator, [e.target.name]: e.target.files[0] });
    } else {
      setNewCreator({ ...newCreator, [e.target.name]: e.target.value });
    }
  };

  const handleOpenModal = (creator = null) => {
    if (creator) {
      setNewCreator({
        ...creator,
      });
    } else {
      setNewCreator({
        showTitle: "",
        creatorName: "",
        creatorType: "",
        genre_name: "",
        genre_id: null,
        ageRestriction: "",
        starRating: "",
        description: "",
        listens: 0,
        image: null,
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
                    Loading Creators Data...
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
    { Header: "Show Title", accessor: "showTitle" },
    { Header: "Creator Name", accessor: "creatorName" },
    { Header: "Creator Type", accessor: "creatorType" },
    { Header: "Genre", accessor: "genre_name" },
    { Header: "Age Restriction", accessor: "ageRestriction" },
    { Header: "Star Rating", accessor: "starRating" },
    { Header: "Description", accessor: "description" },
    { Header: "Listens", accessor: "listens" },
    {
      Header: "Image",
      accessor: "image",
      Cell: ({ row }) => (
        <img
          src={row.original.image}
          alt={row.original.showTitle}
          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
        />
      ),
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal(row.original)}
            sx={{ marginLeft: 1 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteCreator(row.original.id)}
            sx={{ marginLeft: 1 }}
          >
            Delete
          </Button>
        </div>
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
                  Creators Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3} sx={{ display: "flex", flexDirection: "column", height: "400px" }}>
                <MDBox sx={{ flex: 1, overflow: "auto" }}>
                  <DataTable table={{ columns, rows: creators }} isSorted={false} entriesPerPage={false} showTotalEntries={false} noEndBorder />
                </MDBox>
                <Button
                  variant="contained"
                  color="white"
                  sx={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    backgroundColor: "#f44336",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#d32f2f",
                    },
                  }}
                  onClick={() => handleOpenModal()}
                >
                  Create Creator
                </Button>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />

      {/* Modal for creating or editing creator */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>{newCreator.id ? "Edit Creator" : "Create Creator"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Show Title"
            fullWidth
            name="showTitle"
            value={newCreator.showTitle}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Creator Name"
            fullWidth
            name="creatorName"
            value={newCreator.creatorName}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Creator Type"
            fullWidth
            name="creatorType"
            value={newCreator.creatorType}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Genre Name"
            fullWidth
            name="genre_name"
            value={newCreator.genre_name}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Genre ID"
            fullWidth
            name="genre_id"
            type="number"
            value={newCreator.genre_id}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Age Restriction"
            fullWidth
            name="ageRestriction"
            value={newCreator.ageRestriction}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Star Rating"
            fullWidth
            name="starRating"
            value={newCreator.starRating}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Description"
            fullWidth
            name="description"
            value={newCreator.description}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Listens"
            fullWidth
            name="listens"
            type="number"
            value={newCreator.listens}
            onChange={handleInputChange}
            margin="normal"
          />
          <input
            type="file"
            name="image"
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={newCreator.id ? handleUpdateCreator : handleCreateCreator} color="primary">
            {newCreator.id ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default Creators;