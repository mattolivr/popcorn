import { useId, useState } from "react";
import { FaImage, FaMessage } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";

export default function HomeView(): JSX.Element {
  return (
    <div className="mt-4 flex w-full flex-col gap-2 px-2 md:w-[700px]">
      <NewPost />
    </div>
  );
}

function NewPost(): JSX.Element {
  const textAreaId = useId();
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);
  const clean = text === "";

  return (
    <Card>
      <form action="">
        <div className="flex flex-row items-start gap-3">
          <div className="hidden w-10 items-center sm:flex">
            <Link
              to="/users"
              className="block h-10 w-10 rounded-full bg-orange-300"
            />
          </div>
          <Input
            id={textAreaId}
            type="textarea"
            placeholder="O que está pensando?..."
            onInput={(e) => {
              setText(e.currentTarget.value);
            }}
            onFocus={() => {
              setFocused(true);
            }}
            onBlur={() => {
              console.log("onBlur");
              setFocused(false);
            }}
          />
        </div>
        <ul
          className={`ml-10 items-center justify-end pl-3 pt-2 sm:gap-1 ${clean && !focused ? "hidden" : "flex"}`}
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
                clearTextArea(textAreaId);
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
    </Card>
  );
}

function clearTextArea(id: string): void {
  const textArea = document.getElementById(id);
  if (textArea != null) {
    textArea.innerHTML = "";
  }
}
