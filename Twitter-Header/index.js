const fs = require('fs')

const { TwitterClient } = require('twitter-api-client');
const sharp = require('sharp');
const axios = require('axios');

const dotenv = require('dotenv')
dotenv.config()

const twitterClient = new TwitterClient({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessTokenSecret: process.env.ACCESS_SECRET,
});


async function get_following(){
    const following = await twitterClient.accountsAndUsers.get_following
    
    
}

const f = get_following()
.then((following)=>{
    console.log(following)
});


async function create_text(width, height, text) {
    try {
      const svg_img = `
        <svg width="${width}" height="${height}">
        <style>
        .text {
            font-size: 64px;
            fill: #000;
            font-weight: 700;
        }
        </style>
        <text x="0%" y="0%" text-anchor="middle" class="text">${text}</text>
        </svg>
      `;
      const svg_img_buffer = Buffer.from(svg_img);
      return svg_img_buffer;
    } catch (error) {
      console.log(error);
    }
  }

  const image_data = [];

  async function draw_image(image_data) {
    try {
      const hour = new Date().getHours();
      const welcomeTypes = ["Morning", "Afternoon", "Evening"];
      let welcomeText = "";
  
      if (hour < 12) welcomeText = welcomeTypes[0];
      else if (hour < 18) welcomeText = welcomeTypes[1];
      else welcomeText = welcomeTypes[2];
  
      const svg_greeting = await create_text(500, 100, welcomeText);
  
      image_data.push({
        input: svg_greeting,
        top: 52,
        left: 220,
      });
  
      await sharp("twitter-banner.png")
        .composite(image_data)
        .toFile("new-twitter-banner.png");
  
      // upload banner to twitter
      upload_banner(image_data);
    } catch (error) {
      console.log(error);
    }
  }


  async function upload_banner(files) {
    try {
      const base64 = await fs.readFileSync("new-twitter-banner.png", {
        encoding: "base64",
      });
      await twitterClient.accountsAndUsers
        .accountUpdateProfileBanner({
          banner: base64,
        })
        .then(() => {
          console.log("Upload to Twitter done");
          delete_files(files);
        });
    } catch (error) {
      console.log(error);
    }
  }