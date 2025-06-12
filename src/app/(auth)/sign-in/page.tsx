
// 'use client';

// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import * as z from 'zod';
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import { signInSchema } from '@/schemas/signInSchema';
// import { signIn } from 'next-auth/react';

// export default function SignInPage() {
//   const router = useRouter();

//   const form = useForm<z.infer<typeof signInSchema>>({
//     resolver: zodResolver(signInSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   });

//   const onSubmit = async (data: z.infer<typeof signInSchema>) => {
//     // Use NextAuth signIn function with credentials provider
//     const res = await signIn('credentials', {
//       redirect: false, // we handle redirect manually
//       identifier: data.email, // or username if you want
//       password: data.password,
//     });

//     if (res?.error) {
//       toast.error(res.error);
//       return;
//     }

//     if (res?.ok) {
//       toast.success('Login successful');
//       router.replace('/dashboard');
//     } else {
//       toast.error('Login failed');
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-800">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//         <div className="text-center">
//           <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
//             Welcome Back to True Feedback
//           </h1>
//           <p className="mb-4">Sign in to continue your secret conversations</p>
//         </div>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <FormField
//               name="email"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email or Username</FormLabel>
//                   <Input {...field} autoComplete="username" />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               name="password"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <Input
//                     type="password"
//                     {...field}
//                     autoComplete="current-password"
//                   />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button
//               type="submit"
//               className="w-full"
//               disabled={form.formState.isSubmitting}
//             >
//               {form.formState.isSubmitting ? 'Signing in...' : 'Sign In'}
//             </Button>
//           </form>
//         </Form>

//         <div className="text-center mt-4">
//           <p>
//             Not a member yet?{' '}
//             <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }














// 'use client';

// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import * as z from 'zod';
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import { signInSchema } from '@/schemas/signInSchema';
// import { signIn } from 'next-auth/react';
// import { motion } from 'framer-motion';
// import { Loader2 } from 'lucide-react';

// export default function SignInPage() {
//   const router = useRouter();

//   const form = useForm<z.infer<typeof signInSchema>>({
//     resolver: zodResolver(signInSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   });

//   const onSubmit = async (data: z.infer<typeof signInSchema>) => {
//     try {
//       const res = await signIn('credentials', {
//         redirect: false,
//         identifier: data.email,
//         password: data.password,
//       });

//       if (res?.error) {
//         toast.error('Invalid credentials', {
//           description: 'Please check your email and password',
//         });
//         return;
//       }

//       if (res?.ok) {
//         toast.success('Welcome back!', {
//           description: 'You have successfully signed in',
//         });
//         router.replace('/dashboard');
//       }
//     } catch (error) {
//       toast.error('An error occurred', {
//         description: 'Please try again later',
//       });
//     }
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: 'spring',
//         stiffness: 100,
//         damping: 10,
//       },
//     },
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//         className="w-full max-w-md p-8 space-y-8 bg-white/5 backdrop-blur-lg rounded-xl shadow-2xl border border-white/10"
//       >
//         <motion.div variants={itemVariants} className="text-center">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-2">
//             Welcome Back
//           </h1>
//           <p className="text-gray-300">Sign in to access your dashboard</p>
//         </motion.div>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <motion.div variants={itemVariants}>
//               <FormField
//                 name="email"
//                 control={form.control}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-gray-300">Email</FormLabel>
//                     <Input
//                       {...field}
//                       autoComplete="username"
//                       className="bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-blue-500"
//                     />
//                     <FormMessage className="text-red-400" />
//                   </FormItem>
//                 )}
//               />
//             </motion.div>

//             <motion.div variants={itemVariants}>
//               <FormField
//                 name="password"
//                 control={form.control}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-gray-300">Password</FormLabel>
//                     <Input
//                       type="password"
//                       {...field}
//                       autoComplete="current-password"
//                       className="bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-blue-500"
//                     />
//                     <FormMessage className="text-red-400" />
//                   </FormItem>
//                 )}
//               />
//             </motion.div>

//             <motion.div variants={itemVariants}>
//               <Button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
//                 disabled={form.formState.isSubmitting}
//               >
//                 {form.formState.isSubmitting ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Signing in...
//                   </>
//                 ) : (
//                   'Sign In'
//                 )}
//               </Button>
//             </motion.div>
//           </form>
//         </Form>

