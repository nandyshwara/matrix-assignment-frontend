import React from "react";
import logo from "../../assets/images/matricelogo.png";
import { isAuth } from "../../helpers/authHelper";
import UserButton from "./UserButton";

function Navbar({ user, setRender, setUser }) {
  return (
    <div>
      <div className=" my-5 w-11/12 mx-auto flex flex-row justify-between ">
        <div className="flex flex-row gap-2 justify-items-center align-middle">
          <img src={logo} alt="logo" />
          <p className="text-[#392467] text-2xl font-bold my-auto">
            Matrice Recruiter's portal
          </p>
        </div>
        <div>
          {isAuth() && (
            <div className="hidden md:flex">
              <UserButton user={user} setRender={setRender} setUser={setUser} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
