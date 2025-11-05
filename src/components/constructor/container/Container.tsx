import React from "react";
import { ContainerProps } from "./types";

const Container: React.FC<ContainerProps> = ({
  display = "flex",
  flexDirection = "row",
  columns = 12,
  gap = "1.5rem",
  alignItems = "center",
  justifyContent = "center",
  style,
  children,
}) => {
  const containerStyle: React.CSSProperties =
    display === "grid"
      ? {
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap,
          alignItems,
          justifyItems: justifyContent,
          padding: "2rem",
          borderRadius: "1.5rem",
          background: "linear-gradient(180deg, #fdfdfd 0%, #f5f7fa 100%)",
          boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
          transition: "all 0.3s ease",
          ...style,
        }
      : {
          display: "flex",
          flexDirection,
          gap,
          alignItems,
          justifyContent,
          padding: "2rem",
          borderRadius: "1.5rem",
          background: "linear-gradient(180deg, #fdfdfd 0%, #f5f7fa 100%)",
          boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
          transition: "all 0.3s ease",
          ...style,
        };

  return <div style={containerStyle}>{children}</div>;
};

export default Container;
