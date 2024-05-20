import { Link } from "react-router-dom"

const Header = () => {
  return ( 
    <div className="py-6 flex justify-between items-center border-b-2 mb-5">
      <Link to="/" className="font-bold text-3xl text-blue-500">Doctor Appointments System</Link>
      <div className="text-lg gap-4 flex">
        <Link to="/" className="">Doctors</Link>
        <Link to="/" className="">Appointments</Link>
        <Link to="/" className="">Reports</Link>
      </div>
    </div>
  )
}

export default Header
