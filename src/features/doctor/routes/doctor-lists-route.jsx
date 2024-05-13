import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";

const DoctorListRoute = () => {
  const lists = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="grid grid-cols-5 gap-3">
      {lists.map((list, index) => (
        <Card key={index}>
          <CardHeader className="bg-red-500">
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
  );
};
export default DoctorListRoute;
