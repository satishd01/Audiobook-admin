import { useState } from "react";
import { useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

// BLISSIQ ADMIN React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// BLISSIQ ADMIN React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function CreateSession() {
  const [formData, setFormData] = useState({
    class: "A1", // default class value
    topic: "",
    subtopic: "",
    URL: "",
    type: "video", // default type
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // State to store message
  const [messageType, setMessageType] = useState(""); // State to store message type (success/error)
  const [file, setFile] = useState(null); // State to store the file for ppt

  const navigate = useNavigate(); // Hook to navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "type" && e.target.value === "pptx") {
      // Reset the file if type changes to pptx
      setFile(null);
      setFormData((prevData) => ({ ...prevData, URL: "" }));
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Store the selected file
  };

  const uploadPpt = async () => {
    if (!file) return; // If no file is selected, return

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://api.blissiq.cloud/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.status) {
        // Set the URL field with the file URL from the upload response
        setFormData((prevData) => ({
          ...prevData,
          URL: `https://api.blissiq.cloud${data.fileUrl}`, // Attach the base URL to the file URL
        }));
        setMessageType("success");
        setMessage("PPT uploaded successfully.");
      } else {
        setMessageType("error");
        setMessage("Failed to upload PPT. Please try again.");
      }
    } catch (error) {
      setMessageType("error");
      setMessage("An error occurred while uploading the PPT.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Clear any previous messages

    if (formData.type === "pptx" && !formData.URL) {
      setMessageType("error");
      setMessage("Please upload a PPT file first.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://api.blissiq.cloud/session/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Checking if the response status is "success"
      if (data.success) {
        setMessageType("success");
        setMessage(data.message || "Session created successfully!");
        setTimeout(() => {
          navigate("/Get-session");
        }, 1000);
      } else {
        setMessageType("error");
        setMessage(data.message || "Failed to create session. Please try again.");
      }
    } catch (error) {
      setMessageType("error");
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={4} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={6}>
            <Card>
              <MDBox p={2}>
                <MDTypography variant="h5" align="center">
                  Create Session
                </MDTypography>
              </MDBox>
              <MDBox pt={2} pb={2} px={2}>
                {message && (
                  <MDBox mb={2}>
                    <MDTypography
                      variant="body2"
                      color={messageType === "error" ? "error" : "success"}
                      align="center"
                    >
                      {message}
                    </MDTypography>
                  </MDBox>
                )}
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Class"
                        variant="outlined"
                        name="class"
                        value={formData.class}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Topic"
                        variant="outlined"
                        name="topic"
                        value={formData.topic}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Subtopic"
                        variant="outlined"
                        name="subtopic"
                        value={formData.subtopic}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Type</InputLabel>
                        <Select
                          name="type"
                          value={formData.type}
                          onChange={handleChange}
                          required
                          label="Type"
                          sx={{ padding: "12px 14px" }} // Add padding to make it the same as other fields
                        >
                          <MenuItem value="video">Video</MenuItem>
                          <MenuItem value="pptx">pptx</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    {formData.type === "pptx" && (
                      <Grid item xs={12}>
                        <input
                          type="file"
                          onChange={handleFileChange}
                          accept=".pptx"
                          style={{ width: "100%" }} // Ensure file input spans full width
                        />
                        {file && (
                          <MDButton onClick={uploadPpt} variant="gradient" color="info" fullWidth>
                            Upload PPT
                          </MDButton>
                        )}
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="URL"
                        variant="outlined"
                        name="URL"
                        value={formData.URL}
                        onChange={handleChange}
                        required
                        disabled={formData.type === "pptx"} // Disable for PPTX type, as URL is filled automatically
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <MDButton
                        type="submit"
                        variant="gradient"
                        color="info"
                        fullWidth
                        disabled={loading}
                      >
                        {loading ? "Creating..." : "Create Session"}
                      </MDButton>
                    </Grid>
                  </Grid>
                </form>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CreateSession;
