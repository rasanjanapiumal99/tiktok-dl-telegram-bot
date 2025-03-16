# TikTok Downloader Telegram Bot

A modern and feature-rich Telegram bot to download TikTok videos without watermarks. Powered by the Skymansion TikTok Downloader API.

[![Telegram Bot](https://img.shields.io/badge/Telegram-Bot-blue.svg)](https://t.me/skymansiontiktok_bot)
[![API](https://img.shields.io/badge/API-Skymansion-brightgreen.svg)](https://api.skymansion.site/tiktok-dl/)
[![GitHub License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/rasanjanapiumal99/tiktok-dl-telegram-bot/blob/main/LICENSE)

---

## Features

- **Download TikTok Videos**: Download TikTok videos with or without watermarks.
- **MP3 Extraction**: Extract audio from TikTok videos in MP3 format.
- **Modern UI**: Interactive buttons and animated messages for a seamless user experience.
- **Powered by Skymansion**: Uses the Skymansion TikTok Downloader API for fast and reliable downloads.
- **User-Friendly**: Simple and intuitive commands for all users.

---

## Live Bot

Try the live bot here: [@skymansiontiktok_bot](https://t.me/skymansiontiktok_bot)

---

## Setup Instructions

### Prerequisites

1. **Node.js**: Ensure you have Node.js installed (v16 or higher).
2. **Telegram Bot Token**: Get your bot token from [BotFather](https://core.telegram.org/bots#botfather).
3. **Skymansion API Key**: Get your free API key from [Skymansion TikTok Downloader API](https://api.skymansion.site/tiktok-dl/).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rasanjanapiumal99/tiktok-dl-telegram-bot.git
   cd tiktok-dl-telegram-bot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   BOT_TOKEN=your_telegram_bot_token
   CHANNEL_ID=your_channel_id
   API_KEY=your_skymansion_api_key
   ```

4. Start the bot:
   ```bash
   npm start
   ```

---

## Usage

1. **Start the Bot**: Send `/start` to the bot.
2. **Send TikTok URL**: Share the TikTok video URL you want to download.
3. **Choose Download Option**: Select from the available options (With Watermark, Without Watermark, or MP3).

---

## API Usage

This bot uses the **Skymansion TikTok Downloader API**. You can get your free API key from [here](https://api.skymansion.site/tiktok-dl/).

### Example API Request

```bash
GET https://api.skymansion.site/tiktok-dl/download/?api_key=YOUR_API_KEY&url=TIKTOK_VIDEO_URL
```

### Example API Response

```json
{
    "Creator": "Chinthakadisanayaka ...",
    "Title": "\u0db8\u0dc4\u0db8\u0dd9\u0dc0\u0dca\u0db1\u0dcf \u0d85\u0dc3\u0db4\u0dd4\u0dc0 \u0d9a\u0dd4\u0db9...",
    "Description": "\u0db8\u0dc4\u0db8\u0dd9\u0dc0\u0dca\u0db1\u0dcf \u0d85\u0dc3\u0db4\u0dd4\u0dc0 \u0d9a\u0dd4\u0db9...",
    "Date": "29/12/2024",
    "Duration": "00:14",
    "img": "https://p16-sign-sg.tiktokcdn.com/tos-alisg-p-0037/oQfocidIrdQx49HOA3KQju1LaeLP3eIoDGsCAo~tplv-tiktokx-cropcenter:300:400.jpeg?dr=14579&nonce=26063&refresh_token=1f5f6a5097e7cd15734c071e0bb1ab4b&x-expires=1742252400&x-signature=%2BNcODdNEF44FOk9Mx1UephNOcEU%3D&idc=maliva&ps=13740610&s=AWEME_DETAIL&shcp=34ff8df6&shp=d05b14bd&t=4d5b0474",
    "download_options": {
        "hdvw": {
            "url": "https://tikdown.net/get.php?token=djhjNjJIQTRualFiNHBsMjl1N0gyY0gzbVZvZWUzcG5xSlJrekZqYXZTNTZKa1JvNGthSkthSVdoV0E5Wm1HUnZVNmlGNEhrZFk4bEJidUZSVjhCdjl5UHJnWUpuSzRyTFFsZWN5ZytnY0VubGtLRWk3Tmk5SVNVbktndnl4MHZsYXY2aGxPdVJRNG16RVNqcm1URG9lMVUzNG9zRmR1UmNxMkxGY3I0bjE5Mnh3aU1OR3JsYkhhM3ZLNnIyTmYyVXI2N1Zxa3UrY0dLa3NZdlNtQ0lMc3dQcEVxaHhhOHZNVWVyc21HeTNDVTRBOUs0Z0M2MmtBdnZMUEp2RnZVdnkxenFIbFZpdFp5b1NpT2g1ekxxbDFGUFJMUlpjTDVzNFVBSnR2THp3TE5Ya0ExUEFNYmMxT0ZFQy9aWXRpQlZsYWZKTGZSK3o4M2IrMkJWQjl1SkEwcTV4LzhYT0pqL3E1MDVoeCtCM3JWcWY1NlVvY0Nwc1lleUVSeXJ0TVBxU2RDa21iVjBzUkdBdUJ1R3ZHY1QrdisxdDJLa1h0WUxsS3R5aVdyckxFWXRxZnl3RHlMa0RkNXJpVWdRcUE5QnZ4ZWlnM25wNUMxNW5qMC9sK21xcHhRSDUxNmQ5TnFOcGt0TFFCNklndldBellERXQwTkpydElIMFltYWwydEtUU1dha2RzZFVMTWxTNWswZkN2azhRWEtDUHF0WTRCZmtidXllUjZsRit3Rm1wOWw4WXU4OXJweVdCRWZocnpsTU5yTTE0cm5QbTJTSE41a2txY3VTM3orbXRpNmFzY1hJUCs4SWpKV2oyc1RsNVZFbjNjMlBheXgvbEtUOENYbDU5MVlMRWFsTDZHc2NPQ1hpTkdjQkVTenRwYXIwNDhza0M5UnNTMXBPeEE9%3A%3AanjQe8e%2BVc9Sw6jmHL77Ew%3D%3D&token_id=NzQ1Mzg0MDIzODE5MjkwNTQ4MA==",
            "size": "2.89 MB"
        },
        "hdv": {
            "url": "https://tikdown.net/get.php?token=djhjNjJIQTRualFiNHBsMjl1N0gyY0gzbVZvZWUzcG5xSlJrekZqYXZTNEl4S3hxQ3A4R3NzaW0xbjliaVRZdUVEVkFlTTVTdmFSSDBxVE90Q0NjV205SGJWNFdBUDhCUTRJZFpscWc2NHVib1dTRWpqVTNwRWFMWkhPQWJpRlRhNlYrYTB3aW9xZXQyNGxsY2xwQVlNd0ZTMDBJQ3U4WkQwU09VN3BXWHJGaWlLeEdBVW04Mzg0NjJvaTYwODJUTGZvcTFRTWlCUVRCYjNIQ2tMK0FmUnhwTGJNZlRIL3RNNXBqVjFkRFVRRnhiZFFwQ3FsUWlhZ2RqVitZWGNTRHMveTZFYWsxYXhrK0RJNzM5b0RabUFkd2R1UjFpYWlKdE1ndExyMFNaUkZMZVhBTFYvV243NGgxZGZrUjNQNWU3VWNWdWRsMm9lbXlHVS9pMzQ4bFl1RkJCcGloRWJWYWdmQ0hoQ0RWaTd5dWF5SnQ3emY5WTl2c3JDelh2SE1aMVVZYkh5TGloTmd6ZjM0TXJQNDNYY2k1NWp6aHIzdEc4STU5MFRWNmtGaE9QNThkQmZiOE1PUGlaUjJ5MU1vbDR3MEpKWWNQVWo2UzZpZzh0U3B0d2lXUktnSXNZSXVTZzJ2ek1ac3RJNFdVTVc3K1ZSS3RWWGR3S00rMCs3OURaL25KVE1JMndLdlpMeFpSS010STIxa2JNS2J2RXZFWU8zbjFGWkc3RXZob1lkZWE2WHdTTVdHUjFVM2ppVG5lc2ViRjJsTmdNZTNQSnBWWFd6SEVNNFp6TVNqQWVEeDN2YktRTUJGRmg1SVNaOCt4YU9xakNwcDhQNjhqWXFwT0pDenUwZ0Vkc1pmM3VqbFlDemFjTDhpZFVWWFh1RjlzMmlWd1UxUGcvNGs9%3A%3AanjQe8e%2BVc9Sw6jmHL77Ew%3D%3D&token_id=NzQ1Mzg0MDIzODE5MjkwNTQ4MA==",
            "size": "2.89 MB"
        },
        "mp3": {
            "url": "https://tikdown.net/get.php?token=bkFNd0VzMTVvZlR2VWtNR1o1WmpNdk01TUVqTVM4eUlqaVBRM2pyR3R1a1RFdTFXUGozTWZlYllpaTVQV3ovNU9UMFl5dkk2Qyt1dXpkckZ4cnZKU3NGRjcyeEd1WkRJRzRacE5vR3pOaFh0UEZCRUtub1MwbE1HSi9xVSt2TVR2QWJDRk1jMktBcFEyNTBUUlZmQW93PT0%3D%3A%3AanjQe8e%2BVc9Sw6jmHL77Ew%3D%3D&token_id=NzQ1Mzg0MDIzODE5MjkwNTQ4MA==",
            "size": "N/A"
        }
    }
}
```

---

## Deployment

### Heroku

1. Fork this repository.
2. Create a new Heroku app.
3. Connect your GitHub repository to Heroku.
4. Add the environment variables (`BOT_TOKEN`, `CHANNEL_ID`, `API_KEY`) in the Heroku dashboard.
5. Deploy the app.

### Local Deployment

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the bot:
   ```bash
   npm start
   ```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Support

For support or questions, please open an issue on [GitHub](https://github.com/rasanjanapiumal99/tiktok-dl-telegram-bot/issues) or contact us via Telegram.

---

## Credits

- **Skymansion API**: [https://api.skymansion.site/tiktok-dl/](https://api.skymansion.site/tiktok-dl/)
- **Node.js Telegram Bot API**: [https://github.com/yagop/node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)

---

**Enjoy downloading TikTok videos with ease!** 🚀



---
