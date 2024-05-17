import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { Link } from "react-router-dom";
import DoctorCreateRoute from "./doctor-create-route";
import { useGetAllDoctors } from "../api/get-all-doctors-api";
import Male from "../../../assets/male.jpeg";
import Female from "../../../assets/female.jpeg";
const DoctorListRoute = () => {
	const { data: lists, isLoading, error } = useGetAllDoctors();
	const [openCreateDoctor, setOpenCreateDoctor] = useState(false);
	console.log("Doctors List=> ", lists?.data);

	
	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error loading doctors</p>;
	console.log();
	return (
		<div>
			<div className="flex justify-end mb-5">
				<Button
					onClick={() => setOpenCreateDoctor(true)}
					className="border rounded-[7px] bg-blue-500 text-white hover:bg-blue-700"
				>
					Add New Doctor
				</Button>
			</div>
			<div className="grid grid-cols-5 gap-3">
				{lists &&
					lists?.data.map((doctor) => (
						<Card key={doctor._id}>
							<CardHeader className="">
								<img
									src={`${doctor.gender === "Male" ? Male : Female}`}
									alt=""
								/>
							</CardHeader>
							<CardFooter className="hover:bg-blue-500 py-4 transition-all duration-500 cursor-pointer hover:text-white flex justify-center">
								<Link to="/doctor/profile">
									<div className="flex flex-col items-center">
										<p className="font-bold text-red-500 text-lg">
											{doctor.name}
										</p>
										<p className="">{doctor?.specialist}</p>
									</div>
								</Link>
							</CardFooter>
						</Card>
					))}
			</div>

			<DoctorCreateRoute
				open={openCreateDoctor}
				setOpen={() => setOpenCreateDoctor(false)}
			/>
		</div>
	);
};
export default DoctorListRoute;
