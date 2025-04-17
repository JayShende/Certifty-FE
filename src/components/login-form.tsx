import { cn, LOGIN_DB } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useRef } from "react"
import axios from "axios"
import { ToastAction } from "@/components/ui/toast"
import {  useToast } from "@/hooks/use-toast"
import { Toaster } from "./ui/toaster"
import { useNavigate } from "react-router-dom"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  
  const emailRef=useRef<HTMLInputElement>(null);
  const pwdRef=useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate=useNavigate();

 async function login(event: React.FormEvent)
  {
    event.preventDefault(); // Prevent form from refreshing the page
    const email=emailRef.current?.value;
    const password=pwdRef.current?.value;
    const response=await axios({
      method:"post",
      url:LOGIN_DB,
      data:{
        email:email,
        password:password
      }
    })

    if(!response.data.result)
    {
      console.log("Hello");
      toast( {
        variant: "destructive",
        title: "Invalid Credentails.",
        description: "There was a problem with your Email/Password.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
    else{
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("Logged_status","true");
      toast({
        description: "Login Succesfull ",
      })
      setTimeout(()=>{
        toast({
          description: "Redirecting To DashBoard ",
        })
        setTimeout(()=>{
          navigate("/dashboard")
        },1000);
      },1000);

     
    }
  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={login}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  ref={emailRef}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  
                </div>
                <Input id="password" type="password" required ref={pwdRef}/>
              </div>
              <Button type="submit" className="w-full" >
                Login
              </Button>
              
            </div>
           
          </form>
        </CardContent>
      </Card>
      <Toaster/>
      {/* <ToastDemo/> */}
    </div>
  )
}
