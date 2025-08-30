import { inngest } from './client';
import { createAgent, openai } from '@inngest/agent-kit';
import { Sandbox } from '@e2b/code-interpreter';
import { getSandbox } from './utils';

export const helloWorld = inngest.createFunction(
  { id: 'hello-world' },
  { event: 'test/hello.world' },
  async ({ event, step }) => {
    console.log(process.env.SILICONFLOW_API_KEY);
    const sandBoxId = await step.run('get-sandbox-id', async () => {
      const sandbox = await Sandbox.create('vibe-next-rk-2');
      return sandbox.sandboxId;
    });
    const agent = createAgent({
      name: 'Code Agent',
      system:
        'You are a helpful assistant that writes code for a Next.js app. You will be given a prompt and you will need to write the code to fulfill the prompt with React & Next.js code snippets.',
      model: openai({
        model: 'Pro/deepseek-ai/DeepSeek-V3.1',
        baseUrl: 'https://api.siliconflow.cn/v1/',
        apiKey: process.env.SILICONFLOW_API_KEY,
      }),
    });
    const { output } = await agent.run(event.data.email);

    const sandboxUrl = await step.run('get-sandbox-url', async () => {
      const sandbox = await getSandbox(sandBoxId);
      const host = await sandbox.getHost(3000);
      return `https://${host}`;
    });
    console.log(sandboxUrl);
    return { output, sandboxUrl };
  }
);
