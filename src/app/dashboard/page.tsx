

// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useSession } from 'next-auth/react';
// import axios, { AxiosError } from 'axios';
// import { toast } from 'sonner';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import QRCode from "react-qr-code";
// import { 
//   Loader2, RefreshCcw, Copy, Check, 
//   QrCode, MessageSquare, Bell, BellOff,
//   Trash2, Mail, Calendar, User as UserIcon,
//   ChevronRight, ChevronLeft, BarChart2
// } from 'lucide-react';

// import { acceptMessageSchema } from '@/schemas/acceptMessageSchema';
// import { Message } from '@/model/User';
// import { ApiResponse } from '@/types/ApiResponse';

// const UserDashboard = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSwitchLoading, setIsSwitchLoading] = useState(false);
//   const [profileUrl, setProfileUrl] = useState('');
//   const [copied, setCopied] = useState(false);
//   const [showQR, setShowQR] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [deletingMessageId, setDeletingMessageId] = useState<string | null>(null);
//   const messagesPerPage = 6;

//   const { data: session, status } = useSession();

//   const form = useForm<z.infer<typeof acceptMessageSchema>>({
//     resolver: zodResolver(acceptMessageSchema),
//     defaultValues: {
//       acceptMessage: false
//     }
//   });

//   const { register, watch, setValue } = form;
//   const acceptMessages = watch('acceptMessage');

//   const handleDeleteMessage = async (messageId: string) => {
//     setDeletingMessageId(messageId);
//     try {
//       await axios.delete(`/api/delete-message/${messageId}`);
//       setMessages(messages.filter((message) => message._id !== messageId));
//       toast.success('Message deleted successfully');
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse<any>>;
//       toast.error(
//         axiosError.response?.data.message || 'Failed to delete message'
//       );
//     } finally {
//       setDeletingMessageId(null);
//     }
//   };

//   const fetchAcceptMessages = useCallback(async () => {
//     setIsSwitchLoading(true);
//     try {
//       const response = await axios.get<ApiResponse<any>>('/api/accept-messages');
//       setValue('acceptMessage', response.data.isAcceptingMessages ?? false);
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse<any>>;
//       toast.error(
//         axiosError.response?.data.message || 'Failed to fetch message settings'
//       );
//     } finally {
//       setIsSwitchLoading(false);
//     }
//   }, [setValue]);

//   const fetchMessages = useCallback(
//     async (refresh: boolean = false) => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get<ApiResponse<any>>('/api/get-messages');
//         setMessages(response.data.messages || []);
//         if (refresh) {
//           toast.success('Showing latest messages');
//         }
//       } catch (error) {
//         const axiosError = error as AxiosError<ApiResponse<any>>;
//         toast.error(
//           axiosError.response?.data.message || 'Failed to fetch messages'
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [setMessages]
//   );

//   useEffect(() => {
//     if (status === 'loading') return;
//     if (!session?.user) return;

//     fetchMessages();
//     fetchAcceptMessages();

//     const baseUrl = `${window.location.protocol}//${window.location.host}`;
//     const username = (session.user as any)?.username;
//     if (username) {
//       const url = `${baseUrl}/u/${username}`;
//       setProfileUrl(url);
//     }
//   }, [session, status, fetchAcceptMessages, fetchMessages]);

//   const handleSwitchChange = async () => {
//     try {
//       const response = await axios.post<ApiResponse<any>>('/api/accept-messages', {
//         acceptMessage: !acceptMessages,
//       });
//       setValue('acceptMessage', !acceptMessages);
//       toast.success(response.data.message);
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse<any>>;
//       toast.error(
//         axiosError.response?.data.message || 'Failed to update message settings'
//       );
//     }
//   };

//   const copyToClipboard = () => {
//     if (!profileUrl) {
//       toast.error('Profile URL is not available yet');
//       return;
//     }
//     navigator.clipboard.writeText(profileUrl);
//     setCopied(true);
//     toast.success('Profile URL copied to clipboard');
//     setTimeout(() => setCopied(false), 2000);
//   };

//   if (status === 'loading') {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
//         <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
//       </div>
//     );
//   }

