'use client';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { signIn } from '~/lib/auth/client';
import { useState } from 'react';
import Threads from '~/components/ui/Threads';

export default function Page() {
  const [activeTab, setActiveTab] = useState<'signup' | 'signin'>('signin');

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background Threads */}
      <div className="absolute inset-0 z-0">
        <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md relative">
          {/* Glassmorphic Card */}
          <div className="backdrop-blur-sm bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl">
            {/* Tab Switcher */}
            <div className="flex bg-black rounded-2xl p-1 mb-8">
              <button
                onClick={() => setActiveTab('signup')}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200  ${
                  activeTab === 'signup'
                    ? 'backdrop-blur-sm bg-white/10  text-white shadow-lg'
                    : 'bg-transparent border-transparent text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                Sign up
              </button>
              <button
                onClick={() => setActiveTab('signin')}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 border ${
                  activeTab === 'signin'
                    ? 'bg-gray-800 border-gray-600 text-white shadow-lg'
                    : 'bg-transparent border-transparent text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                Sign in
              </button>
            </div>

            {activeTab === 'signup' ? (
              <>
                {/* Sign Up Form */}
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-white mb-2">
                    Create an account
                  </h1>
                </div>

                <form className="space-y-4">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="John"
                      className="h-14 bg-gray-900/80 border-gray-700/60 text-white placeholder:text-gray-500 focus:border-gray-600 focus:bg-gray-900/90 rounded-xl px-4"
                    />
                    <Input
                      placeholder="Last name"
                      className="h-14 bg-gray-900/80 border-gray-700/60 text-white placeholder:text-gray-500 focus:border-gray-600 focus:bg-gray-900/90 rounded-xl px-4"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <Input
                      placeholder="Enter your email"
                      className="h-14 pl-12 bg-gray-900/80  text-white placeholder:text-gray-500  rounded-xl"
                    />
                  </div>

                  {/* Phone Field */}
                  <div className="flex">
                    <div className="flex items-center bg-gray-900/80 border border-gray-700/60 border-r-0 rounded-l-xl px-4 h-14">
                      <span className="text-white text-sm mr-2">🇺🇸</span>
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    <Input
                      placeholder="(775) 351-6501"
                      className="flex-1 h-14 rounded-l-none rounded-r-xl bg-gray-900/80 border-gray-700/60 text-white placeholder:text-gray-500 focus:border-gray-600 focus:bg-gray-900/90 px-4"
                    />
                  </div>

                  {/* Create Account Button */}
                  <Button className="w-full mt-6 bg-white text-black hover:bg-gray-100 font-medium py-3 rounded-xl">
                    Create an account
                  </Button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                  <div className="flex-1 border-t border-gray-600/50"></div>
                  <span className="px-4 text-gray-400 text-sm">
                    OR SIGN IN WITH
                  </span>
                  <div className="flex-1 border-t border-gray-600/50"></div>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="bg-gray-800/50 border-gray-600/50 text-white hover:bg-gray-700/50 py-3 rounded-xl"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-gray-800/50 border-gray-600/50 text-white hover:bg-gray-700/50 py-3 rounded-xl"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    Apple
                  </Button>
                </div>

                {/* Terms */}
                <p className="text-center text-gray-400 text-sm mt-6">
                  By creating an account, you agree to our{' '}
                  <a href="#" className="text-white underline">
                    Terms & Service
                  </a>
                </p>
              </>
            ) : (
              <>
                {/* Sign In Form */}
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-white mb-2">
                    Welcome back
                  </h1>
                  <p className="text-gray-400">
                    Please sign in to your account
                  </p>
                </div>

                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const email = formData.get('email') as string;
                    const password = formData.get('password') as string;

                    signIn.email({
                      email: email || 'user-1757784457625@gvstang.com',
                      password: password || 'user@123',
                      callbackURL: '/dashboard',
                    });
                  }}
                >
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    defaultValue="user-1757784457625@gvstang.com"
                    className="h-14 bg-gray-900/80 border-gray-700/60 text-white placeholder:text-gray-500 focus:border-gray-600 focus:bg-gray-900/90 rounded-xl px-4"
                  />

                  <Input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    defaultValue="user@123"
                    className="h-14 bg-gray-900/80 border-gray-700/60 text-white placeholder:text-gray-500 focus:border-gray-600 focus:bg-gray-900/90 rounded-xl px-4"
                  />

                  <Button
                    type="submit"
                    className="w-full mt-6 bg-white text-black hover:bg-gray-100 font-medium py-3 rounded-xl"
                  >
                    Sign In
                  </Button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                  <div className="flex-1 border-t border-gray-600/50"></div>
                  <span className="px-4 text-gray-400 text-sm">
                    OR SIGN IN WITH
                  </span>
                  <div className="flex-1 border-t border-gray-600/50"></div>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="bg-gray-800/50 border-gray-600/50 text-white hover:bg-gray-700/50 py-3 rounded-xl"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-gray-800/50 border-gray-600/50 text-white hover:bg-gray-700/50 py-3 rounded-xl"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    Apple
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
