import { Card } from "@/components/ui/card";
import { useState } from "react";

const DoctorProfileRoute = () => {
  const [toggle, setToggle] = useState("slot");
  const button = "py-2 px-4 rounded-xl border";

  const slots = [1, 2, 3, 4, 5, 6, 7];
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
              <h1 className="">Name - Dr. Hello</h1>
              <h1 className="">Specialist - Eye</h1>
              <h1 className="">Experiences - 3 years</h1>
              <h1 className="">Gender - Male</h1>
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
            {toggle === "slot" && (
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
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DoctorProfileRoute;
