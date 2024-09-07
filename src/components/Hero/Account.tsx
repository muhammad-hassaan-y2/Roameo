import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import SignUpModal from "../Auth-Form/SignUp";
import LoginModal from "./Login";

const Account = () => {
  return (
    <div className="max-w-md w-full">
      <div className="text-center mb-8">
        <div
          className="w-32 h-10 bg-gray-300 mx-auto mb-4 text-center"
          aria-hidden="true"
        >
          Logo
        </div>

        <h1 className="md:text-4xl text-3xl font-serif font-bold mb-2">
          Create an Account
        </h1>
        <p className="text-gray-600">The key to planning your adventure</p>
      </div>

      <div className="space-y-4">
        <Button
          className="w-full text-black border border-black rounded-3xl"
          variant="outline"
        >
          <Image width={24} height={24} src="/google.png" alt="Google" />
          Sign up with Google
        </Button>

        <Button
          className="w-full text-black border border-black rounded-3xl"
          variant="outline"
        >
          <Image width={24} height={24} src="/facebook.png" alt="Facebook" />
          Sign up with Facebook
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-gray-100 px-2 text-gray-500">or</span>
          </div>
        </div>

        <SignUpModal /> 
      </div>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <span className="text-blue-600">Log in</span>
        
      </p>
    </div>
  );
};

export default Account;
