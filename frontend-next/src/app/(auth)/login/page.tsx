"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "@/graphql/auth.graphql";
import { setToken } from "@/lib/auth";
import { client } from "@/lib/apollo-client";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, { client });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: form });
      if (data?.login?.token) {
        setToken(data.login.token);
        router.push("/dashboard");
      } else {
        alert("Login gagal. Coba periksa username/password.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat login");
    }
  };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
                alt="Your Company"
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/669dbabb-d4c5-4170-bbe6-1fffd7b4bb09/d18t2l6-227050ae-b1d2-4a80-89cc-9513aa6de2c5.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiIvZi82NjlkYmFiYi1kNGM1LTQxNzAtYmJlNi0xZmZmZDdiNGJiMDkvZDE4dDJsNi0yMjcwNTBhZS1iMWQyLTRhODAtODljYy05NTEzYWE2ZGUyYzUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.3v2bCKuAQi66GlkfBQGMtYLKvbwenJn3o1bwKQ5F0nM"
                className="mx-auto h-25 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-dark">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-700">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            value={form.username}
                            onChange={handleChange}
                            autoComplete="username"
                            className="block w-full rounded-md bg-dark/5 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-900/10 placeholder:text-gray-700 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-700">
                            Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-teal-400 hover:text-teal-300">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={form.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-900/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full justify-center rounded-md bg-teal-500 px-3 py-2 text-sm font-semibold text-white hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        >
                        {loading ? "Signing in..." : "Sign in"}
                        </button>
                    </div>
                </form>

                {error && (
                <p className="mt-4 text-sm text-red-500 text-center">
                    Gagal login: {error.message}
                </p>
                )}

                <p className="mt-10 text-center text-sm/6 text-gray-400">
                    Not a member?{' '}
                    <a href="#" className="font-semibold text-teal-400 hover:text-teal-300">
                    Register
                    </a>
                </p>
            </div>
        </div>    
    );
}