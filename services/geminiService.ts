import { GoogleGenAI, Chat } from "@google/genai";
import { FeatureType } from '../types';

// Initialize the Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getSystemInstruction = (feature: FeatureType): string => {
  switch (feature) {
    case FeatureType.CONTENT_ASSISTANT:
      return `You are the "NFSU Social Assistant".
      Your Goal: Help Students and Alumni draft engaging content for the NFSU Social platform.
      
      Capabilities:
      1. **Newsletter Posts**: Help students write exciting updates about campus events, achievements, or general news. Make it engaging and professional.
      2. **Job Descriptions**: Help Alumni draft clear, professional job postings. Include Role, Company, Key Requirements, and "How to Apply" sections.
      3. **Verification Check**: Remind users that all posts must be verified by an Admin before going live.
      
      Tone: Professional, helpful, and community-focused.`;

    default:
      return "You are a helpful assistant for NFSU Social.";
  }
};

export const createChatSession = (feature: FeatureType): Chat => {
  const instruction = getSystemInstruction(feature);
  
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: instruction,
    }
  });
};
