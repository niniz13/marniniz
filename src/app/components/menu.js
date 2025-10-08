import { Box, Typography } from "@mui/material";
import GlassInput from "./glassInput";

export default function Menu() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        padding: "20px 50px",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 4,
      }}
    >
      <a
        href="/"
        style={{
          fontWeight: "bold",
          fontSize: "2em",
          letterSpacing: "-2px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        MarNiniz
      </a>
      <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
        <a
          style={{
            fontWeight: "bold",
            fontSize: "1.1em",
            letterSpacing: "-1px",
            fontFamily: "Inter, sans-serif",
          }}
          href="/recipes"
        >
          Recipes
        </a>
        <a
          style={{
            fontWeight: "bold",
            fontSize: "1.1em",
            letterSpacing: "-1px",
            fontFamily: "Inter, sans-serif",
          }}
          href="/category"
        >
          Category
        </a>
        <GlassInput />
      </Box>
    </Box>
  );
}
