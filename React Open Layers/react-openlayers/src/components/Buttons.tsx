// With God's help

import { Button } from "@mui/material";
import { FC } from "react";
import { ButtonsProps } from "../types/interfaces";
import "../App.css";

const Buttons: FC<ButtonsProps> = ({ text, onClick }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{ margin: "5px", fontSize: "24px" }}
    >
      {text}
    </Button>
  );
};

export default Buttons;
