import { useEffect, useState } from "react";
import axios from "axios";

export default function useEmployeeSearch(department, pageNumber) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [employees, setEmployees] = useState([]);
	const [hasMore, setHasMore] = useState(false);
	useEffect(() => {
		setEmployees([]);
	}, [department]);
	useEffect(() => {
		setLoading(true);
		setError(false);
		let cancel;
		axios({
			method: "GET",
			url: "http://localhost:5000/employees",
			params: { department: department, pageNumber: pageNumber },
			cancelToken: new axios.CancelToken((c) => (cancel = c)),
		})
			.then((response) => {
				setEmployees((prevEmployees) => {
					return [...prevEmployees, ...response.data.data];
				});
				setHasMore(response.data.data.length > 0);
				setLoading(false);
			})
			.catch((e) => {
				if (axios.isCancel(e)) return;
				setError(true);
			});
		return () => cancel();
	}, [department, pageNumber]);
	return { loading, error, employees, hasMore };
}
