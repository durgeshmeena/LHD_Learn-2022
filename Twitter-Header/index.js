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




async function create_text(width, height, text) {
    try {
      const svg_img = `
        <svg width="${width}" height="${height}">
        	<text x="50%" y="80%" text-anchor="middle" style="font-size: 150px; ">${text}</text>
        </svg>
      `;
	//   console.log(svg_img)
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
      const welcomeTypes = ["Mor", "After", "Eve"];
      let welcomeText = "";
  
      if (hour < 12) welcomeText = welcomeTypes[0];
      else if (hour < 18) welcomeText = welcomeTypes[1];
      else welcomeText = welcomeTypes[2];
  
      const svg_greeting = await create_text(200, 50, welcomeText)
	  const buffer = await sharp(svg_greeting).toBuffer();
	  fs.writeFileSync('text.jpg', buffer);
	  
      image_data.push({
        input: svg_greeting,
        top: 200,
        left: 250,
      });
  
      await sharp("twitter-banner.png")
        .composite(image_data)
        .toFile("new-twitter-banner.png");
        return image_data;
  
      // upload banner to twitter
      // upload_banner(image_data);
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

  const arr = [];
  const img = draw_image(arr)
  .then((image_d)=>{
  	// console.log(image_d)
  })

//   const svg_greeting = create_text(300, 50, 'Evening')
//   .then(async (svg_buffer)=>{
// 	const buffer = await sharp(svg_buffer).toBuffer();
// 	fs.writeFileSync('text.jpg', buffer);
//   })
