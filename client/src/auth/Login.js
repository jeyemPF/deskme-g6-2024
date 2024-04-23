import React, { useEffect, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (setValue) => (event) => {
    setValue(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {

      const credentials = {
        email, password
      }

      const response = await axios.post('http://localhost:8800/api/auth/login', credentials);
  
      console.log('Login successful');
      console.log('Response:', response.data); 

      // Redirect to the dashboard route after successful login
      navigate("/dashboard");
  
    } catch (error) {
      // error.response.data.message (bigay ng backend na error)
      // setErrorMessage(error.response.data.message)
      console.error('Login failed:', error.response.data.message);
    }
  }

  useEffect(() => {
    console.log(email);
    console.log(password);
  }, [password, email]);

  return (
    <div className="flex-col flex justify-center items-center mt-12">
      <div className="box-border border-2 w-[500px] h-[500px] border-black rounded-xl">
        <div>
          <div className="ml-12 pb-16">
            <button className="ml-[415px] text-2xl pt-3">
              <HiOutlineXMark />
            </button>
            <h1 className="text-4xl font-black">Sign-in</h1>
            <p>Stay updated on your bookings.</p>
          </div>

          <div className="text-center">
            <div className="pb-5">
              <input
                value={email}
                className="border border-black rounded-lg py-3 px-2 w-[80%]"
                name="email"
                placeholder="Username or email:"
                onChange={handleInputChange(setEmail)}
              />
            </div>

            <div className="relative">
              <input
                className="border border-black rounded-lg py-3 px-2 w-[80%]"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handleInputChange(setPassword)}
                placeholder="Password:"
              />

              <button
                className="absolute top-1/2 transform -translate-y-1/2 right-4 focus:outline-none pr-12"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <BsEye /> : <BsEyeSlash />}
              </button>
            </div>
          </div>

          <div className="list-none ml-12 pt-2">
            <li className="font-medium">
              <a href="#">Forgot password?</a>
            </li>
          </div>

          <div className="text-center pt-10 pb-5">
            <button
              onClick={handleLogin}
              className=" text-white bg-black font-semibold rounded-full text-xl py-3 w-[80%] "
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
      <div className="text-center font-light pt-3">
        <h1>
          <span>&#169;</span>2023 DeskMe, All right reserved. Privacy Policy{" "}
          <br /> and Terms & Conditions.
        </h1>
      </div>
    </div>
  );
}

export default Login;
