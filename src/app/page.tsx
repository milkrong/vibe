'use client';

import { Button } from '@/components/ui/button';
import { useTRPC } from '@/trpc/client';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Home() {
  const trpc = useTRPC();
  const [input, setInput] = useState('');
  const invoke = useMutation(
    trpc.invoke.mutationOptions({
      onSuccess: () => {
        toast.success('Invoked');
      },
    })
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Super blog
      </h1>
      <input
        type="text"
        className="border-2 border-gray-300 rounded-md p-2"
        onChange={(e) => setInput(e.target.value)}
      />
      <Button
        disabled={invoke.isPending}
        onClick={() => invoke.mutate({ test: input })}
      >
        Invoke
      </Button>
    </div>
  );
}
