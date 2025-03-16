// Load environment variables using dotenv
require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const http = require('http');

// Load environment variables
const BOT_TOKEN = process.env.BOT_TOKEN; // Your bot token
const CHANNEL_ID = process.env.CHANNEL_ID; // Your channel ID
const API_KEY = process.env.API_KEY; // Your API key for the TikTok downloader

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Map to store download URLs temporarily
const downloadUrls = new Map();

// Function to generate a unique filename
function generateUniqueFilename(userId, url, fileType) {
  const hash = crypto.createHash('sha256').update(url).digest('hex'); // Hash the URL
  const timestamp = Date.now(); // Add a timestamp
  return `${userId}_${hash}_${timestamp}.${fileType}`; // Combine user ID, hash, and timestamp
}

// Function to check if a user is a member of the channel
async function isUserSubscribed(chatId, userId) {
  try {
    const chatMember = await bot.getChatMember(CHANNEL_ID, userId);
    return ['member', 'administrator', 'creator'].includes(chatMember.status);
  } catch (error) {
    console.error('Error checking channel membership:', error);
    return false;
  }
}

// Function to fetch TikTok video details
async function fetchTikTokDetails(url) {
  try {
    const apiUrl = `https://api.skymansion.site/tiktok-dl/download/?&api_key=${API_KEY}&url=${encodeURIComponent(url)}`;
    console.log('API URL:', apiUrl); // Log the API URL

    const response = await axios.get(apiUrl);
    console.log('API Response:', response.data); // Log the API response

    return response.data; // Return the API response
  } catch (error) {
    console.error('Error fetching TikTok details:', error.response ? error.response.data : error.message);
    return null;
  }
}

// Function to download a file from a URL with retries
async function downloadFileWithRetry(url, filePath, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios({
        url,
        responseType: 'stream',
        timeout: 30000, // 30 seconds timeout
      });

      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error);
      if (i === retries - 1) throw error; // Throw error after last retry
    }
  }
}

// Listen for any message
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = msg.text;

  // Check if the user is subscribed to the channel
  const isSubscribed = await isUserSubscribed(chatId, userId);

  if (!isSubscribed) {
    // If not subscribed, send a message asking them to join
    bot.sendMessage(
      chatId,
      `Please subscribe to the channel to use this bot.`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Join Channel',
                url: `https://t.me/${CHANNEL_ID.replace('@', '')}`,
              },
            ],
          ],
        },
      }
    );
    return;
  }

  // Validate the TikTok URL
  const tiktokUrlPattern = /https?:\/\/(www\.|vm\.|m\.)?tiktok\.com\/(.+)/;
  if (!tiktokUrlPattern.test(text)) {
    bot.sendMessage(chatId, 'Please send a valid TikTok video URL.');
    return;
  }

  // Fetch TikTok video details
  bot.sendMessage(chatId, 'Processing your request...');
  const apiResponse = await fetchTikTokDetails(text);

  if (apiResponse && apiResponse.Title) {
    // Send the video details and buttons
    const message = `
*${apiResponse.Title}*

Creator: ${apiResponse.Creator}
Duration: ${apiResponse.Duration}
Date: ${apiResponse.Date}
    `;

    // Send the image
    await bot.sendPhoto(chatId, apiResponse.img, {
      caption: message,
      parse_mode: 'Markdown',
    });

    // Generate unique IDs for each download option
    const hdvwId = `hdvw_${Date.now()}`;
    const hdvId = `hdv_${Date.now()}`;
    const mp3Id = `mp3_${Date.now()}`;

    // Store the download URLs in memory
    if (apiResponse.download_options.hdvw && apiResponse.download_options.hdvw.url) {
      downloadUrls.set(hdvwId, {
        url: apiResponse.download_options.hdvw.url,
        userId: userId,
      });
    }
    if (apiResponse.download_options.hdv && apiResponse.download_options.hdv.url) {
      downloadUrls.set(hdvId, {
        url: apiResponse.download_options.hdv.url,
        userId: userId,
      });
    }
    if (apiResponse.download_options.mp3 && apiResponse.download_options.mp3.url) {
      downloadUrls.set(mp3Id, {
        url: apiResponse.download_options.mp3.url,
        userId: userId,
      });
    }

    // Send the buttons for download options
    const buttons = [];
    if (downloadUrls.has(hdvwId)) {
      buttons.push([
        {
          text: 'With Watermark (HD)',
          callback_data: hdvwId,
        },
      ]);
    }
    if (downloadUrls.has(hdvId)) {
      buttons.push([
        {
          text: 'Without Watermark (HD)',
          callback_data: hdvId,
        },
      ]);
    }
    if (downloadUrls.has(mp3Id)) {
      buttons.push([
        {
          text: 'Download MP3',
          callback_data: mp3Id,
        },
      ]);
    }

    // Send the buttons
    if (buttons.length > 0) {
      bot.sendMessage(chatId, 'Choose a download option:', {
        reply_markup: {
          inline_keyboard: buttons,
        },
      });
    } else {
      bot.sendMessage(chatId, 'No download options available.');
    }
  } else {
    bot.sendMessage(chatId, 'Failed to fetch TikTok video details. Please try again.');
  }
});

// Listen for button clicks
bot.on('callback_query', async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const userId = callbackQuery.from.id;
  const data = callbackQuery.data;

  // Retrieve the download URL and user ID from memory
  const downloadInfo = downloadUrls.get(data);

  if (downloadInfo) {
    const { url, userId: storedUserId } = downloadInfo;

    // Ensure the user ID matches (to prevent unauthorized access)
    if (userId !== storedUserId) {
      await bot.answerCallbackQuery(callbackQuery.id, { text: 'Unauthorized access.' });
      return;
    }

    try {
      // Delete the "Choose a download option" message and buttons
      await bot.deleteMessage(chatId, callbackQuery.message.message_id);

      // Show typing indicator (animated)
      await bot.sendChatAction(chatId, 'typing');

      // Notify the user that the file is being downloaded
      const downloadingMessage = await bot.sendMessage(chatId, '📥 *Downloading...*', {
        parse_mode: 'Markdown',
      });

      // Determine the file type based on the callback_data
      const fileType = data.startsWith('mp3') ? 'mp3' : 'mp4';

      // Generate a unique filename
      const fileName = generateUniqueFilename(userId, url, fileType);
      const filePath = path.join(__dirname, fileName);

      // Download the file with retries
      await downloadFileWithRetry(url, filePath);

      // Update the message to "Uploading..."
      await bot.editMessageText('📤 *Uploading...*', {
        chat_id: chatId,
        message_id: downloadingMessage.message_id,
        parse_mode: 'Markdown',
      });

      // Show typing indicator (animated)
      await bot.sendChatAction(chatId, 'upload_video'); // or 'upload_audio' for MP3

      // Send the file to the user
      if (fileType === 'mp3') {
        await bot.sendAudio(chatId, filePath); // Send the file path instead of a buffer
      } else {
        await bot.sendVideo(chatId, filePath); // Send the file path instead of a buffer
      }

      // Delete the "Uploading..." message
      await bot.deleteMessage(chatId, downloadingMessage.message_id);

      // Delete the downloaded file
      fs.unlinkSync(filePath);

      // Remove the URL from memory
      downloadUrls.delete(data);
    } catch (error) {
      console.error('Error downloading or sending file:', error);
      bot.sendMessage(chatId, 'Failed to download the file. Please try again.');
    }
  } else {
    bot.sendMessage(chatId, 'Invalid download option. Please try again.');
  }
});

// Start the bot and HTTP server
const PORT = process.env.PORT || 8000;
const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Bot is running...');
});
