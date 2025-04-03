import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const BlogDetail = () => {
	const { blogSlug } = useParams();
	const [error, setError] = useState(false);
	const [blog, setBlog] = useState(null);
	useEffect(() => {
		const fetchBlog = async () => {
			try {
				const res = await fetch(`/api/blog/get-blogs?slug=${blogSlug}`);
				const data = await res.json();
				if (!res.ok) {
					setError(true);
					return;
				}
				if (res.ok) {
					setBlog(data.blogs[0]);
					setError(false);
				}
			} catch (error) {
				setError(true);
			}
		};
		fetchBlog();
	}, [blogSlug]);
	return (
		<main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen ">
			<h1 className="text-3xl mt-10 p-3 text-center max-w-2xl mx-auto lg:text-4xl">
				{blog && blog.title}
			</h1>
			<Link
				to={`/search?category=${blog && blog.category}`}
				className="self-center mt-5"
			>
				<Button color="gray" pill size="xs">
					{blog && blog.category}
				</Button>
			</Link>
			<img
				src={blog && blog.thumbnail}
				alt={blog && blog.title}
				className="mt-10 p-3 max-h-[600px] w-full object-cover"
			/>
			<div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full text-xs">
				<span>{blog && new Date(blog.createdAt).toLocaleDateString()}</span>
				<span className="italic">
					{blog && (blog.content.length / 1000).toFixed(0)} mins read
				</span>
			</div>
			<div
				className="p-3 mx-auto w-full blog-content"
				dangerouslySetInnerHTML={{ __html: blog && blog.content }}
			></div>
		</main>
	);
};

export default BlogDetail;
