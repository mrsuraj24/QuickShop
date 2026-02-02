import { useEffect, useState } from 'react';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar.jsx';
import Footer from "../components/Footer"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeErrors, removeSuccess, updatePassword } from '../features/user/userslice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

function UpdatePassword() {
    const { success, loading, error } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword)
        myForm.set("newPassword", newPassword)
        myForm.set("confirmPassword", confirmPassword)
        for (let pair of myForm.entries()) {
            console.log(pair[0] + ':' + pair[1]);
        }
        dispatch(updatePassword(myForm))
    }
    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors())
        }
    }, [dispatch, error])
    useEffect(() => {
        if (success) {
            toast.success("Password updated successfully", { position: 'top-center', autoClose: 3000 });
            dispatch(removeSuccess())
            navigate("/profile")
        }
    }, [dispatch, success])
    return (
        <>
            {loading ? (<Loader />) : (<>
                <Navbar />
                <PageTitle title="Update Password" />
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900/90 text-white px-4">
                    <div className="w-full max-w-sm rounded-xl bg-gray-900/50 p-6 shadow-2xl">
                        <h1 className="text-4xl text-center font-bold mb-8">
                            Update Password
                        </h1>
                        <form className="space-y-4" onSubmit={updatePasswordSubmit}>
                            <div className="input-group">
                                <label className="text-md">Old Password</label>
                                <input className="mt-1 w-full rounded-xl border border-gray-700 px-3 py-2 text-sm text-white
                     placeholder-gray-500 focus:outline-none focus:border-indigo-500
                     hover:bg-gray-600 focus:ring-1 focus:ring-indigo-500" type="password" name='oldPassword' placeholder='Enter old password' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                            </div>
                            <div className="input-group">
                                <label className="text-md">New Password</label>
                                <input className="mt-1 w-full rounded-xl border border-gray-700 px-3 py-2 text-sm text-white
                     placeholder-gray-500 focus:outline-none focus:border-indigo-500
                     hover:bg-gray-600 focus:ring-1 focus:ring-indigo-500" type="password" name='newPassword' placeholder='Create new password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            </div>
                            <div className="input-group">
                                <label className="text-md">Confirm Password</label>
                                <input className="mt-1 w-full rounded-xl border border-gray-700 px-3 py-2 text-sm text-white
                     placeholder-gray-500 focus:outline-none focus:border-indigo-500
                     hover:bg-gray-600 focus:ring-1 focus:ring-indigo-500" type="password" name='confirmPassword' placeholder='Confirm new password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <button type="submit"
                                className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-medium text-white">Update Password</button>
                        </form>
                    </div>
                </div>
                <Footer />
            </>)}
        </>
    )
}

export default UpdatePassword