import { inngest } from './client';
import { createAgent, openai } from '@inngest/agent-kit';

export const helloWorld = inngest.createFunction(
  { id: 'hello-world' },
  { event: 'test/hello.world' },
  async ({ event }) => {
    console.log(process.env.SILICONFLOW_API_KEY);
    const agent = createAgent({
      name: 'Summarize',
      system: 'You are a helpful assistant that summarizes text',
      model: openai({
        model: 'Pro/deepseek-ai/DeepSeek-V3.1',
        baseUrl: 'https://api.siliconflow.cn/v1/',
        apiKey: process.env.SILICONFLOW_API_KEY,
      }),
    });
    const { output } = await agent.run(event.data.email);
    console.log(output);
    return output;
  }
);
