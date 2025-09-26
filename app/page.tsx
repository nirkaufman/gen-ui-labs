// import {Chat} from "@/components/Chat";
// import HTMLGenerator from "@/components/HTMLGenerator";
// import RenderMarkdown from "@/components/MarkdownRender";
// import {Alerts} from "@/components/Alerts";
// import {Tools} from "@/components/Tools";

import ComplementaryColorPicker from "@/components/A1-case-study/ComplementaryColorPicker";
import {AI} from "@/components/A1-case-study/ai";
import HomeDecoratorDemo from "@/components/A1-case-study/HomeDecoratorDemo";

export default function Home() {
  return (
      <AI>
        <div
            className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20">
          <main className="flex flex-col row-start-2 items-center">
            <h1 className="text-center text-4xl font-bold sm:text-left">
              <span className="text-orange-400">Generative UI</span> Workshop Labs :: <span
                className='text-gray-400'>Fundamentals</span>
            </h1>
            <small className="text-center text-sm text-stone-400">Nir Kaufman | 2025</small>
            {/*<Chat />*/}
            {/*<Alerts />*/}
            {/*<Tools />*/}
            {/*<HTMLGenerator />*/}
            {/*<RenderMarkdown />*/}
            <HomeDecoratorDemo />
          </main>
        </div>
      </AI>
  );
}
