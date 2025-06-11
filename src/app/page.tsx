// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { Mail } from 'lucide-react'; // Assuming you have an icon for messages
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import Autoplay from 'embla-carousel-autoplay';
// // @ts-ignore
// import messages from '@/messages.json';

// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from '@/components/ui/carousel';

// export default function Home() {
//   return (
//     <div className="flex flex-col min-h-screen bg-gray-800 text-white overflow-x-hidden">
//       {/* Main content */}
//       <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-8">
//         <section className="text-center mb-6 md:mb-10">
//           <h1 className="text-3xl md:text-5xl font-bold">
//             Dive into the World of Anonymous Feedback
//           </h1>
//           <p className="mt-3 md:mt-4 text-base md:text-lg">
//             True Feedback - Where your identity remains a secret.
//           </p>
//         </section>

//         {/* Carousel */}
//         <div className="w-full max-w-lg md:max-w-xl">
//           <Carousel plugins={[Autoplay({ delay: 2000 })]}>
//             <CarouselContent>
//               {messages.map((message: any, index: number) => (
//                 <CarouselItem key={index} className="p-4">
//                   <Card>
//                     <CardHeader>
//                       <CardTitle>{message.title}</CardTitle>
//                     </CardHeader>
//                     <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
//                       <Mail className="flex-shrink-0" />
//                       <div>
//                         <p>{message.content}</p>
//                         <p className="text-xs text-muted-foreground">
//                           {message.received}
//                         </p>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//           </Carousel>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="text-center p-4 md:p-6 bg-gray-900">
//         © 2023 True Feedback. All rights reserved.
//       </footer>
//     </div>
//   );
// }



// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { 
//   MessageCircle, Users, Image as ImageIcon, File, Video, 
//   Smartphone, Globe, ShieldCheck, Lock, Bell, Smile, 
//   Send, Star, ChevronLeft, ChevronRight 
// } from 'lucide-react';
// import Autoplay from 'embla-carousel-autoplay';
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
// } from '@/components/ui/carousel';

// export default function Home() {
//   const [activeFeature, setActiveFeature] = useState(0);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const features = [
//     {
//       icon: <MessageCircle className="w-8 h-8" />,
//       title: "Real-time Chat",
//       description: "Experience seamless messaging with instant delivery and read receipts."
//     },
//     {
//       icon: <Users className="w-8 h-8" />,
//       title: "Group Chats",
//       description: "Create groups for friends, family, or colleagues with custom permissions."
//     },
//     {
//       icon: <ImageIcon className="w-8 h-8" />,
//       title: "Media Sharing",
//       description: "Share photos, videos, and documents with high-quality compression."
//     },
//     {
//       icon: <Video className="w-8 h-8" />,
//       title: "Video Calls",
//       description: "HD video calls with screen sharing and background effects."
//     }
//   ];

//   const testimonials = [
//     {
//       name: "Sarah Johnson",
//       role: "Designer",
//       content: "The best messaging app I've used. The interface is clean and intuitive.",
//       avatar: "/avatar1.svg"
//     },
//     {
//       name: "Michael Chen",
//       role: "Developer",
//       content: "Group video calls work flawlessly even with 10+ participants.",
//       avatar: "/avatar2.svg"
//     },
//     {
//       name: "Emma Rodriguez",
//       role: "Marketing Manager",
//       content: "Our team communication has improved dramatically since switching.",
//       avatar: "/avatar3.svg"
//     }
//   ];

//   const securityFeatures = [
//     { icon: <Lock />, title: "End-to-End Encryption", description: "All messages are secured with military-grade encryption." },
//     { icon: <ShieldCheck />, title: "Privacy Controls", description: "Fine-tune who can see your online status and profile." },
//     { icon: <Bell />, title: "Custom Notifications", description: "Set different alerts for different contacts and groups." }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-x-hidden">
//       {/* Navigation */}
      

