'use client'
import { useEffect, useState } from 'react';

 // Declare this a client-side component

function Prompt() {
    const [input, setInput] = useState("");
    useEffect(() => {
        console.log(`Current prompt: ${input}`)
      });
    
  return (
    <div className="m-10">
      <form className="flex flex-col lg:flex-row lg:divide-x rounded-md shadow-md">
        <textarea
          placeholder="Enter your prompt here."
          className="flex-1 p-4 rounded-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className={`p-4 font-bold ${input ? "bg-violet-500 text-purple-50" : "text-gray-300 cursor-not-allowed"}`}
          type="submit"
          disabled={!input}
        >
          Generate
        </button>
        <button
          className="p-4 bg-purple-500 text-white border-none transition-colors duration-150 font-bold"
          type="button"
        >
          Button 2
        </button>
        <button
          className="p-4 bg-purple-100 text-purple-800 border-none transition-colors duration-150 font-bold"
          type="button"
        >
          Button 3
        </button>
      </form>
    </div>
  );
}

export default Prompt;
