"use client";

export default function Robot() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="relative scale-90">

        {/* Head */}
        <div className="relative w-40 h-44 bg-gradient-to-b from-gray-200 to-gray-300 rounded-[35px] shadow-xl border border-gray-300">
          
          {/* Face */}
          <div className="absolute top-4 left-4 w-32 h-32 bg-black rounded-[28px] flex items-center justify-center shadow-inner overflow-hidden">
            
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 to-transparent"></div>

            {/* Eyes */}
            <div className="flex gap-5">
              <div className="w-5 h-7 rounded-full bg-cyan-400 shadow-[0_0_20px_#22d3ee]" />
              <div className="w-5 h-7 rounded-full bg-cyan-400 shadow-[0_0_20px_#22d3ee]" />
            </div>
          </div>

          {/* Ear */}
          <div className="absolute right-[-14px] top-14 w-8 h-8 rounded-full bg-gray-400 border border-gray-500 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-gray-500" />
          </div>
        </div>

        {/* Neck */}
        <div className="mx-auto w-10 h-5 bg-gray-300 rounded-b-xl"></div>

        {/* Body */}
        <div className="relative mx-auto w-28 h-40 bg-gradient-to-b from-gray-200 to-gray-300 rounded-[25px] shadow-lg border border-gray-300">
          
          {/* Chest panel */}
          <div className="absolute top-5 left-5 w-18 h-20 bg-gray-100 rounded-xl border border-gray-200"></div>
        </div>

        {/* Arms */}
        <div className="absolute top-44 left-[-38px] flex flex-col items-center">
          <div className="w-5 h-16 bg-gray-300 rounded-full rotate-12"></div>
          <div className="w-5 h-14 bg-gray-200 rounded-full -rotate-6"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>

        <div className="absolute top-44 right-[-38px] flex flex-col items-center">
          <div className="w-5 h-16 bg-gray-300 rounded-full -rotate-12"></div>
          <div className="w-5 h-14 bg-gray-200 rounded-full rotate-6"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>

        {/* Legs */}
        <div className="flex justify-center gap-6 mt-2">
          <div className="flex flex-col items-center">
            <div className="w-7 h-20 bg-gray-300 rounded-full"></div>
            <div className="w-10 h-14 bg-gray-200 rounded-xl"></div>
            <div className="w-14 h-5 bg-gray-300 rounded-full"></div>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-7 h-20 bg-gray-300 rounded-full"></div>
            <div className="w-10 h-14 bg-gray-200 rounded-xl"></div>
            <div className="w-14 h-5 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}