
// 'use client';

// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';

// // Zod schema for validation
// const signUpSchema = z.object({
//   username: z.string().min(3, 'Username must be at least 3 characters'),
//   email: z.string().email('Invalid email address'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
// });

// type SignUpFormData = z.infer<typeof signUpSchema>;

// export default function SignUpPage() {
//   const router = useRouter();
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignUpFormData>({
//     resolver: zodResolver(signUpSchema),
//   });

//   const onSubmit = async (data: SignUpFormData) => {
//     setIsSubmitting(true);
//     try {
//       await axios.post('/api/sign-up', data);
//       toast.success('Account created! Please check your email to verify.');
//       router.push(`/verify/${data.username}`);
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || 'Failed to create account. Try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-12">
//       <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg">
//         <h1 className="text-2xl font-bold mb-6 text-center text-white">Create Account</h1>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//           {/* Username */}
//           <div>
//             <label className="block mb-1 font-medium text-gray-300">Username</label>
//             <input
//               type="text"
//               placeholder="Your username"
//               {...register('username')}
//               className={`w-full rounded-md border px-3 py-2 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                 errors.username ? 'border-red-500' : 'border-gray-700'
//               }`}
//             />
//             {errors.username && (
//               <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block mb-1 font-medium text-gray-300">Email</label>
//             <input
//               type="email"
//               placeholder="you@example.com"
//               {...register('email')}
//               className={`w-full rounded-md border px-3 py-2 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                 errors.email ? 'border-red-500' : 'border-gray-700'
//               }`}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block mb-1 font-medium text-gray-300">Password</label>
//             <input
//               type="password"
//               placeholder="••••••••"
//               {...register('password')}
//               className={`w-full rounded-md border px-3 py-2 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                 errors.password ? 'border-red-500' : 'border-gray-700'
//               }`}
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 rounded-md hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50"
//           >
//             {isSubmitting ? 'Creating Account...' : 'Sign Up'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }





















'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

// Zod schema for validation
const signUpSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setProgress(i);
      }
      
      // Actual API call would be here:
      // await axios.post('/api/sign-up', data);
      
      // Simulate success
      toast.success('Account created! Please check your email to verify.');
      router.push(`/verify/${data.username}`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create account. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation for floating particles
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const divContainer = container as HTMLDivElement;

    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20';
      const size = Math.random() * 20 + 5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      container.appendChild(particle);

      // Animate particle
      particle.animate(
        [
          { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
          { transform: `translateY(${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg)`, opacity: 0.2 }
        ],
        {
          duration: Math.random() * 5000 + 3000,
          iterations: Infinity,
          direction: 'alternate'
        }
      );
    };

    // Create particles
    for (let i = 0; i < 15; i++) {
      createParticle();
    }
    return () => {
      while (divContainer.firstChild) {
        divContainer.removeChild(divContainer.firstChild);
      }
    };
  }, []);

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-12 overflow-hidden"
      ref={containerRef}
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      
      <motion.div 
        className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-purple-600 blur-[100px] opacity-20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      />
      
      <motion.div 
        className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-blue-600 blur-[80px] opacity-20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.7, duration: 1 }}
      />

      <motion.div 
        className="w-full max-w-md bg-gray-800/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-700/50 relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Progress bar during submission */}
        {isSubmitting && (
          <motion.div 
            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
        )}

        {/* Header with animated icon */}
        <div className="text-center mb-8">
          <motion.div
            className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-4"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </motion.div>
          
          <motion.h1 
            className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Create Your Account
          </motion.h1>
          <motion.p 
            className="mt-2 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Join our community today
          </motion.p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <label className="block mb-2 font-medium text-gray-300">Username</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Your username"
                {...register('username')}
                className={`w-full rounded-xl border px-4 py-3 bg-gray-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                  errors.username ? 'border-red-500' : 'border-gray-700'
                }`}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            {errors.username && (
              <motion.p 
                className="text-red-500 text-sm mt-1"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                {errors.username.message}
              </motion.p>
            )}
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <label className="block mb-2 font-medium text-gray-300">Email</label>
            <div className="relative">
              <input
                type="email"
                placeholder="you@example.com"
                {...register('email')}
                className={`w-full rounded-xl border px-4 py-3 bg-gray-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                  errors.email ? 'border-red-500' : 'border-gray-700'
                }`}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
            </div>
            {errors.email && (
              <motion.p 
                className="text-red-500 text-sm mt-1"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                {errors.email.message}
              </motion.p>
            )}
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <label className="block mb-2 font-medium text-gray-300">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                {...register('password')}
                className={`w-full rounded-xl border px-4 py-3 bg-gray-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                  errors.password ? 'border-red-500' : 'border-gray-700'
                }`}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            {errors.password && (
              <motion.p 
                className="text-red-500 text-sm mt-1"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                {errors.password.message}
              </motion.p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3.5 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] disabled:opacity-70 group"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </div>
              ) : (
                <>
                  Sign Up
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </>
              )}
            </button>
          </motion.div>

          {/* Sign In Link */}
          <motion.div 
            className="text-center mt-6 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Already have an account?{' '}
            <motion.a 
              href="/sign-in" 
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign in
            </motion.a>
          </motion.div>
        </form>

        {/* Animated decorative elements */}
        <motion.div 
          className="absolute -bottom-10 -right-10 w-20 h-20 rounded-full bg-blue-500/10 blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-purple-500/10 blur-xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />
      </motion.div>
    </div>
  );
}