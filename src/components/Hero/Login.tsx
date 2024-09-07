"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"; 
import LoginForm from "../Auth-Form/LoginForm";

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLoginSubmit = (email: string, password: string) => {
    console.log("Logging in with:", email, password);
    // Handle login logic (e.g., send request to server)
    setIsOpen(false); // Close the modal after login
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {/* Trigger button to open the modal */}
        <DialogTrigger asChild>
          <button className="font-medium text-blue-600 hover:underline">Log in</button>
        </DialogTrigger>

        {/* Modal content */}
        <DialogContent
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" // Center content and add overlay
        >
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full transform transition-all">
            <LoginForm onSubmit={handleLoginSubmit} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
