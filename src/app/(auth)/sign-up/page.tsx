

// 'use client';

// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import { motion } from 'framer-motion';

// // Validation Schema
// const signUpSchema = z.object({
//   username: z.string().min(3, 'Username must be at least 3 characters'),
//   email: z.string().email('Invalid email address'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
// });

// type SignUpFormData = z.infer<typeof signUpSchema>;

// export default function SignUpPage() {
//   const router = useRouter();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const isMountedRef = useRef(true);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignUpFormData>({
//     resolver: zodResolver(signUpSchema),
//   });

//   const onSubmit = useCallback(async (data: SignUpFormData) => {
//     setIsSubmitting(true);
//     setProgress(0);

//     try {
//       // Simulate progress
//       for (let i = 0; i <= 100; i += 10) {
//         if (!isMountedRef.current) return;
//         await new Promise((resolve) => setTimeout(resolve, 100));
//         setProgress(i);
//       }

//       // Actual API Call (uncomment when ready)
//       const response = await axios.post('/api/sign-up', data);
      
//       if (response.data.success) {
//         toast.success('Account created! Please check your email to verify.');
//         router.push(`/verify/${data.username}`);
//       } else {
//         toast.error(response.data.message || 'Failed to create account. Try again.');
//       }
//     } catch (error: any) {
//       toast.error(
//         error?.response?.data?.message || 'Failed to create account. Try again.'
//       );
//     } finally {
//       if (isMountedRef.current) {
//         setIsSubmitting(false);
//       }
//     }
//   }, [router]);

//   useEffect(() => {
//     return () => {
//       isMountedRef.current = false;
//     };
//   }, []);

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const createParticle = () => {
//       const particle = document.createElement('div');
//       particle.className =
//         'absolute rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20';
//       const size = Math.random() * 20 + 5;
//       particle.style.width = `${size}px`;
//       particle.style.height = `${size}px`;
//       particle.style.left = `${Math.random() * 100}%`;
//       particle.style.top = `${Math.random() * 100}%`;
//       container.appendChild(particle);

//       const animation = particle.animate(
//         [
//           { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
//           {
//             transform: `translateY(${Math.random() * 100 - 50}px) rotate(${
//               Math.random() * 360
//             }deg)`,
//             opacity: 0.2,
//           },
//         ],
//         {
//           duration: Math.random() * 5000 + 3000,
//           iterations: Infinity,
//           direction: 'alternate',
//         }
//       );

//       return () => animation.cancel();
//     };

//     const particles = Array.from({ length: 15 }, () => createParticle());

//     return () => {
//       particles.forEach(cleanup => cleanup?.());
//       while (container.firstChild) {
//         container.removeChild(container.firstChild);
//       }
//     };
//   }, []);

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-12 overflow-hidden"
//       ref={containerRef}
//     >
//       {/* Progress line on top */}
//       {isSubmitting && (
//         <motion.div
//           className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"
//           style={{ width: `${progress}%` }}
//           initial={{ width: 0 }}
//           animate={{ width: `${progress}%` }}
//           transition={{ duration: 0.2 }}
//         />
//       )}

//       {/* Form container */}
//       <motion.div
//         className="w-full max-w-md bg-gray-800/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-700/50 relative overflow-hidden"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: 'easeOut' }}
//       >
//         <div className="text-center mb-8">
//           <motion.div
//             className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-4"
//             initial={{ scale: 0, rotate: -180 }}
//             animate={{ scale: 1, rotate: 0 }}
//             transition={{ type: 'spring', stiffness: 200, damping: 20 }}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-8 w-8 text-white"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//               />
//             </svg>
//           </motion.div>
//           <h1 className="text-3xl font-bold text-white mb-1">
//             Create Your Account
//           </h1>
//           <p className="text-gray-400">Join our community today</p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           {/* Username */}
//           <div>
//             <label className="block mb-2 text-gray-300">Username</label>
//             <input
//               type="text"
//               {...register('username')}
//               placeholder="Your username"
//               className={`w-full rounded-xl border px-4 py-3 bg-gray-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
//                 errors.username ? 'border-red-500' : 'border-gray-700'
//               }`}
//               disabled={isSubmitting}
//             />
//             {errors.username && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.username.message}
//               </p>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block mb-2 text-gray-300">Email</label>
//             <input
//               type="email"
//               {...register('email')}
//               placeholder="you@example.com"
//               className={`w-full rounded-xl border px-4 py-3 bg-gray-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
//                 errors.email ? 'border-red-500' : 'border-gray-700'
//               }`}
//               disabled={isSubmitting}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.email.message}
//               </p>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block mb-2 text-gray-300">Password</label>
//             <input
//               type="password"
//               {...register('password')}
//               placeholder="••••••••"
//               className={`w-full rounded-xl border px-4 py-3 bg-gray-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
//                 errors.password ? 'border-red-500' : 'border-gray-700'
//               }`}
//               disabled={isSubmitting}
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.password.message}
//               </p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <div>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3.5 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
//             >
//               {isSubmitting ? 'Creating Account...' : 'Sign Up'}
//             </button>
//           </div>

