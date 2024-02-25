import React from "react";

type Props = {
  price: number;
};

const Subtotal: React.FC<Props> = ({ price }) => {
  const subtotal =  price;
  return <span>{subtotal}</span>;
};

export default Subtotal;
