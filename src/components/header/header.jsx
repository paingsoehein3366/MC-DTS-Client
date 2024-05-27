import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
} from "@/components/ui/sheet";
import MenuIcon from "../menu-icon/menu-icon";

const Header = () => {
	const hoverEffect = "hover:text-[blue] hover:font-bold transition-all";
	return (
		<div className="py-6 flex justify-between items-center border-b-2 mb-5 sticky top-0 bg-white">
			<Link
				to="/"
				className="font-bold text-3xl text-blue-500 flex items-center gap-2"
			>
				<img className="w-[50px] h-[50px]" src={Logo} alt="" />
				<span className="font-bold hidden md:block">Appointment</span>
			</Link>
			<div className="hidden lg:block">
				<div className="text-lg gap-4 flex items-center">
					<NavLink to="/" className={hoverEffect}>
						Doctors
					</NavLink>
					<NavLink to="/appointments" className={hoverEffect}>
						Appointments
					</NavLink>
					<NavLink to="/reports" className={hoverEffect}>
						Reports
					</NavLink>
				</div>
			</div>

			<div className="lg:hidden">
				<Sheet>
					<SheetTrigger>
						<MenuIcon />
					</SheetTrigger>
					<SheetContent className="bg-white">
						<div className="my-5">
							<h1 className="text-blue-500 text-xl font-bold">
								Appointment System
							</h1>

							<div className="flex flex-col my-10 space-y-4">
								<NavLink to="/" className={hoverEffect}>
									Doctors
								</NavLink>
								<NavLink to="/appointments" className={hoverEffect}>
									Appointments
								</NavLink>
								<NavLink to="/reports" className={hoverEffect}>
									Reports
								</NavLink>
							</div>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	);
};

export default Header;

