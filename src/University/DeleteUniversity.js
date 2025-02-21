import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Use useNavigate

// BLISSIQ ADMIN React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

export default function DeleteUniversity() {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // useNavigate instead of useHistory

  useEffect(() => {
    const fetchUniversityById = async () => {
      try {
        const response = await axios.get(`https://api.blissiq.cloud/admin/university/${id}`);
        if (response.data.success) {
          setUniversity(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching university:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversityById();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://api.blissiq.cloud/admin/university/${id}`);
      navigate("/universities"); // Redirect to universities list
    } catch (error) {
      console.error("Error deleting university:", error);
    }
  };

  if (loading) {
    return (
      <MDTypography variant="h6" color="text">
        Loading...
      </MDTypography>
    );
  }

  return (
    <MDBox>
      <MDTypography variant="h4" gutterBottom>
        Delete University
      </MDTypography>
      {university ? (
        <>
          <MDTypography variant="h6">Are you sure you want to delete:</MDTypography>
          <MDTypography variant="h6">{university.name}</MDTypography>
          <MDButton color="error" onClick={handleDelete}>
            Delete
          </MDButton>
        </>
      ) : (
        <MDTypography variant="h6" color="error">
          University not found
        </MDTypography>
      )}
    </MDBox>
  );
}
