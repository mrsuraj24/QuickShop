import { useEffect, useState } from 'react';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, removeErrors, removeSuccess } from '../features/user/userslice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { NavLink } from 'react-router-dom';

function ForgotPassword() {
    const { loading, error, success, message } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const forgotPasswordEmail = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set('email', email)
        dispatch(forgotPassword(myForm))
        setEmail("");
    }
    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors())
        }
    }, [dispatch, error])
    useEffect(() => {
        if (success) {
            toast.success(message, { position: 'top-center', autoClose: 3000 });
            dispatch(removeSuccess())
        }
    }, [dispatch, success])
    return (
        <>
            {loading ? <Loader /> : (<>
                <PageTitle title="Forgot Password" />
                <div className="min-h-screen relative flex items-center justify-center px-4   flex-col bg-gray-900/90 text-white">

                    <div className="relative w-full max-w-sm backdrop-blur-xl bg-gray-900/50 border border-white/10 rounded-xl shadow-2xl p-8 animate-fade-up">
                        <h2 className="text-4xl font-bold text-center mb-6">
                            Forgot Password
                        </h2>
                        <p className="text-center text-gray-500 text-sm mb-6">
                            Enter your registered email. We’ll send you a reset link.
                        </p>
                        <form className="space-y-4" onSubmit={forgotPasswordEmail}>
                            <div className="input-group">
                                <label className="text-md mb-3">
                                    Email address
                                </label>
                                <input type="email" className="w-full px-3 py-2 text-md focus:border-indigo-500 rounded-xl text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 hover:bg-gray-600 focus:ring-indigo-500 transition" required placeholder='you@example.com' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <button type="submit" className="w-full mt-6 py-2 min-h-[48px] rounded-xl font-semibold text-white font-medium bg-indigo-600 hover:bg-indigo-700 hover:opacity-90 transition shadow-lg shadow-indigo-600/50">
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </button>

                            <div className="mt-8 text-center text-sm text-gray-300">
                                <NavLink to="/login" className="text-semibold hover:underline text-indigo-700  transition">
                                    ← Back to Login
                                </NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </>)}</>
    )
}

export default ForgotPassword