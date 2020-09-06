import React from "react";
import "./Background.scss";

interface Props {
  children: React.ReactNode;
}

const Background: React.FC<Props> = ({ children }: Props) => (
  <div className="Background">{children}</div>
);

Background.propTypes = {};

export default Background;
