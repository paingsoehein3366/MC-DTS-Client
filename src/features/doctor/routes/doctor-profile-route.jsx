import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useParams } from "react-router-dom";
import SlotCreate from "../components/slot-create";
import { useGetDoctorSlot } from "../api/get-doctor-slot-api";
import Male from "../../../assets/male.jpeg";
import Female from "../../../assets/female.jpeg";
import { Loading } from "@/components";

const DoctorProfileRoute = () => {
	const paramsId = useParams().doctorId;

	const [toggle, setToggle] = useState("slot");
	const button = "py-2 px-4 rounded-xl border";

	const { data, isError, error, isLoading } = useGetDoctorSlot(paramsId);
	if (isError) {
		return <h1>{error.message}</h1>;
	}
	const DoctorValue = data?.data;
	const slots = data?.data?.slots;
	return (
		<div>
      { isLoading && <Loading />}
			<Card>
				<div className="grid grid-cols-2 gap-6 p-8">
					<div className="flex gap-8 items-center border-r-2">
						<div className="">
							<img src={`${DoctorValue?.gender === "Male" ? Male : Female}`} alt="" />
						</div>
						<div className="space-y-3">
							<h1 className="">Name - {DoctorValue?.name}</h1>
							<h1 className="">Specialist - {DoctorValue?.specialist}</h1>
							<h1 className="">Experiences - {DoctorValue?.experiences}</h1>
							<h1 className="">Gender - {DoctorValue?.gender}</h1>
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

						<SlotCreate slots={slots} doctorId={paramsId} />
						{/* {toggle === "slot" && (
              <div className="mt-4">
                <div className="flex justify-end my-2">
                  <button className="py-2 px-4 bg-blue-500 text-white rounded-xl">
                    Add Slot
                  </button>
                </div>
                {slots.map((slot, i) => (
                  <div className="flex justify-between py-4" key={i}>
                    <div className="flex gap-2">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-blue-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </span>
                      <h1 className="">Monday</h1>
                    </div>
                    <div className="">
                      <p className="">
                        Time: <span>8:00 - 20:00</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )} */}
					</div>
				</div>
			</Card>
		</div>
	);
};

export default DoctorProfileRoute;
