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

function Audiobooks() {
  const [audiobooks, setAudiobooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [newAudiobook, setNewAudiobook] = useState({
    name: "",
    show_title: "",
    description: "",
    creator_id: null,
    genre_id: null,
    image: null,
    creator_name: "",
    genre_name: "",
  });

  // Fetch audiobooks data
  const fetchAudiobooks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://lumeromind.shellcode.website/api/audiobooks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data && data.data) {
        setAudiobooks(data.data);
      }
    } catch (error) {
      console.error("Error fetching audiobooks:", error);
      alert("Failed to fetch audiobooks. Please check your network connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchGenres = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://lumeromind.shellcode.website/api/admin/genre/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
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
      const response = await fetch("https://lumeromind.shellcode.website/api/admin/creator", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
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

  useEffect(() => {
    fetchAudiobooks();
    fetchGenres();
    fetchCreators();
  }, []);

  const handleCreateAudiobook = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", newAudiobook.name);
      formData.append("show_title", newAudiobook.show_title);
      formData.append("description", newAudiobook.description);
      formData.append("creator_id", newAudiobook.creator_id);
      formData.append("genre_id", newAudiobook.genre_id);
      formData.append("creator_name", newAudiobook.creator_name);
      formData.append("genre_name", newAudiobook.genre_name);
      if (newAudiobook.image) {
        formData.append("image", newAudiobook.image);
      }

      const response = await fetch("https://lumeromind.shellcode.website/api/audiobook", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();

      if (result.message) {
        // Optimistic update: immediately add the new audiobook to the state
        fetchAudiobooks();
        setOpenModal(false); // Close the modal
        setAudiobooks((prevAudiobooks) => [
          {
            id: result.data.id, // Assuming the API returns the new audiobook's ID
            name: newAudiobook.name,
            show_title: newAudiobook.show_title,
            description: newAudiobook.description,
            creator_id: newAudiobook.creator_id,
            genre_id: newAudiobook.genre_id,
            creator_name: newAudiobook.creator_name,
            genre_name: newAudiobook.genre_name,
            image: newAudiobook.image ? URL.createObjectURL(newAudiobook.image) : "", // Handle image URL if needed
          },
          ...prevAudiobooks,
        ]);

        setNewAudiobook({
          name: "",
          show_title: "",
          description: "",
          creator_id: null,
          genre_id: null,
          image: null,
          creator_name: "",
          genre_name: "",
        });
        alert("Audiobook created successfully!");
      } else {
        alert(result.message || "Failed to create audiobook");
      }
    } catch (error) {
      console.error("Error creating audiobook:", error);
      alert("Failed to create audiobook. Please check your network connection and try again.");
    }
  };

  const handleUpdateAudiobook = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", newAudiobook.name);
      formData.append("show_title", newAudiobook.show_title);
      formData.append("description", newAudiobook.description);
      formData.append("creator_id", newAudiobook.creator_id);
      formData.append("genre_id", newAudiobook.genre_id);
      formData.append("creator_name", newAudiobook.creator_name);
      formData.append("genre_name", newAudiobook.genre_name);
      if (newAudiobook.image) {
        formData.append("image", newAudiobook.image);
      }

      const response = await fetch(
        `https://lumeromind.shellcode.website/api/audiobook/${newAudiobook.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();

      if (result.message) {
        fetchAudiobooks();
        setOpenModal(false); // Close the modal
        // Optimistic update: immediately update the audiobook in the state
        setAudiobooks((prevAudiobooks) =>
          prevAudiobooks.map((audiobook) =>
            audiobook.id === newAudiobook.id ? { ...audiobook, ...newAudiobook } : audiobook
          )
        );

        setNewAudiobook({
          name: "",
          show_title: "",
          description: "",
          creator_id: null,
          genre_id: null,
          image: null,
          creator_name: "",
          genre_name: "",
        });
        alert("Audiobook updated successfully!");
      } else {
        alert(result.message || "Failed to update audiobook");
      }
    } catch (error) {
      console.error("Error updating audiobook:", error);
      alert("Failed to update audiobook. Please check your network connection and try again.");
    }
  };

  const handleDeleteAudiobook = async (audiobookId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this audiobook?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://lumeromind.shellcode.website/api/audiobook/${audiobookId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();

        if (result.message) {
          fetchAudiobooks();
          setAudiobooks((prevAudiobooks) =>
            prevAudiobooks.filter((audiobook) => audiobook.id !== audiobookId)
          );
          alert("Audiobook deleted successfully!");
        } else {
          alert(result.message || "Failed to delete audiobook");
        }
      } catch (error) {
        console.error("Error deleting audiobook:", error);
        alert("Failed to delete audiobook. Please check your network connection and try again.");
      }
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === "image") {
      setNewAudiobook({ ...newAudiobook, [e.target.name]: e.target.files[0] });
    } else {
      setNewAudiobook({ ...newAudiobook, [e.target.name]: e.target.value });
    }
  };

  const handleOpenModal = (audiobook = null) => {
    if (audiobook) {
      setNewAudiobook({
        ...audiobook,
      });
    } else {
      setNewAudiobook({
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
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Loading Audiobooks Data...
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
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
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
            onClick={() => handleDeleteAudiobook(row.original.id)}
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
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Audiobooks
                </MDTypography>
              </MDBox>
              <MDBox pt={3} sx={{ display: "flex", flexDirection: "column", height: "400px" }}>
                <MDBox sx={{ flex: 1, overflow: "auto" }}>
                  <DataTable
                    table={{ columns, rows: audiobooks }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
                <Button
                  variant="contained"
                  color="primary"
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
                  Create Audiobook
                </Button>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />

      {/* Modal for creating or editing audiobook */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>{newAudiobook.id ? "Edit Audiobook" : "Create Audiobook"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            name="name"
            value={newAudiobook.name}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Show Title"
            fullWidth
            name="show_title"
            value={newAudiobook.show_title}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Description"
            fullWidth
            name="description"
            value={newAudiobook.description}
            onChange={handleInputChange}
            margin="normal"
          />
          <Autocomplete
            options={creators}
            getOptionLabel={(option) => option.creatorName}
            value={creators.find((creator) => creator.id === newAudiobook.creator_id) || null}
            onChange={(event, value) =>
              setNewAudiobook({
                ...newAudiobook,
                creator_id: value?.id,
                creator_name: value?.creatorName,
              })
            }
            renderInput={(params) => (
              <TextField {...params} label="Creator" fullWidth name="creator_id" margin="normal" />
            )}
          />
          <Autocomplete
            options={genres}
            getOptionLabel={(option) => option.genre_name}
            value={genres.find((genre) => genre.id === newAudiobook.genre_id) || null}
            onChange={(event, value) =>
              setNewAudiobook({
                ...newAudiobook,
                genre_id: value?.id,
                genre_name: value?.genre_name,
              })
            }
            renderInput={(params) => (
              <TextField {...params} label="Genre" fullWidth name="genre_id" margin="normal" />
            )}
          />
          <input type="file" name="image" onChange={handleInputChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={newAudiobook.id ? handleUpdateAudiobook : handleCreateAudiobook}
            color="primary"
          >
            {newAudiobook.id ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default Audiobooks;
