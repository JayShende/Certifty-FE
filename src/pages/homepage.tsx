import { LoginForm } from "@/components/login-form"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate=useNavigate();
    useEffect(() => {
        const status = localStorage.getItem("Logged_status");
        if (status === "true") {
            console.log("inside");
            navigate("/dashboard");
        }
    }, []); // Runs only once on component mount
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
