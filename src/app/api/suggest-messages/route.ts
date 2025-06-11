// import OpenAI from 'openai';
// import { OpenAIStream, StreamingTextResponse } from 'ai';
// import { NextResponse } from 'next/server';

// export const runtime = 'edge';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY!,
// });

// export async function POST(req: Request) {
//   const prompt =
//     "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

//   try {
//     const response = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       max_tokens: 400,
//       stream: true,
//       messages: [{ role: 'system', content: prompt }],
//     });

//     const stream = OpenAIStream(response);
//     return new StreamingTextResponse(stream);
//   } catch (error: any) {
//     console.error('OpenAI error:', error);
//     return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
//   }
// }








// import OpenAI from 'openai';
// import { NextResponse } from 'next/server';

// export const runtime = 'edge';

// // OpenRouter client initialization
// const openai = new OpenAI({
//   baseURL: 'https://openrouter.ai/api/v1',           // OpenRouter ka base URL
//   apiKey: process.env.OPENROUTER_API_KEY!,            // OpenRouter API key env variable se
//   defaultHeaders: {
//     'HTTP-Referer': 'https://yourwebsite.com',        // Optional: apni site ka URL
//     'X-Title': 'Your Site Name',                       // Optional: apni site ka naam
//   },
// });

// export async function POST(req: Request) {
//   console.log('API route hit');

//   const prompt = `Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.`;

//   try {
//     console.log('Sending request to OpenRouter AI...');

//     const response = await openai.chat.completions.create({
//       model: 'openai/gpt-4o',       // OpenRouter ke supported model name
//       messages: [{ role: 'user', content: prompt }],
//       max_tokens: 400,
//     });

//     console.log('API Key (partial):', process.env.OPENROUTER_API_KEY?.slice(0, 8) + '...');
//     console.log('Response received:', response);

//     const content = response.choices[0].message?.content || 'No content';
//     console.log('Response:', content);

//     return NextResponse.json({ result: content });
//   } catch (error: any) {
//     console.error('OpenRouter error:', error);
//     return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
//   }
// }














import { NextResponse } from 'next/server';

export const runtime = 'edge';

// ✅ 100+ hardcoded suggested messages (sample 20 shown here for brevity)
const predefinedMessages: string[] = [
  "What’s a hobby you’ve recently started?",
  "If you could have dinner with any historical figure, who would it be?",
  "What’s a simple thing that makes you happy?",
  "What’s your favorite way to relax after a long day?",
  "If you could instantly learn any skill, what would it be?",
  "What’s a memorable trip you’ve taken and why?",
  "What’s a book or movie that changed your perspective?",
  "If you could live in any fictional world, which would it be?",
  "What’s a goal you’re currently working towards?",
  "What’s something new you tried recently and enjoyed?",
  "If you could only eat one meal for the rest of your life, what would it be?",
  "What’s one habit you’re proud of building?",
  "If you could master one instrument instantly, which one and why?",
  "What’s your favorite childhood memory?",
  "What’s something small that always makes your day better?",
  "If you had to teach a class on one thing, what would it be?",
  "What does your ideal weekend look like?",
  "If you could visit any time period, when would it be and why?",
  "What’s a fictional character you relate to and why?",
  "What motivates you when you're feeling low?"
  // 🔁 Add more here...
];

// ✅ Utility to randomly select messages
function getRandomMessages(count = 3): string[] {
  const shuffled = [...predefinedMessages].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// ✅ API Route Handler (POST only)
export async function POST(req: Request) {
  try {
    console.log('🎯 /api/suggest-messages hit');

    const messages = getRandomMessages(3);
    const result = messages.join('||');

    console.log('✅ Returning messages:', result);

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error('❌ Error generating messages:', error);
    return NextResponse.json(
      { error: 'Failed to generate messages' },
      { status: 500 }
    );
  }
}

// (Optional) Prevent GET requests if this route is POST-only
export async function GET() {
  return NextResponse.json(
    { error: 'GET not allowed. Use POST instead.' },
    { status: 405 }
  );
}
