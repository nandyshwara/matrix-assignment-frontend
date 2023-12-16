import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/matricelogo.png";
import { signInUser } from "../../services/auth.service";
import { toast } from "react-hot-toast";
import Loading from "../../components/Loading";

function Login({setRender}) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigate = useNavigate();

  const handleLogin = async () => {
    if (!userData.email || !userData.password) {
      toast.error("Please fill all inputs");
    } else {
      try {
        setIsLoading(true);
        const { data } = await signInUser(userData);
        localStorage.setItem("matrice_user_cred", JSON.stringify(data?.data));
        setIsLoading(false);
        setRender((prev) => !prev);
        toast.success("Logged In Successfully");
        handleNavigate("/");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    }
  };

  const handleChange = (event, name) => {
    setUserData({ ...userData, [name]: event.target.value });
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-row align-middle gap-5 mt-[5rem]">
        <img src={logo} alt="logo" />
        <p className="text-[#392467] text-xl font-bold my-auto"> Login Here!</p>
      </div>
      {isLoading ? (
        <Loading isLoading={isLoading} />
      ) : (
        <div className="flex flex-col w-1/2 mx-auto">
          <div className="text-white w-10/12 mx-auto my-10">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-[#392467] rounded-t-md bg-[#A367B1] text-white text-sm"
                onChange={(event) => handleChange(event, "email")}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-[#392467] bg-[#A367B1] text-white text-sm"
                placeholder="Password"
                onChange={(event) => handleChange(event, "password")}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className=" w-1/2 mx-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#5D3587]"
              onClick={() => handleLogin()}
            >
              Login
            </button>
          </div>
        </div>
      )}
      <div>
        <p className="text-center w-full mt-4 text-base md:text-lg font-medium">
          Don't have an account?{" "}
          <span
            className="underline text-[#392467] cursor-pointer"
            onClick={() => handleNavigate("/signup")}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
