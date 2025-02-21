import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TextField, Card, Box, Button, Typography } from "@mui/material";

function UpdateSubject() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    code: "",
  });

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await axios.get(`https://api.blissiq.cloud/admin/subject/${id}`);
        if (response.data.success) {
          setFormData({ name: response.data.data.name, code: response.data.data.code });
        }
      } catch (error) {
        console.error("Error fetching subject:", error);
      }
    };

    fetchSubject();
  }, [id]);

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
      const response = await axios.put(`https://api.blissiq.cloud/admin/subject/${id}`, formData);
      if (response.data.success) {
        alert("Subject updated successfully!");
      }
    } catch (error) {
      console.error("Error updating subject:", error);
      alert("Failed to update subject.");
    }
  };

  return (
    <Card>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Update Subject
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <TextField
              label="Subject Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="Subject Code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              fullWidth
              required
            />
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </Box>
        </form>
      </Box>
    </Card>
  );
}

export default UpdateSubject;
