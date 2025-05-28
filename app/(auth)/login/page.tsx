"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "@flaticon/flaticon-uicons/css/all/all.css";
import { useState } from "react";

const formSchema = z.object({
    identifier: z.string().nonempty("NIP/NIM is required"),
    password: z.string().min(6, "Minimum 6 characters"),
    });

export default function LoginPage() {
  type FormValues = z.infer<typeof formSchema>;

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex">
      {/* Kiri */}
      <div className="w-1/2 bg-[#D9D9D9] relative hidden lg:flex">
        <Image
          src="/image/login-page.webp"
          alt="Login Page"
          width={0.6 * 1024}
          height={0.6 * 1024}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Kanan */}
        <div className="w-1/2 relative lg:w-1/2 p-14 max-w-xl mx-auto flex flex-col min-h-screen">

        <div className="absolute w-24 h-24 bg-blue-200 rounded-full top-10 right-10 z-0"></div>
        <div className="absolute w-16 h-16 bg-red-300 rounded-full top-36 left-10 z-0"></div>
        <div className="absolute w-20 h-20 bg-green-200 rounded-full bottom-24 right-16 z-0"></div>
        <div className="absolute w-12 h-12 bg-purple-200 rounded-full bottom-25 left-1/2 transform -translate-x-1/2 z-0"></div>

        <div className="flex-grow flex flex-col justify-center">
          <h1 className="text-3xl font-semibold text-black text-center mb-6">
            Welcome Back!
          </h1>
          <h3 className="text-md text-black text-center">
            Easily monitor and manage your academic activities.
          </h3>
          <h3 className="text-md text-black text-center mb-8">
            Sign in and get started!
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                NIP / NIM
              </label>
              <input
              {...register("identifier", {
              required: "NIP/NIM is required",
              pattern: {
              value: /^[0-9]+$/,
              message: "NIP/NIM must contain only numbers",
                },
              })}
              type="text"
              onKeyDown={(e) => {
                if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
                e.preventDefault();
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your NIP or NIM"
              />
              {errors.identifier && (
                <p className="text-red-500 text-sm mt-1">{errors.identifier.message}</p>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <i className={`fi ${showPassword ? 'fi-rr-eye' : 'fi-rr-eye-crossed'}`}></i>
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#F77C7C] text-base text-black py-4 px-5 rounded-lg transition-colors hover:bg-red-500 cursor-pointer"
            >
              Sign In
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:text-blue-800">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