//           {/* Link to Sign In */}
//           <p className="text-center text-gray-400">
//             Already have an account?{' '}
//             <a
//               href="/sign-in"
//               className="text-blue-400 hover:text-blue-300 underline"
//               onClick={(e) => {
//                 if (isSubmitting) {
//                   e.preventDefault();
//                 }
//               }}
//             >
//               Sign in
//             </a>
//           </p>
//         </form>
//       </motion.div>
//     </div>
//   );
// }



























// 'use client';

// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import { motion } from 'framer-motion';

// // Validation Schema
// const signUpSchema = z.object({
//   username: z.string().min(3, 'Username must be at least 3 characters'),
//   email: z.string().email('Invalid email address'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
// });

// type SignUpFormData = z.infer<typeof signUpSchema>;

// export default function SignUpPage() {
//   const router = useRouter();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const isMountedRef = useRef(true);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignUpFormData>({
//     resolver: zodResolver(signUpSchema),
//   });

//   const onSubmit = useCallback(
//     async (data: SignUpFormData) => {
//       setIsSubmitting(true);
//       setProgress(0);

//       try {
//         // Simulate progress
//         for (let i = 0; i <= 100; i += 10) {
//           if (!isMountedRef.current) return;
//           await new Promise((resolve) => setTimeout(resolve, 100));
//           setProgress(i);
//         }

//         // Actual API Call
//         const response = await axios.post('/api/sign-up', data);

//         if (response.data.success) {
//           toast.success('Account created! Please check your email to verify.');
//           router.push(`/verify/${data.username}`);
//         } else {
//           toast.error(response.data.message || 'Failed to create account. Try again.');
//         }
//       } catch (error: unknown) {
//         if (
//           typeof error === 'object' &&
//           error !== null &&
//           'response' in error &&
//           typeof (error as any).response?.data?.message === 'string'
//         ) {
//           toast.error((error as any).response.data.message);
//         } else {
//           toast.error('Failed to create account. Try again.');
//         }
//       } finally {
//         if (isMountedRef.current) {
//           setIsSubmitting(false);
//         }
//       }
//     },
//     [router]
//   );

