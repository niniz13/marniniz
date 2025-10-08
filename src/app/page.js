"use client";

import Image from "next/image";
import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh", // prend toute la hauteur de la fenêtre
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Image de fond */}
      <Image
        src="/hero.jpg"
        alt="hero image"
        fill
        priority
        style={{
          objectFit: "cover",
          filter: "brightness(0.6)", // assombrit légèrement pour rendre le texte lisible
        }}
      />

      {/* Contenu par-dessus */}
      <Box sx={{ position: "relative", zIndex: 1, maxWidth: 600, p: 3 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", letterSpacing: "0.05em" }}
        >
          MarNiniz
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 400,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          Discover homemade dishes made with seasonal ingredients, for healthy,
          modern and delicious cuisine.
        </Typography>
      </Box>
    </Box>
  );
}
