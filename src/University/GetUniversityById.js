import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // to get the id from URL

// BLISSIQ ADMIN React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

export default function GetUniversityById() {
  const [university, setUniversity] = useState(null);
  const { id } = useParams(); // Get university ID from URL

  const fetchUniversityById = async () => {
    try {
      const response = await axios.get(`https://api.blissiq.cloud/admin/university/${id}`);
      if (response.data.success) {
        setUniversity(response.data.data); // Assuming the response contains the university object
      }
    } catch (error) {
      console.error("Error fetching university details:", error);
    }
  };

  useEffect(() => {
    fetchUniversityById();
  }, [id]);

  if (!university) {
    return (
      <MDTypography variant="h6" color="text">
        Loading...
      </MDTypography>
    );
  }

  return (
    <MDBox>
      <MDTypography variant="h4" color="primary">
        {university.name}
      </MDTypography>
      <MDTypography variant="body1">{university.address}</MDTypography>
      <MDTypography variant="body1">{university.isActive ? "Active" : "Inactive"}</MDTypography>
    </MDBox>
  );
}
