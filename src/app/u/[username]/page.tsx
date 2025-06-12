

<<<<<<< HEAD
// 'use client';

// import React, { useState, useEffect } from 'react';
// import axios, { AxiosError } from 'axios';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { Loader2, Sparkles, Send, Copy, Check, Mail, User, ArrowRight, MessageSquare } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Separator } from '@/components/ui/separator';
// import { CardHeader, CardContent, Card } from '@/components/ui/card';
// import { useCompletion } from 'ai/react';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Textarea } from '@/components/ui/textarea';
// import { toast } from 'sonner';
// import * as z from 'zod';
// import { ApiResponse } from '@/types/ApiResponse';
// import Link from 'next/link';
// import { useParams } from 'next/navigation';
// import { MessageSchema } from '@/schemas/messageSchema';

// const specialChar = '||';

// const parseStringMessages = (messageString: string): string[] => {
//   return messageString.split(specialChar);
// };

// const initialMessageString =
//   "What's your favorite movie?||Do you have any pets?||What's your dream job?||What's the best book you've read recently?||If you could travel anywhere, where would you go?";

// export default function SendMessage() {
//   const params = useParams<{ username: string }>();
//   const username = params.username;
//   const [copied, setCopied] = useState(false);
//   const [profileUrl, setProfileUrl] = useState('');

//   const {
//     complete,
//     completion,
//     isLoading: isSuggestLoading,
//     error,
//   } = useCompletion({
//     api: '/api/suggest-messages',
//     initialCompletion: initialMessageString,
//   });

//   const form = useForm<z.infer<typeof MessageSchema>>({
//     resolver: zodResolver(MessageSchema),
//     defaultValues: {
//       content: '',
//     },
//   });

//   const messageContent = form.watch('content');
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     setProfileUrl(`${window.location.origin}/u/${username}`);
//   }, [username]);

