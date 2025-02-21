import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate

// BLISSIQ ADMIN React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

export default function UpdateUniversity() {
  const { id } = useParams(); // Get ID from route parameters
  const navigate = useNavigate(); // Define navigate using useNavigate hook

  const [university, setUniversity] = useState({
    name: "",
    address: "",
    isActive: true, // Assuming the default status is active
  });
  const [loading, setLoading] = useState(true);

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

  const handleUpdate = async () => {
    try {
      await axios.put(`https://api.blissiq.cloud/admin/university/${id}`, university);
      navigate("/universities"); // Redirect to the university list page after successful update
    } catch (error) {
      console.error("Error updating university:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUniversity({ ...university, [name]: value });
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
        Update University
      </MDTypography>
      {university ? (
        <>
          {/* University Name */}
          <input
            type="text"
            name="name"
            value={university.name}
            onChange={handleChange}
            placeholder="University Name"
            style={{ marginBottom: "1rem", padding: "8px", width: "100%" }}
          />

          {/* University Address */}
          <input
            type="text"
            name="address"
            value={university.address}
            onChange={handleChange}
            placeholder="University Address"
            style={{ marginBottom: "1rem", padding: "8px", width: "100%" }}
          />

          {/* University Status */}
          <select
            name="isActive"
            value={university.isActive}
            onChange={handleChange}
            style={{ marginBottom: "1rem", padding: "8px", width: "100%" }}
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>

          <MDButton color="primary" onClick={handleUpdate}>
            Update
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
