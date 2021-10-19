import { useState } from "react";
import EmployeeComponent from "./components/employee";
import useEmployeeSearch from "./useEmployeeSearch";
import { Typography, Container, Box } from "@mui/material";
function App() {
	const [query, setQuery] = useState("");
	const [pageNumber, setPageNumber] = useState(1);

	function handleFilterByDepartment(e) {
		setQuery(e.target.value);
		setPageNumber(1);
	}
	function updatePageNumber() {
		setPageNumber((prevPageNumber) => prevPageNumber + 1);
	}
	const { loading, error, employees, hasMore } = useEmployeeSearch(
		query,
		pageNumber
	);

	return (
		<>
			<Container>
				<Typography
					component='h1'
					variant='h2'
					align='center'
					color='text.primary'
					gutterBottom
				>
					Our Team
				</Typography>
				<Typography
					variant='h5'
					align='center'
					color='text.secondary'
					paragraph
				>
					Something short and leading about the collection below—its contents,
					the creator, etc. Make it short and sweet, but not too short so folks
					don&apos;t simply skip over it entirely.
				</Typography>

				<Box
					sx={{ minWidth: 120 }}
					display='flex'
					justifyContent='center'
					alignItems='center'
				>
					<select value={query} onChange={handleFilterByDepartment}>
						<option value=''>Select Department</option>
						<option value='HR'>HR</option>
						<option value='IT'>IT</option>
						<option value='RESEARCH'>RESEARCH</option>
						<option value='DEVELOPMENT'>DEVELOPMENT</option>
						<option value='SALES'>SALES</option>
						<option value='MARKETING'>MARKETING</option>
						<option value='OPERATIONS'>OPERATIONS</option>
						<option value='SECURITY'>SECURITY</option>
						<option value='MANAGEMENT'>MANAGEMENT</option>
						<option value='EXECUTIVES'>EXECUTIVES</option>
					</select>
				</Box>
				<br />
				<EmployeeComponent
					employees={employees}
					loading={loading}
					hasMore={hasMore}
					updatePageNumber={updatePageNumber}
				/>
				<div>{loading && "Loading..."}</div>
				<div>{error && "Error"}</div>
			</Container>
		</>
	);
}

export default App;
