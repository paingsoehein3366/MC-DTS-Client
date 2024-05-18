import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { Link } from "react-router-dom";
import DoctorCreateRoute from "./doctor-create-route";
import { useGetAllDoctors } from "../api/get-all-doctors-api";
import Male from "../../../assets/male.jpeg";
import Female from "../../../assets/female.jpeg";
import { Loading } from "@/components";

const DoctorListRoute = () => {
	const { data: lists, isLoading, error } = useGetAllDoctors();
	const [openCreateDoctor, setOpenCreateDoctor] = useState(false);

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
			{isLoading && (
        <Loading />
			)}
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
							<Link to={`/${doctor._id}/profile`}>
								<CardFooter className="hover:bg-blue-500 py-4 transition-all duration-500 cursor-pointer hover:text-white flex justify-center">
									<div className="flex flex-col items-center">
										<p className="font-bold text-lg">{doctor.name}</p>
										<p className="">{doctor.specialist}</p>
									</div>
								</CardFooter>
							</Link>
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
