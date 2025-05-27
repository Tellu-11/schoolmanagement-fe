"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

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

  const onSubmit = (data: FormValues) => {
    if (data.agreement !== true) {
      console.error("You must agree to the terms and conditions.");
    }
    console.log(data);
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-gray-100 relative hidden lg:flex">
        <Image
          src="/image/admin.pn"
          alt="Registration"
          fill
          className="object-cover"
        />
      </div>

      <div className="w-full lg:w-1/2 p-8 max-w-md mx-auto">
        <h1 className="text-2xl font-semibold text-black text-center mb-4">
          Don't have an account?
        </h1>
        <h3 className="text-sm text-black text-center mb-8">
          Easily manage student, teacher, and academic activities—all in one
          platform.
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="select-role">Select Role</option>
                <option value="student">Student</option>
                <option value="teacher">Lecturer</option>
              </select>
            )}
          />

          <Controller
            name="identifier"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="NIM / NIP"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            )}
          />

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                placeholder="Password"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            )}
          />

          <Controller
            name="agreement"
            control={control}
            render={({ field }) => (
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300"
                  checked={field.value}
                  onChange={field.onChange}
                />
                <span className="text-sm">
                  I agree to the terms and privacy policy.
                </span>
              </label>
            )}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg transition-colors 
    hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Sign in!
          </Link>
        </p>
      </div>
    </div>
  );
}
