import { DragAndDropArea } from "@/components/DragAndDropArea";

export default function Home() {
  return (
    <div className="font-sans min-h-screen p-8">
      <main className="flex flex-col gap-[32px] items-center">
        <div className="w-full max-w-4xl">
          <DragAndDropArea />
        </div>
      </main>
    </div>
  );
}
