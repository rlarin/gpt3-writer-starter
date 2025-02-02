import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


const generateAction = async (req, res) => {
    const basePromptPrefix = `
            Write me a cool tweet about this specific topic:
    
            topic: ${req.body.userInput}.
	`;

    console.log(`API: ${basePromptPrefix}`);

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}`,
        temperature: 0.7,
        max_tokens: 250,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
