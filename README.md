# Premium Glassmorphic Portfolio Website | Vinay V.M

A state-of-the-art, fully responsive personal portfolio website customized for **Vinay V.M** using his resume as the absolute source of truth. Designed with high-end glassmorphism principles inspired by Apple, Stripe, Linear, Vercel, and Framer.

---

## 🌟 Key Design & Technical Features

* **Aurora Background Mesh**: Slow-drifting, organic glowing CSS radial gradient containers blending cyan, emerald, and purple gradients.
* **Canvas Particles**: High-performance interactive background canvas rendering drifting dust nodes with dynamic shadows.
* **Typing Automation**: Smooth auto-typing roles matching Software Development, IT configurations, and hardware troubleshooting profiles.
* **3D Tilt Elements**: Interactive glass cards utilizing mouse coordinate tracking to tilt dynamically in 3D perspective space on hover.
* **Magnetic Actions**: Buttons and links that actively slide toward the user's cursor for enhanced micro-interaction.
* **ATS Compatibility**: Clean semantic structure, microdata markup, and direct links to single-page plain-text optimized ATS resume versions.
* **SEO Optimization**: Complete schema JSON-LD, Twitter Cards, Open Graph tags, responsive viewports, and custom SVG favicon.

---

## 📂 File Architecture

* **`index.html`**: Semantic layout housing all sections (Hero, About, Objective, Skills, Projects, Experience, Education, Certifications, Resume, Contact, Footer) and Schema.org metadata.
* **`style.css`**: Core design variables, HSL Tailwind-like deep dark colors, custom scrollbars, keyframe-based floating animations, 3D card perspectives, responsive grid media overrides.
* **`script.js`**: Core animation loop managing Canvas particle rendering, smooth cursor follow coordinates, auto-typing scripts, mouse tilt vectors, magnetic math, scroll-reveal IntersectionObservers, and interactive modals.
* **`assets/Vinay_VM_Resume.html`**: A premium, print-friendly HTML resume preview page designed to open instantly in the browser and print perfectly to PDF (Ctrl+P).
* **`assets/Vinay_VM_Resume.pdf`**: Plain-text optimized downloadable copy of Vinay V.M's CV for applicant tracking systems.
* **`assets/images/og-image.png`**: High-quality social sharing card background rendering tech layouts.

---

## ⚙️ How to Deploy & Customise

1. **Local Run**: 
   Since this is built with high-efficiency vanilla technologies, simply open `index.html` in any web browser to view, or launch a local server (e.g., Live Server extension in VS Code) for live reload.
2. **Replacing Image Placeholders**:
   * For the profile picture: Save a professional portrait as a PNG or JPEG, place it in `assets/images/profile.png`, and update the `.profile-image-placeholder` styling in `style.css` (or insert an `<img>` inside `index.html`).
3. **Replacing the Resume PDF**:
   * Place your official PDF resume at `assets/Vinay_VM_Resume.pdf` to replace the text placeholder.
4. **Form Integration**:
   * The contact form is wired with simulation scripts. To receive emails directly, register a free form handler (e.g., [Formspree](https://formspree.io/) or [FormSubmit](https://formsubmit.co/)) and change the form action attribute in `index.html`.

---

## 💡 Technologies Used
* **Markup**: HTML (Semantic, SEO, JSON-LD Schema)
* **Design**: Custom Vanilla CSS (Tailored Glassmorphism, CSS Custom Variables, Keyframe Animations)
* **Interactivity**: Vanilla JavaScript (Canvas API, IntersectionObserver, requestAnimationFrame, Cursor Tracking)
* **Icons**: FontAwesome Web Fonts (v6.4.0)
