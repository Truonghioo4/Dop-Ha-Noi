import React, { useState, useEffect } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeadCell,
	TableRow,
	Button,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
} from "flowbite-react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
const DashBlogs = () => {
	const currentUer = useSelector((state) => state.user);
	const [blogs, setBlogs] = useState([]);
	const [showMore, setShowMore] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [blogIdToDelete, setBlogIdToDelete] = useState("");
	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				const res = await fetch("/api/blog/get-blogs");
				const data = await res.json();
				if (res.ok) {
					setBlogs(data.blogs);
					if (data.blogs.length < 9) {
						setShowMore(false);
					}
				}
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchBlogs();
	}, []);

	const handleShowMore = async () => {
		const startIndex = blogs.length;
		try {
			const res = await fetch(`/api/blog/get-blogs?startIndex=${startIndex}`);
			const data = await res.json();
			if (res.ok) {
				setBlogs((prev) => [...prev, ...data.blogs]);
				if (data.blogs.length < 8) {
					setShowMore(false);
				}
			}
		} catch (error) {
			console.log(error.message);
		}
	};
	const handleDeletePost = async () => {
		setShowModal(false);
		try {
			const res = await fetch(`/api/blog/delete-blog/${blogIdToDelete}`, {
				method: "DELETE",
			});
			const data = await res.json();
			if (!res.ok) {
				console.log(data.message);
			} else {
				setBlogs((prev) => prev.filter((blog) => blog._id !== blogIdToDelete));
			}
		} catch (error) {
			console.log(error.message);
		}
	};
	return (
		<div>
			<Table hoverable className="shadow-md">
				<TableHead>
					<TableHeadCell>Date updated</TableHeadCell>
					<TableHeadCell>Blog thumnail</TableHeadCell>
					<TableHeadCell>Blog title</TableHeadCell>
					<TableHeadCell>Category</TableHeadCell>
					<TableHeadCell>Delete</TableHeadCell>
					<TableHeadCell>
						<span>Edit</span>
					</TableHeadCell>
				</TableHead>
				{blogs.map((blog) => (
					<TableBody className="divide-y">
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell>
								{new Date(blog.updatedAt).toLocaleDateString()}
							</TableCell>
							<TableCell>
								<Link to={`/blog/${blog.slug}`}>
									<img
										src={blog.thumbnail}
										alt={blog.title}
										className="w-20 h-10 object-cover bg-gray-500"
									/>
								</Link>
							</TableCell>
							<TableCell>
								<Link
									className="font-medium text-gray-900 dark:text-white"
									to={`/blog/${blog.slug}`}
								>
									{blog.title}
								</Link>
							</TableCell>
							<TableCell>{blog.category}</TableCell>
							<TableCell>
								<span
									onClick={() => {
										setShowModal(true);
										setBlogIdToDelete(blog._id);
									}}
									className="font-medium text-red-500 hover:underline cursor-pointer"
								>
									Delete
								</span>
							</TableCell>
							<TableCell>
								<Link
									className="text-orange-500 hover:underline"
									to={`/update-blog/${blog._id}`}
								>
									<span>Edit</span>
								</Link>
							</TableCell>
						</TableRow>
					</TableBody>
				))}
			</Table>
			{showMore && (
				<button
					onClick={handleShowMore}
					className="w-full text-orange-500 self-center text-sm py-7"
				>
					Xem thêm
				</button>
			)}
			<Modal
				show={showModal}
				onClose={() => setShowModal(false)}
				popup
				size="md"
			>
				<ModalHeader />
				<ModalBody>
					<div className="text-center">
						<HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
						<h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
							Are you sure you want to delete this post?
						</h3>
						<div className="flex justify-center gap-4">
							<Button color="failure" onClick={handleDeletePost}>
								Yes, I'm sure
							</Button>
							<Button color="gray" onClick={() => setShowModal(false)}>
								No, cancel
							</Button>
						</div>
					</div>
				</ModalBody>
			</Modal>
		</div>
	);
};

export default DashBlogs;
