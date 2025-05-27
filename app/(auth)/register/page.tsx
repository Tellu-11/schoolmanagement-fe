"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import "@flaticon/flaticon-uicons/css/all/all.css";
import { useState } from "react";

const formSchema = z.object({
  role: z.enum(["select-role", "student", "teacher"]),
  identifier: z.string().min(3, "Minimal 3 karakter"),
  name: z.string().min(3, "Minimal 3 karakter"),
  password: z.string().min(6, "Minimal 6 karakter"),
  agreement: z.boolean().refine((val) => val, "Harus menyetujui persyaratan"),
});

export default function RegisterPage() {
  type FormValues = z.infer<typeof formSchema>;

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "select-role",
      identifier: "",
      name: "",
      password: "",
      agreement: false,
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: FormValues) => {
    if (data.agreement !== true) {
      console.error("You must agree to the terms and conditions.");
    }
    console.log(data);
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-[#D9D9D9] relative hidden lg:flex">
        <Image
          src="/image/registration-mascot.webp"
          alt="Registration Mascot"
          width={0.6 * 1024}
          height={0.6 * 1024}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <div className="w-full lg:w-1/2 p-14 max-w-xl mx-auto">
        <h1 className="text-3xl font-semibold text-black text-center mb-6">
          Don&apos;t have an account?
        </h1>
        <h3 className="text-md text-black text-center mb-8">
          Easily manage student, teacher, and academic activities—all in one
          platform.
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          <h2 className="text-md text-black mb-4">Role</h2>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-black"
              >
                <option value="select-role">Select Role</option>
                <option value="student">Student</option>
                <option value="teacher">Lecturer</option>
              </select>
            )}
          />

          <h2 className="text-md text-black mb-4">NIM / NIP</h2>
          <Controller
            name="identifier"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="NIM / NIP"
                className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-black"
              />
            )}
          />

          <h2 className="text-md text-black mb-4">Name</h2>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Name"
                className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-black"
              />
            )}
          />

          <h2 className="text-md text-black mb-4">Password</h2>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-black pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <i
                    className={`fi fi-br-eye${
                      showPassword ? "" : "-crossed"
                    } text-gray-500`}
                  />
                </button>
              </div>
            )}
          />

          <Controller
            name="agreement"
            control={control}
            render={({ field }) => (
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="peer hidden"
                    id="agreement-checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                  <label
                    htmlFor="agreement-checkbox"
                    className="w-5 h-5 border border-black rounded-full flex items-center justify-center cursor-pointer peer-checked:bg-black peer-checked:text-white transition-colors"
                  >
                    <i className="fi fi-br-check text-xs text-white"></i>
                  </label>
                </div>
                <span className="text-md">
                  I agree to the terms and privacy policy.
                </span>
              </div>
            )}
          />

          <button
            type="submit"
            className="w-full bg-[#F77C7C] text-lg text-black py-5 px-6 rounded-lg transition-colors hover:bg-red-500 cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-8 text-center text-md">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Sign in!
          </Link>
        </p>
      </div>
    </div>
  );
}