//   if (!session?.user) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
//         <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-8 border border-gray-700 max-w-md w-full text-center">
//           <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
//             <UserIcon className="h-8 w-8 text-white" />
//           </div>
//           <h2 className="text-2xl font-bold mb-4">You are not logged in</h2>
//           <p className="text-gray-400 mb-6">Please sign in to access your dashboard</p>
//           <a 
//             href="/sign-in" 
//             className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg px-6 py-3 transition-all"
//           >
//             Sign In
//           </a>
//         </div>
//       </div>
//     );
//   }

//   const totalPages = Math.ceil(messages.length / messagesPerPage);
//   const indexOfLastMessage = currentPage * messagesPerPage;
//   const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
//   const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);

//   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

//   const MessageCard = ({ message, onMessageDelete }: { message: Message; onMessageDelete: (id: string) => void }) => (
//     <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg">
//       <div className="flex justify-between items-start">
//         <div className="flex items-center gap-3 mb-3">
//           <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full">
//             <UserIcon className="h-5 w-5 text-white" />
//           </div>
//           <div>
//             <h3 className="font-semibold text-gray-200">Anonymous User</h3>
//             <p className="text-xs text-gray-400">
//               {new Date(message.createdAt).toLocaleDateString('en-US', {
//                 year: 'numeric',
//                 month: 'short',
//                 day: 'numeric',
//                 hour: '2-digit',
//                 minute: '2-digit'
//               })}
//             </p>
//           </div>
//         </div>
//         <button 
//           onClick={() => onMessageDelete(message._id as string)}
//           className="p-2 text-gray-400 hover:text-red-500 transition-colors"
//           disabled={deletingMessageId === message._id}
//         >
//           {deletingMessageId === message._id ? (
//             <Loader2 className="h-5 w-5 animate-spin" />
//           ) : (
//             <Trash2 className="h-5 w-5" />
//           )}
//         </button>
//       </div>
//       <div className="mt-4 bg-gray-700/50 rounded-lg p-4">
//         <p className="text-gray-300">{message.content}</p>
//       </div>
//     </div>
//   );

//   const MessageSkeleton = () => (
//     <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 animate-pulse">
//       <div className="flex justify-between">
//         <div className="flex items-center gap-3 mb-3">
//           <div className="bg-gray-700 rounded-full h-10 w-10"></div>
//           <div>
//             <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
//             <div className="h-3 bg-gray-700 rounded w-16"></div>
//           </div>
//         </div>
//         <div className="h-5 w-5 bg-gray-700 rounded"></div>
//       </div>
//       <div className="mt-4">
//         <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
//         <div className="h-4 bg-gray-700 rounded w-4/5"></div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-8 px-4 md:px-8 ">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 mt-10">
//           <div>
//             <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
//               Message Dashboard
//             </h1>
//             <p className="text-gray-400 mt-2">
//               Manage your messages and profile settings
//             </p>
//           </div>
          
//           <div className="flex items-center mt-4 md:mt-0">
//             <div className="bg-gray-800 border border-gray-700 rounded-lg p-2 flex items-center">
//               <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-10 h-10 flex items-center justify-center">
//                 <span className="font-bold text-white">
//                   {(session.user as any)?.username?.charAt(0).toUpperCase()}
//                 </span>
//               </div>
//               <div className="ml-3">
//                 <p className="font-medium">{(session.user as any)?.username}</p>
//                 <p className="text-xs text-gray-400">User</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Profile Settings */}
//           <div className="lg:col-span-1 space-y-6">
//             {/* Profile URL Card */}
//             <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-xl font-semibold">Your Profile Link</h2>
//                 <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
//                   <Mail className="h-5 w-5 text-white" />
//                 </div>
//               </div>
              
//               <p className="text-gray-400 text-sm mb-4">
//                 Share this link to receive anonymous messages
//               </p>
              
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={profileUrl}
//                   readOnly
//                   className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 pr-20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Generating profile URL..."
//                 />
//                 <div className="absolute right-2 top-2 flex space-x-2">
//                   <button 
//                     onClick={() => setShowQR(!showQR)}
//                     className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
//                   >
//                     <QrCode className="h-5 w-5 text-white" />
//                   </button>
//                   <button 
//                     onClick={copyToClipboard}
//                     className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg transition-all hover:opacity-90"
//                     disabled={!profileUrl}
//                   >
//                     {copied ? (
//                       <Check className="h-5 w-5 text-white" />
//                     ) : (
//                       <Copy className="h-5 w-5 text-white" />
//                     )}
//                   </button>
//                 </div>
//               </div>
              