//       {/* Hero Section */}
//       <section className="pt-32 pb-20 px-4">
//         <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
//           <div className="space-y-6">
//             <h1 className="text-4xl md:text-6xl font-bold leading-tight">
//               Connect <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Instantly</span> with Friends & Family
//             </h1>
//             <p className="text-xl text-gray-300 max-w-2xl">
//               Experience seamless messaging with end-to-end encryption, HD video calls, and intuitive group chats.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 pt-4">
//               <Link href="/sign-up">
//                 <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-6">
//                   Start Messaging Free
//                 </Button>
//               </Link>
//               <Button variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 border-gray-600 hover:bg-gray-800">
//                 <Smartphone className="mr-2" /> Download App
//               </Button>
//             </div>
            
//             <div className="pt-6 flex items-center space-x-4">
//               <div className="flex -space-x-3">
//                 {[1, 2, 3, 4].map((item) => (
//                   <div key={item} className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center border-2 border-gray-800">
//                     <span className="text-xs font-bold">{item}</span>
//                   </div>
//                 ))}
//               </div>
//               <p className="text-gray-400">
//                 Join <span className="text-blue-400">5M+</span> users worldwide
//               </p>
//             </div>
//           </div>
          
//           <div className="relative">
//             <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-40"></div>
//             <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-30"></div>
            
//             <div className="relative bg-gray-800 border border-gray-700 rounded-2xl shadow-xl overflow-hidden">
//               {/* Chat header */}
//               <div className="p-4 border-b border-gray-700 bg-gray-800 flex items-center">
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
//                   <span className="font-bold">S</span>
//                 </div>
//                 <div className="ml-3">
//                   <div className="font-semibold">Sarah Johnson</div>
//                   <div className="text-xs text-green-400 flex items-center">
//                     <div className="w-2 h-2 rounded-full bg-green-400 mr-1"></div>
//                     Online
//                   </div>
//                 </div>
//               </div>
              
//               {/* Chat messages */}
//               <div className="h-80 overflow-y-auto p-4 space-y-4">
//                 <div className="flex justify-start">
//                   <div className="bg-gray-700 rounded-2xl rounded-tl-none px-4 py-2 max-w-xs">
//                     <p>Hey there! Are we still meeting tomorrow?</p>
//                     <p className="text-xs text-gray-400 mt-1">10:24 AM</p>
//                   </div>
//                 </div>
                
//                 <div className="flex justify-end">
//                   <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl rounded-tr-none px-4 py-2 max-w-xs">
//                     <p>Yes! 7 PM at the coffee shop. Can't wait!</p>
//                     <p className="text-xs text-blue-100 mt-1">10:25 AM</p>
//                   </div>
//                 </div>
                
//                 <div className="flex justify-start">
//                   <div className="bg-gray-700 rounded-2xl rounded-tl-none px-4 py-2 max-w-xs">
//                     <p>Perfect! I'll bring the design mockups for our project.</p>
//                     <p className="text-xs text-gray-400 mt-1">10:26 AM</p>
//                   </div>
//                 </div>
                
