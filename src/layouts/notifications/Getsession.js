import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
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

function SessionManagement() {
  const [searchParams, setSearchParams] = useState({
    universityId: "",
    subjectId: "",
    gradeId: "",
    topicId: "",
    type: "", // Added type for filtering
  });

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // State to store message
  const [messageType, setMessageType] = useState(""); // State to store message type (success/error)
  const [openModal, setOpenModal] = useState(false); // Modal state for update
  const [openCreateModal, setOpenCreateModal] = useState(false); // Modal state for create
  const [selectedSession, setSelectedSession] = useState(null); // Selected session to update
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false); // Confirm dialog for deletion
  const [deleteSessionId, setDeleteSessionId] = useState(null); // Selected session ID for deletion
  const [formData, setFormData] = useState({
    URL: "",
    type: "video", // default type
    universityId: "",
    subjectId: "",
    gradeId: "",
    topicId: "",
    subTopicId: "", // Added subTopicId
  });
  const [file, setFile] = useState(null); // State to store the file for ppt
  const [universities, setUniversities] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);
  const [topics, setTopics] = useState([]);
  const [subTopics, setSubTopics] = useState([]); // Added subTopics state

  const navigate = useNavigate(); // Hook to navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  const fetchUniversities = async () => {
    try {
      const response = await fetch("https://api.blissiq.cloud/admin/university");
      const data = await response.json();
      if (data.success) {
        setUniversities(data.data.reverse());
      }
    } catch (error) {
      console.error("Failed to fetch universities:", error);
    }
  };

  const fetchSubjects = async (universityId) => {
    try {
      const response = await fetch(`https://api.blissiq.cloud/admin/subject?universityId=${universityId}`);
      const data = await response.json();

      if (data.success && Array.isArray(data.data)) {
        setSubjects(data.data.reverse());
      } else {
        console.error("No data available or response format error");
      }
    } catch (error) {
      console.error("Failed to fetch subjects:", error);
    }
  };

  const fetchGrades = async (universityId) => {
    try {
      const response = await fetch(`https://api.blissiq.cloud/admin/grade?universityId=${universityId}`);
      const data = await response.json();
      if (data.success) {
        setGrades(data.data.reverse());
      }
    } catch (error) {
      console.error("Failed to fetch grades:", error);
    }
  };

  const fetchTopics = async () => {
    try {
      const response = await fetch("https://api.blissiq.cloud/topics");
      const data = await response.json();
      setTopics(data);
    } catch (error) {
      console.error("Failed to fetch topics:", error);
    }
  };

  const fetchSubTopics = async (topicId) => {
    try {
      const response = await fetch(`https://api.blissiq.cloud/subtopics?topicId=${topicId}`);
      const data = await response.json();
      if (data && Array.isArray(data)) {
        setSubTopics(data);
      } else {
        setSubTopics([]);
      }
    } catch (error) {
      console.error("Failed to fetch subtopics:", error);
    }
  };

  const fetchSessions = async () => {
    setLoading(true);
    setMessage(""); // Clear any previous messages

    const { universityId, subjectId, gradeId, topicId, type } = searchParams;
    const url = `https://api.blissiq.cloud/session?universityId=${universityId}&subjectId=${subjectId}&gradeId=${gradeId}&topicId=${topicId}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data && Array.isArray(data)) {
        if (type) {
          setSessions(data.filter(session => session.type === type));
        } else {
          setSessions(data);
        }
      } else {
        setSessions([]);
        setMessageType("error");
        setMessage(data.message || "No sessions found");
      }
    } catch (error) {
      setSessions([]);
      setMessageType("error");
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Clear any previous messages

    try {
      const response = await fetch("https://api.blissiq.cloud/session/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          subTopicId: formData.subTopicId || null, // Ensure subTopicId is included
        }),
      });

      if (response.status === 201) {
        setMessageType("success");
        setMessage("Session created successfully!");
        setOpenCreateModal(false);
        fetchSessions();
        setFormData({
          URL: "",
          type: "video",
          universityId: "",
          subjectId: "",
          gradeId: "",
          topicId: "",
          subTopicId: "", // Reset subTopicId
        });
        setFile(null);
      } else {
        setMessageType("error");
        setMessage("Failed to create session. Please try again.");
      }
    } catch (error) {
      setMessageType("error");
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (sessionId) => {
    const updatedSession = {
      URL: formData.URL,
      type: formData.type,
      universityId: formData.universityId,
      gradeId: formData.gradeId,
      subjectId: formData.subjectId,
      topicId: formData.topicId,
      subTopicId: formData.subTopicId || null, // Ensure subTopicId is included
    };

    try {
      const response = await fetch(`https://api.blissiq.cloud/session/${sessionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSession),
      });

      if (response.status === 200) {
        setMessageType("success");
        setMessage("Session updated successfully!");
        setOpenModal(false);
        fetchSessions();
        setFormData({
          URL: "",
          type: "video",
          universityId: "",
          subjectId: "",
          gradeId: "",
          topicId: "",
          subTopicId: "", // Reset subTopicId
        });
        setFile(null);
      } else {
        setMessageType("error");
        setMessage("Failed to update session. Please try again.");
      }
    } catch (error) {
      setMessageType("error");
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://api.blissiq.cloud/session/${deleteSessionId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        setMessageType("success");
        setMessage("Session deleted successfully!");
        setOpenDeleteConfirm(false); // Close confirmation dialog
        fetchSessions(); // Refresh sessions after deletion
      } else {
        setMessageType("error");
        setMessage(data.message || "Failed to delete session.");
      }
    } catch (error) {
      setMessageType("error");
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleModalOpen = (session) => {
    setSelectedSession(session);
    setFormData({
      URL: session.URL,
      type: session.type,
      universityId: session.universityId,
      subjectId: session.subjectId,
      gradeId: session.gradeId,
      topicId: session.topicId,
      subTopicId: session.subTopicId || "", // Include subTopicId
    });
    setFile(null); // Reset file
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedSession(null);
    setFormData({
      URL: "",
      type: "video",
      universityId: "",
      subjectId: "",
      gradeId: "",
      topicId: "",
      subTopicId: "", // Reset subTopicId
    });
    setFile(null);
  };

  const handleDeleteConfirmOpen = (sessionId) => {
    setDeleteSessionId(sessionId);
    setOpenDeleteConfirm(true);
  };

  const handleDeleteConfirmClose = () => {
    setOpenDeleteConfirm(false);
    setDeleteSessionId(null);
  };

  const handleCreateModalOpen = () => {
    setOpenCreateModal(true);
    setFormData({
      URL: "",
      type: "video",
      universityId: "",
      subjectId: "",
      gradeId: "",
      topicId: "",
      subTopicId: "", // Reset subTopicId
    });
    setFile(null);
  };

  const handleCreateModalClose = () => {
    setOpenCreateModal(false);
    setFormData({
      URL: "",
      type: "video",
      universityId: "",
      subjectId: "",
      gradeId: "",
      topicId: "",
      subTopicId: "", // Reset subTopicId
    });
    setFile(null);
  };

  useEffect(() => {
    fetchUniversities();
    fetchTopics();
  }, []);

  useEffect(() => {
    if (searchParams.universityId) {
      fetchSubjects(searchParams.universityId);
      fetchGrades(searchParams.universityId);
    }
  }, [searchParams.universityId]);

  useEffect(() => {
    if (formData.universityId) {
      fetchSubjects(formData.universityId);
      fetchGrades(formData.universityId);
    }
  }, [formData.universityId]);

  useEffect(() => {
    fetchSessions();
  }, [searchParams]);

  useEffect(() => {
    if (formData.topicId) {
      fetchSubTopics(formData.topicId);
    }
  }, [formData.topicId]);

  // Utility functions to get names from IDs
  const getUniversityNameById = (universityId) => {
    const university = universities.find((uni) => uni.id === universityId);
    return university ? university.name : "Unknown";
  };

  const getTopicNameById = (topicId) => {
    const topic = topics.find((tp) => tp.id === topicId);
    return topic ? topic.name : "Unknown";
  };

  const getSubTopicNameById = (subTopicId) => {
    const subTopic = subTopics.find((subTp) => subTp.id === subTopicId);
    return subTopic ? subTopic.name : "Unknown";
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={4} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={2}>
                <MDTypography variant="h5" align="center">
                  Session Management
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
                <form>
                  <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                    <Grid item xs={3}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>University</InputLabel>
                        <Select
                          name="universityId"
                          value={searchParams.universityId}
                          onChange={(e) => setSearchParams({ ...searchParams, universityId: e.target.value })}
                          label="University"
                          sx={{ padding: "12px 14px" }}
                        >
                          {universities.map((university) => (
                            <MenuItem key={university.id} value={university.id}>
                              {university.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Subject</InputLabel>
                        <Select
                          name="subjectId"
                          value={searchParams.subjectId}
                          onChange={(e) => setSearchParams({ ...searchParams, subjectId: e.target.value })}
                          label="Subject"
                          sx={{ padding: "12px 14px" }}
                        >
                          {subjects.map((subject) => (
                            <MenuItem key={subject.id} value={subject.id}>
                              {subject.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Grade</InputLabel>
                        <Select
                          name="gradeId"
                          value={searchParams.gradeId}
                          onChange={(e) => setSearchParams({ ...searchParams, gradeId: e.target.value })}
                          label="Grade"
                          sx={{ padding: "12px 14px" }}
                        >
                          {grades.map((grade) => (
                            <MenuItem key={grade.id} value={grade.id}>
                              {grade.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Topic</InputLabel>
                        <Select
                          name="topicId"
                          value={searchParams.topicId}
                          onChange={(e) => setSearchParams({ ...searchParams, topicId: e.target.value })}
                          label="Topic"
                          sx={{ padding: "12px 14px" }}
                        >
                          {topics.map((topic) => (
                            <MenuItem key={topic.id} value={topic.id}>
                              {topic.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Type</InputLabel>
                        <Select
                          name="type"
                          value={searchParams.type}
                          onChange={(e) => setSearchParams({ ...searchParams, type: e.target.value })}
                          label="Type"
                          sx={{ padding: "12px 14px" }}
                        >
                          <MenuItem value="">All</MenuItem>
                          <MenuItem value="video">Video</MenuItem>
                          <MenuItem value="pptx">pptx</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      {/* <MDButton
                        variant="gradient"
                        color="info"
                        fullWidth
                        disabled={loading}
                        onClick={fetchSessions} // Fetch sessions on button click
                      >
                        {loading ? "Loading..." : "Search"}
                      </MDButton> */}
                    </Grid>
                  </Grid>
                </form>

                {/* Create Session Button */}
                <MDButton
                  variant="gradient"
                  color="info"
                  fullWidth
                  onClick={handleCreateModalOpen}
                  sx={{ mt: 2 }}
                >
                  Create Session
                </MDButton>

                {/* Sessions Display */}
                <MDBox mt={3}>
                  {sessions.length > 0 ? (
                    <Box
                      sx={{
                        maxHeight: "300px",
                        overflowY: "auto",
                        marginTop: "16px",
                      }}
                    >
                      <Grid container spacing={1} direction="column">
                        {sessions.map((session) => (
                          <Grid item xs={12} key={session.id}>
                            <Card sx={{ padding: 1, marginBottom: 1 }}>
                              <Grid container spacing={1}>
                                <Grid item xs={3}>
                                  <MDTypography variant="h6">{getUniversityNameById(session.universityId)}</MDTypography>
                                </Grid>
                                <Grid item xs={5}>
                                  <MDTypography variant="body1">
                                    <strong>Topic:</strong> {getTopicNameById(session.topicId)}
                                  </MDTypography>
                                  <MDTypography variant="body1">
                                    <strong>Subtopic:</strong> {getSubTopicNameById(session.subTopicId)}
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={4} align="right">
                                  <Grid container spacing={1}>
                                    <Grid item xs={4}>
                                      <MDButton
                                        component="a"
                                        href={session.URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant="gradient"
                                        color="info"
                                        fullWidth
                                        sx={{ width: "100%" }} // Ensure full width
                                      >
                                        Watch
                                      </MDButton>
                                    </Grid>

                                    <Grid item xs={4}>
                                      <MDButton
                                        onClick={() => handleModalOpen(session)}
                                        variant="gradient"
                                        color="warning"
                                        sx={{ width: "100%", marginRight: "8px" }} // Adjusting width and spacing
                                      >
                                        Update
                                      </MDButton>
                                    </Grid>

                                    <Grid item xs={4}>
                                      <MDButton
                                        onClick={() => handleDeleteConfirmOpen(session.id)} // Open delete confirmation
                                        variant="gradient"
                                        color="error"
                                        sx={{ width: "100%", marginLeft: "8px" }} // Adjusting width and spacing
                                      >
                                        Delete
                                      </MDButton>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  ) : (
                    <MDTypography variant="body2" align="center" color="textSecondary">
                      No sessions found.
                    </MDTypography>
                  )}
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      {/* Create Session Modal */}
      <Dialog open={openCreateModal} onClose={handleCreateModalClose}>
        <DialogTitle>Create Session</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>University</InputLabel>
                  <Select
                    name="universityId"
                    value={formData.universityId}
                    onChange={handleChange}
                    required
                    label="University"
                    sx={{ padding: "12px 14px" }}
                  >
                    {universities.map((university) => (
                      <MenuItem key={university.id} value={university.id}>
                        {university.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Subject</InputLabel>
                  <Select
                    name="subjectId"
                    value={formData.subjectId}
                    onChange={handleChange}
                    required
                    label="Subject"
                    sx={{ padding: "12px 14px" }}
                  >
                    {subjects.map((subject) => (
                      <MenuItem key={subject.id} value={subject.id}>
                        {subject.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Grade</InputLabel>
                  <Select
                    name="gradeId"
                    value={formData.gradeId}
                    onChange={handleChange}
                    required
                    label="Grade"
                    sx={{ padding: "12px 14px" }}
                  >
                    {grades.map((grade) => (
                      <MenuItem key={grade.id} value={grade.id}>
                        {grade.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Topic</InputLabel>
                  <Select
                    name="topicId"
                    value={formData.topicId}
                    onChange={handleChange}
                    required
                    label="Topic"
                    sx={{ padding: "12px 14px" }}
                  >
                    {topics.map((topic) => (
                      <MenuItem key={topic.id} value={topic.id}>
                        {topic.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Subtopic</InputLabel>
                  <Select
                    name="subTopicId"
                    value={formData.subTopicId}
                    onChange={handleChange}
                    label="Subtopic"
                    sx={{ padding: "12px 14px" }}
                  >
                    {subTopics.map((subTopic) => (
                      <MenuItem key={subTopic.id} value={subTopic.id}>
                        {subTopic.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateModalClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Session Modal */}
      <Dialog open={openModal} onClose={handleModalClose}>
        <DialogTitle>Update Session</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>University</InputLabel>
                <Select
                  name="universityId"
                  value={formData.universityId}
                  onChange={handleChange}
                  required
                  label="University"
                  sx={{ padding: "12px 14px" }}
                >
                  {universities.map((university) => (
                    <MenuItem key={university.id} value={university.id}>
                      {university.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Subject</InputLabel>
                <Select
                  name="subjectId"
                  value={formData.subjectId}
                  onChange={handleChange}
                  required
                  label="Subject"
                  sx={{ padding: "12px 14px" }}
                >
                  {subjects.map((subject) => (
                    <MenuItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Grade</InputLabel>
                <Select
                  name="gradeId"
                  value={formData.gradeId}
                  onChange={handleChange}
                  required
                  label="Grade"
                  sx={{ padding: "12px 14px" }}
                >
                  {grades.map((grade) => (
                    <MenuItem key={grade.id} value={grade.id}>
                      {grade.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Topic</InputLabel>
                <Select
                  name="topicId"
                  value={formData.topicId}
                  onChange={handleChange}
                  required
                  label="Topic"
                  sx={{ padding: "12px 14px" }}
                >
                  {topics.map((topic) => (
                    <MenuItem key={topic.id} value={topic.id}>
                      {topic.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Subtopic</InputLabel>
                <Select
                  name="subTopicId"
                  value={formData.subTopicId}
                  onChange={handleChange}
                  label="Subtopic"
                  sx={{ padding: "12px 14px" }}
                >
                  {subTopics.map((subTopic) => (
                    <MenuItem key={subTopic.id} value={subTopic.id}>
                      {subTopic.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => handleUpdate(selectedSession.id)} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteConfirm} onClose={handleDeleteConfirmClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <MDTypography variant="body2">Are you sure you want to delete this session?</MDTypography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </DashboardLayout>
  );
}

export default SessionManagement;