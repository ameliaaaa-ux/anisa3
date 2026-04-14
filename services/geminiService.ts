
import { GoogleGenAI, Type } from "@google/genai";
import { Artist } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const CACHE_PREFIX = "amusic_cache_";
const CACHE_EXPIRY = 1000 * 60 * 60 * 24; // 24 hours

const artistSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    genre: { type: Type.STRING },
    bio: { type: Type.STRING, description: "A comprehensive and detailed biography. Must be at least 300 words long." },
    origin: { type: Type.STRING },
    activeSince: { type: Type.STRING },
    officialUrl: { type: Type.STRING },
    instagramUrl: { type: Type.STRING },
    twitterUrl: { type: Type.STRING },
    imageUrl: { 
      type: Type.STRING, 
      description: "A DIRECT, HIGH-RESOLUTION link to a professional portrait or profile photo of the artist (.jpg, .png)." 
    },
    themeColor: { type: Type.STRING, description: "A hex color code for the artist's brand." },
    stats: {
      type: Type.OBJECT,
      properties: {
        monthlyListeners: { type: Type.STRING },
        globalRank: { type: Type.STRING },
        followers: { type: Type.STRING },
      },
      required: ["monthlyListeners", "globalRank", "followers"]
    },
    popularTracks: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          duration: { type: Type.STRING },
          year: { type: Type.NUMBER },
          streams: { type: Type.STRING }
        },
        required: ["title", "duration", "year"]
      }
    },
    albums: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          year: { type: Type.NUMBER },
          coverUrl: { type: Type.STRING },
          description: { type: Type.STRING }
        },
        required: ["title", "year", "coverUrl"]
      }
    },
    achievements: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          award: { type: Type.STRING },
          year: { type: Type.NUMBER },
          category: { type: Type.STRING }
        },
        required: ["award", "year"]
      }
    },
    news: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING },
          date: { type: Type.STRING },
          excerpt: { type: Type.STRING },
          category: { type: Type.STRING }
        },
        required: ["title", "date", "excerpt"]
      }
    }
  },
  required: ["name", "genre", "bio", "officialUrl", "imageUrl", "popularTracks", "albums", "stats", "themeColor"]
};

export const fetchArtistData = async (artistName: string): Promise<Artist> => {
  const cacheKey = `${CACHE_PREFIX}${artistName.toLowerCase().replace(/\s/g, '_')}`;
  
  // Try to get from cache first
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_EXPIRY) {
        console.log(`Loading ${artistName} from cache...`);
        return data;
      }
    } catch (e) {
      localStorage.removeItem(cacheKey);
    }
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Search the web for up-to-date information about: "${artistName}". 
      Return accurate stats for 2025, a high-res portrait URL, and a 300+ word biography in JSON.`,
      config: {
        tools: [{googleSearch: {}}],
        responseMimeType: "application/json",
        responseSchema: artistSchema,
      },
    });

    if (!response.text) throw new Error("Empty AI response");

    const data = JSON.parse(response.text);
    
    // Save to cache
    localStorage.setItem(cacheKey, JSON.stringify({
      data,
      timestamp: Date.now()
    }));

    return data;
  } catch (error) {
    console.error("Error fetching artist data:", error);
    throw error;
  }
};
