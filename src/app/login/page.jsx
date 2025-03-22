"use client";
import React, { useActionState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignIn } from "../server/Auth";

export default function Login() {
  async function signInAction(prevState, formData) {
    const response = await SignIn(prevState, formData);
    return response;
  }

  const [state, formAction] = useActionState(signInAction, null);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          action={formAction}
          className="p-8 bg-white space-y-3 rounded-lg shadow-md w-96"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          {/* button */}
          <Button type="submit" className={"w-full cursor-pointer mt-4"}>
            Log in
          </Button>
          {/* Error state handling */}
        </form>
        {state?.error && <p className="text-red-600 text-sm">{state.error}</p>}
      </div>
    </>
  );
}
