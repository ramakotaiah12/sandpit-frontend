import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
const WeatherComponent = (props) => {
	const { weatherData, city, country } = props;
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	};

	return (
		weatherData.length !== 0 && (
			<Box sx={style}>
				<Typography
					id='modal-modal-title'
					component='h1'
					variant='h2'
					align='center'
					color='text.primary'
					gutterBottom
				>
					{weatherData.weather[0].main}
				</Typography>
				<Box display='flex' justifyContent='center' alignItems='center'>
					<img
						id='modal-modal-title'
						className='img-style'
						src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
						alt='weather status icon'
					/>
				</Box>
				<Box display='flex' justifyContent='center' alignItems='center'>
					<RoomIcon color='primary' fontSize='large'></RoomIcon>
					{city} , {country}
				</Box>
				<Box display='flex' justifyContent='center' alignItems='center'>
					<Grid
						container
						rowSpacing={1}
						spacing={{ xs: 2, md: 3 }}
						columns={{ xs: 4, sm: 8, md: 12 }}
					>
						<Grid item xs={2} sm={4} md={6}>
							Max Temp : {weatherData.main.temp}&deg;C
						</Grid>
						<Grid item xs={2} sm={4} md={6}>
							Feels Like : {weatherData.main.feels_like}&deg;C
						</Grid>
						<Grid item></Grid>
					</Grid>
				</Box>
			</Box>
		)
	);
};
export default WeatherComponent;
