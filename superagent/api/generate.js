import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    // prompt: `write a python code to describe:{}`,
    prompt: generatePrompt(req.body.animal),
    // prompt: "codex",
    temperature: 0.6,
    max_tokens: 4000,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
  console.log(completion.data);
}


function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `${capitalizedAnimal}`;
}
