import { Suspense } from "react";
import CountdownApp from "@/components/countdown-app";
import Loading from "@/components/loading";

export default function Home() {
  return (
    <main className="min-h-screen bg-black font-mono">
      <Suspense fallback={<Loading />}>
        <CountdownApp />
      </Suspense>
    </main>
  );
}
