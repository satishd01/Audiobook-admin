import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  TablePagination,
} from "@mui/material";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { TEMPLET_SCREEN_CONFIG } from "config/templeteScreenConfig";
import { useParams } from "react-router-dom";
import ImportExportActions from "./ImportExportActions";

export function TempletesScreen() {
  const { templateType } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalEntries, setTotalEntries] = useState(0);
  const [filters, setFilters] = useState({
    university: "",
    subject: "",
    grade: "",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [universities, setUniversities] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);
  const recordsPerPageOptions = [10];
  const showFilter = false;

  // Function to fetch data from the server
  const fetchData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/learningPath.list/${templateType}?page=${page + 1}&limit=${rowsPerPage}&university=${filters.university}&subject=${filters.subject}&grade=${filters.grade}`
    );
    const result = await response.json();

    setData(result.data); // Assumes result contains 'data' and 'totalEntries'
    setTotalEntries(result.totalRecords);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // Function to fetch dropdown options (university, subject, grade)
  const fetchDropdownOptions = async () => {
    setLoading(true);
    try {
      const [universityRes, subjectRes, gradeRes] = await Promise.all([
        fetch(`${process.env.REACT_APP_API_URL}/admin/university`), // Replace with actual API for universities
        fetch(`${process.env.REACT_APP_API_URL}/admin/subject`), // Replace with actual API for subjects
        fetch(`${process.env.REACT_APP_API_URL}/admin/grade`), // Replace with actual API for grades
      ]);

      const [universityData, subjectData, gradeData] = await Promise.all([
        universityRes.json(),
        subjectRes.json(),
        gradeRes.json(),
      ]);

      setUniversities(universityData.data);
      setSubjects(subjectData.data);
      setGrades(gradeData.data);
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Effect hook to fetch data when page, filters or rowsPerPage change
  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, filters]);

  // Effect hook to fetch dropdown options
  useEffect(() => {
    fetchDropdownOptions();
  }, []);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  if (error) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="error"
                  borderRadius="lg"
                  coloredShadow="error"
                >
                  <MDTypography variant="h6" color="white">
                    {error}
                  </MDTypography>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  const templateConfig = TEMPLET_SCREEN_CONFIG[templateType];

  const handleImport = (importResult) => {
    // Optional: Refresh data or update state based on import result
    console.log("Import result:", importResult);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
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
                <MDTypography variant="h6" color="white">
                  {templateConfig.header}
                </MDTypography>
              </MDBox>

              <div mt={8}>
                <ImportExportActions
                  pt={3}
                  mt
                  templateConfig={templateConfig}
                  onImport={handleImport}
                />
              </div>

              <MDBox pt={3} sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                {/* Filters */}
                {showFilter && (
                  <MDBox sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}>
                    {/* University Filter */}
                    <FormControl sx={{ width: "30%" }}>
                      <InputLabel>University</InputLabel>
                      <Select
                        name="university"
                        value={filters.university}
                        onChange={handleFilterChange}
                        label="University"
                        displayEmpty
                      >
                        <MenuItem value="">
                          <em>All</em>
                        </MenuItem>
                        {universities.map((university) => (
                          <MenuItem key={university.id} value={university.id}>
                            {university.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {/* Subject Filter */}
                    <FormControl sx={{ width: "30%" }}>
                      <InputLabel>Subject</InputLabel>
                      <Select
                        name="subject"
                        value={filters.subject}
                        onChange={handleFilterChange}
                        label="Subject"
                        displayEmpty
                      >
                        <MenuItem value="">
                          <em>All</em>
                        </MenuItem>
                        {subjects.map((subject) => (
                          <MenuItem key={subject.id} value={subject.id}>
                            {subject.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {/* Grade Filter */}
                    <FormControl sx={{ width: "30%" }}>
                      <InputLabel>Grade</InputLabel>
                      <Select
                        name="grade"
                        value={filters.grade}
                        onChange={handleFilterChange}
                        label="Grade"
                        displayEmpty
                      >
                        <MenuItem value="">
                          <em>All</em>
                        </MenuItem>
                        {grades.map((grade) => (
                          <MenuItem key={grade.id} value={grade.id}>
                            {grade.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </MDBox>
                )}

                {/* Loading Indicator */}
                {loading && (
                  <MDBox sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
                    <CircularProgress />
                  </MDBox>
                )}

                {/* Table */}
                {!loading && (
                  <MDBox sx={{ flex: 1, overflow: "auto" }}>
                    <DataTable
                      table={{
                        columns: templateConfig.columns, // Use your predefined columns config
                        rows: data,
                      }}
                      isSorted={false}
                      entriesPerPage={false}
                      showTotalEntries={false}
                      // totalEntries={totalEntries} // Display the total entries count
                      // onPageChange={(newPage) => setPage(newPage)}
                      // onRowsPerPageChange={(newRowsPerPage) => setRowsPerPage(newRowsPerPage)}
                      // noEndBorder
                    />
                  </MDBox>
                )}

                <MDBox sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                  <TablePagination
                    component="div"
                    count={totalEntries}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={recordsPerPageOptions}
                  />
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
