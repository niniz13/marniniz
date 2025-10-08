import { Box } from "@mui/material";

export default function GlassInput() {
  return (
    <Box
      sx={{
        backdropFilter: "blur(10px)",
        background: "transparent",
        borderRadius: "50px",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        width: "100%",
        maxWidth: 400,
      }}
    >
      <input
        placeholder="Search recipe..."
        style={{
          color: "#fff",
          border: "none",
          outline: "none",
          padding: "12px 20px",
          fontWeight: 600,
          background: "transparent",
        }}
      />
    </Box>
  );
}
