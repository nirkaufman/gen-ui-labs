import {Chat} from "@/components/Chat";
import HTMLGenerator from "@/components/HTMLGenerator";
import RenderMarkdown from "@/components/MarkdownRender";
// import Alerts from "@/components/Alerts";
// import {Tools} from "@/components/Tools";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20">
      <main className="flex flex-col row-start-2 items-start">
        <h1 className="text-center text-4xl font-bold sm:text-left">
          <span className="text-orange-400">Generative UI</span> Workshop Labs
        </h1>
        <small className="text-center text-sm text-stone-400">Nir Kaufman | 2025</small>
        <Chat />
        {/*<Alerts />*/}
        {/*<Tools />*/}
        {/*<HTMLGenerator />*/}
        <RenderMarkdown />
      </main>
    </div>
  );
}
