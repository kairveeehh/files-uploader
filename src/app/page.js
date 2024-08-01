import Image from "next/image";
import DragDrop from "./components/File";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div >
        <DragDrop />
      </div>
    </main>
  );
}
