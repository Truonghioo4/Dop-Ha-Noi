import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "@/firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInSuccess } from "@/redux/user/userSlice";
const OAuth = ({ setShowLogin }) => {
	const auth = getAuth(app);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleGoogleSignIn = async () => {
		const provider = new GoogleAuthProvider();
		provider.setCustomParameters({ prompt: "select_account" });
		try {
			const resultsFromGoogle = await signInWithPopup(auth, provider);
			const res = await fetch("/api/auth/google", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: resultsFromGoogle.user.displayName,
					email: resultsFromGoogle.user.email,
					googlePhotoUrl: resultsFromGoogle.user.photoURL,
				}),
			});
			const data = await res.json();
			if (res.ok) {
				setShowLogin(false);
				dispatch(signInSuccess(data));
				navigate("/");
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<button
			type="button"
			onClick={handleGoogleSignIn}
			className="w-full border border-gray-300 py-2 rounded-md flex items-center justify-center hover:bg-gray-50 transition duration-300"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				className="mr-2"
			>
				<path
					fill="#4285F4"
					d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.58c2.08-1.92 3.28-4.74 3.28-8.07z"
				/>
				<path
					fill="#34A853"
					d="M12 23c2.97 0 5.46-1 7.28-2.69l-3.58-2.75c-.99.67-2.26 1.07-3.7 1.07-2.84 0-5.24-1.92-6.1-4.51H2.18v2.84C3.99 20.53 7.7 23 12 23z"
				/>
				<path
					fill="#FBBC05"
					d="M5.9 14.12c-.2-.78-.2-1.62 0-2.4V8.88H2.18A9.999 9.999 0 0 0 2 12c0 1.61.39 3.13 1.1 4.46l3.8-2.94z"
				/>
				<path
					fill="#EA4335"
					d="M12 4.75c1.63 0 3.06.56 4.21 1.64l3.15-3.15A9.987 9.987 0 0 0 12 2C7.7 2 3.99 4.47 2.18 8.88l3.8 2.94c.86-2.59 3.26-4.51 6.1-4.51z"
				/>
			</svg>
			Google
		</button>
	);
};

export default OAuth;