//               {showQR && (
//                 <div className="mt-6 flex flex-col items-center">
//                   <div className="p-4 bg-white rounded-lg">
//                     <QRCode value={profileUrl} size={150} />
//                   </div>
//                   <p className="mt-3 text-gray-400 text-sm">
//                     Scan to share your profile
//                   </p>
//                 </div>
//               )}
//             </div>
            
//             {/* Message Settings Card */}
//             <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-xl font-semibold">Message Settings</h2>
//                 <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
//                   <MessageSquare className="h-5 w-5 text-white" />
//                 </div>
//               </div>
              
//               <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
//                 <div className="flex items-center">
//                   {acceptMessages ? (
//                     <Bell className="h-5 w-5 text-green-400 mr-3" />
//                   ) : (
//                     <BellOff className="h-5 w-5 text-gray-500 mr-3" />
//                   )}
//                   <span className="font-medium">
//                     Accept Messages: {acceptMessages ? 'Enabled' : 'Disabled'}
//                   </span>
//                 </div>
                
//                 <div className="relative">
//                   <button
//                     onClick={handleSwitchChange}
//                     disabled={isSwitchLoading}
//                     className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
//                       acceptMessages ? 'bg-green-500' : 'bg-gray-600'
//                     }`}
//                   >
//                     <span
//                       className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                         acceptMessages ? 'translate-x-6' : 'translate-x-1'
//                       }`}
//                     />
//                   </button>
//                   {isSwitchLoading && (
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <Loader2 className="h-4 w-4 animate-spin text-white" />
//                     </div>
//                   )}
//                 </div>
//               </div>
              
//               <p className="mt-4 text-sm text-gray-400">
//                 {acceptMessages
//                   ? 'You are currently accepting messages from your profile link.'
//                   : 'Messages are currently disabled. No one can send you messages.'}
//               </p>
//             </div>
            
//             {/* Stats Card */}
//             <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-md rounded-xl p-6 border border-blue-500/20">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-xl font-semibold">Message Statistics</h2>
//                 <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
//                   <BarChart2 className="h-5 w-5 text-white" />
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="bg-gray-800/50 rounded-lg p-4 text-center">
//                   <p className="text-3xl font-bold text-blue-400">{messages.length}</p>
//                   <p className="text-sm text-gray-400">Total Messages</p>
//                 </div>
//                 <div className="bg-gray-800/50 rounded-lg p-4 text-center">
//                   <p className="text-3xl font-bold text-purple-400">
//                     {messages.length}
//                   </p>
//                   <p className="text-sm text-gray-400">Unread Messages</p>
//                 </div>
//               </div>
              
//               <div className="mt-4 bg-gray-800/50 rounded-lg p-4">
//                 <div className="flex justify-between text-sm mb-1">
//                   <span>Active Users</span>
//                   <span>120k</span>
//                 </div>
//                 <div className="w-full bg-gray-700 rounded-full h-2">
//                   <div className="bg-green-500 h-2 rounded-full" style={{width: '75%'}}></div>
//                 </div>
//               </div>
              
//               <button
//                 onClick={(e) => {
//                   e.preventDefault();
//                   fetchMessages(true);
//                 }}
//                 className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <Loader2 className="h-5 w-5 animate-spin text-white" />
//                 ) : (
//                   <>
//                     <RefreshCcw className="h-5 w-5 mr-2" />
//                     Refresh Messages
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
          
//           {/* Right Column - Messages */}
//           <div className="lg:col-span-2">
//             <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-semibold">
//                   Your Messages <span className="text-gray-400">({messages.length})</span>
//                 </h2>
                
//                 <div className="flex items-center space-x-2">
//                   <button 
//                     onClick={() => currentPage > 1 && paginate(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className="p-2 bg-gray-700 rounded-lg disabled:opacity-50"
//                   >
//                     <ChevronLeft className="h-5 w-5" />
//                   </button>
//                   <span className="px-3 py-1 bg-gray-700 rounded-lg">
//                     {currentPage} / {totalPages || 1}
//                   </span>
//                   <button 
//                     onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
//                     disabled={currentPage === totalPages || totalPages === 0}
//                     className="p-2 bg-gray-700 rounded-lg disabled:opacity-50"
//                   >
//                     <ChevronRight className="h-5 w-5" />
//                   </button>
//                 </div>
//               </div>
              
