import React from "react";
import "./Background.scss";

interface Props {
  children: React.ReactNode;
}

const Background = ({ children }: Props) => (
  <div className="Background">{children}</div>
);

export default Background;
