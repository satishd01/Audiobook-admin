import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function CreateSubject({ fetchSubjects }) {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    gradeId: "",
    universityId: "",
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
      const response = await axios.post("https://api.blissiq.cloud/admin/subject", formData);

      if (response.data.success) {
        alert("Subject created successfully!");
        fetchSubjects();
        setFormData({ name: "", code: "", gradeId: "", universityId: "" });
      }
    } catch (error) {
      console.error("Error creating subject:", error);
      alert("Failed to create subject.");
    }
  };

  return (
    <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
      <Grid item xs={12} sm={8} md={6} lg={5}>
        <Card>
          <MDBox p={3}>
            <MDTypography variant="h4" gutterBottom>
              Create Subject
            </MDTypography>
            <form onSubmit={handleSubmit}>
              <MDBox mb={3}>
                <TextField
                  label="Subject Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </MDBox>
              <MDBox mb={3}>
                <TextField
                  label="Subject Code"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </MDBox>
              <MDBox mb={3}>
                <TextField
                  label="Grade ID"
                  name="gradeId"
                  type="number"
                  value={formData.gradeId}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </MDBox>
              <MDBox mb={3}>
                <TextField
                  label="University ID"
                  name="universityId"
                  type="number"
                  value={formData.universityId}
                  onChange={handleChange}
                  fullWidth
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
  );
}

export default CreateSubject;
