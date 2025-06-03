// 'use client';

// import { Button } from '@/components/ui/button';
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { toast } from 'sonner';
// import { ApiResponse } from '@/types/ApiResponse';
// import { zodResolver } from '@hookform/resolvers/zod';
// import axios, { AxiosError } from 'axios';
// import { useParams, useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import * as z from 'zod';
// import { verifySchema } from '@/schemas/verifySchema';

// export default function VerifyAccount() {
//   const router = useRouter();
//   const params = useParams() as { username: string }; // explicit type assertion

//   const form = useForm<z.infer<typeof verifySchema>>({
//     resolver: zodResolver(verifySchema),
//   });

//   const onSubmit = async (data: z.infer<typeof verifySchema>) => {
//     try {
//       const response = await axios.post<ApiResponse<any>>(`/api/verify-code`, {
//         username: params.username,
//         code: data.code,
//       });

//       toast.success(response.data.message); // sonner toast success

//       router.replace('/sign-in');
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse<any>>;
//       toast.error(
//         axiosError.response?.data.message ?? 'An error occurred. Please try again.'
//       );
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//         <div className="text-center">
//           <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
//             Verify Your Account
//           </h1>
//           <p className="mb-4">Enter the verification code sent to your email</p>
//         </div>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <FormField
//               name="code"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Verification Code</FormLabel>
//                   <Input {...field} autoComplete="one-time-code" />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
//               {form.formState.isSubmitting ? 'Verifying...' : 'Verify'}
//             </Button>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// }




'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { verifySchema } from '@/schemas/verifySchema';
import { useEffect, useState } from 'react';
import { ShieldCheck, ArrowLeft, Mail, RotateCw, Check } from 'lucide-react';
import { Message } from '@/model/User';

export default function VerifyAccount() {
  const router = useRouter();
  const params = useParams() as { username: string };
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });

  // Handle resend countdown timer
  useEffect(() => {
    if (resendDisabled) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendDisabled]);

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    setLoading(true);
    try {
      const response = await axios.post<ApiResponse<Message>>(`/api/verify-code`, {
        username: params.username,
        code: data.code,
      });

      toast.success(response.data.message, {
        icon: <Check className="w-5 h-5 text-green-500" />,
      });

      router.replace('/sign-in');
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse<Message>>;
      toast.error(
        axiosError.response?.data.message ?? 'An error occurred. Please try again.',
        { icon: '❌' }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResendDisabled(true);
    try {
      await axios.post(`/api/resend-verification-code`, {
        username: params.username,
      });
      toast.success('Verification code resent!');
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse<Message>>;
      toast.error(
        axiosError.response?.data.message ?? 'Failed to resend code. Please try again.'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 20}px`,
              height: `${Math.random() * 100 + 20}px`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>

      {/* Verification Card */}
      <div className="relative z-10 w-full max-w-md p-8 space-y-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 transform transition-all duration-300 hover:shadow-2xl">
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="text-center">
          <div className="mx-auto mb-6 flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
            <ShieldCheck className="h-10 w-10 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">
            Verify Your Account
          </h1>
          <p className="text-white/80 mb-6">
            Enter the verification code sent to your email
          </p>
          
          <div className="flex justify-center mb-8">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="absolute -top-3 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
                    Verification Code
                  </FormLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      autoComplete="one-time-code"
                      className="bg-white/5 border border-white/20 text-white text-lg py-6 px-4 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="123456"
                    />
                    <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50" />
                  </div>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />
            
            <div className="flex justify-between items-center mt-8">
              <Button
                type="button"
                onClick={handleResendCode}
                disabled={resendDisabled}
                className="flex items-center bg-white/10 hover:bg-white/20 border border-white/20 text-white"
              >
                <RotateCw className={`mr-2 h-4 w-4 ${resendDisabled ? 'animate-spin' : ''}`} />
                {resendDisabled ? `Resend in ${countdown}s` : 'Resend Code'}
              </Button>
              
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-6 px-8 rounded-xl transition-all shadow-lg hover:shadow-purple-500/20"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </>
                ) : 'Verify Account'}
              </Button>
            </div>
          </form>
        </Form>
        
        <div className="pt-6 border-t border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-white/70">Verification progress</span>
            <span className="text-sm font-medium text-white">Step 2 of 2</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2.5">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full w-2/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}