# AI Video Generator, Scheduler & Publisher 🚀

**[vidMaxx](https://vidmaxx-rho.vercel.app/)** is an advanced AI-powered platform that automates the creation, scheduling, and publishing of short-form video content for social media. It leverages a suite of cutting-edge AI models to generate scripts, voices, images, and captions, stitching them together into high-quality videos ready for platforms like YouTube Shorts, TikTok, and Instagram Reels.

## ✨ Features

- **🤖 AI Script Generation**: Powered by **Google Gemini Pro**. Generates engaging, viral-worthy scripts tailored to your specific niche and audience.
- **🎨 AI Image Generation**: Powered by **Pollinations AI** (Flux Model). Creates stunning, consistent visuals for each scene.
- **🗣️ AI Voiceover**: 
  - **Deepgram Aura**: For ultra-fast, human-like text-to-speech.
  - **FonadaLabs**: Targeted voice models for specific regional or stylistic needs.
- **📝 Smart Captions**: Powered by **Deepgram**. Automatically generates energetic, word-level synced captions (SRT) to boost viewer retention.
- **🎬 Cloud Video Rendering**: Powered by **AWS Lambda** (via Remotion). Serverless, scalable video rendering that assembles all assets into a polished MP4.
- **📅 Smart Scheduling**: Powered by **Inngest**. Define your content schedule once, and the system handles the rest—generating and publishing videos on autopilot.
- **📧 Notifications**: Powered by **Plunk**. Get notified via email instantly when your video is ready.
- **� Billing & Subscriptions**: Powered by **Clerk**. Seamlessly manage subscription plans (Free, Pro) and billing history.
- **�🔒 Secure Authentication**: Powered by **Clerk**. Robust user management and access control.
- **💾 Scalable Infrastructure**: Powered by **Supabase**. Handles database, file storage for assets, and real-time updates.

## 🪄 How It Works

1.  **Connect Social Accounts**: Link your YouTube, TikTok, and Instagram accounts to enable auto-publishing.
2.  **Start a New Series**: Create a series to organize your content themes (e.g., "Daily Facts").
3.  **Choose Your Niche**: Select a pre-defined niche or define your own to tailor the AI generation.
4.  **Select Language & Voice**: Pick the target language and the perfect AI voice persona.
5.  **Background Music**: Choose a backing track that fits your content's mood.
6.  **Video Style**: Select a visual aesthetic (e.g., Minimalist, Cinematic) for the AI image generator.
7.  **Caption Style**: Customize the font, color, and animation of your subtitles.
8.  **Series Details & Schedule**: Set the description, video duration, and publishing schedule.
9.  **Generate & Publish**: Click "Generate", and the system handles the rest—creating and posting your video automatically.

## 🛠️ Technologies

### Core Frameworks
- **Next.js 16**: The React framework for the web.
- **React 19**: Latest React features for building user interfaces.
- **TypeScript**: Static type checking for robust code.

### UI & Styling
- **Tailwind CSS 4**: Utility-first CSS framework for rapid UI development.
- **Shadcn/UI**: Reusable components built with **Radix UI** and Tailwind.
- **Framer Motion**: Production-ready animation library for React.
- **Lucide React**: Beautiful & consistent icons.

### AI & Media Processing
- **@google/genai**: Integration with Gemini API.
- **Pollinations AI**: AI image generation.
- **Deepgram**: AI voice generation.    
- **Deepgram Aura**: AI text-to-speech. 
- **Remotion**: Framework for creating videos programmatically with React.

### Backend & Infrastructure
- **Supabase**: Open source Firebase alternative (Postgres DB, Auth, Storage).
- **Inngest**: Event-driven queue and background job management.
- **Clerk**: Authentication and user management.
- **Vercel** (Recommended): hosting and deployment.

## 🚀 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/fl9mdasif/ai-short-vid-generator-and-social-schedule-publisher.git
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up Environment Variables**:
    Create a `.env.local` file and add your keys for:
    - Clerk (NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY)
    - Supabase (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    - OpenAI / Gemini (GEMINI_API_KEY)
    - Replicate (REPLICATE_API_TOKEN)
    - Deepgram (DEEPGRAM_API_KEY)
    - Inngest (INNGEST_EVENT_KEY, INNGEST_SIGNING_KEY)
    - Plunk (PLUNK_API_KEY)
    - AWS (for Remotion Lambda)

    Create a `.env` file and add your keys for:
    - REMOTION_AWS_SECRET_ACCESS_KEY
    - REMOTION_AWS_ACCESS_KEY_ID

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  **Start Inngest (for background jobs)**:
    ```bash
    npx inngest-cli@latest dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
