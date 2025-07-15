import { useEffect, useState } from "react";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  Card,
  CircularProgress,
} from "@mui/material";

// BLISSIQ ADMIN React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// BLISSIQ ADMIN React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

function Genres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [newGenre, setNewGenre] = useState({
    genre_name: "",
    image: null,
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch genres data
  const fetchGenres = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleCreateGenre = async () => {
    setIsCreating(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("genre_name", newGenre.genre_name);
      if (newGenre.image) {
        formData.append("image", newGenre.image);
      }

      const response = await fetch("https://lumeromind.shellcode.website/api/admin/genre", {
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

      if (result.message === "Genre created successfully") {
        // Re-fetch genres after successful creation
        fetchGenres(); // This will ensure the UI reflects the new genre immediately
        setOpenModal(false);
        setNewGenre({
          genre_name: "",
          image: null,
        });
        setSuccessMessage("Genre created successfully!");
        setTimeout(() => setSuccessMessage(""), 2000); // Clear message after 3 seconds
      } else {
        alert(result.message || "Failed to create genre");
      }
    } catch (error) {
      console.error("Error creating genre:", error);
      alert("Failed to create genre. Please check your network connection and try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateGenre = async () => {
    setIsUpdating(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("genre_name", newGenre.genre_name);
      if (newGenre.image) {
        formData.append("image", newGenre.image);
      }

      const response = await fetch(
        `https://lumeromind.shellcode.website/api/admin/genre/${newGenre.id}`,
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

      if (result.message === "Genre updated successfully") {
        setGenres((prevGenres) =>
          prevGenres.map((genre) => (genre.id === newGenre.id ? { ...genre, ...newGenre } : genre))
        );
        setOpenModal(false);
        setNewGenre({
          genre_name: "",
          image: null,
        });
        setSuccessMessage("Genre updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
      } else {
        alert(result.message || "Failed to update genre");
      }
    } catch (error) {
      console.error("Error updating genre:", error);
      alert("Failed to update genre. Please check your network connection and try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteGenre = async (genreId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this genre?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://lumeromind.shellcode.website/api/admin/genre/${genreId}`,
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

        if (result.message === "Genre deleted successfully") {
          setGenres((prevGenres) => prevGenres.filter((genre) => genre.id !== genreId));
          setSuccessMessage("Genre deleted successfully!");
          setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
        } else {
          alert(result.message || "Failed to delete genre");
        }
      } catch (error) {
        console.error("Error deleting genre:", error);
        alert("Failed to delete genre. Please check your network connection and try again.");
      }
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === "image") {
      setNewGenre({ ...newGenre, [e.target.name]: e.target.files[0] });
    } else {
      setNewGenre({ ...newGenre, [e.target.name]: e.target.value });
    }
  };

  const handleOpenModal = (genre = null) => {
    if (genre) {
      setNewGenre({
        ...genre,
      });
    } else {
      setNewGenre({
        genre_name: "",
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
                    Loading Genres Data...
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
    { Header: "Genre Name", accessor: "genre_name" },
    {
      Header: "Image",
      accessor: "image",
      Cell: ({ row }) => (
        <img
          src={row.original.image}
          alt={row.original.genre_name}
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
            onClick={() => handleDeleteGenre(row.original.id)}
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
                  Genres
                </MDTypography>
              </MDBox>
              <MDBox pt={3} sx={{ display: "flex", flexDirection: "column", height: "400px" }}>
                <MDBox sx={{ flex: 1, overflow: "auto" }}>
                  <DataTable
                    table={{ columns, rows: genres }}
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
                  Create Genre
                </Button>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />

      {/* Modal for creating or editing genre */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>{newGenre.id ? "Edit Genre" : "Create Genre"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Genre Name"
            fullWidth
            name="genre_name"
            value={newGenre.genre_name}
            onChange={handleInputChange}
            margin="normal"
          />
          <input type="file" name="image" onChange={handleInputChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={newGenre.id ? handleUpdateGenre : handleCreateGenre}
            color="primary"
            disabled={isCreating || isUpdating}
          >
            {newGenre.id ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Message */}
      {successMessage && (
        <MDBox
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            backgroundColor: "green",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            zIndex: 1000,
          }}
        >
          {successMessage}
        </MDBox>
      )}
    </DashboardLayout>
  );
}

export default Genres;
