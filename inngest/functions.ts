import { openai, createAgent } from "@inngest/agent-kit";
import { inngest } from "./client";

export const processTask = inngest.createFunction(
  { id: "process-task", triggers: { event: "app/task.created" } },
  async ({ event }) => {
    const summarizer = createAgent({
      name: "summarizer",
      system: "You are an expert summarizer. Summarize in 2 words.",
      model: openai({
        model: "deepseek-v4-flash",
        apiKey: process.env.DEEPSEEK_API_KEY,
        baseUrl: "https://api.deepseek.com",
      }),
    });

    const { output } = await summarizer.run(
      `Summarize the following text: ${event.data.value}`,
    );

    return { output };
  },
);
