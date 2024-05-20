import { Card } from "@/components/ui/card";
import { useState } from "react";
import SlotCreate from "../components/slot-create";

const DoctorProfileRoute = () => {
	const [toggle, setToggle] = useState("slot");
	const button = "py-2 px-4 rounded-xl border";

	return (
		<div>
			<Card>
				<div className="grid grid-cols-2 gap-6 p-8">
					<div className="flex gap-14 items-center border-r-2">
						<div className="">
							<img src="" alt="" />
						</div>
						<div className="space-y-3">
							<h1 className="">Name - </h1>
							<h1 className="">Specialist - </h1>
							<h1 className="">Experiences - years</h1>
							<h1 className="">Gender - </h1>
						</div>
					</div>
					<div className="">
						<div className="flex gap-4 border-b-2 pb-2">
							<button
								onClick={() => setToggle("slot")}
								className={`${button} ${
									toggle === "slot" && "bg-blue-500 text-white"
								}`}
							>
								Time Slots
							</button>
							<button
								onClick={() => setToggle("setting")}
								className={`${button} ${
									toggle === "setting" && "bg-blue-500 text-white"
								}`}
							>
								Setting
							</button>
						</div>

						<SlotCreate />
					</div>
				</div>
			</Card>
		</div>
	);
};

export default DoctorProfileRoute;
