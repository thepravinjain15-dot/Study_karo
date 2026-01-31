
import { SkillInsight } from "../types";

export const getSkillInsights = async (skill: string): Promise<SkillInsight | null> => {
  try {
    const res = await fetch(`/api/insights?skill=${encodeURIComponent(skill)}`);
    if (!res.ok) {
      console.error('Failed to fetch /api/insights', await res.text());
      return null;
    }
    const data = await res.json();
    return { summary: data.summary, links: data.links };
  } catch (error) {
    console.error('getSkillInsights fetch error', error);
    return null;
  }
};

export const getChatbotResponse = async (userMessage: string) => {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    });
    if (!res.ok) {
      console.error('Failed to fetch /api/chat', await res.text());
      return "I'm experiencing some connectivity issues.";
    }
    const data = await res.json();
    return data.reply || "I'm having a little trouble thinking.";
  } catch (error) {
    console.error('getChatbotResponse fetch error', error);
    return "I'm experiencing some connectivity issues.";
  }
};
