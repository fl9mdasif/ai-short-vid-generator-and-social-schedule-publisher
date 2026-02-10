export const generateVideoEmailTemplate = (
  videoUrl: string,
  thumbnailUrl: string,
  seriesName: string
) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f5; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .header { text-align: center; margin-bottom: 20px; }
    .thumbnail { width: 100%; border-radius: 8px; margin: 20px 0; }
    .button { display: inline-block; background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; }
    .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #71717a; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Your Video is Ready! 🎬</h2>
      <p>Great news! Your video "<strong>${seriesName}</strong>" has been successfully generated.</p>
    </div>
    
    <a href="${videoUrl}">
      <img src="${thumbnailUrl}" alt="Video Thumbnail" class="thumbnail" />
    </a>
    
    <div style="text-align: center;text-color: #ffffff; background-color: #00ba35ff;">
      <a href="${videoUrl}" class="button">Watch & Download Video</a>
    </div>
    
    <div class="footer">
      <p>Powered by AI Video Generator</p>
    </div>
  </div>
</body>
</html>
  `;
};
