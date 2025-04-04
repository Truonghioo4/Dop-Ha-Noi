import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { HiUser } from "react-icons/hi2";
import { FaBlog } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
	Sidebar,
	SidebarItem,
	SidebarItemGroup,
	SidebarItems,
} from "flowbite-react";

const DashSidebar = () => {
	const location = useLocation();
	const [tab, setTab] = useState("");
	const { currentUser } = useSelector((state) => state.user);

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const tabFromUrl = urlParams.get("tab");
		if (tabFromUrl) {
			setTab(tabFromUrl);
		}
	}, [location.search]);

	return (
		<div>
			<Sidebar className="w-full md:w-56">
				<SidebarItems>
					<SidebarItemGroup>
						<Link to="/dashboard?tab=profile">
							<SidebarItem
								active={tab === "profile"}
								icon={HiUser}
								label="User"
								labelColor="dark"
							>
								Profile
							</SidebarItem>
						</Link>
						{currentUser.isAdmin && (
							<Link to="/dashboard?tab=blogs">
								<SidebarItem
									active={tab === "blogs"}
									icon={FaBlog}
									className="cursor-pointer"
								>
									Manage Blog
								</SidebarItem>
							</Link>
						)}
						{currentUser.isAdmin && (
							<Link to="/dashboard?tab=tours">
								<SidebarItem
									active={tab === "tours"}
									icon={FaBlog}
									className="cursor-pointer"
								>
									Manage Tour
								</SidebarItem>
							</Link>
						)}
					</SidebarItemGroup>
				</SidebarItems>
			</Sidebar>
		</div>
	);
};

export default DashSidebar;
