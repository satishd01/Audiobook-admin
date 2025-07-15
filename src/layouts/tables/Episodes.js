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
    story_id: null,
    podcastId: null,
    audiobook_id: null,
    name: "",
    season: 1,
    episode: 1,
    description: "",
    creator_name: "",
    image: null,
    audio: null,
  });
  const [podcasts, setPodcasts] = useState([]);
  const [audiobooks, setAudiobooks] = useState([]);
  const [stories, setStories] = useState([]);
  const [selectedMediaType, setSelectedMediaType] = useState(null);

  // Fetch episodes data
  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://lumeromind.shellcode.website/api/admin/allEpisodes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data && data.success && data.data) {
          setEpisodes(data.data.reverse());
        }
      } catch (error) {
        console.error("Error fetching episodes:", error);
        alert("Failed to fetch episodes. Please check your network connection and try again.");
      } finally {
        setLoading(false);
      }
    };

    const fetchPodcasts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://lumeromind.shellcode.website/api/admin/podcasts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data) {
          setPodcasts(data.data);
        }
      } catch (error) {
        console.error("Error fetching podcasts:", error);
        alert("Failed to fetch podcasts. Please check your network connection and try again.");
      }
    };

    const fetchAudiobooks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://lumeromind.shellcode.website/api/audiobooks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data) {
          setAudiobooks(data.data);
        }
      } catch (error) {
        console.error("Error fetching audiobooks:", error);
        alert("Failed to fetch audiobooks. Please check your network connection and try again.");
      }
    };

    const fetchStories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://lumeromind.shellcode.website/api/stories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data) {
          setStories(data.data);
        }
      } catch (error) {
        console.error("Error fetching stories:", error);
        alert("Failed to fetch stories. Please check your network connection and try again.");
      }
    };

    fetchEpisodes();
    fetchPodcasts();
    fetchAudiobooks();
    fetchStories();
  }, []);

  const handleCreateEpisode = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append('title', newEpisode.title);
      formData.append('name', newEpisode.name);
      formData.append('season', newEpisode.season);
      formData.append('episode', newEpisode.episode);
      formData.append('description', newEpisode.description);
      formData.append('creator_name', newEpisode.creator_name);
      if (newEpisode.image) {
        formData.append('image', newEpisode.image);
      }
      if (newEpisode.audio) {
        formData.append('audio', newEpisode.audio);
      }

      if (selectedMediaType === 'story') {
        formData.append('story_id', newEpisode.story_id);
      } else if (selectedMediaType === 'podcast') {
        formData.append('podcastId', newEpisode.podcastId);
      } else if (selectedMediaType === 'audiobook') {
        formData.append('audiobook_id', newEpisode.audiobook_id);
      }

      const response = await fetch("https://lumeromind.shellcode.website/api/admin/episodes", {
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
          {
            ...result.data,
          },
          ...prev,
        ]);
        setOpenModal(false);
        setNewEpisode({
          title: "",
          story_id: null,
          podcastId: null,
          audiobook_id: null,
          name: "",
          season: 1,
          episode: 1,
          description: "",
          creator_name: "",
          image: null,
          audio: null,
        });
        setSelectedMediaType(null);
        alert("Episode created successfully!");
      } else {
        alert(result.message || "Failed to create episode");
      }
    } catch (error) {
      console.error("Error creating episode:", error);
      alert("all filds required");
    }
  };

  const handleUpdateEpisode = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append('title', newEpisode.title);
      formData.append('name', newEpisode.name);
      formData.append('season', newEpisode.season);
      formData.append('episode', newEpisode.episode);
      formData.append('description', newEpisode.description);
      formData.append('creator_name', newEpisode.creator_name);
      if (newEpisode.image) {
        formData.append('image', newEpisode.image);
      }
      if (newEpisode.audio) {
        formData.append('audio', newEpisode.audio);
      }

      if (selectedMediaType === 'story') {
        formData.append('story_id', newEpisode.story_id);
      } else if (selectedMediaType === 'podcast') {
        formData.append('podcastId', newEpisode.podcastId);
      } else if (selectedMediaType === 'audiobook') {
        formData.append('audiobook_id', newEpisode.audiobook_id);
      }

      const response = await fetch(
        `https://lumeromind.shellcode.website/api/admin/episodes/${newEpisode.id}`,
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
          story_id: null,
          podcastId: null,
          audiobook_id: null,
          name: "",
          season: 1,
          episode: 1,
          description: "",
          creator_name: "",
          image: null,
          audio: null,
        });
        setSelectedMediaType(null);
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
          `https://lumeromind.shellcode.website/api/admin/episodes/${episodeId}`,
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
    if (e.target.name === 'image' || e.target.name === 'audio') {
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
      setSelectedMediaType(episode.story_id ? 'story' : episode.podcastId ? 'podcast' : 'audiobook');
    } else {
      setNewEpisode({
        title: "",
        story_id: null,
        podcastId: null,
        audiobook_id: null,
        name: "",
        season: 1,
        episode: 1,
        description: "",
        creator_name: "",
        image: null,
        audio: null,
      });
      setSelectedMediaType(null);
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
    { Header: "Podcast ID", accessor: "podcastId" },
    { Header: "Audiobook ID", accessor: "audiobook_id" },
    { Header: "Story ID", accessor: "story_id" },
    { Header: "Name", accessor: "name" },
    { Header: "Season", accessor: "season" },
    { Header: "Episode", accessor: "episode" },
    { Header: "Description", accessor: "description" },
    { Header: "Creator Name", accessor: "creator_name" },
    {
      Header: "Audio",
      accessor: "audio",
      Cell: ({ row }) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            const audioUrl = row.original.audio_file;
            if (audioUrl) {
              window.open(audioUrl, '_blank');
            } else {
              alert('No audio file available');
            }
          }}
          sx={{ marginLeft: 1 }}
        >
          Audio
        </Button>
      ),
    },
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
            onClick={() => handleDeleteEpisode(row.original.id)}
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
                  Episodes 
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
          <FormControl fullWidth margin="normal">
            <InputLabel id="media-type-select-label">Media Type</InputLabel>
            <Select
              labelId="media-type-select-label"
              id="media-type-select"
              name="mediaType"
              value={selectedMediaType}
              onChange={(e) => setSelectedMediaType(e.target.value)}
              label="Media Type"
                sx={{
                            backgroundColor: "#ffffff",
                            borderRadius: "10px",
                            color: "black",
                            height: "40px",
                            fontSize: "1rem",
                            "& .MuiInputBase-root": {
                              color: "black",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "black",
                              },
                              "&:hover fieldset": {
                                borderColor: "black",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "black",
                              },
                            },
                          }}
            >
              <MenuItem value="story">Story</MenuItem>
              <MenuItem value="podcast">Podcast</MenuItem>
              <MenuItem value="audiobook">Audiobook</MenuItem>
            </Select>
          </FormControl>
          {selectedMediaType === 'story' && (
            <FormControl fullWidth margin="normal">
              <InputLabel id="story-select-label">Story</InputLabel>
              <Select
                labelId="story-select-label"
                id="story-select"
                name="story_id"
                value={newEpisode.story_id}
                onChange={handleInputChange}
                label="Story"
                  sx={{
                              backgroundColor: "#ffffff",
                              borderRadius: "10px",
                              color: "black",
                              height: "40px",
                              fontSize: "1rem",
                              "& .MuiInputBase-root": {
                                color: "black",
                              },
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                  borderColor: "black",
                                },
                                "&:hover fieldset": {
                                  borderColor: "black",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "black",
                                },
                              },
                            }}
              >
                {stories.map((story) => (
                  <MenuItem key={story.id} value={story.id}>
                    {story.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {selectedMediaType === 'podcast' && (
            <FormControl fullWidth margin="normal">
              <InputLabel id="podcast-select-label">Podcast</InputLabel>
              <Select
                labelId="podcast-select-label"
                id="podcast-select"
                name="podcastId"
                value={newEpisode.podcastId}
                onChange={handleInputChange}
                label="Podcast"
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: "10px",
                  color: "black",
                  height: "40px",
                  fontSize: "1rem",
                  "& .MuiInputBase-root": {
                    color: "black",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                    "&:hover fieldset": {
                      borderColor: "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
              >
                {podcasts.map((podcast) => (
                  <MenuItem key={podcast.id} value={podcast.id}>
                    {podcast.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {selectedMediaType === 'audiobook' && (
            <FormControl fullWidth margin="normal">
              <InputLabel id="audiobook-select-label">Audiobook</InputLabel>
              <Select
                labelId="audiobook-select-label"
                id="audiobook-select"
                name="audiobook_id"
                value={newEpisode.audiobook_id}
                onChange={handleInputChange}
                label="Audiobook"
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: "10px",
                  color: "black",
                  height: "40px",
                  fontSize: "1rem",
                  "& .MuiInputBase-root": {
                    color: "black",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                    "&:hover fieldset": {
                      borderColor: "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
              >
                {audiobooks.map((audiobook) => (
                  <MenuItem key={audiobook.id} value={audiobook.id}>
                    {audiobook.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
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
          <p>Upload Image</p>
            
          <input
            type="file"
            name="audio"
            onChange={handleInputChange}
          />
             <p>Upload Audio</p>
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