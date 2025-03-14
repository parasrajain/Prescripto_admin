import React, { useContext } from "react";
import { assets } from "../assets/assets_admin/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDtoken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
    dToken && setDtoken("");
    dToken && localStorage.removeItem("dToken");
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-gray-300 border-b bg-white">
      <div className="flex items-center gap-2 text-xs ">
        <img
          className="w-36 sm:w-40 cursor-pointer"
          src={assets.admin_logo}
          alt=""
        />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>

      {/* <button onClick={logout} className= 'bg-[#5f6FFF] text-white text-sm px-10 py-2 rounded-full cursor-pointer'>Log Out</button> */}
      <button
        onClick={logout}
        className="bg-[#5f6FFF] text-white text-sm px-4 py-2 rounded-full cursor-pointer sm:px-10"
      >
        Log Out
      </button>
    </div>
  );
};

export default Navbar;
