import React, { useState } from "react";
import Hero from "../components/Hero";
import Facilities from "../components/Facilities";
import AboutUs from "../components/AboutUs";
import FloatingChatbot from "../components/FloatingChatbot";

function Home() {
  return (
    <div>
      <Hero />
      <Facilities />
      <AboutUs />
      <FloatingChatbot />
    </div>
  );
}

export default Home;