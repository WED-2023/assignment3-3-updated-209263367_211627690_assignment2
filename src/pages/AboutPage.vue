<template>
  <div class="about-container mt-5">
    <div class="about-card shadow-lg">
      <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" alt="Cooking" class="about-img mb-4" />
      <h2 class="about-title mb-3">Welcome to Asaf & Hagai's Recipes!</h2>
      <p class="about-desc mb-4">
        Hi! We're <span class="highlight">Asaf</span> and <span class="highlight">Hagai</span>, two passionate students at <span class="bgu">Ben-Gurion University</span>.<br>
        This website is our creation for the <span class="highlight">Web Development</span> course in our third year of Software and Information Systems Engineering.<br>
        <br>
        We believe that great food brings people together. Here, you'll find a collection of our favorite recipes, carefully curated and beautifully presented for you to enjoy.<br>
        Whether you're a seasoned chef or just starting out, we hope our site inspires you to cook, share, and savor every bite!
      </p>
      <div class="about-footer">
        <span>Made with ❤️ by Asaf & Hagai</span>
        <span class="bgu-logo">
          <img :src="bguLogo" alt="BGU Logo" />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
// filepath: src/pages/AboutPage.vue
import bguLogo from '../assets/bgu-logo.png';
</script>

<style scoped>
.about-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 80vh;
  background: linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%);
}

.about-card {
  background: #fff;
  border-radius: 24px;
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  max-width: 600px;
  width: 100%;
  text-align: center;
  margin-top: 2rem;
  box-shadow: 0 8px 32px rgba(60, 72, 88, 0.18);
  transition: box-shadow 0.2s;
}

.about-card:hover {
  box-shadow: 0 12px 48px rgba(60, 72, 88, 0.22);
}

.about-img {
  width: 100%;
  max-width: 340px;
  border-radius: 18px;
  object-fit: cover;
  margin: 0 auto;
  box-shadow: 0 4px 24px rgba(60, 72, 88, 0.10);
}

.about-title {
  font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
  font-size: 2.3rem;
  font-weight: 800;
  color: #2d3748;
  letter-spacing: 1px;
}

.about-desc {
  font-size: 1.18rem;
  color: #444;
  line-height: 1.7;
  margin-bottom: 2rem;
}

.highlight {
  color: #007bff;
  font-weight: 600;
}

.bgu {
  color: #f57c00;
  font-weight: 700;
}

.about-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2.5rem;
  font-size: 1.1rem;
  color: #555;
}

.bgu-logo img {
  height: 36px;
  margin-left: 10px;
  vertical-align: middle;
  filter: grayscale(0.2) brightness(0.95);
}
</style>