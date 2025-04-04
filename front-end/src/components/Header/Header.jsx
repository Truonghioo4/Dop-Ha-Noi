import React, { useState } from "react";
import {
	Dropdown,
	DropdownHeader,
	DropdownDivider,
	DropdownItem,
	Avatar,
} from "flowbite-react";
import { Menu, Search, MapPin, Heart, Map, BookOpen, Info } from "lucide-react";
import LoginPopup from "../AuthPopup/LoginPopup";
import SignupPopup from "../AuthPopup/SignupPopup";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "@/redux/user/userSlice";
import AccountIcon from "@/assets/icons/Account.svg";
import { Link } from "react-router-dom";

const Header = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [showLogin, setShowLogin] = useState(false);
	const [showSignup, setShowSignup] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const { currentUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleSignout = async () => {
		try {
			const res = await fetch("/api/user/sign-out", {
				method: "POST",
			});
			const data = await res.json();
			if (!res.ok) {
				console.log(data.message);
			} else {
				dispatch(signoutSuccess());
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<>
			{showLogin ? (
				<LoginPopup setShowLogin={setShowLogin} setShowSignup={setShowSignup} />
			) : (
				<></>
			)}
			{showSignup ? (
				<SignupPopup
					setShowSignup={setShowSignup}
					setShowLogin={setShowLogin}
				/>
			) : (
				<></>
			)}
			<header className="flex items-center justify-between p-4 bg-white">
				{/* Logo Text */}
				<Link
					to="/"
					className="text-orange-600 font-bold text-xl hover:text-orange-700"
				>
					Đớp Đớp
				</Link>

				{/* Hamburger Menu */}
				<div className="flex items-center relative">
					<Dropdown
						arrowIcon={false}
						inline
						placement="bottom-start"
						label={
							<button className="p-2 text-orange-600 hover:text-orange-700 transition-colors duration-200">
								<Menu size={24} />
							</button>
						}
						className="w-56 py-2 bg-white rounded-xl shadow-lg border border-gray-100"
					>
						<DropdownHeader>
							<span className="block text-sm font-semibold text-gray-700">
								Menu Chính
							</span>
						</DropdownHeader>
						<DropdownDivider />
						<Link to="/tour">
							<DropdownItem className="flex items-center px-4 py-3 hover:bg-orange-50 transition-colors duration-200">
								<Map size={18} className="mr-3 text-orange-600" />
								<div>
									<p className="text-sm font-medium text-gray-700">Tour</p>
									<p className="text-xs text-gray-500">
										Khám phá các tour du lịch
									</p>
								</div>
							</DropdownItem>
						</Link>
						<Link to="/blog">
							<DropdownItem className="flex items-center px-4 py-3 hover:bg-orange-50 transition-colors duration-200">
								<BookOpen size={18} className="mr-3 text-orange-600" />
								<div>
									<p className="text-sm font-medium text-gray-700">Blog</p>
									<p className="text-xs text-gray-500">
										Tin tức & cẩm nang du lịch
									</p>
								</div>
							</DropdownItem>
						</Link>
						<Link to="/about">
							<DropdownItem className="flex items-center px-4 py-3 hover:bg-orange-50 transition-colors duration-200">
								<Info size={18} className="mr-3 text-orange-600" />
								<div>
									<p className="text-sm font-medium text-gray-700">
										Về chúng tôi
									</p>
									<p className="text-xs text-gray-500">Thông tin & liên hệ</p>
								</div>
							</DropdownItem>
						</Link>
					</Dropdown>
				</div>

				{/* Search Bar */}
				<div className="flex-grow mx-4">
					<div className="relative">
						<input
							type="text"
							placeholder="Search"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-4 pr-10 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
						/>
						<button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
							<Search size={20} />
						</button>
					</div>
				</div>

				{/* Right Side Icons */}

				<div className="flex items-center space-x-2">
					<button className="hidden md:flex items-center px-3 py-2 bg-orange-600 text-white rounded-lg">
						<MapPin size={16} className="mr-2" />
						Location
					</button>
					{currentUser ? (
						<>
							<button>
								<Heart className="w-[30px] h-[30px] text-orange-600" />
							</button>
							<Dropdown
								arrowIcon={false}
								inline
								placement="bottom-end"
								label={
									<Avatar
										alt="user"
										img={AccountIcon}
										rounded
										className="w-[35px] h-[35px]"
									/>
								}
							>
								<DropdownHeader>
									<span className="block text-sm">@{currentUser.name}</span>
									<span className="block text-sm font-medium truncate">
										{currentUser.email}
									</span>
								</DropdownHeader>
								<DropdownItem>
									<Link to="/dashboard?tab=profile">Profile</Link>
								</DropdownItem>
								<DropdownDivider />
								<Link to="/">
									<DropdownItem onClick={handleSignout}>Sign out</DropdownItem>
								</Link>
							</Dropdown>
						</>
					) : (
						<div className="flex space-x-2">
							<button
								className="px-4 py-2 text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50"
								onClick={() => setShowLogin(true)}
							>
								Đăng nhập
							</button>
							<button
								className="px-4 py-2 text-white bg-orange-600 rounded-lg hover:bg-orange-700"
								onClick={() => setShowSignup(true)}
							>
								Đăng ký
							</button>
						</div>
					)}
				</div>
			</header>
		</>
	);
};

export default Header;
