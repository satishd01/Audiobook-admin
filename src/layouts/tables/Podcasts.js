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

function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [genres, setGenres] = useState([]);
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [newPodcast, setNewPodcast] = useState({
    name: "",
    show_title: "",
    description: "",
    creator_id: null,
    genre_id: null,
    image: null,
    creator_name: "",
    genre_name: "",
  });

  // Fetch podcasts data
  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://audiobook.shellcode.cloud/api/admin/podcasts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data && data.message === "All podcasts fetched successfully") {
          setPodcasts(data.data);
        }
      } catch (error) {
        console.error("Error fetching podcasts:", error);
        alert("Failed to fetch podcasts. Please check your network connection and try again.");
      } finally {
        setLoading(false);
      }
    };

    const fetchGenres = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://audiobook.shellcode.cloud/api/admin/genre/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data && data.message === "Genres fetched successfully") {
          setGenres(data.data);
        }
      } catch (error) {
        console.error("Error fetching genres:", error);
        alert("Failed to fetch genres. Please check your network connection and try again.");
      }
    };

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
      }
    };

    fetchPodcasts();
    fetchGenres();
    fetchCreators();
  }, []);

  const handleCreatePodcast = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append('name', newPodcast.name);
      formData.append('show_title', newPodcast.show_title);
      formData.append('description', newPodcast.description);
      formData.append('creator_id', newPodcast.creator_id);
      formData.append('genre_id', newPodcast.genre_id);
      formData.append('creator_name', newPodcast.creator_name);
      formData.append('genre_name', newPodcast.genre_name);
      if (newPodcast.image) {
        formData.append('image', newPodcast.image);
      }

      const response = await fetch("https://audiobook.shellcode.cloud/api/admin/podcast", {
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

      if (result.message === "Podcast created successfully") {
        setPodcasts((prev) => [
          ...prev,
          {
            ...result.data,
          },
        ]);
        setOpenModal(false);
        setNewPodcast({
          name: "",
          show_title: "",
          description: "",
          creator_id: null,
          genre_id: null,
          image: null,
          creator_name: "",
          genre_name: "",
        });
        alert("Podcast created successfully!");
      } else {
        alert(result.message || "Failed to create podcast");
      }
    } catch (error) {
      console.error("Error creating podcast:", error);
      alert("Failed to create podcast. Please check your network connection and try again.");
    }
  };

  const handleUpdatePodcast = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append('name', newPodcast.name);
      formData.append('show_title', newPodcast.show_title);
      formData.append('description', newPodcast.description);
      formData.append('creator_id', newPodcast.creator_id);
      formData.append('genre_id', newPodcast.genre_id);
      formData.append('creator_name', newPodcast.creator_name);
      formData.append('genre_name', newPodcast.genre_name);
      if (newPodcast.image) {
        formData.append('image', newPodcast.image);
      }

      const response = await fetch(
        `https://audiobook.shellcode.cloud/api/admin/podcasts/${newPodcast.id}`,
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

      if (result.message === "Podcast updated successfully") {
        setPodcasts((prevPodcasts) =>
          prevPodcasts.map((podcast) =>
            podcast.id === newPodcast.id ? { ...podcast, ...newPodcast } : podcast
          )
        );
        setOpenModal(false);
        setNewPodcast({
          name: "",
          show_title: "",
          description: "",
          creator_id: null,
          genre_id: null,
          image: null,
          creator_name: "",
          genre_name: "",
        });
        alert("Podcast updated successfully!");
      } else {
        alert(result.message || "Failed to update podcast");
      }
    } catch (error) {
      console.error("Error updating podcast:", error);
      alert("Failed to update podcast. Please check your network connection and try again.");
    }
  };

  const handleDeletePodcast = async (podcastId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this podcast?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://audiobook.shellcode.cloud/api/admin/podcasts/${podcastId}`,
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

        if (result.message === "Podcast deleted successfully") {
          setPodcasts((prevPodcasts) =>
            prevPodcasts.filter((podcast) => podcast.id !== podcastId)
          );
          alert("Podcast deleted successfully!");
        } else {
          alert(result.message || "Failed to delete podcast");
        }
      } catch (error) {
        console.error("Error deleting podcast:", error);
        alert("Failed to delete podcast. Please check your network connection and try again.");
      }
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'image') {
      setNewPodcast({ ...newPodcast, [e.target.name]: e.target.files[0] });
    } else {
      setNewPodcast({ ...newPodcast, [e.target.name]: e.target.value });
    }
  };

  const handleOpenModal = (podcast = null) => {
    if (podcast) {
      setNewPodcast({
        ...podcast,
      });
    } else {
      setNewPodcast({
        name: "",
        show_title: "",
        description: "",
        creator_id: null,
        genre_id: null,
        image: null,
        creator_name: "",
        genre_name: "",
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
                    Loading Podcasts Data...
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
    { Header: "Name", accessor: "name" },
    { Header: "Show Title", accessor: "show_title" },
    { Header: "Description", accessor: "description" },
    { Header: "Creator ID", accessor: "creator_id" },
    { Header: "Genre ID", accessor: "genre_id" },
    { Header: "Genre Name", accessor: "genre_name" },
    { Header: "Creator Name", accessor: "creator_name" },
    {
      Header: "Image",
      accessor: "image",
      Cell: ({ row }) => (
        <img
          src={row.original.image}
          alt={row.original.name}
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
            color="error"
            onClick={() => handleOpenModal(row.original)}
            sx={{ marginLeft: 1 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeletePodcast(row.original.id)}
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
                  Podcasts 
                </MDTypography>
              </MDBox>
              <MDBox pt={3} sx={{ display: "flex", flexDirection: "column", height: "400px" }}>
                <MDBox sx={{ flex: 1, overflow: "auto" }}>
                  <DataTable table={{ columns, rows: podcasts }} isSorted={false} entriesPerPage={false} showTotalEntries={false} noEndBorder />
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
                  Create Podcast
                </Button>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />

      {/* Modal for creating or editing podcast */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>{newPodcast.id ? "Edit Podcast" : "Create Podcast"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            name="name"
            value={newPodcast.name}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Show Title"
            fullWidth
            name="show_title"
            value={newPodcast.show_title}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Description"
            fullWidth
            name="description"
            value={newPodcast.description}
            onChange={handleInputChange}
            margin="normal"
          />
          <Autocomplete
            options={creators}
            getOptionLabel={(option) => option.creatorName}
            value={creators.find((creator) => creator.id === newPodcast.creator_id) || null}
            onChange={(event, value) => setNewPodcast({ ...newPodcast, creator_id: value?.id, creator_name: value?.creatorName })}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Creator"
                fullWidth
                name="creator_id"
                margin="normal"
              />
            )}
          />
          <Autocomplete
            options={genres}
            getOptionLabel={(option) => option.genre_name}
            value={genres.find((genre) => genre.id === newPodcast.genre_id) || null}
            onChange={(event, value) => setNewPodcast({ ...newPodcast, genre_id: value?.id, genre_name: value?.genre_name })}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Genre"
                fullWidth
                name="genre_id"
                margin="normal"
              />
            )}
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
          <Button onClick={newPodcast.id ? handleUpdatePodcast : handleCreatePodcast} color="primary">
            {newPodcast.id ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default Podcasts;