"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <div className="w-full max-w-[800px] bg-card rounded-3xl shadow-xl overflow-hidden flex">
        {/* Left side - Orange panel with logo */}
        <div className="w-[40%] bg-primary flex items-center justify-center p-8">
          <div className="bg-primary-foreground/20 backdrop-blur-sm rounded-xl px-8 py-3">
            <span className="text-primary-foreground text-xl font-medium">Logo</span>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-[60%] p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-primary mb-10 text-center italic">
            XIN CHAO !
          </h1>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 rounded-full bg-input border-primary/30 px-6 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-full bg-input border-primary/30 px-6 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {"quen mat khau?"}
              </a>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg"
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
