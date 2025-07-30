import FileUpload from "@/components/file-upload";

export default function Home() {
  return (
    <div className="font-sans min-h-screen ">
      <main className="flex flex-col gap-[32px] items-center">
        <div className="w-full max-w-4xl">
          <FileUpload />
        </div>
      </main>
    </div>
  );
}