//                 <div className="flex justify-start">
//                   <div className="flex space-x-2">
//                     <div className="bg-gray-700 rounded-2xl rounded-tl-none p-2">
//                       <ImageIcon className="text-gray-300" />
//                     </div>
//                     <div className="bg-gray-700 rounded-2xl rounded-tl-none p-2">
//                       <File className="text-gray-300" />
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="flex justify-end">
//                   <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl rounded-tr-none px-4 py-2 max-w-xs">
//                     <p>Great! I've attached the meeting agenda 📎</p>
//                     <p className="text-xs text-blue-100 mt-1">10:28 AM</p>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Message input */}
//               <div className="p-3 border-t border-gray-700 flex items-center">
//                 <div className="flex-1 bg-gray-700 rounded-full pl-4 pr-2 py-2 flex items-center">
//                   <input 
//                     type="text" 
//                     placeholder="Type a message..." 
//                     className="bg-transparent border-none focus:outline-none flex-1"
//                   />
//                   <div className="flex space-x-2">
//                     <button className="p-1.5 rounded-full hover:bg-gray-600">
//                       <Smile />
//                     </button>
//                     <button className="p-1.5 rounded-full hover:bg-gray-600">
//                       <ImageIcon />
//                     </button>
//                   </div>
//                 </div>
//                 <button className="ml-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-3">
//                   <Send className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 px-4 bg-gray-800/50">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">
//               Powerful Features for <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Seamless Communication</span>
//             </h2>
//             <p className="text-gray-400 max-w-2xl mx-auto">
//               Everything you need to stay connected with friends, family, and colleagues
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {features.map((feature, index) => (
//               <div 
//                 key={index} 
//                 className={`bg-gray-800 border rounded-2xl p-6 transition-all duration-300 hover:border-blue-500 cursor-pointer ${activeFeature === index ? 'border-blue-500' : 'border-gray-700'}`}
//                 onMouseEnter={() => setActiveFeature(index)}
//               >
//                 <div className="text-blue-400 mb-4">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//                 <p className="text-gray-400">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Security Section */}
//       <section className="py-16 px-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div>
//               <h2 className="text-3xl md:text-4xl font-bold mb-6">
//                 Your Privacy is Our <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Top Priority</span>
//               </h2>
//               <p className="text-gray-300 mb-8">
//                 We implement industry-leading security measures to ensure your conversations remain private and secure.
//               </p>
              
//               <div className="space-y-6">
//                 {securityFeatures.map((feature, index) => (
//                   <div key={index} className="flex items-start">
//                     <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg mt-1">
//                       {feature.icon}
//                     </div>
//                     <div className="ml-4">
//                       <h3 className="text-xl font-semibold">{feature.title}</h3>
//                       <p className="text-gray-400">{feature.description}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             <div className="relative">
//               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-30"></div>
              
//               <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8">
//                 <div className="flex justify-between items-center mb-8">
//                   <div>
//                     <div className="text-xl font-bold">Security Center</div>
//                     <div className="text-green-400 text-sm flex items-center">
//                       <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
//                       All systems secure
//                     </div>
//                   </div>
//                   <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-2">
//                     <ShieldCheck className="w-6 h-6" />
//                   </div>
//                 </div>
                
//                 <div className="space-y-6">
//                   <div>
//                     <div className="flex justify-between mb-2">
//                       <span className="text-gray-400">Encryption Status</span>
//                       <span className="text-green-400">Active</span>
//                     </div>
//                     <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
//                       <div className="h-full bg-gradient-to-r from-green-500 to-green-400 w-full"></div>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <div className="flex justify-between mb-2">
//                       <span className="text-gray-400">Privacy Controls</span>
//                       <span className="text-green-400">Enabled</span>
//                     </div>
//                     <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
//                       <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 w-full"></div>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <div className="flex justify-between mb-2">
//                       <span className="text-gray-400">Data Protection</span>
//                       <span className="text-green-400">Optimal</span>
//                     </div>
//                     <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
//                       <div className="h-full bg-gradient-to-r from-green-500 to-blue-500 w-full"></div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="mt-8 pt-6 border-t border-gray-700">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <div className="font-semibold">Two-Factor Authentication</div>
//                       <div className="text-gray-400 text-sm">Add an extra layer of security</div>
//                     </div>
//                     <Button className="bg-gradient-to-r from-blue-500 to-purple-600">Enable</Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="py-16 px-4 bg-gray-800/50">
//         <div className="max-w-4xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">
//               What Our <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Users Say</span>
//             </h2>
//             <p className="text-gray-400 max-w-2xl mx-auto">
//               Join millions of satisfied users who have transformed their communication experience
//             </p>
//           </div>
          
//           <Carousel plugins={[Autoplay({ delay: 5000 })]}>
//             <CarouselContent>
//               {testimonials.map((testimonial, index) => (
//                 <CarouselItem key={index} className="p-4">
//                   <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">
//                     <div className="flex items-center mb-6">
//                       <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
//                         <span className="text-xl font-bold">{testimonial.name.charAt(0)}</span>
//                       </div>
//                       <div className="ml-4">
//                         <div className="font-bold text-lg">{testimonial.name}</div>
//                         <div className="text-gray-400">{testimonial.role}</div>
//                       </div>
//                       <div className="ml-auto flex text-yellow-400">
//                         {[1, 2, 3, 4, 5].map((star) => (
//                           <Star key={star} className="fill-current" />
//                         ))}
//                       </div>
//                     </div>
//                     <p className="text-lg italic">"{testimonial.content}"</p>
//                   </div>
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//           </Carousel>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 px-4 relative">
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
//         <div className="max-w-4xl mx-auto relative text-center">
//           <h2 className="text-3xl md:text-5xl font-bold mb-6">
//             Ready to Transform Your Messaging Experience?
//           </h2>
//           <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
//             Join millions of users enjoying secure, fast, and intuitive communication.
//           </p>
          
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <Link href="/sign-up">
//               <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-6">
//                 Start Messaging Free
//               </Button>
//             </Link>
//             <Button variant="outline" className="text-lg px-8 py-6 border-gray-600 hover:bg-gray-800">
//               <Smartphone className="mr-2" /> Download App
//             </Button>
//           </div>
          
//           <div className="mt-10 flex justify-center space-x-6">
//             <div className="flex flex-col items-center">
//               <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">5M+</div>
//               <div className="text-gray-400">Active Users</div>
//             </div>
//             <div className="flex flex-col items-center">
//               <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">99.9%</div>
//               <div className="text-gray-400">Uptime</div>
//             </div>
//             <div className="flex flex-col items-center">
//               <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">24/7</div>
//               <div className="text-gray-400">Support</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="py-12 px-4 bg-gray-900 border-t border-gray-800">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
//                   <MessageCircle className="text-white" />
//                 </div>
//                 <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Connectify</span>
//               </div>
//               <p className="text-gray-400 mb-4">
//                 Secure messaging for everyone. Connect instantly with friends and family.
//               </p>
//               <div className="flex space-x-4">
//                 {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
//                   <div key={social} className="bg-gray-800 hover:bg-gray-700 rounded-full p-2 cursor-pointer transition-colors">
//                     <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Features</h3>
//               <ul className="space-y-3 text-gray-400">
//                 <li className="hover:text-blue-400 cursor-pointer transition-colors">Messaging</li>
//                 <li className="hover:text-blue-400 cursor-pointer transition-colors">Video Calls</li>
//                 <li className="hover:text-blue-400 cursor-pointer transition-colors">Group Chats</li>
//                 <li className="hover:text-blue-400 cursor-pointer transition-colors">File Sharing</li>
//                 <li className="hover:text-blue-400 cursor-pointer transition-colors">Stickers & GIFs</li>
//               </ul>
//             </div>
            
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Company</h3>
//               <ul className="space-y-3 text-gray-400">
//                 <li className="hover:text-blue-400 cursor-pointer transition-colors">About Us</li>
//                 <li className="hover:text-blue-400 cursor-pointer transition-colors">Careers</li>
//                 <li className="hover:text-blue-400 cursor-pointer transition-colors">Blog</li>
//                 <li className="hover:text-blue-400 cursor-pointer transition-colors">Press</li>
//                 <li className="hover:text-blue-400 cursor-pointer transition-colors">Contact</li>
//               </ul>
//             </div>
            
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Download</h3>
//               <div className="space-y-4">
//                 <Button className="w-full bg-gray-800 hover:bg-gray-700 flex items-center">
//                   <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.701z"/>
//                   </svg>
//                   App Store
//                 </Button>
//                 <Button className="w-full bg-gray-800 hover:bg-gray-700 flex items-center">
//                   <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67z" />
//                     <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908z" />
//                   </svg>
//                   Google Play
//                 </Button>
//                 <Button className="w-full bg-gray-800 hover:bg-gray-700 flex items-center">
//                   <Globe className="w-5 h-5 mr-2" />
//                   Web Version
//                 </Button>
//               </div>
//             </div>
//           </div>
          
//           <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
//             <p>© 2023 Connectify Messenger. All rights reserved.</p>
//             <div className="mt-2 flex justify-center space-x-6">
//               <span className="hover:text-gray-300 cursor-pointer">Privacy Policy</span>
//               <span className="hover:text-gray-300 cursor-pointer">Terms of Service</span>
//               <span className="hover:text-gray-300 cursor-pointer">Cookie Policy</span>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }






















'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  MessageCircle, Users, Image as ImageIcon, File, Video, 
  Smartphone, Globe, ShieldCheck, Lock, Bell, Smile, 
  Send, Star
} from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Real-time Chat",
      description: "Experience seamless messaging with instant delivery and read receipts."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Group Chats",
      description: "Create groups for friends, family, or colleagues with custom permissions."
    },
    {
      icon: <ImageIcon className="w-8 h-8" />,
      title: "Media Sharing",
      description: "Share photos, videos, and documents with high-quality compression."
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Video Calls",
      description: "HD video calls with screen sharing and background effects."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Designer",
      content: "The best messaging app I&apos;ve used. The interface is clean and intuitive.",
      avatar: "/avatar1.svg"
    },
    {
      name: "Michael Chen",
      role: "Developer",
      content: "Group video calls work flawlessly even with 10+ participants.",
      avatar: "/avatar2.svg"
    },
    {
      name: "Emma Rodriguez",
      role: "Marketing Manager",
      content: "Our team communication has improved dramatically since switching.",
      avatar: "/avatar3.svg"
    }
  ];

  const securityFeatures = [
    { icon: <Lock />, title: "End-to-End Encryption", description: "All messages are secured with military-grade encryption." },
    { icon: <ShieldCheck />, title: "Privacy Controls", description: "Fine-tune who can see your online status and profile." },
    { icon: <Bell />, title: "Custom Notifications", description: "Set different alerts for different contacts and groups." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-x-hidden">
      {/* Navigation */}

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Connect <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Instantly</span> with Friends & Family
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Experience seamless messaging with end-to-end encryption, HD video calls, and intuitive group chats.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/sign-up">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-6">
                  Start Messaging Free
                </Button>
              </Link>
              <Button variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 border-gray-600 hover:bg-gray-800">
                <Smartphone className="mr-2" /> Download App
              </Button>
            </div>
            
            <div className="pt-6 flex items-center space-x-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center border-2 border-gray-800">
                    <span className="text-xs font-bold">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-400">
                Join <span className="text-blue-400">5M+</span> users worldwide
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-40"></div>
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-30"></div>
            
            <div className="relative bg-gray-800 border border-gray-700 rounded-2xl shadow-xl overflow-hidden">
              {/* Chat header */}
              <div className="p-4 border-b border-gray-700 bg-gray-800 flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="font-bold">S</span>
                </div>
                <div className="ml-3">
                  <div className="font-semibold">Sarah Johnson</div>
                  <div className="text-xs text-green-400 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-400 mr-1"></div>
                    Online
                  </div>
                </div>
              </div>
              
              {/* Chat messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-4">
                <div className="flex justify-start">
                  <div className="bg-gray-700 rounded-2xl rounded-tl-none px-4 py-2 max-w-xs">
                    <p>Hey there! Are we still meeting tomorrow?</p>
                    <p className="text-xs text-gray-400 mt-1">10:24 AM</p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl rounded-tr-none px-4 py-2 max-w-xs">
                    <p>Yes! 7 PM at the coffee shop. Can&apos;t wait!</p>
                    <p className="text-xs text-blue-100 mt-1">10:25 AM</p>
                  </div>
                </div>
                
                <div className="flex justify-start">
                  <div className="bg-gray-700 rounded-2xl rounded-tl-none px-4 py-2 max-w-xs">
                    <p>Perfect! I&apos;ll bring the design mockups for our project.</p>
                    <p className="text-xs text-gray-400 mt-1">10:26 AM</p>
                  </div>
                </div>
                
                <div className="flex justify-start">
                  <div className="flex space-x-2">
                    <div className="bg-gray-700 rounded-2xl rounded-tl-none p-2">
                      <ImageIcon className="text-gray-300" />
                    </div>
                    <div className="bg-gray-700 rounded-2xl rounded-tl-none p-2">
                      <File className="text-gray-300" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl rounded-tr-none px-4 py-2 max-w-xs">
                    <p>Great! I&apos;ve attached the meeting agenda 📎</p>
                    <p className="text-xs text-blue-100 mt-1">10:28 AM</p>
                  </div>
                </div>
              </div>
              
              {/* Message input */}
              <div className="p-3 border-t border-gray-700 flex items-center">
                <div className="flex-1 bg-gray-700 rounded-full pl-4 pr-2 py-2 flex items-center">
                  <input 
                    type="text" 
                    placeholder="Type a message..." 
                    className="bg-transparent border-none focus:outline-none flex-1"
                  />
                  <div className="flex space-x-2">
                    <button className="p-1.5 rounded-full hover:bg-gray-600">
                      <Smile />
                    </button>
                    <button className="p-1.5 rounded-full hover:bg-gray-600">
                      <ImageIcon />
                    </button>
                  </div>
                </div>
                <button className="ml-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-3">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Seamless Communication</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to stay connected with friends, family, and colleagues
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`bg-gray-800 border rounded-2xl p-6 transition-all duration-300 hover:border-blue-500 cursor-pointer ${activeFeature === index ? 'border-blue-500' : 'border-gray-700'}`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="text-blue-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Your Privacy is Our <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Top Priority</span>
              </h2>
              <p className="text-gray-300 mb-8">
                We implement industry-leading security measures to ensure your conversations remain private and secure.
              </p>
              
              <div className="space-y-6">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg mt-1">
                      {feature.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-30"></div>
              
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <div className="text-xl font-bold">Security Center</div>
                    <div className="text-green-400 text-sm flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                      All systems secure
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-2">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Encryption Status</span>
                      <span className="text-green-400">Active</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-green-400 w-full"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Privacy Controls</span>
                      <span className="text-green-400">Enabled</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 w-full"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Data Protection</span>
                      <span className="text-green-400">Optimal</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-blue-500 w-full"></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">Two-Factor Authentication</div>
                      <div className="text-gray-400 text-sm">Add an extra layer of security</div>
                    </div>
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600">Enable</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-gray-800/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Users Say</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join millions of satisfied users who have transformed their communication experience
            </p>
          </div>
          
          <Carousel plugins={[Autoplay({ delay: 5000 })]}>
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="p-4">
                  <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-xl font-bold">{testimonial.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="font-bold text-lg">{testimonial.name}</div>
                        <div className="text-gray-400">{testimonial.role}</div>
                      </div>
                      <div className="ml-auto flex text-yellow-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-lg italic">&quot;{testimonial.content}&quot;</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        <div className="max-w-4xl mx-auto relative text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Messaging Experience?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join millions of users enjoying secure, fast, and intuitive communication.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/sign-up">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-6">
                Start Messaging Free
              </Button>
            </Link>
            <Button variant="outline" className="text-lg px-8 py-6 border-gray-600 hover:bg-gray-800">
              <Smartphone className="mr-2" /> Download App
            </Button>
          </div>
          
          <div className="mt-10 flex justify-center space-x-6">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">5M+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">99.9%</div>
              <div className="text-gray-400">Uptime</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">24/7</div>
              <div className="text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                  <MessageCircle className="text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Connectify</span>
              </div>
              <p className="text-gray-400 mb-4">
                Secure messaging for everyone. Connect instantly with friends and family.
              </p>
              <div className="flex space-x-4">
                {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
                  <div key={social} className="bg-gray-800 hover:bg-gray-700 rounded-full p-2 cursor-pointer transition-colors">
                    <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-blue-400 cursor-pointer transition-colors">Messaging</li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">Video Calls</li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">Group Chats</li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">File Sharing</li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">Stickers & GIFs</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-blue-400 cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">Blog</li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">Press</li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">Contact</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Download</h3>
              <div className="space-y-4">
                <Button className="w-full bg-gray-800 hover:bg-gray-700 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.701z"/>
                  </svg>
                  App Store
                </Button>
                <Button className="w-full bg-gray-800 hover:bg-gray-700 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908z" />
                  </svg>
                  Google Play
                </Button>
                <Button className="w-full bg-gray-800 hover:bg-gray-700 flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Web Version
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>© 2023 Connectify Messenger. All rights reserved.</p>
            <div className="mt-2 flex justify-center space-x-6">
              <span className="hover:text-gray-300 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-gray-300 cursor-pointer">Terms of Service</span>
              <span className="hover:text-gray-300 cursor-pointer">Cookie Policy</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}