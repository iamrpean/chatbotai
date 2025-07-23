# 🧠 AI Chatbot Automation with n8n, Pinecone, and Xendit

**Live URL:** [https://chatbotai-beige.vercel.app](https://chatbotai-beige.vercel.app)  
**Status:** 🚧 *Free Tier Limitations (Gemini 1.5 Pro)*  
**Main Features:** RAG (Retrieval-Augmented Generation), Webhook Automation, Vector Search, Order + Payment Automation

---

## 🚀 JSON Automation (n8n Workflow)

The full automation workflow is available in the `Chatbot.json` file, which can be imported into [n8n](https://n8n.io).

---

## 📌 Project Overview

This project is an AI-powered chatbot for the digital pharmacy **Cepat Sehat**, built using **n8n** and integrated with **LLMs** (Gemini/OpenAI), **Pinecone** for vector-based RAG, **Supabase** for database management, and **Xendit** for payment processing.

---

## 💡 Objectives & Benefits

- Deliver fast, contextual AI-generated responses to pharmacy-related queries.
- Allow customers to place pharmacy orders directly through the chatbot.
- Automate the workflow from conversation → order creation → payment generation.
- Showcase the potential of RAG (Retrieval-Augmented Generation) using low-code architecture with a clean, modular flow.

---

## ⚙️ Technologies & Tools

| Component        | Technology                          |
|------------------|-------------------------------------|
| Automation Engine| [n8n](https://n8n.io)               |
| AI Model         | Gemini 1.5 Pro (Google AI)          |
| Vector Store     | [Pinecone](https://www.pinecone.io) |
| Payment Gateway  | [Xendit](https://xendit.co)         |
| Frontend Hosting | [Vercel](https://vercel.com) (Static site, generated using `v0`) |
| Database         | [Supabase](https://supabase.io)     |
| LLM Agent Logic  | Custom prompt agent + JSON parsing  |
| UI/UX            | Minimal interface via Webhook + vibe-code-style |

---

## 🔄 Workflow Overview

### 1. 🔍 RAG for Pharmacy-Related Questions
- Customer input is processed by the AI agent.
- Relevant vector data is retrieved from Pinecone.
- The AI model uses the retrieved context to generate a precise response.

**Vector source files:**
- `pharmacy_payment.jsonl`
- `pharmacy_items.jsonl`
- `pharmacy_delivery.jsonl`
- `ai_pharmacy_behavior.jsonl`

---

### 2. 🛒 Order Intent Detection & Processing
- The system detects whether the customer's intent is to place an order.
  - If the customer does not exist → create a new entry.
  - If the customer exists → reuse existing record.
- Order input is validated and parsed.
- Order data is stored in Supabase (`orders` table).

---

### 3. 💳 Xendit Payment Integration
- After the order is created:
  - A payment session is generated via the Xendit API.
  - A secure payment link is returned to the customer for checkout.

---

## 🧩 Flow Design: Modular & Scalable

Each part of the n8n flow is organized into logical modules:

- **Intent Validation Node** → Parses AI output to determine order or question intent.
- **Vector Search Node** → Connects to Pinecone to fetch relevant context.
- **Customer Management Node** → Creates or retrieves customer records.
- **Order Creation Node** → Validates and saves order with pricing logic.
- **Payment Node** → Interacts with Xendit to generate session and payment link.
- **Logging Node** → Archives full conversation and order to Supabase.

---

## 🧪 Challenges & Limitations

- ⚠️ **Gemini Free Tier is limited**: Response quality may degrade once usage limits are reached.
- ❌ **Stock quantity is not yet updated** automatically after a successful order.
- 🔐 **Phone/email validation** is not yet integrated.
- 🛒 **Product stock API** is not yet available in real-time.

---

## 🔮 Future Improvements

- 🔁 Auto-update product stock after payment confirmation (using Xendit callback).
- 🧠 Fallback to OpenAI API when Gemini quota is exhausted.
- 📱 Expand support to WhatsApp and Telegram for multichannel communication.
- 💊 AI-based consultation or prescription service integration.

---

## 🧠 Sample Prompt for AI Agent

```json
You are a helpful and friendly pharmacy assistant for **Cepat Sehat**, a digital clinic in **Bali and Jakarta**, responding to customers via **WhatsApp**.

You always use warm and simple language in **Bahasa Indonesia, English, or French**, depending on the customer's language.

[Output Format - JSON ONLY]
{
  "isOrder": boolean,
  "orderData": { ... },
  "message": "[Your helpful response here]"
}
