import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import GoogleIcon from "@mui/icons-material/Google";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from 'react-redux';
import { register, removeErrors, removeSuccess } from '../features/user/userslice';
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { firebaseApp } from '../firebase';

function Register() {
    // const auth = getAuth(firebaseApp);
    // const googleProvider = new GoogleAuthProvider();
    // const signInWithGoogle = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const result = await signInWithPopup(auth, googleProvider);
    //         const user = result.user;

    //         const formData = new FormData();
    //         formData.set("name", user.displayName);
    //         formData.set("email", user.email);
    //         formData.set("password", null);
    //         formData.set("avatar", user.photoURL);

    //         dispatch(register(formData));
    //     } catch (error) {
    //         console.error(error);
    //         toast.error("Google login failed");
    //     }
    // };

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("")
    const { name, email, password } = user;
    const { success, loading, error } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const registerDataChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    const registerSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            toast.error("Please fill all the fields", { position: "top-center", autoClose: 4000 })
            return;
        }
        const myForm = new FormData();
        myForm.set('name', name);
        myForm.set('email', email);
        myForm.set('password', password);
        myForm.set('avatar', avatar);
        console.log(myForm.entries());
        for (let pair of myForm.entries()) {
            console.log(pair[0] + ':' + pair[1]);
        }
        dispatch(register(myForm))
    }
    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors())
        }
    }, [dispatch, error])
    useEffect(() => {
        if (success) {
            toast.success("Registration Successful", { position: 'top-center', autoClose: 3000 });
            dispatch(removeSuccess())
            navigate('/login')
        }
    }, [dispatch, success])

    return (<>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900/90 text-white px-4">
            <div className="w-full max-w-sm rounded-xl bg-gray-900/50 p-6 shadow-2xl">
                <h1 className="text-4xl text-center font-bold mb-6 mt-10">
                    Sign Up
                </h1>
                <form className="space-y-4" onSubmit={registerSubmit} encType='multipart/form-data'>

                    <div className="input-group">
                        <label className="text-md">User Name</label>
                        <input className="mt-1 w-full rounded-xl border border-gray-700 px-3 py-2 text-sm text-white
                     placeholder-gray-500 focus:outline-none focus:border-indigo-500
                     hover:bg-gray-600 focus:ring-1 focus:ring-indigo-500" type="text" placeholder='Enter your name' name='name' value={name} onChange={registerDataChange} />
                    </div>
                    <div className="input-group">
                        <label className="text-md">E-Mail</label>
                        <input className="mt-1 w-full rounded-xl border border-gray-700 px-3 py-2 text-sm text-white
                     placeholder-gray-500 focus:outline-none focus:border-indigo-500
                     hover:bg-gray-600 focus:ring-1 focus:ring-indigo-500" type="email" placeholder='Enter your email' name='email' value={email} onChange={registerDataChange} />
                    </div>
                    <div className="input-group">
                        <label className="text-md">Password</label>
                        <input className="mt-1 w-full rounded-xl border border-gray-700 px-3 py-2 text-sm text-white
                     placeholder-gray-500 focus:outline-none focus:border-indigo-500
                     hover:bg-gray-600 focus:ring-1 focus:ring-indigo-500" type="password" placeholder='Create a password' name='password' value={password} onChange={registerDataChange} />
                    </div>
                    <div className="input-group">
                        <label className="text-md">Profile Photo</label>
                        <div className="mt-2 flex items-center gap-4">
                            <div
                                className="w-20 h-15 rounded-full border border-gray-700
                 flex items-center justify-center
                 bg-gray-800 text-gray-400
                 overflow-hidden"
                            >
                                {avatarPreview ? (
                                    <img
                                        src={avatarPreview}
                                        alt="Avatar Preview"
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                ) : (
                                    <PersonIcon fontSize="large" />
                                )}
                            </div>
                            <input className="mt-1 w-full text-sm text-gray-300
                     file:mr-3 file:py-2 file:px-4
                     file:rounded-xl file:border-0
                     file:bg-indigo-600 file:text-white
                     hover:file:bg-indigo-700 cursor-pointer" type="file" name='avatar' accept='image/*' onChange={registerDataChange} />

                        </div>
                    </div>
                    <button type="submit"
                        className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-medium text-white">{loading ? "Please Wait..." : "Register"}</button>



                    <div className="flex items-center gap-3 text-sm text-gray-400 mt-6">
                        <div className="flex-1 h-px bg-gray-500" />
                        Or
                        <div className="flex-1 h-px bg-gray-500" />
                    </div>

                    <button
                        type="button"
                        //   onClick={signInWithGoogle}
                        className="mt-4 w-full flex items-center justify-center gap-3
             rounded-xl border border-gray-700 py-2
             text-sm text-white hover:bg-gray-700 transition"
                    >
                        <GoogleIcon fontSize="small" />
                        Sign in with Google
                    </button>

                </form>
                <div className="mt-5 text-center text-sm text-gray-300">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-indigo-600 hover:underline hover:text-indigo-700"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>





    </>
    )
}

export default Register