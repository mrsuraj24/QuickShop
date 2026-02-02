import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, removeErrors, removeSuccess } from '../features/user/userslice';
import { toast } from 'react-toastify';
import GoogleIcon from "@mui/icons-material/Google";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import TwitterIcon from "@mui/icons-material/Twitter";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function Login() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { error, success, isAuthenticated } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()
    const redirect = new URLSearchParams(location.search).get("redirect") || "/";

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email: loginEmail, password: loginPassword }))
    }
    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors())
        }
    }, [dispatch, error])
    useEffect(() => {
        if (isAuthenticated) {
            navigate(redirect)
        }
    }, [isAuthenticated])
    useEffect(() => {
        if (success) {
            toast.success("Login Successful", { position: 'top-center', autoClose: 3000 });
            dispatch(removeSuccess())
        }
    }, [dispatch, success])
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900/90 text-white px-4">
            <div className="w-full max-w-sm rounded-xl bg-gray-900/50 p-6 shadow-2xl">
                <h1 className="text-4xl text-center font-bold mb-8">Login</h1>
                <form className="space-y-4" onSubmit={loginSubmit}>
                    <div className="input-group">
                        <label className="text-md">E-Mail</label>
                        <input className="mt-1 w-full rounded-xl border border-gray-700 px-3 py-2 text-sm text-white
                         placeholder-gray-500 focus:outline-none focus:border-indigo-500 hover:bg-gray-600 focus:ring-1 focus:ring-indigo-500" type="email" placeholder='Enter your email' value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                    </div>

                    <div className="input-group">
                        <label className="text-md">Password</label>
                        <div className="relative mt-1">
                            <input type={showPassword ? "text" : "password"} className="w-full rounded-xl border border-gray-700 px-3 py-2 pr-10 text-sm text-white
                           placeholder-gray-500 focus:outline-none focus:border-indigo-500 hover:bg-gray-600 focus:ring-1 focus:ring-indigo-500" placeholder='Enter Password' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
                            >
                                {showPassword ? (
                                    <VisibilityOffIcon fontSize="small" />
                                ) : (
                                    <VisibilityIcon fontSize="small" />
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="accent-orange-500" />
                        Remember Me
                    </div>
                    <button className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-medium text-white">Login</button>
                    <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
                        <div className="flex-1 h-px bg-gray-500" />
                        Or
                        <div className="flex-1 h-px bg-gray-500" />
                    </div>
                    {/* <div className="flex justify-center gap-4">
                        {[GoogleIcon, FacebookIcon, LinkedInIcon, TwitterIcon].map(
                            (Icon, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-700 text-indigo-400 hover:bg-blue-700 hover:text-blue-700 transition"
                                >
                                    <Icon fontSize="small" />
                                </button>
                            )
                        )}
                    </div> */}
                    <button
                        type="button"
                        //   onClick={signInWithGoogle}
                        className="mt-4 w-full flex items-center justify-center gap-3
             rounded-xl border border-gray-700 py-2
             text-sm text-white hover:bg-gray-700 transition"
                    >
                        <GoogleIcon fontSize="small" />
                        Login with Google
                    </button>
                </form>
                <div className="mt-5 flex justify-center text-sm text-gray-300">
                    Forgot password?
                    <Link to="/password/forgot" className="text-indigo-600 hover:underline hover:text-indigo-700">
                        Reset
                    </Link>
                </div>
                <div className="mt-4 text-center text-sm text-gray-300">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-indigo-600 hover:underline hover:text-indigo-700">
                        Create one
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login