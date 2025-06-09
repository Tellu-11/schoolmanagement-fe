"use client";

import "@flaticon/flaticon-uicons/css/all/all.css";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { login } from "./service/loginService";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  id: z
    .string()
    .nonempty("ID cannot be blank")
    .max(15, "Max ID is 15 characters"),
  password: z.string().nonempty("Password cannot be blank"),
});

export default function LoginPage() {
  type FormValues = z.infer<typeof formSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      password: "",
    },
  });

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FormValues) => {
    try {
      await login(data.id, data.password);
      router.push("/");
    } catch (error) {
      console.debug("Login failed:", error);
      alert(
        `Login failed. ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-[#D9D9D9] relative hidden lg:flex">
        <Image
          src="/image/login-page.webp"
          alt="Login Page"
          width={0.6 * 1024}
          height={0.6 * 1024}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <div className="w-full lg:w-1/2 p-8 pb-24 mx-auto relative">
        <h1 className="text-3xl font-semibold text-black text-center mt-8 mb-6">
          Welcome Back!
        </h1>
        <h3 className="text-md text-black text-center">
          Easily monitor and manage your academic activities.
        </h3>
        <h3 className="text-md text-black text-center mb-8">
          Sign in and get started!
        </h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 flex flex-col items-center"
        >
          {/* Decorative Circles */}
          <div className="absolute inset-0 -z-10">
            <div className="w-20 h-20 bg-red-300 opacity-70 rounded-full absolute top-[25vh] left-[14vw]"></div>
            <div className="w-20 h-20 bg-blue-300 opacity-70 rounded-full absolute top-[12vh] left-[30vw]"></div>
            <div className="w-24 h-24 bg-green-300 opacity-70 rounded-full absolute top-[55vh] left-[28vw]"></div>
            <div className="w-10 h-10 bg-purple-300 opacity-70 rounded-full absolute top-[70vh] left-[20vw]"></div>
          </div>
          <div className="w-96 m-0">
            <h2 className="text-sm text-black mb-2">NIP / NIM</h2>
          </div>
          <Controller
            name="id"
            control={control}
            render={({ field }) => (
              <div className="space-y-2 w-96">
                <input
                  {...field}
                  onKeyDown={(e) => {
                    if (
                      !/[0-9]/.test(e.key) &&
                      e.key !== "Backspace" &&
                      e.key !== "Tab"
                    ) {
                      e.preventDefault();
                    }
                  }}
                  placeholder="NIP / NIM"
                  className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-black bg-white"
                />
                {errors.id?.message != null ? (
                  <p className="text-red-500 text-sm">{errors.id.message}</p>
                ) : (
                  <p className="pt-5"></p>
                )}
              </div>
            )}
          />

          <div className="w-96 m-0">
            <h2 className="text-sm text-black mb-2">Password</h2>
          </div>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <div className="relative space-y-2 w-96">
                <input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-black pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2/5 -translate-y-1/2 h-full"
                >
                  <i
                    className={`fi fi-br-eye${
                      showPassword ? "" : "-crossed"
                    } text-gray-500`}
                  />
                </button>
                {errors.password?.message != null ? (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                ) : (
                  <p className="pt-5"></p>
                )}
              </div>
            )}
          />

          <div className="flex justify-end w-96">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-96 bg-[#F77C7C] text-black py-4 px-5 rounded-lg transition-colors hover:bg-red-500 cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="absolute bottom-16 left-0 w-full text-center text-md">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Sign up!
          </Link>
        </p>
      </div>
    </div>
  );
}
