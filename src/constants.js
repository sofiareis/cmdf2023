// question list
export const QUESTION_BANK = [
    'Tell me about yourself',
    'Tell me about a time when you had to solve a problem on your own.',
    'Describe a situation where you had to work with a difficult colleague.',
    'Can you give an example of a time when you had to adapt to a new situation?',
    'Tell me about a time when you had to make a difficult decision.',
    'Describe a project you worked on that required you to use your creativity.',
    'Give me an example of a time when you had to work under pressure.',
    'Tell me about a time when you had to persuade someone to see things your way.',
    'Describe a time when you had to handle a difficult customer.',
    'Can you give me an example of a situation where you had to think outside the box?',
    'Tell me about a time when you had to take a risk.',
    'Describe a situation where you had to manage conflicting priorities.',
    'Can you give me an example of a time when you had to collaborate with a team?',
    'Tell me about a time when you had to deal with ambiguity.',
    'Describe a project where you had to use your leadership skills.',
    'Give me an example of a situation where you had to handle a crisis.',
    'Tell me about a time when you had to learn a new skill quickly.',
    'Describe a situation where you had to overcome a significant obstacle.',
    'Can you give me an example of a time when you had to use your analytical skills?',
    "Tell me about a time when you had to work with someone you didn't like.",
    'Describe a project where you had to manage your time effectively.',
    'Give me an example of a situation where you had to deal with a difficult supervisor.',
    'Tell me about a time when you had to motivate others.',
    'Describe a situation where you had to communicate complex information.',
    'Can you give me an example of a time when you had to admit to making a mistake?',
    'Tell me about a time when you had to provide constructive criticism.',
    'Describe a project where you had to work with a tight deadline.',
    'Give me an example of a time when you had to handle a difficult team member.',
    'Tell me about a time when you had to work with someone from a different department.',
    'Describe a situation where you had to balance competing priorities.',
    'Can you give me an example of a time when you had to negotiate with someone?',
    'Tell me about a time when you had to be innovative.',
    'Describe a project where you had to work independently.',
    'Give me an example of a situation where you had to deal with a high-stress environment.',
    'Tell me about a time when you had to handle a sensitive issue.',
    'Describe a situation where you had to deal with a difficult customer or stakeholder.',
    'Can you give me an example of a time when you had to make a difficult decision without complete information?',
    'Tell me about a time when you had to communicate bad news to someone.',
    'Describe a project where you had to manage a team.',
    'Give me an example of a situation where you had to work with a limited budget.',
    'Tell me about a time when you had to be flexible.',
    'Describe a situation where you had to work with someone who was not performing well.',
    'Can you give me an example of a time when you had to solve a complex problem?',
    'Tell me about a time when you had to deal with a difficult stakeholder or client.',
    'Describe a project where you had to work with a diverse group of people.',
    'Tell me about a time when you provided exceptional customer service',
    'What is your greatest professional achievement?',
    'What is your biggest weakness',
    'Tell me about a project or accomplishment you are proud of',
    'If you could tell me about anything not on your resume, what would it be? Describe.',
];

export const shuffleNumbers = () => {
    let numbers = [];

    // Populate the array with numbers 0-49
    for (let i = 0; i < 50; i++) {
        numbers.push(i);
    }

    // Shuffle the array using the Fisher-Yates shuffle algorithm
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    // save shuffled order in local storage
    localStorage.setItem('questionOrder', numbers);
    localStorage.setItem('currentQuestionIndex', 0);
    return numbers;
};
