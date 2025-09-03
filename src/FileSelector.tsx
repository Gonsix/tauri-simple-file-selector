import { useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { Button } from "./components/ui/button";

function FileSelector() {
  const [file, setFile] = useState<string | null>(null);

  const chooseFile = async () => {
    const selected = await open({
      multiple: false,
      directory: false,
    });
    setFile(selected);
  };

  return (
    <>
      <div className="w-36">
        <Button
          variant="default"
          onClick={chooseFile}
          className="rounded-2xl bg-blue-500 p-3 font-bold text-white"
        >
          Choose File
        </Button>
        <div className="mt-2 break-all">{file ?? "未選択"}</div>
      </div>
    </>
  );
}

export default FileSelector;
