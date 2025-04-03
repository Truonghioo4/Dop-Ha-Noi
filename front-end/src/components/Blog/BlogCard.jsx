import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
	return (
		<div className="group relative w-full border border-teal-500 hover:border-2 h-[300px] overflow-hidden rounded-lg sm:w-[320px] transition-all">
			<Link to={`/blog/${blog.slug}`}>
				<img
					src={blog.thumbnail}
					alt="blog cover"
					className="h-[180px] w-full object-cover group-hover:h-[140px] transition-all duration-300 z-20"
				/>
			</Link>
			<div className="p-2 flex flex-col gap-1">
				<p className="text-base font-semibold line-clamp-2">{blog.title}</p>
				<span className="italic text-sm">{blog.category}</span>
				<Link
					to={`/blog/${blog.slug}`}
					className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-orange-500 text-orange-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-1 rounded-md !rounded-tl-none m-2"
				>
					Read article
				</Link>
			</div>
		</div>
	);
}
