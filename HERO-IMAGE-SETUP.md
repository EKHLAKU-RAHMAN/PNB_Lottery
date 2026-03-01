# Hero Image Setup Guide

## ✅ What I've Done:

1. **Created Assets Folder Structure:**
   ```
   frontend/src/assets/images/
   ```

2. **Updated HeroSection Component:**
   - Added proper import: `import heroBg from '@/assets/images/hero-bg.jpg'`
   - Updated background image to use local import
   - Maintained all styling and responsiveness

3. **Created Placeholder Image:**
   - SVG placeholder with navy + gold theme
   - Located at: `frontend/src/assets/images/hero-bg.svg`

## 🖼️ How to Add Your Image:

### Step 1: Place Your Image
Copy your hero background image to:
```
frontend/src/assets/images/hero-bg.jpg
```

### Step 2: Update Import (if needed)
If your image has a different format (PNG, etc.), update the import in `HeroSection.jsx`:

```jsx
// For JPG
import heroBg from '@/assets/images/hero-bg.jpg'

// For PNG  
import heroBg from '@/assets/images/hero-bg.png'

// For WebP
import heroBg from '@/assets/images/hero-bg.webp'
```

### Step 3: Recommended Image Specs
- **Format:** JPG, PNG, or WebP
- **Size:** 1920x1080px or larger
- **Aspect Ratio:** 16:9
- **File Size:** Under 2MB for optimal performance

## 🎨 Current Features Maintained:

✅ **Full-screen background** (`min-h-screen`)
✅ **Cover positioning** (`bg-cover bg-center`)
✅ **Dark overlay** (`bg-gradient-to-b from-navy/80 via-navy/90 to-navy/95`)
✅ **Responsive design** (mobile-first)
✅ **Premium navy + gold theme**
✅ **Smooth animations** and interactions

## 🚀 Ready to Use:

The hero section is now configured to use local images. Simply replace the placeholder file with your actual `hero-bg.jpg` image and the component will automatically use it.

## 📁 File Structure:
```
frontend/
├── src/
│   ├── assets/
│   │   └── images/
│   │       ├── hero-bg.jpg    ← Your image goes here
│   │       └── hero-bg.svg    ← Placeholder (can be deleted)
│   └── components/
│       └── HeroSection.jsx    ← Updated component
```

The Vite build system will automatically optimize and include your image in the production build.
