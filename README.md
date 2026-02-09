<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/17VsMfcrDh7GKY4-7r864lgThPjeJ87CW

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

🥗 Stomach Strategist | Full Stack Nutrition
The Biological System Engineer for your Buffet Strategy.

Built with Gemini 3 Pro, this application treats your digestive system like a production environment. It uses multimodal vision to perform a "Code Review" of your food, identifying technical debt (bloat/lactose) and defining an execution plan for your plate.

🚀 The Vision
Most nutrition apps are reactive. Stomach Strategist is proactive. By analyzing a photo of a food spread, the AI calculates "Heap Allocation" (Stomach Capacity) and "Incompatible Dependencies" (Allergies) before you even pick up a fork.

🛠️ Tech Stack
Model: Gemini 3 Pro Preview (Multimodal High-Reasoning)

Frontend: React, TypeScript, Tailwind CSS

Styling: Fira Code (Monospace) for a terminal-inspired UI

State Management: Real-time user profile configuration (Lactose, Gluten, Soy, etc.)

✨ Key Features
Static Analysis (Vision): Identifies dishes and detects hidden "bugs" like dairy or high-volume fillers (bread/pastries).

The Verdict: Categorizes food into Green Light (Safe), Yellow Light (Warning), and Red Light (Avoid) based on your unique bio-config.

Deployment Checklist: Provides a step-by-step "Eat Order" to maximize nutrient throughput and minimize system crashes (bloating).

Capacity Slider: Adjusts recommendations based on your real-time "Current System Load" (Hunger Level).

📂 Project Structure
TypeScript
src/
├── components/
│   ├── ProfileForm.tsx    // Configures user hardware specs (Age, Sensitivities)
│   ├── ResultView.tsx     // Renders the 'Code Review' & 'System Forecast'
│   └── TacticalAdvice.tsx // The step-by-step Execution Plan
├── services/
│   └── geminiService.ts   // The bridge to the Gemini 3 Pro Reasoning Engine
└── types.ts               // Strict typing for nutritional payloads

🔧 Installation & Setup
Clone the repo: git clone https://github.com/yourusername/stomach-strategist.git

Install dependencies: npm install

Configure API Key: Add your Google AI Studio API Key to a .env file.

Deploy Localhost: npm run dev

📝 The "Full Stack" Prompt
The core of this app is a specialized System Instruction that forces Gemini to view human biology as a developer:

"Perform a Code Review on the uploaded food payload. Identify modules (dishes) and detect technical debt (sugar/cream)... Determine 'Next Morning Comfort Score'."
