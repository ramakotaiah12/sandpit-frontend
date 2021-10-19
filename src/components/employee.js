import React, { useRef, useCallback } from "react";

import { Grid, Box } from "@mui/material";

import Card from "./common/Card";
const EmployeeComponent = ({
	employees,
	loading,
	hasMore,
	updatePageNumber,
}) => {
	const observer = useRef();
	const lastEmployeeRef = useCallback(
		(node) => {
			if (loading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					updatePageNumber();
					console.log("visible");
				}
			});
			if (node) observer.current.observe(node);
		},
		[loading, hasMore, updatePageNumber]
	);
	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<Grid
					container
					spacing={{ xs: 1, md: 2 }}
					columns={{ xs: 4, sm: 8, md: 12 }}
				>
					{employees.map((employee, index) => {
						const name = employee.name.first + " " + employee.name.last;
						const imgUrl = employee.picture.large;
						const department = employee.department;
						const location = employee.location;
						if (employees.length === index + 1) {
							return (
								<Grid
									item
									key={index}
									xs={4}
									sm={4}
									md={4}
									ref={lastEmployeeRef}
								>
									<Card
										name={name}
										imgUrl={imgUrl}
										department={department}
										location={location}
									/>
								</Grid>
							);
						} else {
							return (
								<Grid item key={index} xs={4} sm={4} md={4}>
									<Card
										name={name}
										imgUrl={imgUrl}
										department={department}
										location={location}
									/>
								</Grid>
							);
						}
					})}
				</Grid>
			</Box>
		</>
	);
};

export default EmployeeComponent;
