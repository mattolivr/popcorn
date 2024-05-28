import { Avatar } from "flowbite-react";
import { useId, useState } from "react";
import { FaImage, FaMessage } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Button from "./Button";
// import Input from "./Input";

export default function PostInput(): JSX.Element {
  const textAreaId = useId();
  const [text, setText] = useState("");
  const clean = text === "";

  return (
    <>
      <form action="">
        <div className="flex flex-row items-start gap-3">
          <Link to="/users" className="hidden sm:block">
            <Avatar rounded />
          </Link>
          {/* <Input
            id={textAreaId}
            type="textarea"
            placeholder="O que está pensando?..."
            onInput={(e) => {
              setText(e.currentTarget.value);
            }}
          /> */}
        </div>
        <ul
          className={`ml-10 flex items-center justify-end pl-3 pt-2 sm:gap-1`}
        >
          <li>
            <Button color="transparent" icon={FaImage} />
          </li>
          <li>
            <Button color="transparent" icon={FaMessage} />
          </li>
          <li>
            <Button
              className={clean ? "hidden" : ""}
              color="secondary"
              onClick={() => {
                setText("");
              }}
            >
              Limpar
            </Button>
          </li>
          <li>
            <Button disabled={clean} color="primary">
              Enviar
            </Button>
          </li>
        </ul>
      </form>
    </>
  );
}
