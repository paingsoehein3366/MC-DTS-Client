import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { Link } from "react-router-dom";
import DoctorCreateRoute from "./doctor-create-route";
const DoctorListRoute = () => {
  const [openCreateDoctor, setOpenCreateDoctor] = useState(false);
  const lists = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div>
      <div className="flex justify-end mb-5">
        <Button onClick={() => setOpenCreateDoctor(true)} className="border rounded-[7px] bg-blue-500 text-white hover:bg-blue-700">Add New Doctor</Button>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {lists.map((list, index) => (
          <Card key={index}>
            <CardHeader className="">
              <img
                className=""
                src="https://static.vecteezy.com/system/resources/previews/004/831/677/original/doctor-male-avatar-character-icon-free-vector.jpg"
                alt=""
              />
            </CardHeader>
            <Link to="/doctor/profile">
              <CardFooter className="hover:bg-blue-500 py-4 transition-all duration-500 cursor-pointer hover:text-white">
                <div className="text-center">
                  <p className="font-bold text-lg">Dr. Calvin Calo</p>
                  <p className="">Eye Care</p>
                </div>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>
      <DoctorCreateRoute open={openCreateDoctor} setOpen={() => setOpenCreateDoctor(false)} />
    </div>
  );
}
export default DoctorListRoute;
