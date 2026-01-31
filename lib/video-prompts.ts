export function generateVideoScriptPrompt(seriesData: any) {
    return `
    You are an expert video script writer. Generate a short video script for a "${seriesData.niche_type}" video details:
    - Series Name: ${seriesData.series_name}
    - Specific Niche: ${seriesData.selected_niche || seriesData.custom_niche}
    - Video Style: ${seriesData.selected_video_style_id}
    - Target Duration: ${seriesData.duration}

    Requirements:
    1. Create a compelling, natural-sounding script. NO raw text, strictly JSON.
    2. Generate visual image prompts for each scene.
    3. If duration is "30-40 seconds", generate exactly 4-5 image prompts.
    4. If duration is "60-70 seconds", generate exactly 5-6 image prompts.
    5. The output must be valid JSON in the following format:
    {
      "title": "Video Title",
      "script": "Full voiceover script text here...",
      "scenes": [
        {
          "scene_number": 1,
          "visual_prompt": "Detailed AI image generation prompt for this scene",
          "voiceover_sentence": "Corresponding sentence from the script for this scene"
        }
      ]
    }
  `;
}
