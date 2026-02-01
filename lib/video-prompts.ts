export function generateVideoScriptPrompt(seriesData: any) {
  const language = seriesData.language_name || "English";
  const hasDescription = seriesData.description && seriesData.description.trim().length > 0;
  const duration = seriesData.duration || "60-70";

  // Determine word count based on duration (rough estimate: 150 words per minute for narration)
  const wordCount = duration.includes("30-50")
    ? "75-120 words"
    : "140-180 words";

  return `
    You are an expert video script writer. Generate a FULL-LENGTH video script for a "${seriesData.niche_type}" video with the following details:
    - Series Name: ${seriesData.series_name}
    ${hasDescription ? `- Description/Context: ${seriesData.description}` : ''}
    - Specific Niche: ${seriesData.selected_niche || seriesData.custom_niche}
    - Video Style: ${seriesData.selected_video_style_id}
    - **TARGET DURATION: ${duration} seconds** (CRITICAL: Script MUST be long enough for this duration)
    - **REQUIRED WORD COUNT: ${wordCount}** (This is MANDATORY to match the duration)
    - Language: ${language}

    CRITICAL Requirements:
    1. ALL content MUST be generated in ${language} language
    2. Both "visual_prompt" and "voiceover_sentence" MUST be written in ${language}
    3. The "script" field MUST be the complete voiceover in ${language}
    4. **DURATION REQUIREMENT**: The script MUST be long enough to fill ${duration} seconds when spoken
    5. **WORD COUNT**: Script must contain approximately ${wordCount} to ensure proper duration
    6. Create a compelling, natural-sounding, DETAILED script${hasDescription ? ' based on the provided description' : ''}
    7. Do NOT create short summaries - create FULL, DETAILED scripts with proper storytelling
    8. Generate visual image prompts for each scene
    9. If duration is "30-50 seconds", generate exactly 4-5 scenes with detailed narration
    10. If duration is "60-70 seconds", generate exactly 5-6 scenes with detailed narration
    11. Each scene should have substantial voiceover content (NOT single sentences)
    12. The output must be valid JSON in the following format (NO markdown, NO raw text):
    {
      "title": "Video Title in ${language}",
      "script": "Full, detailed voiceover script in ${language} with ${wordCount}. This should be a complete, engaging narrative that fills the entire ${duration} seconds when spoken aloud.",
      "scenes": [
        {
          "scene_number": 1,
          "visual_prompt": "Detailed AI image generation prompt in ${language}",
          "voiceover_sentence": "SUBSTANTIAL narration for this scene in ${language} - NOT just one sentence, but enough content to fill proper time"
        }
      ]
    }
    
    REMEMBER: The script must be LONG and DETAILED enough to fill ${duration} seconds. Do not create short scripts!
  `;
}
