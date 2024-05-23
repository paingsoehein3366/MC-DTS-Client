import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useParams } from "react-router-dom";
import SlotCreate from "../components/slot-create";
import { useGetDoctorSlot } from "../api/get-doctor-slot-api";
import Male from "../../../assets/male.jpeg";
import Female from "../../../assets/female.jpeg";
import { Loading } from "@/components";
import DoctorSetting from "../components/doctor-setting";
import { ToastContainer } from "react-toastify";

const DoctorProfileRoute = () => {
	const paramsId = useParams().doctorId;

	const [toggle, setToggle] = useState("slot");
	const button = "py-2 px-4 rounded-xl border";

	const { data, isError, error, isLoading } = useGetDoctorSlot(paramsId);
	if (isError) {
		return <h1>{error.message}</h1>;
	}
	const doctorValue = data?.data;
	const slots = data?.data?.slots;
	return (
		<div>
			{isLoading && <Loading />}
			{doctorValue && (
				<Card>
					<div className="grid grid-cols-2 gap-6 p-8">
						<div className="flex gap-8 items-center border-r-2">
							<div className="">
								<img
									src={`${doctorValue?.gender === "Male" ? Male : Female}`}
									alt=""
								/>
							</div>
							<div className="space-y-3">
								<h1 className="">Name - {doctorValue?.name}</h1>
								<h1 className="">Specialist - {doctorValue?.specialist}</h1>
								<h1 className="">Experiences - {doctorValue?.experiences}</h1>
								<h1 className="">Gender - {doctorValue?.gender}</h1>
							</div>
						</div>
						<div className="">
							<div className="flex gap-4 border-b-2 pb-2">
								<button
									onClick={() => setToggle("slot")}
									className={`${button} ${toggle === "slot" && "bg-blue-500 text-white"
										}`}
								>
									Time Slots
								</button>
								<button
									onClick={() => setToggle("setting")}
									className={`${button} ${toggle === "setting" && "bg-blue-500 text-white"
										}`}
								>
									Setting
								</button>
							</div>
							{toggle === 'slot' ?
								<SlotCreate slots={slots} doctorId={paramsId} />
								:
								<DoctorSetting doctorValue={doctorValue} doctorId={paramsId} />
							}

						</div>
					</div>
				</Card>
			)}
			<ToastContainer />
		</div>
	);
};

export default DoctorProfileRoute;
