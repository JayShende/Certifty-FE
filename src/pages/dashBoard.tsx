import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { server_URL } from "@/lib/utils";
import { ToastAction } from "@radix-ui/react-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate=useNavigate();
  async function generate() {
    const username = nameRef.current?.value;
    const date = dateRef.current?.value || "Default Name";
    console.log(username+" "+date);

    if (!username || !date)
    {
        toast({
            variant: "destructive",
            title: "Invalid Input.",
            description: "Please Enter Name and Date",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })
    }
    else{
       setLoading(true);
       try {
        const response = await axios({
          method: "post",
          url: server_URL,
          data: {
            name: username,
            date: date,
          },
          headers: {
            authorization: localStorage.getItem("token"),
          },
          responseType: "blob", // Important! Ensures response is a file
        });
        console.log("start");
        // Create a Blob from the response
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
  
        // Create an anchor element and trigger download
        const link = document.createElement("a");
        link.href = url;
        link.download = `${username}_certificate.pdf`; // Dynamic filename
        document.body.appendChild(link);
        link.click();
  
        // Clean up
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        setLoading(false);
      } catch (error) {
        console.error("Error generating certificate:", error);
      }
    }
    

    
  }

  function logout()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("Logged_status");
    navigate("/")
  }
  return (
    <div className="w-full h-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex justify-center ">
        <Toaster />
      <div className="w-[35vw] h-[50vh] bg-black mt-32 rounded-xl border-gray-400 border-2">
        <div className="flex flex-col items-center mt-4">
          <div className="flex mt-4">
            <p className="px-3 py-1 text-gray-400">Name</p>
            <Input
              type="text"
              placeholder="Enter Student Name"
              className="w-[20vw] ml-2"
              ref={nameRef}
              
            />
          </div>
          <div className="flex mt-4">
            <p className="px-3 py-1 text-gray-400">Date </p>
            <Input
              type="text"
              placeholder="Month-Year"
              className="w-[20vw] ml-2"
              ref={dateRef}
              required
            />
          </div>
          {loading ? (
            <Button disabled className="mt-7">
              <Loader2 className="animate-spin" />
              Please wait
            </Button>
          ): <Button variant="secondary" className="mt-7" onClick={generate}>
          Generate Certificate
        </Button>}

        <Button variant="destructive" className="mt-7 w-[10vw]" onClick={logout}>Logout</Button>
        </div>
      </div>
      
    </div>
  );
};
