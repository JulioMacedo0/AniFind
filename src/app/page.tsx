import FileUpload from "@/components/file-upload";

export default function Home() {
  return (
    <div className="font-sans min-h-screen ">
      <main className="flex flex-col gap-[32px] items-center">
        <div className="w-full max-w-4xl">
          <FileUpload
            maxFiles={3}
            maxFileSize={1 * 1024 * 1024} // 5MB
          />
        </div>
      </main>
    </div>
  );
}