//   const handleMessageClick = (message: string) => {
//     form.setValue('content', message);
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(profileUrl);
//     setCopied(true);
//     toast.success('Profile URL copied to clipboard');
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const onSubmit = async (data: z.infer<typeof MessageSchema>) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.post<ApiResponse<any>>('/api/send-message', {
//         ...data,
//         username,
//       });

//       toast.success(response.data.message);
//       form.reset({ ...form.getValues(), content: '' });
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse<any>>;
//       toast.error(axiosError.response?.data.message ?? 'Failed to send message');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchSuggestedMessages = async () => {
//     try {
//       complete('');
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//       toast.error('Failed to fetch suggestions');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-4 md:px-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-12">
//           <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full mb-4">
//             <Mail className="h-10 w-10 text-white" />
//           </div>
//           <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
//             Send Anonymous Message
//           </h1>
//           <p className="text-gray-400 max-w-lg mx-auto">
//             Share your thoughts with @{username} completely anonymously
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
//           {/* Left Column - User Info */}
//           <div className="lg:col-span-2">
//             <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-14 h-14 flex items-center justify-center">
//                   <span className="font-bold text-xl">
//                     {username?.charAt(0).toUpperCase()}
//                   </span>
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-bold">@{username}</h2>
//                   <p className="text-gray-400">Message recipient</p>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <h3 className="font-medium flex items-center gap-2">
//                   <User className="h-5 w-5 text-blue-400" /> 
//                   Profile Link
//                 </h3>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={profileUrl}
//                     readOnly
//                     className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 pr-16 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                   <button 
//                     onClick={copyToClipboard}
//                     className="absolute right-2 top-2 p-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md hover:opacity-90 transition-opacity"
//                   >
//                     {copied ? (
//                       <Check className="h-4 w-4 text-white" />
//                     ) : (
//                       <Copy className="h-4 w-4 text-white" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               <Separator className="my-6 bg-gray-700" />

//               <div className="space-y-3">
//                 <h3 className="font-medium flex items-center gap-2">
//                   <MessageSquare className="h-5 w-5 text-purple-400" /> 
//                   How it works
//                 </h3>
//                 <ul className="space-y-2 text-gray-400 text-sm">
//                   <li className="flex items-start gap-2">
//                     <span className="text-blue-400">1.</span> 
//                     <span>Write your message anonymously</span>
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <span className="text-blue-400">2.</span> 
//                     <span>Recipient won't see your identity</span>
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <span className="text-blue-400">3.</span> 
//                     <span>They'll receive it instantly</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Message Form */}
//           <div className="lg:col-span-3">
//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)}>
//                 <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
//                   <FormField
//                     control={form.control}
//                     name="content"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="flex items-center gap-2 mb-3 text-lg">
//                           <Send className="h-5 w-5 text-blue-400" />
//                           Your Message to @{username}
//                         </FormLabel>
//                         <FormControl>
//                           <Textarea
//                             placeholder="Write your anonymous message here..."
//                             className="resize-none bg-gray-700 border-gray-600 text-white h-40 focus:ring-blue-500"
//                             {...field}
//                           />
//                         </FormControl>
//                         <div className="flex justify-between mt-2">
//                           <FormMessage />
//                           <span className={`text-sm ${messageContent.length > 250 ? 'text-red-400' : 'text-gray-400'}`}>
//                             {messageContent.length}/300
//                           </span>
//                         </div>
//                       </FormItem>
//                     )}
//                   />

//                   <Button
//                     type="submit"
//                     disabled={!messageContent || isLoading}
//                     className="w-full mt-6 py-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all"
//                   >
//                     {isLoading ? (
//                       <>
//                         <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                         Sending...
//                       </>
//                     ) : (
//                       <>
//                         <Send className="mr-2 h-5 w-5" />
//                         Send Anonymously
//                       </>
//                     )}
//                   </Button>
//                 </div>
//               </form>
//             </Form>

//             <div className="mt-8">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-xl font-semibold flex items-center gap-2">
//                   <Sparkles className="h-5 w-5 text-yellow-400" />
//                   Suggested Messages
//                 </h3>
//                 <Button
//                   onClick={fetchSuggestedMessages}
//                   variant="outline"
//                   className="border-gray-600 hover:bg-gray-700"
//                   disabled={isSuggestLoading}
//                 >
//                   {isSuggestLoading ? (
//                     <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                   ) : (
//                     <Sparkles className="h-4 w-4 mr-2 text-yellow-400" />
//                   )}
//                   Generate Suggestions
//                 </Button>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 {error ? (
//                   <div className="col-span-2 text-center py-8">
//                     <p className="text-red-400">AI-generated suggestions are currently under development. In the meantime, feel free to explore the available suggestion messages or write your own.</p>
//                     <Button 
//                       variant="outline" 
//                       className="mt-4 border-gray-600 hover:bg-gray-700"
//                       onClick={fetchSuggestedMessages}
//                     >
//                       Try Again
//                     </Button>
//                   </div>
//                 ) : (
//                   parseStringMessages(completion).map((message, index) => (
//                     <button
//                       key={index}
//                       onClick={() => handleMessageClick(message)}
//                       className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-left hover:border-blue-500 hover:bg-gray-700/50 transition-all duration-300 group"
//                     >
//                       <div className="flex justify-between items-start">
//                         <span className="group-hover:text-blue-400 transition-colors">
//                           {message}
//                         </span>
//                         <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
//                       </div>
//                     </button>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         <Separator className="my-12 bg-gray-700" />

//         <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-md rounded-xl p-8 border border-blue-500/20">
//           <div className="max-w-2xl mx-auto text-center">
//             <h2 className="text-2xl md:text-3xl font-bold mb-4">
//               Want to Receive Anonymous Messages?
//             </h2>
//             <p className="text-gray-300 mb-6 max-w-lg mx-auto">
//               Create your own profile to start receiving anonymous messages from friends, followers, and colleagues.
//             </p>
//             <div className="flex flex-col sm:flex-row justify-center gap-4">
//               <Link href="/sign-up">
//                 <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-6">
//                   Create Your Account
//                 </Button>
//               </Link>
//               <Link href="/sign-in">
//                 <Button variant="outline" className="border-gray-600 hover:bg-gray-700 px-8 py-6">
//                   Sign In
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }











// =======
// >>>>>>> aed1ac6 (Initial commit)
// 'use client';

// import React, { useState, useEffect } from 'react';
// import axios, { AxiosError } from 'axios';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { Loader2, Sparkles, Send, Copy, Check, Mail, User, ArrowRight, MessageSquare } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Separator } from '@/components/ui/separator';
// <<<<<<< HEAD
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// =======
// import { CardHeader, CardContent, Card } from '@/components/ui/card';
// import { useCompletion } from 'ai/react';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// >>>>>>> aed1ac6 (Initial commit)
// import { Textarea } from '@/components/ui/textarea';
// import { toast } from 'sonner';
// import * as z from 'zod';
// import { ApiResponse } from '@/types/ApiResponse';
// import Link from 'next/link';
// import { useParams } from 'next/navigation';
// import { MessageSchema } from '@/schemas/messageSchema';
// <<<<<<< HEAD
// import { useCompletion } from 'ai/react';
// =======
// >>>>>>> aed1ac6 (Initial commit)

// const specialChar = '||';

// const parseStringMessages = (messageString: string): string[] => {
//   return messageString.split(specialChar);
// };

// const initialMessageString =
//   "What's your favorite movie?||Do you have any pets?||What's your dream job?||What's the best book you've read recently?||If you could travel anywhere, where would you go?";

// export default function SendMessage() {
// <<<<<<< HEAD
//   const params = useParams();
//   const username = (params as { username: string }).username;
// =======
//   const params = useParams<{ username: string }>();
//   const username = params.username;
// >>>>>>> aed1ac6 (Initial commit)
//   const [copied, setCopied] = useState(false);
//   const [profileUrl, setProfileUrl] = useState('');

//   const {
//     complete,
//     completion,
//     isLoading: isSuggestLoading,
//     error,
//   } = useCompletion({
//     api: '/api/suggest-messages',
//     initialCompletion: initialMessageString,
//   });

//   const form = useForm<z.infer<typeof MessageSchema>>({
//     resolver: zodResolver(MessageSchema),
//     defaultValues: {
//       content: '',
//     },
//   });

//   const messageContent = form.watch('content');
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     setProfileUrl(`${window.location.origin}/u/${username}`);
//   }, [username]);

//   const handleMessageClick = (message: string) => {
//     form.setValue('content', message);
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(profileUrl);
//     setCopied(true);
//     toast.success('Profile URL copied to clipboard');
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const onSubmit = async (data: z.infer<typeof MessageSchema>) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.post<ApiResponse<any>>('/api/send-message', {
//         ...data,
//         username,
//       });
// <<<<<<< HEAD
// =======

// >>>>>>> aed1ac6 (Initial commit)
//       toast.success(response.data.message);
//       form.reset({ ...form.getValues(), content: '' });
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse<any>>;
//       toast.error(axiosError.response?.data.message ?? 'Failed to send message');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchSuggestedMessages = async () => {
//     try {
//       complete('');
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//       toast.error('Failed to fetch suggestions');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-4 md:px-8">
// <<<<<<< HEAD
//       {/* Remaining JSX same as previously posted, starting with header and ending with footer */}
//     </div>
//   );
// }
// =======
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-12">
//           <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full mb-4">
//             <Mail className="h-10 w-10 text-white" />
//           </div>
//           <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
//             Send Anonymous Message
//           </h1>
//           <p className="text-gray-400 max-w-lg mx-auto">
//             Share your thoughts with @{username} completely anonymously
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
//           {/* Left Column - User Info */}
//           <div className="lg:col-span-2">
//             <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-14 h-14 flex items-center justify-center">
//                   <span className="font-bold text-xl">
//                     {username?.charAt(0).toUpperCase()}
//                   </span>
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-bold">@{username}</h2>
//                   <p className="text-gray-400">Message recipient</p>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <h3 className="font-medium flex items-center gap-2">
//                   <User className="h-5 w-5 text-blue-400" /> 
//                   Profile Link
//                 </h3>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={profileUrl}
//                     readOnly
//                     className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 pr-16 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                   <button 
//                     onClick={copyToClipboard}
//                     className="absolute right-2 top-2 p-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md hover:opacity-90 transition-opacity"
//                   >
//                     {copied ? (
//                       <Check className="h-4 w-4 text-white" />
//                     ) : (
//                       <Copy className="h-4 w-4 text-white" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               <Separator className="my-6 bg-gray-700" />

//               <div className="space-y-3">
//                 <h3 className="font-medium flex items-center gap-2">
//                   <MessageSquare className="h-5 w-5 text-purple-400" /> 
//                   How it works
//                 </h3>
//                 <ul className="space-y-2 text-gray-400 text-sm">
//                   <li className="flex items-start gap-2">
//                     <span className="text-blue-400">1.</span> 
//                     <span>Write your message anonymously</span>
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <span className="text-blue-400">2.</span> 
//                     <span>Recipient won't see your identity</span>
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <span className="text-blue-400">3.</span> 
//                     <span>They'll receive it instantly</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Message Form */}
//           <div className="lg:col-span-3">
//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)}>
//                 <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
//                   <FormField
//                     control={form.control}
//                     name="content"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="flex items-center gap-2 mb-3 text-lg">
//                           <Send className="h-5 w-5 text-blue-400" />
//                           Your Message to @{username}
//                         </FormLabel>
//                         <FormControl>
//                           <Textarea
//                             placeholder="Write your anonymous message here..."
//                             className="resize-none bg-gray-700 border-gray-600 text-white h-40 focus:ring-blue-500"
//                             {...field}
//                           />
//                         </FormControl>
//                         <div className="flex justify-between mt-2">
//                           <FormMessage />
//                           <span className={`text-sm ${messageContent.length > 250 ? 'text-red-400' : 'text-gray-400'}`}>
//                             {messageContent.length}/300
//                           </span>
//                         </div>
//                       </FormItem>
//                     )}
//                   />

//                   <Button
//                     type="submit"
//                     disabled={!messageContent || isLoading}
//                     className="w-full mt-6 py-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all"
//                   >
//                     {isLoading ? (
//                       <>
//                         <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                         Sending...
//                       </>
//                     ) : (
//                       <>
//                         <Send className="mr-2 h-5 w-5" />
//                         Send Anonymously
//                       </>
//                     )}
//                   </Button>
//                 </div>
//               </form>
//             </Form>

//             <div className="mt-8">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-xl font-semibold flex items-center gap-2">
//                   <Sparkles className="h-5 w-5 text-yellow-400" />
//                   Suggested Messages
//                 </h3>
//                 <Button
//                   onClick={fetchSuggestedMessages}
//                   variant="outline"
//                   className="border-gray-600 hover:bg-gray-700"
//                   disabled={isSuggestLoading}
//                 >
//                   {isSuggestLoading ? (
//                     <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                   ) : (
//                     <Sparkles className="h-4 w-4 mr-2 text-yellow-400" />
//                   )}
//                   Generate Suggestions
//                 </Button>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 {error ? (
//                   <div className="col-span-2 text-center py-8">
//                     <p className="text-red-400">AI-generated suggestions are currently under development. In the meantime, feel free to explore the available suggestion messages or write your own.</p>
//                     <Button 
//                       variant="outline" 
//                       className="mt-4 border-gray-600 hover:bg-gray-700"
//                       onClick={fetchSuggestedMessages}
//                     >
//                       Try Again
//                     </Button>
//                   </div>
//                 ) : (
//                   parseStringMessages(completion).map((message, index) => (
//                     <button
//                       key={index}
//                       onClick={() => handleMessageClick(message)}
//                       className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-left hover:border-blue-500 hover:bg-gray-700/50 transition-all duration-300 group"
//                     >
//                       <div className="flex justify-between items-start">
//                         <span className="group-hover:text-blue-400 transition-colors">
//                           {message}
//                         </span>
//                         <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
//                       </div>
//                     </button>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         <Separator className="my-12 bg-gray-700" />

//         <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-md rounded-xl p-8 border border-blue-500/20">
//           <div className="max-w-2xl mx-auto text-center">
//             <h2 className="text-2xl md:text-3xl font-bold mb-4">
//               Want to Receive Anonymous Messages?
//             </h2>
//             <p className="text-gray-300 mb-6 max-w-lg mx-auto">
//               Create your own profile to start receiving anonymous messages from friends, followers, and colleagues.
//             </p>
//             <div className="flex flex-col sm:flex-row justify-center gap-4">
//               <Link href="/sign-up">
//                 <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-6">
//                   Create Your Account
//                 </Button>
//               </Link>
//               <Link href="/sign-in">
//                 <Button variant="outline" className="border-gray-600 hover:bg-gray-700 px-8 py-6">
//                   Sign In
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }








// >>>>>>> aed1ac6 (Initial commit)





















'use client';

import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Loader2,
  Sparkles,
  Send,
  Copy,
  Check,
  Mail,
  User,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import * as z from 'zod';
import { ApiResponse } from '@/types/ApiResponse';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MessageSchema } from '@/schemas/messageSchema';
import { useCompletion } from 'ai/react';

const specialChar = '||';

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?||What's the best book you've read recently?||If you could travel anywhere, where would you go?";

export default function SendMessage() {
  const params = useParams() as { username: string };
  const username = params.username;
  const [copied, setCopied] = useState(false);
  const [profileUrl, setProfileUrl] = useState('');

  const {
    complete,
    completion,
    isLoading: isSuggestLoading,
    error,
  } = useCompletion({
    api: '/api/suggest-messages',
    initialCompletion: initialMessageString,
  });

  const form = useForm<z.infer<typeof MessageSchema>>({
    resolver: zodResolver(MessageSchema),
    defaultValues: {
      content: '',
    },
  });

  const messageContent = form.watch('content');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setProfileUrl(`${window.location.origin}/u/${username}`);
  }, [username]);

  const handleMessageClick = (message: string) => {
    form.setValue('content', message);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    toast.success('Profile URL copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const onSubmit = async (data: z.infer<typeof MessageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse<null>>('/api/send-message', {
        ...data,
        username,
      });
      toast.success(response.data.message);
      form.reset({ content: '' });
    } catch (err) {
      const axiosError = err as AxiosError<ApiResponse<null>>;
      toast.error(axiosError.response?.data.message ?? 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSuggestedMessages = async () => {
    try {
      complete('');
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to fetch suggestions');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full mb-4">
            <Mail className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Send Anonymous Message
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Share your thoughts with @{username} completely anonymously
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-14 h-14 flex items-center justify-center">
                  <span className="font-bold text-xl">
                    {username?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold">@{username}</h2>
                  <p className="text-gray-400">Message recipient</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-400" />
                  Profile Link
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    value={profileUrl}
                    readOnly
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 pr-16 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="absolute right-2 top-2 p-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md hover:opacity-90 transition-opacity"
                  >
                    {copied ? <Check className="h-4 w-4 text-white" /> : <Copy className="h-4 w-4 text-white" />}
                  </button>
                </div>
              </div>

              <Separator className="my-6 bg-gray-700" />

              <div className="space-y-3">
                <h3 className="font-medium flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-purple-400" />
                  How it works
                </h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">1.</span>
                    <span>Write your message anonymously</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">2.</span>
                    <span>Recipient won&apos;t see your identity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">3.</span>
                    <span>They&apos;ll receive it instantly</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 mb-3 text-lg">
                          <Send className="h-5 w-5 text-blue-400" />
                          Your Message to @{username}
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write your anonymous message here..."
                            className="resize-none bg-gray-700 border-gray-600 text-white h-40 focus:ring-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <div className="flex justify-between mt-2">
                          <FormMessage />
                          <span className={`text-sm ${messageContent.length > 250 ? 'text-red-400' : 'text-gray-400'}`}>
                            {messageContent.length}/300
                          </span>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={!messageContent || isLoading}
                    className="w-full mt-6 py-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Anonymously
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>

            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-yellow-400" />
                  Suggested Messages
                </h3>
                <Button
                  onClick={fetchSuggestedMessages}
                  variant="outline"
                  className="border-gray-600 hover:bg-gray-700"
                  disabled={isSuggestLoading}
                >
                  {isSuggestLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Sparkles className="h-4 w-4 mr-2 text-yellow-400" />
                  )}
                  Generate Suggestions
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {error ? (
                  <div className="col-span-2 text-center py-8">
                    <p className="text-red-400">AI-generated suggestions are currently under development. In the meantime, feel free to explore the available suggestion messages or write your own.</p>
                    <Button
                      variant="outline"
                      className="mt-4 border-gray-600 hover:bg-gray-700"
                      onClick={fetchSuggestedMessages}
                    >
                      Try Again
                    </Button>
                  </div>
                ) : (
                  parseStringMessages(completion).map((message, index) => (
                    <button
                      key={index}
                      onClick={() => handleMessageClick(message)}
                      className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-left hover:border-blue-500 hover:bg-gray-700/50 transition-all duration-300 group"
                    >
                      <div className="flex justify-between items-start">
                        <span className="group-hover:text-blue-400 transition-colors">
                          {message}
                        </span>
                        <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-12 bg-gray-700" />

        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-md rounded-xl p-8 border border-blue-500/20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Want to Receive Anonymous Messages?
            </h2>
            <p className="text-gray-300 mb-6 max-w-lg mx-auto">
              Create your own profile to start receiving anonymous messages from friends, followers, and colleagues.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/sign-up">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-6">
                  Create Your Account
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button variant="outline" className="border-gray-600 hover:bg-gray-700 px-8 py-6">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
