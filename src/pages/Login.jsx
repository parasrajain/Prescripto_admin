import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_admin/assets";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";

const Login = () => {
    const [state, setState] = useState("Admin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {setAToken, backendUrl } = useContext(AdminContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            if (state === "Admin") {
                if(backendUrl)
                {
                    console.log('found')
                }
                console.log("url", backendUrl);

                const { data } = await axios.post('http://localhost:4000/api/admin/login', {
                    email,
                    password,
                });
                console.log('data',data)

                if (data.success) {
                    console.log(data.token);
                } else {
                    console.log("notoken found");
                }
            } 
            else {

            }
        } catch (error) {
            console.log(error);
            
         }
    }

    return (
        <form
            onSubmit={onSubmitHandler}
            action=""
            className="min-h-[80vh] flex items-center"
        >
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[360px] sm:min-w-96 border rounded-xl border-gray-200 text-[#5E5E5E] text-sm shadow-lg">
                <p className="text-2xl font-semibold m-auto">
                    <span className=" text-[#5F6FFF]">{state} </span> Login
                </p>

                <div className="w-full">
                    <p>Email</p>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="border border-[#DADADA] rounded w-full p-2 mt-1"
                        type="email"
                        required
                    />
                </div>

                <div className="w-full">
                    <p>Password</p>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="border border-[#DADADA] rounded w-full p-2 mt-1"
                        type="password"
                        required
                    />
                </div>

                <button className="bg-[#5F6FFF] text-white w-full py-2 rounded-md text-base">
                    Login
                </button>
                {state === "Admin" ? (
                    <p>
                        Doctor Login ?{" "}
                        <span
                            className="text-[#5F6FFF] underline cursor-pointer"
                            onClick={() => setState("Doctor")}
                        >
                            Click Here
                        </span>
                    </p>
                ) : (
                    <p>
                        Admin Login ?{" "}
                        <span
                            className="text-[#5F6FFF] underline cursor-pointer"
                            onClick={() => setState("Admin")}
                        >
                            Click Here
                        </span>
                    </p>
                )}
            </div>
        </form>
    );
};

export default Login;
