# scripts/tools/generate_logos.py
import requests
from PIL import Image, ImageEnhance

urls = {
    "tiktok": "https://logolook.net/wp-content/uploads/2021/06/Symbol-Tiktok.png",
    "spotify": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/512px-Spotify_logo_without_text.svg.png",
    "roblox": "https://i.imgflip.com/7nwenp.png",
    "github": "https://github.githubassets.com/favicons/favicon.png"
}

for name, url in urls.items():
    response = requests.get(url, stream=True)
    if response.status_code == 200:
        img = Image.open(response.raw).convert('RGBA')
        enhancer = ImageEnhance.Brightness(img)
        bright_img = enhancer.enhance(1.2)  # Slight brightness boost
        bright_img.save(f'../assets/images/{name}.png')
        print(f"Saved {name}.png")
