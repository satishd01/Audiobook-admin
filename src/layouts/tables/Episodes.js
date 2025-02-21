import { useEffect, useState } from "react";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
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

function Episodes() {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [newEpisode, setNewEpisode] = useState({
    title: "",
    duration: 0,
    podcast_id: null,
    audiobook_id: null,
    story_id: null,
    name: "",
    season: 1,
    episode: 1,
    description: "",
    creator_name: "",
    image: null,
    audio_file: null,
  });

  // Fetch episodes data
  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://audiobook.shellcode.cloud/api/admin/episodes/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data && data.success && data.data) {
          setEpisodes(data.data);
        }
      } catch (error) {
        console.error("Error fetching episodes:", error);
        alert("Failed to fetch episodes. Please check your network connection and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  const handleCreateEpisode = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append('title', newEpisode.title);
      formData.append('duration', newEpisode.duration);
      formData.append('podcast_id', newEpisode.podcast_id);
      formData.append('audiobook_id', newEpisode.audiobook_id);
      formData.append('story_id', newEpisode.story_id);
      formData.append('name', newEpisode.name);
      formData.append('season', newEpisode.season);
      formData.append('episode', newEpisode.episode);
      formData.append('description', newEpisode.description);
      formData.append('creator_name', newEpisode.creator_name);
      if (newEpisode.image) {
        formData.append('image', newEpisode.image);
      }
      if (newEpisode.audio_file) {
        formData.append('audio_file', newEpisode.audio_file);
      }

      const response = await fetch("https://audiobook.shellcode.cloud/api/admin/episodes/all", {
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
        setEpisodes((prev) => [
          ...prev,
          {
            ...result.data,
          },
        ]);
        setOpenModal(false);
        setNewEpisode({
          title: "",
          duration: 0,
          podcast_id: null,
          audiobook_id: null,
          story_id: null,
          name: "",
          season: 1,
          episode: 1,
          description: "",
          creator_name: "",
          image: null,
          audio_file: null,
        });
        alert("Episode created successfully!");
      } else {
        alert(result.message || "Failed to create episode");
      }
    } catch (error) {
      console.error("Error creating episode:", error);
      alert("Failed to create episode. Please check your network connection and try again.");
    }
  };

  const handleUpdateEpisode = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append('title', newEpisode.title);
      formData.append('duration', newEpisode.duration);
      formData.append('podcast_id', newEpisode.podcast_id);
      formData.append('audiobook_id', newEpisode.audiobook_id);
      formData.append('story_id', newEpisode.story_id);
      formData.append('name', newEpisode.name);
      formData.append('season', newEpisode.season);
      formData.append('episode', newEpisode.episode);
      formData.append('description', newEpisode.description);
      formData.append('creator_name', newEpisode.creator_name);
      if (newEpisode.image) {
        formData.append('image', newEpisode.image);
      }
      if (newEpisode.audio_file) {
        formData.append('audio_file', newEpisode.audio_file);
      }

      const response = await fetch(
        `https://audiobook.shellcode.cloud/api/admin/episodes/all/${newEpisode.id}`,
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
        setEpisodes((prevEpisodes) =>
          prevEpisodes.map((episode) =>
            episode.id === newEpisode.id ? { ...episode, ...newEpisode } : episode
          )
        );
        setOpenModal(false);
        setNewEpisode({
          title: "",
          duration: 0,
          podcast_id: null,
          audiobook_id: null,
          story_id: null,
          name: "",
          season: 1,
          episode: 1,
          description: "",
          creator_name: "",
          image: null,
          audio_file: null,
        });
        alert("Episode updated successfully!");
      } else {
        alert(result.message || "Failed to update episode");
      }
    } catch (error) {
      console.error("Error updating episode:", error);
      alert("Failed to update episode. Please check your network connection and try again.");
    }
  };

  const handleDeleteEpisode = async (episodeId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this episode?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://audiobook.shellcode.cloud/api/admin/episodes/all/${episodeId}`,
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
          setEpisodes((prevEpisodes) =>
            prevEpisodes.filter((episode) => episode.id !== episodeId)
          );
          alert("Episode deleted successfully!");
        } else {
          alert(result.message || "Failed to delete episode");
        }
      } catch (error) {
        console.error("Error deleting episode:", error);
        alert("Failed to delete episode. Please check your network connection and try again.");
      }
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'image' || e.target.name === 'audio_file') {
      setNewEpisode({ ...newEpisode, [e.target.name]: e.target.files[0] });
    } else {
      setNewEpisode({ ...newEpisode, [e.target.name]: e.target.value });
    }
  };

  const handleOpenModal = (episode = null) => {
    if (episode) {
      setNewEpisode({
        ...episode,
      });
    } else {
      setNewEpisode({
        title: "",
        duration: 0,
        podcast_id: null,
        audiobook_id: null,
        story_id: null,
        name: "",
        season: 1,
        episode: 1,
        description: "",
        creator_name: "",
        image: null,
        audio_file: null,
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
                    Loading Episodes Data...
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
    { Header: "Title", accessor: "title" },
    {
      Header: "Image",
      accessor: "image",
      Cell: ({ row }) => (
        <img
          src={row.original.image}
          alt={row.original.title}
          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
        />
      ),
    },
    { Header: "Duration", accessor: "duration" },
    { Header: "Podcast ID", accessor: "podcast_id" },
    { Header: "Audiobook ID", accessor: "audiobook_id" },
    { Header: "Story ID", accessor: "story_id" },
    { Header: "Name", accessor: "name" },
    { Header: "Season", accessor: "season" },
    { Header: "Episode", accessor: "episode" },
    { Header: "Description", accessor: "description" },
    { Header: "Creator Name", accessor: "creator_name" },
    {
      Header: "Download Audio",
      accessor: "audio_file",
      Cell: ({ row }) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            const audioUrl = row.original.audio_file;
            if (audioUrl) {
              const link = document.createElement('a');
              link.href = audioUrl;
              link.download = row.original.title + '.mp3';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            } else {
              alert('No audio file available');
            }
          }}
          sx={{ marginLeft: 1 }}
        >
          Download
        </Button>
      ),
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDeleteEpisode(row.original.id)}
          sx={{ marginLeft: 1 }}
        >
          Delete
        </Button>
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
                  Episodes Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3} sx={{ display: "flex", flexDirection: "column", height: "400px" }}>
                <MDBox sx={{ flex: 1, overflow: "auto" }}>
                  <DataTable table={{ columns, rows: episodes }} isSorted={false} entriesPerPage={false} showTotalEntries={false} noEndBorder />
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
                  Create Episode
                </Button>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />

      {/* Modal for creating or editing episode */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>{newEpisode.id ? "Edit Episode" : "Create Episode"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            name="title"
            value={newEpisode.title}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Duration"
            fullWidth
            name="duration"
            type="number"
            value={newEpisode.duration}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Podcast ID"
            fullWidth
            name="podcast_id"
            type="number"
            value={newEpisode.podcast_id}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Audiobook ID"
            fullWidth
            name="audiobook_id"
            type="number"
            value={newEpisode.audiobook_id}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Story ID"
            fullWidth
            name="story_id"
            type="number"
            value={newEpisode.story_id}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Name"
            fullWidth
            name="name"
            value={newEpisode.name}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Season"
            fullWidth
            name="season"
            type="number"
            value={newEpisode.season}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Episode"
            fullWidth
            name="episode"
            type="number"
            value={newEpisode.episode}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Description"
            fullWidth
            name="description"
            value={newEpisode.description}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Creator Name"
            fullWidth
            name="creator_name"
            value={newEpisode.creator_name}
            onChange={handleInputChange}
            margin="normal"
          />
          <input
            type="file"
            name="image"
            onChange={handleInputChange}
          />
          <input
            type="file"
            name="audio_file"
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={newEpisode.id ? handleUpdateEpisode : handleCreateEpisode} color="primary">
            {newEpisode.id ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default Episodes;