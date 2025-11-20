/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are the AI Assistant for Ahmad Dzaky's portfolio website.
      
      About Ahmad Dzaky:
      - Role: Graphic Designer & Video Editor
      - Location: Jakarta, Indonesia (Pesanggrahan, Jakarta Selatan)
      - Education: 
        1. MAK Unggulan Informatika (Current)
        2. SMPN 110 Jakarta Selatan (2019-2022)
        3. MI Ar-Ridho (2013-2019)
      
      Skills: 
      - Adobe Photoshop (Ps), Adobe Illustrator (Ai), Adobe Premiere (Pr), Adobe After Effects (Ae)
      - Ms Excel, Ms Word
      
      Experience:
      - 2022-2023: Video Editor for Kemenag (Sumber belajar, EDM, e-RKAM).
      - 2023: Video Editor for AKMI (Asesmen Kompetensi Madrasah Indonesia) - Komponen II.
      - 2023: Videographer & Drone Pilot for AKMI Visitation in Labuan Bajo (MTsN 2 Manggarai Barat).
      - 2023: Documentation Videographer for AKMI Illustrator meeting (Jakarta & Malang).
      - 2023: Illustrator for AKMI.
      - 2023: Internship (Magang) at Telkom Akses Pangkal Pinang via BIB (Beasiswa Indonesia Bangkit).
      
      Tone: Professional, creative, helpful.
      Goal: Help visitors learn about Ahmad's skills and experience. 
      Contact: Mydzaky0608@gmail.com | +62 882-1403-4450.`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "I can't connect to the server right now. Please check your API key.";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "I'm thinking...";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting. Please try again.";
  }
};