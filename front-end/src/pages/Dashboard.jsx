import DashBlog from "@/components/Dashboard/DashBlogs";
import DashProfile from "@/components/Dashboard/DashProfile";
import DashSidebar from "@/components/Dashboard/DashSidebar";
import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const Dashboard = () => {
	const location = useLocation();
	const [tab, setTab] = useState("profile"); // Default to "profile"

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const tabFromUrl = urlParams.get("tab");
		if (tabFromUrl) {
			setTab(tabFromUrl);
		}
	}, [location.search]);

	return (
		<div className="min-h-screen flex flex-col md:flex-row">
			<div className="md:w-56">
				<DashSidebar />
			</div>
			{/* profile... */}
			{tab === "profile" && <DashProfile />}
			{/* blog... */}
			{tab === "blogs" && <DashBlog />}
		</div>
	);
};

export default Dashboard;
