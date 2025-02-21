import { useState } from "react";
import axios from "axios";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";

// BLISSIQ ADMIN React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// BLISSIQ ADMIN React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// PropTypes for prop validation
import PropTypes from "prop-types";

function CreateUniversity({ fetchUniversities }) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://api.blissiq.cloud/admin/university/", formData);

      if (response.data.success) {
        alert("University created successfully!");
        fetchUniversities(); // Trigger API call to refresh the table
        setFormData({ name: "", address: "" }); // Reset form
      }
    } catch (error) {
      console.error("Error creating university:", error);
      alert("Failed to create university.");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8} md={6} lg={5}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h4" gutterBottom>
                  Create University
                </MDTypography>
                <form onSubmit={handleSubmit}>
                  <MDBox mb={3}>
                    <TextField
                      label="University Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </MDBox>
                  <MDBox mb={3}>
                    <TextField
                      label="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      fullWidth
                      multiline
                      rows={4}
                      required
                    />
                  </MDBox>
                  <MDBox display="flex" justifyContent="flex-end">
                    <MDButton type="submit" variant="gradient" color="success">
                      Submit
                    </MDButton>
                  </MDBox>
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

// PropTypes definition
CreateUniversity.propTypes = {
  fetchUniversities: PropTypes.func.isRequired,
};

export default CreateUniversity;
