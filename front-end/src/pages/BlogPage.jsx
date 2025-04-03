import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogCard from "@/components/Blog/BlogCard";
const BlogPage = () => {
	const [blogs, setBlogs] = useState([]);
	useEffect(() => {
		const fetchBlogs = async () => {
			const res = await fetch("/api/blog/get-blogs");
			const data = await res.json();
			setBlogs(data.blogs);
		};
		fetchBlogs();
	}, []);
	return (
		<div className="max-w-6xl mx-auto p-2 flex flex-col gap-2 py-3">
			{blogs && blogs.length > 0 && (
				<div className="flex flex-col gap-6">
					<h2 className="text-2xl font-semibold text-center">Blogs</h2>
					<div className="flex flex-wrap gap-3 justify-center">
						{blogs.map((blog) => (
							<BlogCard key={blog._id} blog={blog} />
						))}
					</div>
					<Link
						to={"/search"}
						className="text-lg text-orange-500 hover:underline text-center"
					>
						View all blogs
					</Link>
				</div>
			)}
		</div>
	);
};

export default BlogPage;
