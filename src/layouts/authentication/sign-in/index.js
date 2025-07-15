import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import logo from "assets/images/logo.jpeg"; // Import your logo here
import axios from "axios";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [errorMessage, setErrorMessage] = useState(""); // State to handle error message
  const navigate = useNavigate(); // Hook for navigation

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  // Update states for email and password input
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: email,
      password: password,
    };ww

    try {
      const response = await axios.post("https://lumeromind.shellcode.website/api/admin/auth/login", payload);

      if (response.data.success) {
        // Save the token to local storage
        localStorage.setItem("token", response.data.token);
        alert("Login successful! Redirecting to the dashboard..."); // Success message
        navigate("/dashboard"); // Navigate to the dashboard page
      } else {
        setErrorMessage("Login failed: " + (response.data.message || "Unknown error"));
      }

      console.log(response.data);
    } catch (error) {
      console.error("Error logging in", error);
      setErrorMessage("Error logging in. Please try again later.");
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card sx={{ backgroundColor: '#FFFFFF' }}> {/* Changed background color to white */}
        <MDBox
          variant="gradient"
          bgColor="#f5f5f5"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={1}
          p={2}
          mb={1}
          textAlign="center"
          
        >
          {/* Add the logo at the top */}
          <MDBox mb={5}>
            <img
              src={logo} // Your logo image path
              alt="Logo"
              style={{
                maxWidth: "120px", // Reduced size of the logo
                marginBottom: "16px",
              }}
            />
          </MDBox>
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Admin Login
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                value={email} // Bind input value to state
                onChange={handleEmailChange} // Handle change
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                value={password} // Bind input value to state
                onChange={handlePasswordChange} // Handle change
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                Log in
              </MDButton>
            </MDBox>
            {errorMessage && (
              <MDTypography variant="body2" color="error" textAlign="center">
                {errorMessage}
              </MDTypography>
            )}
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;