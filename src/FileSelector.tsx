import { useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { Button } from "./components/ui/button";
import { readTextFile } from "@tauri-apps/plugin-fs";

function FileSelector() {
  const [file, setFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);

  const chooseFile = async () => {
    const selected = await open({
      multiple: false,
      directory: false,
    });
    setFile(selected);

    const content = await readTextFile(selected);
    setFileContent(content);
    console.log(content);
  };

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-lg">
        {/* ファイル選択ボタン */}
        <div className="flex flex-col items-center space-y-2">
          <Button
            variant="default"
            onClick={chooseFile}
            className="w-40 rounded-xl bg-blue-500 p-3 font-bold text-white transition hover:bg-blue-600"
          >
            Choose File
          </Button>
          <span className="text-sm break-all text-gray-600">
            {file ?? "未選択"}
          </span>
        </div>

        {/* ファイル内容表示 */}
        <div className="max-h-80 overflow-auto rounded-xl border border-gray-300 bg-gray-50 p-4">
          <pre className="text-sm whitespace-pre-wrap text-gray-800">
            {fileContent || "（ファイルの内容がここに表示されます）"}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default FileSelector;
