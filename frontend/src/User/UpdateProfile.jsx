import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeErrors, removeSuccess, updateProfile } from '../features/user/userslice';
import Loader from '../components/Loader';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar.jsx';
import Footer from "../components/Footer"

function UpdateProfile() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("./logo.png");
    const { user, error, success, message, loading } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profileImageUpdate = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }
        reader.onerror = (error) => {
            toast.error('Error reading file')
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    const updateSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("avatar", avatar)
        dispatch(updateProfile(myForm))
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
            navigate("/profile")
        }
    }, [dispatch, success])
    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setAvatarPreview(user.avatar.url || './images/banner1.jpg')
        }
    }, [user])
    return (
        <>
            {loading ? (<Loader />) : (<>
                <Navbar />
                <PageTitle title="Update Profile" />
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900/90 text-white px-4">
                    <div className="w-full max-w-sm rounded-xl bg-gray-900/50 p-6 shadow-2xl">
                        <h1 className="text-4xl text-center font-bold mb-8">
                            Update Profile
                        </h1>
                        <form className="space-y-4" encType='multipart/form-data' onSubmit={updateSubmit}>
                            <div className="input-group">
                                <label className="text-md">Profile Photo</label>
                                <div className="mt-3 flex items-center gap-4">
                                    <div className="w-20 h-15 rounded-full border border-gray-700 flex items-center justify-center bg-gray-800 overflow-hidden">
                                        {avatarPreview ? (
                                            <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-gray-400 text-xs">Avatar</span>
                                        )}
                                    </div>
                                    <input className="w-full text-sm text-gray-300 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0
                       file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer" type="file" accept='image/' name='avatar' onChange={profileImageUpdate} />
                                </div>
                            </div>
                            <div className="input-group">
                                <label className="text-md">Name</label>
                                <input className="mt-1 w-full rounded-xl border border-gray-700 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500
                     hover:bg-gray-600 focus:ring-1 focus:ring-indigo-500" type="text" value={name} onChange={(e) => setName(e.target.value)} name='name' />
                            </div>
                            <div className="input-group">
                                <label className="text-md">E-Mail</label>
                                <input className="mt-1 w-full rounded-xl border border-gray-700 px-3 py-2 text-sm text-whiteplaceholder-gray-500 focus:outline-none focus:border-indigo-500
                     hover:bg-gray-600 focus:ring-1 focus:ring-indigo-500" type="email" value={email} onChange={(e) => setEmail(e.target.value)} name='email' />
                            </div>
                            <button className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-medium text-white">Update</button>
                        </form>
                    </div>
                </div>
                <Footer />
            </>)}
        </>
    )
}

export default UpdateProfile