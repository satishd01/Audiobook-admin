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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Autocomplete
} from "@mui/material";

// BLISSIQ ADMIN React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// BLISSIQ ADMIN React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

function Stories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [newStory, setNewStory] = useState({
    id: null,
    name: "",
    show_title: "",
    description: "",
    creator_id: null,
    creator_name: "",
    genre_id: null,
    genre_name: "",
    image: null,
    created_at: "",
    updated_at: "",
  });
  const [genres, setGenres] = useState([]);
  const [creators, setCreators] = useState([]);

  // Fetch stories data
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://audiobook.shellcode.cloud/api/stories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data && data.success && data.data) {
          setStories(data.data);
        }
      } catch (error) {
        console.error("Error fetching stories:", error);
        alert("Failed to fetch stories. Please check your network connection and try again.");
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
        if (data && data.data) {
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
        if (data) {
          setCreators(data);
        }
      } catch (error) {
        console.error("Error fetching creators:", error);
        alert("Failed to fetch creators. Please check your network connection and try again.");
      }
    };

    fetchStories();
    fetchGenres();
    fetchCreators();
  }, []);

  const handleCreateStory = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append('name', newStory.name);
      formData.append('show_title', newStory.show_title);
      formData.append('description', newStory.description);
      formData.append('creator_id', newStory.creator_id);
      formData.append('creator_name', newStory.creator_name);
      formData.append('genre_id', newStory.genre_id);
      formData.append('genre_name', newStory.genre_name);
      if (newStory.image) {
        formData.append('image', newStory.image);
      }

      const response = await fetch("https://audiobook.shellcode.cloud/api/story", {
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

      if (result.success) {
        setStories((prev) => [
          {
            ...result.data,
          },
          ...prev,
        ]);
        setOpenModal(false);
        setNewStory({
          id: null,
          name: "",
          show_title: "",
          description: "",
          creator_id: null,
          creator_name: "",
          genre_id: null,
          genre_name: "",
          image: null,
          created_at: "",
          updated_at: "",
        });
        alert("Story created successfully!");
      } else {
        alert(result.message || "Failed to create story");
      }
    } catch (error) {
      console.error("Error creating story:", error);
      alert("Failed to create story. Please check your network connection and try again.");
    }
  };

  const handleUpdateStory = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append('name', newStory.name);
      formData.append('show_title', newStory.show_title);
      formData.append('description', newStory.description);
      formData.append('creator_id', newStory.creator_id);
      formData.append('creator_name', newStory.creator_name);
      formData.append('genre_id', newStory.genre_id);
      formData.append('genre_name', newStory.genre_name);
      if (newStory.image) {
        formData.append('image', newStory.image);
      }

      const response = await fetch(
        `https://audiobook.shellcode.cloud/api/stories/${newStory.id}`,
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

      if (result.success) {
        setStories((prevStories) =>
          prevStories.map((story) =>
            story.id === newStory.id ? { ...story, ...newStory } : story
          )
        );
        setOpenModal(false);
        setNewStory({
          id: null,
          name: "",
          show_title: "",
          description: "",
          creator_id: null,
          creator_name: "",
          genre_id: null,
          genre_name: "",
          image: null,
          created_at: "",
          updated_at: "",
        });
        alert("Story updated successfully!");
      } else {
        alert(result.message || "Failed to update story");
      }
    } catch (error) {
      console.error("Error updating story:", error);
      alert("Failed to update story. Please check your network connection and try again.");
    }
  };

  const handleDeleteStory = async (storyId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this story?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://audiobook.shellcode.cloud/api/stories/${storyId}`,
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

        if (result.success) {
          setStories((prevStories) =>
            prevStories.filter((story) => story.id !== storyId)
          );
          alert("Story deleted successfully!");
        } else {
          alert(result.message || "Failed to delete story");
        }
      } catch (error) {
        console.error("Error deleting story:", error);
        alert("Failed to delete story. Please check your network connection and try again.");
      }
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'image') {
      setNewStory({ ...newStory, [e.target.name]: e.target.files[0] });
    } else {
      setNewStory({ ...newStory, [e.target.name]: e.target.value });
    }
  };

  const handleOpenModal = (story = null) => {
    if (story) {
      setNewStory({
        ...story,
        creator_name: creators.find((creator) => creator.id === story.creator_id)?.creatorName || "",
        genre_name: genres.find((genre) => genre.id === story.genre_id)?.genre_name || "",
      });
    } else {
      setNewStory({
        id: null,
        name: "",
        show_title: "",
        description: "",
        creator_id: null,
        creator_name: "",
        genre_id: null,
        genre_name: "",
        image: null,
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
                    Loading Stories Data...
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
    { Header: "Creator Name", accessor: "creator_name" },
    { Header: "Genre ID", accessor: "genre_id" },
    { Header: "Genre Name", accessor: "genre_name" },
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
            onClick={() => handleDeleteStory(row.original.id)}
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
                  Stories 
                </MDTypography>
              </MDBox>
              <MDBox pt={3} sx={{ display: "flex", flexDirection: "column", height: "400px" }}>
                <MDBox sx={{ flex: 1, overflow: "auto" }}>
                  <DataTable table={{ columns, rows: stories }} isSorted={false} entriesPerPage={false} showTotalEntries={false} noEndBorder />
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
                  Create Story
                </Button>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />

      {/* Modal for creating or editing story */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
  <DialogTitle>{newStory.id ? "Edit Story" : "Create Story"}</DialogTitle>
  <DialogContent>
    <TextField
      label="Name"
      fullWidth
      name="name"
      value={newStory.name}
      onChange={handleInputChange}
      margin="normal"
    />
    <TextField
      label="Show Title"
      fullWidth
      name="show_title"
      value={newStory.show_title}
      onChange={handleInputChange}
      margin="normal"
    />
    <TextField
      label="Description"
      fullWidth
      name="description"
      value={newStory.description}
      onChange={handleInputChange}
      margin="normal"
    />
    <Autocomplete
      options={creators}
      getOptionLabel={(option) => option.creatorName}
      value={creators.find((creator) => creator.id === newStory.creator_id) || null}
      onChange={(event, value) => setNewStory({ ...newStory, creator_id: value?.id, creator_name: value?.creatorName })}
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
      value={genres.find((genre) => genre.id === newStory.genre_id) || null}
      onChange={(event, value) => setNewStory({ ...newStory, genre_id: value?.id, genre_name: value?.genre_name })}
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
    <Button onClick={newStory.id ? handleUpdateStory : handleCreateStory} color="primary">
      {newStory.id ? "Update" : "Create"}
    </Button>
  </DialogActions>
</Dialog>
    </DashboardLayout>
  );
}

export default Stories;