"use client";

import Image from "next/image";
import { Box, Typography } from "@mui/material";
import Menu from "./components/menu";

export default function Home() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      <Image
        src="/hero.jpg"
        alt="hero image"
        quality={60}
        fill
        priority
        style={{
          objectFit: "cover",
          filter: "brightness(0.7)",
        }}
      />

      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 10,
        }}
      >
        <Menu />
      </Box>

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: 500,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 900,
            letterSpacing: "-2px",
            fontFamily: "Inter, sans-serif",
            lineHeight: 0.9,
          }}
        >
          MarNiniz
        </Typography>

        <Typography
          sx={{
            fontWeight: 800,
            fontFamily: "Inter, sans-serif",
          }}
        >
          Discover homemade dishes made with seasonal ingredients, for healthy,
          modern and delicious cuisine.
        </Typography>
        <Typography
          sx={{
            backdropFilter: "blur(10px)",
            background: "transparent",
            borderRadius: "50px",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            padding: "12px 30px",
            color: "#fff",
            fontWeight: "bold",
            width: "fit-content",
            transition: "all 0.3s ease",
            cursor: "pointer",
            "&:hover": {
              backdropFilter: "blur(5px)",
            },
          }}
        >
          See all recipes
        </Typography>
      </Box>
    </Box>
  );
}