//               {isLoading ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {[...Array(6)].map((_, i) => (
//                     <MessageSkeleton key={i} />
//                   ))}
//                 </div>
//               ) : currentMessages.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {currentMessages.map((message) => (
//                     <MessageCard 
//                       key={message._id as string} 
//                       message={message} 
//                       onMessageDelete={handleDeleteMessage} 
//                     />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center justify-center py-16 text-center">
//                   <div className="bg-gray-700/50 rounded-full p-6 mb-6">
//                     <Mail className="h-12 w-12 text-gray-400" />
//                   </div>
//                   <h3 className="text-xl font-semibold mb-2">No messages yet</h3>
//                   <p className="text-gray-400 max-w-md">
//                     Share your profile link to start receiving anonymous messages from others.
//                   </p>
//                   <button
//                     onClick={() => setShowQR(true)}
//                     className="mt-6 py-2 px-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center hover:opacity-90"
//                   >
//                     <QrCode className="h-5 w-5 mr-2" />
//                     Show QR Code
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;




















'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import QRCode from 'react-qr-code';
import {
  Loader2,
  RefreshCcw,
  Copy,
  Check,
  QrCode,
  Bell,
  BellOff,
  Trash2,
  Mail,
  User as UserIcon,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

import { acceptMessageSchema } from '@/schemas/acceptMessageSchema';
import { IMessage } from '@/model/User';
import { ApiResponse } from '@/types/ApiResponse';

const UserDashboard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [profileUrl, setProfileUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingMessageId, setDeletingMessageId] = useState<string | null>(null);
  const messagesPerPage = 6;

  const { data: session, status } = useSession();

  const form = useForm<z.infer<typeof acceptMessageSchema>>({
    resolver: zodResolver(acceptMessageSchema),
    defaultValues: { acceptMessage: false },
  });
  const { watch, setValue } = form;
  const acceptMessages = watch('acceptMessage');

  const handleDeleteMessage = async (messageId: string) => {
    setDeletingMessageId(messageId);
    try {
      await axios.delete<ApiResponse<{ message: string }>>(`/api/delete-message/${messageId}`);
      setMessages((prev) => prev.filter((m) => m._id !== messageId));
      toast.success('Message deleted successfully');
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiResponse<unknown>>;
      toast.error(axiosError.response?.data.message ?? 'Failed to delete message');
    } finally {
      setDeletingMessageId(null);
    }
  };

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse<{ isAcceptingMessages: boolean }>>('/api/accept-messages');
      setValue('acceptMessage', response.data.isAcceptingMessages ?? false);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiResponse<unknown>>;
      toast.error(axiosError.response?.data.message ?? 'Failed to fetch message settings');
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(async (refresh = false) => {
    setIsLoading(true);
    try {
      const response = await axios.get<ApiResponse<{ messages: Message[] }>>('/api/get-messages');
      setMessages(response.data.messages ?? []);
      if (refresh) toast.success('Showing latest messages');
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiResponse<unknown>>;
      toast.error(axiosError.response?.data.message ?? 'Failed to fetch messages');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status !== 'authenticated' || !session?.user) return;
    fetchMessages();
    fetchAcceptMessages();

    const baseUrl = `${window.location.protocol}//${window.location.host}`;
    const username = (session.user as { username?: string }).username;
    if (username) setProfileUrl(`${baseUrl}/u/${username}`);
  }, [session, status, fetchAcceptMessages, fetchMessages]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse<{ message: string }>>('/api/accept-messages', {
        acceptMessage: !acceptMessages,
      });
      setValue('acceptMessage', !acceptMessages);
      toast.success(response.data.message);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiResponse<unknown>>;
      toast.error(axiosError.response?.data.message ?? 'Failed to update message settings');
    }
  };

  const copyToClipboard = () => {
    if (!profileUrl) return toast.error('Profile URL not ready');
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    toast.success('Profile URL copied');
    setTimeout(() => setCopied(false), 2000);
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="bg-gray-800/50 rounded-xl p-8 text-center">
          <UserIcon className="h-10 w-10 mx-auto text-white mb-4" />
          <h2 className="text-xl text-white mb-2">Not logged in</h2>
          <a href="/sign-in" className="px-6 py-3 bg-blue-600 rounded text-white">Sign In</a>
        </div>
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil(messages.length / messagesPerPage));
  const currentMessages = messages.slice((currentPage - 1) * messagesPerPage, currentPage * messagesPerPage);
  const username = (session.user as { username?: string }).username ?? '';
  const usernameInitial = username[0]?.toUpperCase() ?? '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold tracking-tight">📬 Message Dashboard</h1>
        <div className="flex items-center bg-gray-700 rounded-full px-4 py-2 shadow-inner">
          <span className="bg-blue-600 text-white font-semibold rounded-full w-8 h-8 flex items-center justify-center mr-2">
            {usernameInitial}
          </span>
          <span className="text-sm opacity-80">{username}</span>
        </div>
      </div>

      <div className="bg-gray-800/70 rounded-2xl p-6 shadow-md space-y-3">
        <h2 className="text-xl font-semibold mb-2">🔗 Your Profile Link</h2>
        <div className="relative">
          <input
            value={profileUrl}
            readOnly
            className="w-full bg-gray-700 rounded-xl px-4 py-2 pr-20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            onClick={() => setShowQR(!showQR)}
            className="absolute right-16 top-2 text-white hover:text-blue-400 transition"
          >
            <QrCode size={20} />
          </button>
          <button
            onClick={copyToClipboard}
            className="absolute right-4 top-2 text-white hover:text-green-400 transition"
          >
            {copied ? <Check size={20} /> : <Copy size={20} />}
          </button>
        </div>
        {showQR && (
          <div className="mt-4 animate-fade-in bg-white p-4 rounded-lg inline-block shadow-md">
            <QRCode value={profileUrl} />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between bg-gray-800/70 p-5 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3 text-lg">
          {acceptMessages ? <Bell className="text-green-400" /> : <BellOff className="text-red-400" />}
          <span>Accepting Messages: <strong>{acceptMessages ? 'On' : 'Off'}</strong></span>
        </div>
        <button
          disabled={isSwitchLoading}
          onClick={handleSwitchChange}
          className={`flex items-center px-4 py-2 rounded-xl transition ${
            acceptMessages ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isSwitchLoading ? <Loader2 className="animate-spin mr-2" /> : null}
          {acceptMessages ? 'Turn Off' : 'Turn On'}
        </button>
      </div>

      <div className="bg-gray-800/70 rounded-2xl p-5 flex justify-between items-center shadow-sm">
        <div>
          <p>Total Messages: <strong>{messages.length}</strong></p>
          <p>Total Pages: <strong>{totalPages}</strong></p>
        </div>
        <button
          onClick={() => fetchMessages(true)}
          disabled={isLoading}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
        >
          {isLoading ? <Loader2 className="animate-spin mr-2" /> : <RefreshCcw className="mr-2" />}
          Refresh
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {isLoading
          ? Array.from({ length: messagesPerPage }).map((_, i) => (
              <div key={i} className="bg-gray-700 rounded-xl p-6 animate-pulse h-32" />
            ))
          : currentMessages.length > 0
          ? currentMessages.map((msg) => (
              <div
                key={String(msg._id)}
                className="relative bg-gray-800/70 rounded-2xl p-5 shadow-md hover:shadow-lg transition"
              >
                <button
                  onClick={() => handleDeleteMessage(String(msg._id))}
                  disabled={deletingMessageId === msg._id}
                  className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition"
                >
                  {deletingMessageId === msg._id ? <Loader2 className="animate-spin" /> : <Trash2 />}
                </button>
                <p className="mb-3 text-sm text-gray-100">{msg.content}</p>
                <span className="text-xs text-gray-400">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
              </div>
            ))
          : (
            <div className="col-span-full text-center text-gray-400">
              <Mail className="mx-auto w-12 h-12 mb-2" />
              <p>No messages yet. Start sharing your profile!</p>
            </div>
          )}
      </div>

      <div className="flex justify-center items-center mt-6 gap-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="hover:text-blue-400 transition"
        >
          <ChevronLeft />
        </button>
        <span className="text-lg font-semibold">{currentPage} / {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="hover:text-blue-400 transition"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
