import { Box } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

const ImageWrapper = styled(Box)(({ theme }) => ({
    borderRadius: "0.5rem",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    "::after": {
        content: '""',
    },
    ":hover::after": {
        inset: 0,
        zIndex: 5,
        content: '""',
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        transition: "all 250ms ease-in-out",
    },
}));

const CustomImage = ({ src }) => {
    return (
        <ImageWrapper>
            <Box
                component="img"
                width="100%"
                borderRadius="0.5rem"
                src={src}
                display="block"
            />
        </ImageWrapper>
    );
};

export default CustomImage;
