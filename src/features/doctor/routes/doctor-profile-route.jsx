import { Card } from "@/components/ui/card";
import { useState } from "react";
import SlotCreate from "../components/slot-create";
import { useParams } from "react-router-dom";
import { useGetDoctor } from "../api/doctor-profile-api";

const DoctorProfileRoute = () => {
  const [toggle, setToggle] = useState("slot");
  const button = "py-2 px-4 rounded-xl border";
  const {doctorId} = useParams()

  const { data: doctor, isLoading } = useGetDoctor(doctorId)
  console.log(doctor);

  return (
    <div>
      <Card>
        <div className="grid grid-cols-2 gap-6 p-8">
          <div className="flex gap-3 items-center border-r-2">
            <div className="">
              <img
                className="w-[300px] h-[300px]"
                src="https://static.vecteezy.com/system/resources/previews/004/831/677/original/doctor-male-avatar-character-icon-free-vector.jpg"
                alt=""
              />
            </div>
            <div className="space-y-3">
              <h1 className="">Name - {doctor?.data.name}</h1>
              <h1 className="">Specialist - {doctor?.data.specialist}</h1>
              <h1 className="">Experiences - {doctor?.data.experience} years</h1>
              <h1 className="">Gender - {doctor?.data.gender}</h1>
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

            <SlotCreate />
            
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DoctorProfileRoute;
