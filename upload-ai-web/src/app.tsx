import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Wand2 } from "lucide-react";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "./components/ui/select";
import { Slider } from "./components/ui/slider";
import { VideoInputForm } from "./components/video-input-form";
import { PromptSelect } from "./components/prompt-select";
import { useState } from "react";
import { useCompletion } from "ai/react";

export function App() {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [tempetature, setTemperature] = useState(0.5);

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: "http://localhost:3333/ai/complete",
    body: {
      videoId,
      tempetature,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">upload.ai</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Developed by <span className="text-indigo-400">Norrels</span> on NLW
          </span>
          <Separator orientation="vertical" className="h-6" />
          <Button variant={"outline"}>
            <Github className="w-4 h-4 mr-2" />
            Github
          </Button>
        </div>
      </div>
      <main className="flex-1 p-6 flex gap-6">
        <div className="flex flex-col flex-1 gap-4">
          <div className="grid grid-row-2 gap-4 flex-1">
            <Textarea
              placeholder="Inclua o prompt para a IA..."
              className="resize-none p-4 leading-relaxed"
              value={input}
              onChange={handleInputChange}
            />
            <Textarea
              placeholder="Resultado gerado pela IA..."
              className="resize-none p-4 leading-relaxed"
              readOnly
              value={completion}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Lembre-se: você pode utilizar a variável transcription no seu prompt
            para adicionar o conteúdo da{" "}
            <code className="text-indigo-400">{"{transcrição}"}</code> do vídeo
            selecionado.
          </p>
        </div>

        <aside className="w-[22rem] space-y-6 pr-2 overflow-auto h-[85vh] scrollbar scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-950">
          <VideoInputForm onVideoUploaded={setVideoId} />

          <Separator />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Prompt</Label>
              <PromptSelect onPromptSelected={setInput} />
            </div>

            <div className="space-y-2">
              <Label>Modelo</Label>
              <Select disabled defaultValue="gpt3.5">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>
              <span className="block text-xs text-muted-foreground italic">
                Você poderá customizar essa opção em breve
              </span>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label>Temperatura</Label>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[tempetature]}
                onValueChange={(value) => setTemperature(value[0])}
              />

              <span className="block text-sm text-muted-foreground italic leading-relaxed">
                Valores mais altos tendem a deixar o resultado mais criativo e
                com possíveis erros.
              </span>
            </div>

            <Separator />

            <Button type="submit" className="w-full" disabled={isLoading}>
              Executar
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </aside>
      </main>
    </div>
  );
}