//   useEffect(() => {
//     return () => {
//       isMountedRef.current = false;
//     };
//   }, []);

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const createParticle = () => {
//       const particle = document.createElement('div');
//       particle.className =
//         'absolute rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20';
//       const size = Math.random() * 20 + 5;
//       particle.style.width = `${size}px`;
//       particle.style.height = `${size}px`;
//       particle.style.left = `${Math.random() * 100}%`;
//       particle.style.top = `${Math.random() * 100}%`;
//       container.appendChild(particle);

//       const animation = particle.animate(
//         [
//           { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
//           {
//             transform: `translateY(${Math.random() * 100 - 50}px) rotate(${
//               Math.random() * 360
//             }deg)`,
//             opacity: 0.2,
//           },
//         ],
//         {
//           duration: Math.random() * 5000 + 3000,
//           iterations: Infinity,
//           direction: 'alternate',
//         }
//       );

//       return () => animation.cancel();
//     };

//     const particles = Array.from({ length: 15 }, () => createParticle());

//     return () => {
//       particles.forEach((cleanup) => cleanup?.());
//       while (container.firstChild) {
//         container.removeChild(container.firstChild);
//       }
//     };
//   }, []);

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-12 overflow-hidden"
//       ref={containerRef}
//     >
//       {/* Progress line on top */}
//       {isSubmitting && (
//         <motion.div
//           className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"
//           style={{ width: `${progress}%` }}
//           initial={{ width: 0 }}
//           animate={{ width: `${progress}%` }}
//           transition={{ duration: 0.2 }}
//         />
//       )}

//       {/* Form container */}
//       <motion.div
//         className="w-full max-w-md bg-gray-800/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-700/50 relative overflow-hidden"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: 'easeOut' }}
//       >
//         <div className="text-center mb-8">
//           <motion.div
//             className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-4"
//             initial={{ scale: 0, rotate: -180 }}
//             animate={{ scale: 1, rotate: 0 }}
//             transition={{ type: 'spring', stiffness: 200, damping: 20 }}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-8 w-8 text-white"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//               />
//             </svg>
//           </motion.div>
//           <h1 className="text-3xl font-bold text-white mb-1">Create Your Account</h1>
//           <p className="text-gray-400">Join our community today</p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           {/* Username */}
//           <div>
//             <label className="block mb-2 text-gray-300">Username</label>
//             <input
//               type="text"
//               {...register('username')}
//               placeholder="Your username"
//               className={`w-full rounded-xl border px-4 py-3 bg-gray-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
//                 errors.username ? 'border-red-500' : 'border-gray-700'
//               }`}
//               disabled={isSubmitting}
//             />
//             {errors.username && (
//               <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block mb-2 text-gray-300">Email</label>
//             <input
//               type="email"
//               {...register('email')}
//               placeholder="you@example.com"
//               className={`w-full rounded-xl border px-4 py-3 bg-gray-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
//                 errors.email ? 'border-red-500' : 'border-gray-700'
//               }`}
//               disabled={isSubmitting}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block mb-2 text-gray-300">Password</label>
//             <input
//               type="password"
//               {...register('password')}
//               placeholder="••••••••"
//               className={`w-full rounded-xl border px-4 py-3 bg-gray-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
//                 errors.password ? 'border-red-500' : 'border-gray-700'
//               }`}
//               disabled={isSubmitting}
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <div>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3.5 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
//             >
//               {isSubmitting ? 'Creating Account...' : 'Sign Up'}
//             </button>
//           </div>

//           {/* Link to Sign In */}
//           <p className="text-center text-gray-400">
//             Already have an account?{' '}
//             <a
//               href="/sign-in"
//               className="text-blue-400 hover:text-blue-300 underline"
//               onClick={(e) => {
//                 if (isSubmitting) {
//                   e.preventDefault();
//                 }
//               }}
//             >
//               Sign in
//             </a>
//           </p>
//         </form>
//       </motion.div>
//     </div>
//   );
// }



















'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

// Validation Schema
const signUpSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

// ✅ Error type for axios
interface AxiosErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export default function SignUpPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMountedRef = useRef(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = useCallback(
    async (data: SignUpFormData) => {
      setIsSubmitting(true);
      setProgress(0);

      try {
        for (let i = 0; i <= 100; i += 10) {
          if (!isMountedRef.current) return;
          await new Promise((resolve) => setTimeout(resolve, 100));
          setProgress(i);
        }

        const response = await axios.post('/api/sign-up', data);

        if (response.data.success) {
          toast.success('Account created! Please check your email to verify.');
          router.push(`/verify/${data.username}`);
        } else {
          toast.error(response.data.message || 'Failed to create account. Try again.');
        }
      } catch (error: unknown) {
        const err = error as AxiosErrorResponse;

        if (
          err.response &&
          err.response.data &&
          typeof err.response.data.message === 'string'
        ) {
          toast.error(err.response.data.message);
        } else {
          toast.error('Failed to create account. Try again.');
        }
      } finally {
        if (isMountedRef.current) {
          setIsSubmitting(false);
        }
      }
    },
    [router]
  );

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className =
        'absolute rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20';
      const size = Math.random() * 20 + 5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      container.appendChild(particle);

      const animation = particle.animate(
        [
          { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
          {
            transform: `translateY(${Math.random() * 100 - 50}px) rotate(${
              Math.random() * 360
            }deg)`,
            opacity: 0.2,
          },
        ],
        {
          duration: Math.random() * 5000 + 3000,
          iterations: Infinity,
          direction: 'alternate',
        }
      );

      return () => animation.cancel();
    };

    const particles = Array.from({ length: 15 }, () => createParticle());

    return () => {
      particles.forEach((cleanup) => cleanup?.());
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-12 overflow-hidden"
      ref={containerRef}
    >
      {isSubmitting && (
        <motion.div
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"
          style={{ width: `${progress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2 }}
        />
      )}

      <motion.div
        className="w-full max-w-md bg-gray-800/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-700/50 relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="text-center mb-8">
          <motion.div
            className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-4"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-1">Create Your Account</h1>
          <p className="text-gray-400">Join our community today</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block mb-2 text-gray-300">Username</label>
            <input
              type="text"
              {...register('username')}
              placeholder="Your username"
              className={`w-full rounded-xl border px-4 py-3 bg-gray-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                errors.username ? 'border-red-500' : 'border-gray-700'
              }`}
              disabled={isSubmitting}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-gray-300">Email</label>
            <input
              type="email"
              {...register('email')}
              placeholder="you@example.com"
              className={`w-full rounded-xl border px-4 py-3 bg-gray-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                errors.email ? 'border-red-500' : 'border-gray-700'
              }`}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-gray-300">Password</label>
            <input
              type="password"
              {...register('password')}
              placeholder="••••••••"
              className={`w-full rounded-xl border px-4 py-3 bg-gray-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                errors.password ? 'border-red-500' : 'border-gray-700'
              }`}
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3.5 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>

          <p className="text-center text-gray-400">
            Already have an account?{' '}
            <a
              href="/sign-in"
              className="text-blue-400 hover:text-blue-300 underline"
              onClick={(e) => {
                if (isSubmitting) e.preventDefault();
              }}
            >
              Sign in
            </a>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
