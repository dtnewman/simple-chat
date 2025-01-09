# Eval problem

## Approach

I set this up across two different jupyter notebooks. The first one was exploratory:

[evaluate_intelligence1.ipynb](evaluate_intelligence1.ipynb)

The second one has a more fully fleshed out evaluation with cleaner code:

[evaluate_intelligence2.ipynb](evaluate_intelligence2.ipynb)

I would recommend lookking at the second notebook first.

Notably, in the second notebook, I updated the testing framework to closely match ideas from the [SimpleQA framework](https://openai.com/index/introducing-simpleqa/) recently released by OpenAI. The idea is that rather than trying to evaluate how the models answer vague questions, we focus on simple (though not necessarily easy) questions with objective answers.

## Results

The results are in the second notebook. From my latest run, I got these scores:

Chai: 11 correct, 9 incorrect, 0 not attempted
Llama: 12 correct, 8 incorrect, 0 not attempted

The results are not statistically significant... the sample size is too small and the questions are highly correlated. The goal was to show how I would develop an evaluation framework (at least in the few hours that I had to work on this), not to get a statistically significant result.


## How I would improve this

Some thoughts on how I would iterate on this:

### Question Diversity
The scope of questions is limited, focusing solely that might be asked to the imaginary "Great Sage of Babylon". A more robust evaluation would use diverse characters and scenarios, sourced from LLMs, human writers, or popular characters from the app.

### Different measures of intelligence

My evaluation focused on knowledge, but intelligence can be defined in many ways, such as a model's reasoning, creativity, etc. William hinted that there's usually a strong correlation between different types of intelligence, so I chose to focus on knowledge, which is the most straightforward to evaluate.

### Correctness of questions and answers
I used GPT-4o to generate questions and answers. This assumes that the questions and answer are actually correct: It would probably be helpful to evaluate the questions and answers against other frontier models (e.g. Claude Opus, Llama 405B) to ensure that the questions and answers are actually correct. If trying to evaluate the relative intelligence of two models, completely incorrect question/answer pairs may not be too harmful (since both models will likely be incorrect), but it would be problematic if an question has multiple reasonable answers and the generated question/answer pair doesn't list all of the answers.


