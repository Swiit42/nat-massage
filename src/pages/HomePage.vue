<template>
  <div>
    <Navbar />
    <main>
      <HeroSection />
      <WhyUsSection />
      <PainSection />
      <ServicesSection />
      <ProcessSection />
      <CtaSection />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import HeroSection from '@/components/home/HeroSection.vue'
import WhyUsSection from '@/components/home/WhyUsSection.vue'
import ServicesSection from '@/components/home/ServicesSection.vue'
import PainSection from '@/components/home/PainSection.vue'
import ProcessSection from '@/components/home/ProcessSection.vue'
import CtaSection from '@/components/home/CtaSection.vue'
</script>
