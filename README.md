# Icarus Paper

**A poetic web experience where Icarus flies and falls across the screen, powered by Three.js, GSAP, and Lenis scroll.**

## 🚀 Features

- **Hero Section**: Full-screen canvas with a disintegrating Icarus figure
- **Icarus Animation**: Particles scattered into feathers, body dissolving into wax
- **Parallax Scroll**: Icarus remains fixed while the world scrolls beneath
- **Lenis Smooth Scroll**: Ultra-smooth scrolling across the entire page
- **Preloader**: Custom preloader with counter and animated progress bar
- **SVG Filters**: Subtle SVG displacement for a rough, paper-like texture

## 🛠️ Tech Stack

- **HTML5** - Semantic markup and structured content
- **CSS3** - Custom properties, layout, and animation
- **JavaScript ES6+** - Core logic and GSAP integration
- **Three.js** - 3D rendering and particle effects
- **GSAP** - GreenSock Animation Platform (Timeline, ScrollToPlugin)
- **Lenis** - Smooth scrolling library
- **Vite** - Build tool and development server

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/icarus-paper.git
   cd icarus-paper
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## 🏁 Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5174](http://localhost:5174) in your browser.

## 📂 Project Structure

```

├── public/                    # Static assets
│   └── assets/
│       ├── images/
│       │   ├── icarus-hero.jpg
│       │   └── icarus-story.jpg
│       └── sprites/
│           └── feathers.png
├── src/
│   ├── scenes/               # Three.js scenes
│   │   ├── scene0-preloader.js
│   │   ├── scene1-hero.js
│   │   └── scene2-story.js
│   ├── canvas/               # Three.js setup
│   │   ├── icarus-three.js
│   │   ├── particles.js
│   │   └── effects.js
│   ├── utils/                # Utility functions
│   │   ├── lenis.js
│   │   └── scroll-trigger.js
│   ├── styles/               # CSS files
│   │   ├── base.css
│   │   ├── preloader.css
│   │   ├── hero.css
│   │   ├── story.css
│   │   └── components.css
│   ├── main.js               # Application entry point
│   └── index.html            # Main HTML file
├── index.html                # Root HTML
├── styles.css                # Global styles
├── package.json
└── vite.config.js

```

## 🎨 Scenes

### Scene 0: Preloader
Animated counter and progress bar that reveals the hero section.

### Scene 1: Hero
Full-screen canvas with Icarus figure, feather particles, and wax disintegration effect.

### Scene 2: Story (Coming Soon)
Placeholder for the narrative section with smooth scrolling content.

## 🔌 Configuration

Edit `src/index.html` to customize:
- Title and meta tags
- Navigation links
- Smooth scroll settings

## 📄 Assets

Replace images in `public/assets/images/`:
- `icarus-hero.jpg` - Hero section background (1920x1080 recommended)
- `icarus-story.jpg` - Icarus canvas image (3:4 aspect ratio)

## 🤝 Contributing

1. Create a new branch for your feature
2. Make your changes in the appropriate directory
3. Test thoroughly
4. Open a pull request with:
   - Clear description of changes
   - Screenshots or video
   - Any issues resolved

## 📝 License

MIT License
