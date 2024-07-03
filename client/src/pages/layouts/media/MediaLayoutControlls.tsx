import { useState } from "react";
import { FaBars, FaClock, FaComment, FaEye, FaHeart, FaPlus, FaStar } from "react-icons/fa6";
import Button, { type ButtonProps } from "../../../components/button/Button";
import Card from "../../../components/card/Card";
import Divider from "../../../components/Divider";

const controlls: ButtonProps[][] = [
  [
    { icon: <Button.Icon icon={FaEye} />, children: "Assistir" },
    { icon: <Button.Icon icon={FaHeart} />, children: "Favoritar" },
    { icon: <Button.Icon icon={FaStar} />, children: "Avaliar" },
  ],
  [
    { icon: <Button.Icon icon={FaClock} />, children: "Assistir mais tarde" },
    { icon: <Button.Icon icon={FaBars} />, children: "Adicionar à uma lista" },
    { icon: <Button.Icon icon={FaComment} />, children: "Criar novo tópico" },
  ],
];

export function MediaLayoutControlls(): React.ReactNode {
  return (
    <>
      <div className="flex">
        {controlls[0].map((btn, index) => (
          <Button
            key={index}
            className="h-fit grow flex-col gap-0 py-2"
            color="transparent"
            {...btn}
          />
        ))}
      </div>
      <div className="mt-1 flex flex-col">
        {controlls[1].map((btn, index) => (
          <Button key={index} color="transparent" align="start" {...btn} />
        ))}
      </div>
    </>
  );
}

export function MediaLayoutMobileControlls(): React.ReactNode {
  // const { media } = useMediaLayoutContext();
  const [visible, setVisible] = useState(false);

  const mobileControlls: Array<ButtonProps | "divider"> = [
    ...controlls[0],
    "divider",
    ...controlls[1],
  ];

  return (
    <>
      <Button
        className="absolute bottom-14 right-2 flex rounded-full px-4 py-6 lg:hidden"
        onClick={() => {
          setVisible(!visible);
        }}
        onBlur={() => {
          setVisible(false);
        }}
        icon={<Button.Icon icon={FaPlus} />}
      />
      <Card hidden={!visible} className="absolute bottom-28 right-2 w-fit gap-2 rounded-xl px-2">
        {mobileControlls.map((btn, index) =>
          btn === "divider" ? (
            <Divider className="m-0" key={index} />
          ) : (
            <Button key={index} {...btn} color="transparent" align="start" />
          ),
        )}
      </Card>
    </>
  );
}
