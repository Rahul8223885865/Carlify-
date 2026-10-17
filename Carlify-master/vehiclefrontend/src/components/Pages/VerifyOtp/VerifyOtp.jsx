import React, { useContext, useEffect, useState } from "react";
import { Mail, ArrowRight, RefreshCw } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../../Context/UserContextProvider";

function VerifyOtp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const { ApiEndPoint } = useContext(UserContext);

  const navigate = useNavigate();
  
  const location = useLocation();
  // Extract email from state
  const email = location.state?.email;

  useEffect(() => {
    if (timer > 0 && !canResend) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setCanResend(true);
    }
  }, [timer, canResend]);

  const handleChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleResend = () => {
    setTimer(30);
    setCanResend(false);
    // Add your resend OTP logic here
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      let otpCode = parseInt([...otp].join(""));
      let response = await axios.post(`${ApiEndPoint}/users/verifyotp`, {
        email,
        otp: otpCode,
      });
      if (response?.data?.status) {
        setIsVerifying(false);
        toast.success(response.data.message);
        navigate("/reset-password", { state: { email } });
      } else {
        setIsVerifying(false);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 w-full max-w-[95%] sm:max-w-[440px] mx-auto">
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="bg-blue-100 p-2 sm:p-3 rounded-full">
            <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-2">
          Email Verification
        </h2>
        <p className="text-sm sm:text-base text-center text-gray-600 mb-6 sm:mb-8 px-2">
          We've sent a verification code to your email address
        </p>

        <div className="flex gap-1.5 sm:gap-2 mb-6 sm:mb-8 justify-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 text-center text-lg sm:text-xl font-semibold border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={otp.join("").length !== 6 || isVerifying}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg mb-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm sm:text-base"
        >
          {isVerifying ? (
            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
          ) : (
            <>
              Verify Now
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </>
          )}
        </button>

        <div className="text-center">
          <p className="text-sm sm:text-base text-gray-600 mb-2">
            Didn't receive the code?
          </p>
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-sm sm:text-base text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              Resend Code
            </button>
          ) : (
            <p className="text-sm sm:text-base text-gray-500">
              Resend code in <span className="font-semibold">{timer}s</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;