//         <motion.div
//           variants={itemVariants}
//           className="text-center text-gray-400"
//         >
//           <p>
//             Don't have an account?{' '}
//             <Link
//               href="/sign-up"
//               className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors"
//             >
//               Sign up
//             </Link>
//           </p>
//           {/* <Link
//             href="/forgot-password"
//             className="text-sm text-gray-400 hover:text-gray-300 mt-2 inline-block underline underline-offset-4 transition-colors"
//           >
//             Forgot password?
//           </Link> */}
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// }










// 'use client';

// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import * as z from 'zod';
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import { signInSchema } from '@/schemas/signInSchema';
// import { signIn } from 'next-auth/react';
// import { motion } from 'framer-motion';
// import { Loader2 } from 'lucide-react';

// export default function SignInPage() {
//   const router = useRouter();

//   const form = useForm<z.infer<typeof signInSchema>>({
//     resolver: zodResolver(signInSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   });

//   const onSubmit = async (data: z.infer<typeof signInSchema>) => {
//     try {
//       const res = await signIn('credentials', {
//         redirect: false,
//         identifier: data.email,
//         password: data.password,
//       });

//       if (res?.error) {
//         toast.error('Invalid credentials', {
//           description: 'Please check your email and password',
//         });
//         return;
//       }

//       if (res?.ok) {
//         toast.success('Welcome back!', {
//           description: 'You have successfully signed in',
//         });
//         router.replace('/dashboard');
//       }
//     } catch {
//       toast.error('An error occurred', {
//         description: 'Please try again later',
//       });
//     }
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1 },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { type: 'spring', stiffness: 100, damping: 10 },
//     },
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//         className="w-full max-w-md p-8 space-y-8 bg-white/5 backdrop-blur-lg rounded-xl shadow-2xl border border-white/10"
//       >
//         <motion.div variants={itemVariants} className="text-center">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-2">
//             Welcome Back
//           </h1>
//           <p className="text-gray-300">Sign in to access your dashboard</p>
//         </motion.div>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <motion.div variants={itemVariants}>
//               <FormField
//                 name="email"
//                 control={form.control}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-gray-300">Email</FormLabel>
//                     <Input
//                       {...field}
//                       autoComplete="username"
//                       className="bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-blue-500"
//                     />
//                     <FormMessage className="text-red-400" />
//                   </FormItem>
//                 )}
//               />
//             </motion.div>

//             <motion.div variants={itemVariants}>
//               <FormField
//                 name="password"
//                 control={form.control}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-gray-300">Password</FormLabel>
//                     <Input
//                       type="password"
//                       {...field}
//                       autoComplete="current-password"
//                       className="bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-blue-500"
//                     />
//                     <FormMessage className="text-red-400" />
//                   </FormItem>
//                 )}
//               />
//             </motion.div>

//             <motion.div variants={itemVariants}>
//               <Button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
//                 disabled={form.formState.isSubmitting}
//               >
//                 {form.formState.isSubmitting ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Signing in...
//                   </>
//                 ) : (
//                   'Sign In'
//                 )}
//               </Button>
//             </motion.div>
//           </form>
//         </Form>

//         <motion.div
//           variants={itemVariants}
//           className="text-center text-gray-400"
//         >
//           <p>
//             Don&apos;t have an account?{' '}
//             <Link
//               href="/sign-up"
//               className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors"
//             >
//               Sign up
//             </Link>
//           </p>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// }













// @/app/sign-in/page.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { signInSchema } from '@/schemas/signInSchema';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        identifier: data.identifier,
        password: data.password,
      });

      if (res?.error) {
        toast.error('Invalid credentials', {
          description: 'Please check your email/username and password',
        });
        return;
      }

      if (res?.ok) {
        toast.success('Welcome back!', {
          description: 'You have successfully signed in',
        });
        router.replace('/dashboard');
      }
    } catch {
      toast.error('An error occurred', {
        description: 'Please try again later',
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 10 },
    },
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md p-8 space-y-8 bg-white/5 backdrop-blur-lg rounded-xl shadow-2xl border border-white/10"
      >
        <motion.div variants={itemVariants} className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-300">Sign in to access your dashboard</p>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <motion.div variants={itemVariants}>
              <FormField
                name="identifier"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Email or Username</FormLabel>
                    <Input
                      {...field}
                      autoComplete="username"
                      className="bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-blue-500"
                    />
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Password</FormLabel>
                    <Input
                      type="password"
                      {...field}
                      autoComplete="current-password"
                      className="bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-blue-500"
                    />
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </motion.div>
          </form>
        </Form>

        <motion.div
          variants={itemVariants}
          className="text-center text-gray-400"
        >
          <p>
            Don&apos;t have an account?{' '}
            <Link
              href="/sign-up"
              className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
