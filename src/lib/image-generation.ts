import Replicate from 'replicate';

if (!process.env.REPLICATE_API_TOKEN) {
  throw new Error('REPLICATE_API_TOKEN is not set in environment variables');
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function generateImage(prompt: string): Promise<string> {
  const output = await replicate.run(
    "stability-ai/sdxl:2b017d9b67edd2ee1401238df49d75da53c523f36e363881e057f5dc3ed3c5b2",
    {
      input: {
        prompt,
        negative_prompt: "low quality, blurry, distorted, deformed, disfigured, bad anatomy",
        num_outputs: 1,
        scheduler: "K_EULER",
        num_inference_steps: 50,
        guidance_scale: 7.5,
      }
    }
  );

  // The output is an array with one string URL
  const imageUrl = Array.isArray(output) ? output[0] : output;
  
  if (typeof imageUrl !== 'string') {
    throw new Error('Failed to generate image: Invalid response format');
  }

  return imageUrl;
}
