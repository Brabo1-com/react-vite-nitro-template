// Modified by Brabo, 2026-10-19: independent attribution component.
// Update this page (the content is just a fallback if you fail to update the page)

import { MadeWithBrabo } from "@/components/made-with-brabo";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Blank App</h1>
        <p className="text-xl text-gray-600">
          Start building your amazing project here!
        </p>
      </div>
      <MadeWithBrabo />
    </div>
  );
};

export default Index;
