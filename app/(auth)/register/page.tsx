"use client";
import "@flaticon/flaticon-uicons/css/all/all.css";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { register } from "./service/register-service";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  roleId: z
    .enum(["select-role", "student", "lecturer"])
    .refine((val) => ["student", "lecturer"].includes(val), {
      message: "Please select a role",
    }),
  id: z
    .string()
    .nonempty("ID cannot be blank")
    .max(15, "Max ID is 15 characters"),
  name: z.string().nonempty("Name cannot be blank"),
  password: z.string().nonempty("Password cannot be blank"),
  agreement: z
    .boolean()
    .refine((val) => val, "You must agree to the terms and conditions"),
});

export default function RegisterPage() {
  type FormValues = z.infer<typeof formSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roleId: "select-role",
      id: "",
      name: "",
      password: "",
      agreement: false,
    },
  });

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FormValues) => {
    try {
      await register(data.roleId, data.id, data.name, data.password);
      router.push("/");
    } catch (error) {
      console.debug("Something went wrong:", error);
      alert(
        `Registration failed. ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
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

      <div className="w-full lg:w-1/2 p-8 mx-auto">
        <h1 className="text-3xl font-semibold text-black text-center mb-6">
          Don&apos;t have an account?
        </h1>
        <h3 className="text-md text-black text-center mb-8">
          Easily manage student, teacher, and academic activities—all in one
          platform.
        </h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 flex flex-col items-center"
        >
          <div className="w-96 m-0">
            <h2 className="text-sm text-black mb-2">Role</h2>
          </div>
          <Controller
            name="roleId"
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                <div className="flex justify-center">
                  <select
                    {...field}
                    className="w-96 p-3 border rounded-lg focus:ring-1 focus:ring-black"
                  >
                    <option value="select-role">Select Role</option>
                    <option value="student">Student</option>
                    <option value="lecturer">Lecturer</option>
                  </select>
                </div>
                {errors.roleId?.message != null ? (
                  <p className="text-red-500 text-sm">
                    {errors.roleId.message}
                  </p>
                ) : (
                  <p className="pt-5"></p>
                )}
              </div>
            )}
          />

          <div className="w-96 m-0">
            <h2 className="text-sm text-black mb-2">NIP / NIM</h2>
          </div>
          <Controller
            name="id"
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                <div className="flex justify-center">
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
                    className="w-96 p-3 border rounded-lg focus:ring-1 focus:ring-black"
                  />
                </div>
                {errors.id?.message != null ? (
                  <p className="text-red-500 text-sm">{errors.id.message}</p>
                ) : (
                  <p className="pt-5"></p>
                )}
              </div>
            )}
          />

          <div className="w-96 m-0">
            <h2 className="text-sm text-black mb-2">Name</h2>
          </div>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                <div className="flex justify-center">
                  <input
                    {...field}
                    placeholder="Name"
                    className="w-96 p-3 border rounded-lg focus:ring-1 focus:ring-black"
                  />
                </div>
                {errors.name?.message != null ? (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
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
              <div className="relative space-y-2 justi">
                <input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-96 p-3 border rounded-lg focus:ring-1 focus:ring-black pr-10"
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

          <Controller
            name="agreement"
            control={control}
            render={({ field }) => (
              <div>
                <div className="flex items-center justify-center">
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
                      className="w-5 h-5 mr-2 border border-black rounded-full flex items-center justify-center cursor-pointer peer-checked:bg-black peer-checked:text-white transition-colors"
                    >
                      <i className="fi fi-br-check text-xs text-white"></i>
                    </label>
                  </div>
                  <span className="text-md">
                    I agree to the terms and privacy policy.
                  </span>
                </div>
                {errors.agreement?.message != null ? (
                  <p className="text-red-500 text-sm">
                    {errors.agreement.message}
                  </p>
                ) : (
                  <p className="pt-5"></p>
                )}
              </div>
            )}
          />

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-96 bg-[#F77C7C] text-black py-4 px-5 rounded-lg transition-colors hover:bg-red-500 cursor-pointer"
            >
              Sign Up
            </button>
          </div>
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
