import React, { useState, useEffect } from "react";
import { TEMPLET_SCREEN_CONFIG } from "config/templeteScreenConfig";

// MUI Components
import {
  Grid,
  Card,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Icon from "@mui/material/Icon";

// Custom Components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// const ImportExportActions = ({
//   templateConfig,
//   onImport,
//   filters,
//   setFilters,
//   universities,
//   subjects,
//   grades,
//   topics,
//   subTopics,
// }) => {
//   const [openImportModal, setOpenImportModal] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [warnings, setWarnings] = useState([]);

//   const handleFileSelect = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const closeModal = async () => {
//     setWarnings([]);
//     setOpenImportModal(false);
//   };

//   const handleImport = async () => {
//     if (!selectedFile) return;

//     setLoading(true);
//     const formData = new FormData();
//     formData.append("file", selectedFile);
//     formData.append("universityId", filters.university || ""); // Add universityId
//     formData.append("subjectId", filters.subject || "");       // Add subjectId
//     formData.append("gradeId", filters.grade || "");           // Add gradeId
//     formData.append("topicId", filters.topic || "");           // Add topicId
//     formData.append("subTopicId", filters.subtopic || "");     // Add subTopicId

//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_API_URL}/learningPath.import/${templateConfig.key}`,
//         { method: "POST", body: formData }
//       );
//       const result = await response.json();

//       if (result?.warnings?.length) {
//         setWarnings(result.warnings);
//       } else {
//         setWarnings([result.message || "Import completed"]);
//       }
//       onImport(result);
//     } catch (error) {
//       setWarnings(["Import failed"]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleExport = async () => {
//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_API_URL}/admin.export/${templateConfig.exportEndpoint}`
//       );
//       const blob = await response.blob();
//       const downloadUrl = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = downloadUrl;
//       link.download = `${templateConfig.header}_export.csv`;
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (error) {
//       console.error("Export failed", error);
//     }
//   };

//   return (
//     <MDBox display="flex" gap={1}>
//       <MDButton
//         variant="contained"
//         color="info"
//         startIcon={<CloudUploadIcon />}
//         onClick={() => setOpenImportModal(true)}
//         size="small"
//       >
//         Import
//       </MDButton>

//       <MDButton
//         variant="contained"
//         color="success"
//         startIcon={<FileDownloadIcon />}
//         onClick={handleExport}
//         size="small"
//       >
//         Export
//       </MDButton>

//       <Dialog open={openImportModal} onClose={closeModal}>
//         <DialogTitle>Import {templateConfig.header}</DialogTitle>
//         <DialogContent>
//           <Box mb={10} p={3}> 
//             <input type="file" accept=".xlsx" onChange={handleFileSelect} style={{ width: "100%" }} />
//             {templateConfig.importSampleFile && (
//               <a
//                 style={{
//                   textDecoration: "none",
//                   color: "#007bff",
//                   fontSize: "10px",
//                   padding: "2px 6px",
//                 }}
//                 href={templateConfig.importSampleFile}
//                 download
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 Sample File
//               </a>
//             )}
//           </Box>

//           {/* Dropdowns for Filters before Import */}
//           <Box mb={3}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6} md={3}>
//                 <FormControl fullWidth>
//                   <InputLabel>University</InputLabel>
//                   <Select
//                     name="university"
//                     value={filters.university}
//                     onChange={(e) => setFilters({ ...filters, university: e.target.value })}
//                     sx={{ padding: "12px 14px" }}
//                   >
//                     <MenuItem value="">All</MenuItem>
//                     {universities.map((university) => (
//                       <MenuItem key={university.id} value={university.id}>
//                         {university.name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <FormControl fullWidth>
//                   <InputLabel>Subject</InputLabel>
//                   <Select
//                     name="subject"
//                     value={filters.subject}
//                     onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
//                     sx={{ padding: "12px 14px" }}
//                   >
//                     <MenuItem value="">All</MenuItem>
//                     {subjects.map((subject) => (
//                       <MenuItem key={subject.id} value={subject.id}>
//                         {subject.name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <FormControl fullWidth>
//                   <InputLabel>Grade</InputLabel>
//                   <Select
//                     name="grade"
//                     value={filters.grade}
//                     onChange={(e) => setFilters({ ...filters, grade: e.target.value })}
//                     sx={{ padding: "12px 14px" }}
//                   >
//                     <MenuItem value="">All</MenuItem>
//                     {grades.map((grade) => (
//                       <MenuItem key={grade.id} value={grade.id}>
//                         {grade.name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <FormControl fullWidth>
//                   <InputLabel>Topic</InputLabel>
//                   <Select
//                     name="topic"
//                     value={filters.topic}
//                     onChange={(e) => setFilters({ ...filters, topic: e.target.value })}
//                     sx={{ padding: "12px 14px" }}
//                   >
//                     <MenuItem value="">All</MenuItem>
//                     {topics.map((topic) => (
//                       <MenuItem key={topic.id} value={topic.id}>
//                         {topic.name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <FormControl fullWidth>
//                   <InputLabel>Subtopic</InputLabel>
//                   <Select
//                     name="subtopic"
//                     value={filters.subtopic}
//                     onChange={(e) => setFilters({ ...filters, subtopic: e.target.value })}
//                     sx={{ padding: "12px 14px" }}
//                   >
//                     <MenuItem value="">All</MenuItem>
//                     {subTopics.map((subTopic) => (
//                       <MenuItem key={subTopic.id} value={subTopic.id}>
//                         {subTopic.name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//             </Grid>
//           </Box>

//           <Box>
//             {warnings.length > 0 && (
//               <Box>
//                 {warnings.map((warning, index) => (
//                   <p key={index} style={{ color: "red" }}>
//                     {warning}
//                   </p>
//                 ))}
//               </Box>
//             )}
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeModal}>Cancel</Button>
//           <MDButton
//             variant="contained"
//             color="info"
//             startIcon={<CloudUploadIcon />}
//             onClick={handleImport}
//             disabled={!selectedFile || loading}
//           >
//             {loading ? "Importing..." : "Import"}
//           </MDButton>
//         </DialogActions>
//       </Dialog>
//     </MDBox>
//   );
// };


const ImportExportActions = ({
  templateConfig,
  onImport,
  universities,
  subjects,
  grades,
  topics,
  subTopics,
}) => {
  const [openImportModal, setOpenImportModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [warnings, setWarnings] = useState([]);
  
  // Local state for modal filters
  const [modalFilters, setModalFilters] = useState({
    university: "",
    subject: "",
    grade: "",
    topic: "",
    subtopic: "",
  });
  
  // Local state for dropdown options
  const [modalSubjects, setModalSubjects] = useState([]);
  const [modalGrades, setModalGrades] = useState([]);
  const [modalTopics, setModalTopics] = useState([]);
  const [modalSubTopics, setModalSubTopics] = useState([]);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const closeModal = async () => {
    setWarnings([]);
    setOpenImportModal(false);
    // Reset modal filters when closing
    setModalFilters({
      university: "",
      subject: "",
      grade: "",
      topic: "",
      subtopic: "",
    });
  };

  const fetchModalDropdowns = async () => {
    try {
      // Fetch subjects if university is selected
      if (modalFilters.university) {
        const subjectRes = await fetch(
          `${process.env.REACT_APP_API_URL}/admin/subject?universityId=${modalFilters.university}`
        );
        const subjectData = await subjectRes.json();
        setModalSubjects(subjectData.data?.reverse() || []);
      }

      // Fetch grades if university is selected
      if (modalFilters.university) {
        const gradeRes = await fetch(
          `${process.env.REACT_APP_API_URL}/admin/grade?universityId=${modalFilters.university}`
        );
        const gradeData = await gradeRes.json();
        setModalGrades(gradeData.data?.reverse() || []);
      }

      // Fetch topics based on filters
      const topicRes = await fetch(
        `${process.env.REACT_APP_API_URL}/topics?universityId=${modalFilters.university}&subjectId=${modalFilters.subject}&gradeId=${modalFilters.grade}`
      );
      const topicData = await topicRes.json();
      setModalTopics(topicData || []);

      // Fetch subtopics
      // const subTopicRes = await fetch(`${process.env.REACT_APP_API_URL}/admin/subtopic`);
      
      const subTopicRes = await fetch(
        `${process.env.REACT_APP_API_URL}/subtopics?topicId=${modalFilters.topic}`
      );
      const subTopicData = await subTopicRes.json();
      setModalSubTopics(subTopicData || []);
    } catch (error) {
      console.error("Error fetching modal dropdown data:", error);
    }
  };

  useEffect(() => {
    if (openImportModal) {
      fetchModalDropdowns();
    }
  }, [modalFilters, openImportModal]);

  const handleImport = async () => {
    if (!selectedFile) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("universityId", modalFilters.university || "");
    formData.append("subjectId", modalFilters.subject || "");
    formData.append("gradeId", modalFilters.grade || "");
    formData.append("topicId", modalFilters.topic || "");
   
    if (modalFilters.subtopic ){
      formData.append("subTopicId", modalFilters.subtopic || "");
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/learningPath.import/${templateConfig.key}`,
        { method: "POST", body: formData }
      );
      const result = await response.json();

      if (result?.warnings?.length) {
        setWarnings(result.warnings);
      } else {
        setWarnings([result.message || "error in importing"]);
        onImport(result);
        setTimeout(closeModal, 1000); // Close modal after 2 seconds
      }
    } catch (error) {
      setWarnings(["Import failed"]);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/admin.export/${templateConfig.exportEndpoint}`
      );
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${templateConfig.header}_export.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Export failed", error);
    }
  };

  return (
    <MDBox display="flex" gap={1}>
      <MDButton
        variant="contained"
        color="info"
        startIcon={<CloudUploadIcon />}
        onClick={() => setOpenImportModal(true)}
        size="small"
      >
        Import
      </MDButton>

      <MDButton
        variant="contained"
        color="success"
        startIcon={<FileDownloadIcon />}
        onClick={handleExport}
        size="small"
      >
        Export
      </MDButton>

      <Dialog open={openImportModal} onClose={closeModal} fullWidth maxWidth="md">
        <DialogTitle>Import {templateConfig.header}</DialogTitle>
        <DialogContent>
          <Box mb={3} pt={2}>
            <input
              type="file"
              accept=".xlsx"
              onChange={handleFileSelect}
              style={{ width: "100%", marginBottom: 16 }}
            />
            {templateConfig.importSampleFile && (
              <a
                style={{
                  textDecoration: "none",
                  color: "#007bff",
                  fontSize: "0.875rem",
                }}
                href={templateConfig.importSampleFile}
                download
                target="_blank"
                rel="noreferrer"
              >
                Download Sample File
              </a>
            )}
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>University</InputLabel>
                <Select
                  value={modalFilters.university}
                  onChange={(e) => setModalFilters(prev => ({ ...prev, university: e.target.value }))}
                  label="University"
                  sx={{
                    padding: '12px 14px', // Adjust padding as needed
                    width: '100%', // Make the box larger by setting the width
                    '& .MuiSelect-select': {
                      padding: '12px 14px', // Adjust padding for the select input
                    },
                    '& .MuiOutlinedInput-root': {
                      padding: '12px 14px', // Adjust padding for the outlined input
                    },
                  }}
                >
                  <MenuItem value="">All</MenuItem>
                  {universities.map((uni) => (
                    <MenuItem key={uni.id} value={uni.id}>
                      {uni.name}
                    </MenuItem>
                  ))}
                  
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Subject</InputLabel>
                <Select
  value={modalFilters.subject}
  onChange={(e) => setModalFilters(prev => ({ ...prev, subject: e.target.value }))}
  label="Subject"
  sx={{
    padding: '12px 14px', // Adjust padding as needed
    width: '100%', // Make the box larger by setting the width
    '& .MuiSelect-select': {
      padding: '12px 14px', // Adjust padding for the select input
    },
    '& .MuiOutlinedInput-root': {
      padding: '12px 14px', // Adjust padding for the outlined input
    },
  }}
>
  <MenuItem value="">All</MenuItem>
  {modalSubjects.map((sub) => (
    <MenuItem key={sub.id} value={sub.id}>
      {sub.name}
    </MenuItem>
  ))}
</Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Grade</InputLabel>
                <Select
                  value={modalFilters.grade}
                  onChange={(e) => setModalFilters(prev => ({ ...prev, grade: e.target.value }))}
                  label="Grade"
                  sx={{
                    padding: '12px 14px', // Adjust padding as needed
                    width: '100%', // Make the box larger by setting the width
                    '& .MuiSelect-select': {
                      padding: '12px 14px', // Adjust padding for the select input
                    },
                    '& .MuiOutlinedInput-root': {
                      padding: '12px 14px', // Adjust padding for the outlined input
                    },
                  }}
                >
                  <MenuItem value="">All</MenuItem>
                  {modalGrades.map((grade) => (
                    <MenuItem key={grade.id} value={grade.id}>
                      {grade.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Topic</InputLabel>
                <Select
                  value={modalFilters.topic}
                  onChange={(e) => setModalFilters(prev => ({ ...prev, topic: e.target.value }))}
                  label="Topic"
                  sx={{
                    padding: '12px 14px', // Adjust padding as needed
                    width: '100%', // Make the box larger by setting the width
                    '& .MuiSelect-select': {
                      padding: '12px 14px', // Adjust padding for the select input
                    },
                    '& .MuiOutlinedInput-root': {
                      padding: '12px 14px', // Adjust padding for the outlined input
                    },
                  }}
                >
                  <MenuItem value="">All</MenuItem>
                  {modalTopics.map((topic) => (
                    <MenuItem key={topic.id} value={topic.id}>
                      {topic.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Subtopic</InputLabel>
                <Select
                  value={modalFilters.subtopic}
                  onChange={(e) => setModalFilters(prev => ({ ...prev, subtopic: e.target.value }))}
                  label="Subtopic"
                  sx={{
                    padding: '12px 14px', // Adjust padding as neeeded
                    width: '100%', // Make the box larger by setting the width
                    '& .MuiSelect-select': {
                      padding: '12px 14px', // Adjust padding for the select input
                    },
                    '& .MuiOutlinedInput-root': {
                      padding: '12px 14px', // Adjust padding for the outlined input
                    },
                  }}
                >
                  <MenuItem value="">All</MenuItem>
                  {modalSubTopics.map((st) => (
                    <MenuItem key={st.id} value={st.id}>
                      {st.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {warnings.length > 0 && (
            <Box mt={2} p={2} style={{ backgroundColor: "#fff3cd", borderRadius: 4 }}>
              {warnings.map((warning, index) => (
                <MDTypography key={index} variant="caption" color="warning">
                  {warning}
                </MDTypography>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="secondary">
            Cancel
          </Button>
          <MDButton
            variant="gradient"
            color="info"
            onClick={handleImport}
            disabled={!selectedFile || loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Import"}
          </MDButton>
        </DialogActions>
      </Dialog>
    </MDBox>
  );
};


const NewTempletesScreen = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(Object.keys(TEMPLET_SCREEN_CONFIG)[0]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalEntries, setTotalEntries] = useState(0);
  const [filters, setFilters] = useState({ university: "", subject: "", grade: "", topic: "", subtopic: "" });
  console.log(filters);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [universities, setUniversities] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);
  const [topics, setTopics] = useState([]);
  const [subTopics, setSubTopics] = useState([]);

  const [selectedUniversityId, setSelectedUniversityId] = useState(null);

  const templateConfig = TEMPLET_SCREEN_CONFIG[selectedTemplate];
  const recordsPerPageOptions = [10];
  const showFilter = true;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/learningPath.list/${selectedTemplate}?page=${
          page + 1
        }&limit=${rowsPerPage}&university=${filters.university}&subject=${filters.subject}&grade=${filters.grade}&topic=${filters.topic}&subtopic=${filters.subtopic}`
      );
      const result = await response.json();
      setData(result.data || []);
      setTotalEntries(result.totalRecords || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // const fetchDropdownOptions = async () => {
  //   try {
  //     const universityRes = await fetch(`${process.env.REACT_APP_API_URL}/admin/university`);
  //     const universityData = await universityRes.json();
  //     setUniversities(universityData.data.reverse() || []);

  //     if (selectedUniversityId) {
  //       const subjectRes = await fetch(`${process.env.REACT_APP_API_URL}/admin/subject?universityId=${selectedUniversityId}`);
  //       const subjectData = await subjectRes.json();
  //       setSubjects(subjectData.data.reverse() || []);

  //       const gradeRes = await fetch(`${process.env.REACT_APP_API_URL}/admin/grade?universityId=${selectedUniversityId}`);
  //       const gradeData = await gradeRes.json();
  //       setGrades(gradeData.data.reverse() || []);
  //     } else {
  //       setSubjects([]);
  //       setGrades([]);
  //     }

  //     const topicRes = await fetch(`${process.env.REACT_APP_API_URL}/topics?universityId=${selectedUniversityId}&subjectId=${filters.subject}&gradeId=${filters.grade}`);
  //     const topicData = await topicRes.json();
  //     setTopics(topicData || []);
  //     const subTopicRes = await fetch(`${process.env.REACT_APP_API_URL}/subtopics?topicId=${filters.topic}`);
  //     const subTopicData = await subTopicRes.json();
  //     setSubTopics(subTopicData || []);
  //   } catch (error) {
  //     console.error("Error fetching dropdown data:", error);
  //   }
  // };

  const fetchDropdownOptions = async () => {
    try {
        // Fetch universities
        const universityRes = await fetch(`${process.env.REACT_APP_API_URL}/admin/university`);
        const universityData = await universityRes.json();
        setUniversities(universityData.data.reverse() || []);

        // Fetch subjects and grades if a university is selected
        if (selectedUniversityId) {
            const subjectRes = await fetch(`${process.env.REACT_APP_API_URL}/admin/subject?universityId=${selectedUniversityId}`);
            const subjectData = await subjectRes.json();
            setSubjects(subjectData.data.reverse() || []);

            const gradeRes = await fetch(`${process.env.REACT_APP_API_URL}/admin/grade?universityId=${selectedUniversityId}`);
            const gradeData = await gradeRes.json();
            setGrades(gradeData.data.reverse() || []);
        } else {
            setSubjects([]);
            setGrades([]);
        }

        // Fetch topics
        const topicRes = await fetch(`${process.env.REACT_APP_API_URL}/topics?universityId=${selectedUniversityId}&subjectId=${filters.subject}&gradeId=${filters.grade}`);
        const topicData = await topicRes.json();
        setTopics(topicData || []);

        // Ensure topics are fetched before fetching subtopics
        if (topicData && topicData.length > 0) {
            const topicId = topicData[0].id; // Assuming you want the first topic's ID
            const subTopicRes = await fetch(`${process.env.REACT_APP_API_URL}/subtopics?topicId=${topicId}`);
            const subTopicData = await subTopicRes.json();
            setSubTopics(subTopicData || []);
        } else {
            setSubTopics([]);
        }
    } catch (error) {
        console.error("Error fetching dropdown data:", error);
    }
};

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, filters, selectedTemplate]);

  useEffect(() => {
    fetchDropdownOptions();
  }, [selectedUniversityId, filters.subject, filters.grade]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    console.log("Filters", filters.university);
  };

  const handleUniversityChange = (e) => {
    const universityId = e.target.value;
    setSelectedUniversityId(universityId);
    setFilters((prev) => ({ ...prev, university: universityId }));
  };

  const handleExport = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/admin.export/${templateConfig.exportEndpoint}`
      );
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${templateConfig.header}_export.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Export failed", error);
    }
  };

  const handleImport = () => {
    fetchData();
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Card>
              <MDBox p={2}>
                {Object.entries(TEMPLET_SCREEN_CONFIG).map(([key, config]) => (
                  <MDButton
                    key={key}
                    fullWidth
                    color={selectedTemplate === key ? "info" : "secondary"}
                    onClick={() => setSelectedTemplate(key)}
                    sx={{ mb: 1 }}
                  >
                    <Icon fontSize="small" sx={{ mr: 1 }}>
                      {config.icon}
                    </Icon>
                    {config.header}
                  </MDButton>
                ))}
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} md={9}>
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
                <MDBox display="flex" justifyContent="space-between" alignItems="center">
                  <MDTypography variant="h6" color="white">
                    {templateConfig.header}
                  </MDTypography>
                  <ImportExportActions
                    templateConfig={templateConfig}
                    onImport={handleImport}
                    filters={filters}
                    setFilters={setFilters}
                    universities={universities}
                    subjects={subjects}
                    grades={grades}
                    topics={topics}
                    subTopics={subTopics}
                    setUniversities={setUniversities}
                    setSubjects={setSubjects}
                    setGrades={setGrades}
                    setTopics={setTopics}
                    setSubTopics={setSubTopics}
                    handleExport={handleExport}
                  />
                </MDBox>
              </MDBox>
              <MDBox pt={3} p={2}>
                {showFilter && (
                  <MDBox display="flex" gap={2} mb={3}>
                    <FormControl fullWidth>
                      <InputLabel>University</InputLabel>
                      <Select
                        name="university"
                        value={filters.university}
                        onChange={handleUniversityChange}
                        sx={{ padding: "12px 14px" }}
                      >
                        <MenuItem value="">All</MenuItem>
                        {universities.map((university) => (
                          <MenuItem key={university.id} value={university.id}>
                            {university.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel>Subject</InputLabel>
                      <Select
                        name="subject"
                        value={filters.subject}
                        onChange={handleFilterChange}
                        sx={{ padding: "12px 14px" }}
                      >
                        <MenuItem value="">All</MenuItem>
                        {subjects.map((subject) => (
                          <MenuItem key={subject.id} value={subject.id}>
                            {subject.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel>Grade</InputLabel>
                      <Select
                        name="grade"
                        value={filters.grade}
                        onChange={handleFilterChange}
                        sx={{ padding: "12px 14px" }}
                      >
                        <MenuItem value="">All</MenuItem>
                        {grades.map((grade) => (
                          <MenuItem key={grade.id} value={grade.id}>
                            {grade.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel>Topic</InputLabel>
                      <Select
                        name="topic"
                        value={filters.topic}
                        onChange={handleFilterChange}
                        sx={{ padding: "12px 14px" }}
                      >
                        <MenuItem value="">All</MenuItem>
                        {topics.map((topic) => (
                          <MenuItem key={topic.id} value={topic.id}>
                            {topic.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel>Subtopic</InputLabel>
                      <Select
                        name="subtopic"
                        value={filters.subtopic}
                        onChange={handleFilterChange}
                        sx={{ padding: "12px 14px" }}
                      >
                        <MenuItem value="">All</MenuItem>
                        {subTopics.map((subTopic) => (
                          <MenuItem key={subTopic.id} value={subTopic.id}>
                            {subTopic.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </MDBox>
                )}
                <MDBox pt={2}>
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <DataTable
                      table={{ rows: data, columns: templateConfig.columns }}
                      isSorted={false}
                      entriesPerPage={rowsPerPage}
                      totalEntries={totalEntries}
                      page={page}
                      handlePageChange={handleChangePage}
                      handleRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  )}
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default NewTempletesScreen;