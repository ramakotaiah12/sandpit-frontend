import React, { useState } from "react";
import WeatherComponent from "../WeatherComponent";
import env from "dotenv";
import { Typography, Container, Avatar, Button, Modal } from "@mui/material";
env.config();
const CardComponent = ({ name, imgUrl, department, location }) => {
	const [data, setData] = useState([]);
	const [city, setCity] = useState("");
	const [country, setCountry] = useState("");
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);
	const handleOpen = (userLoaction) => {
		const { latitude, longitude } = userLoaction.coordinates;
		console.log(userLoaction);
		const fetchData = async () => {
			await fetch(
				`${process.env.REACT_APP_API_URL}/weather/?lat=${latitude}&lon=${longitude}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
			)
				.then((res) => res.json())
				.then((result) => {
					setData(result);
					setOpen(true);
					setCity(userLoaction.city);
					setCountry(userLoaction.country);
				});
		};
		fetchData();
	};

	return (
		<Container>
			<Avatar
				align='center'
				src={imgUrl}
				alt='The image'
				style={{
					width: 200,
					height: 200,
				}}
			/>
			<Container
				style={{ display: "block", marginTop: "10px", marginLeft: "10px" }}
			>
				<Typography variant='h4' color='text.primary'>
					{name}
				</Typography>
				<Typography
					color='secondary'
					variant='h9'
					color='text.secondary'
					paragraph
				>
					{department}
				</Typography>

				<Button
					size={"large"}
					variant='contained'
					onClick={() => handleOpen(location)}
				>
					View Weather
				</Button>

				<Modal open={open} onClose={handleClose}>
					<WeatherComponent weatherData={data} city={city} country={country} />
				</Modal>
			</Container>
		</Container>
	);
};
export default CardComponent;
