// backend/sentimentAnalysis.js
const fs = require('fs');
const { promisify } = require('util');
const natural = require('natural');

const readFileAsync = promisify(fs.readFile);

const tokenizer = new natural.WordTokenizer();

async function analyzeSentiment(filePath) {
  const text = await readFileAsync(filePath, 'utf8');
  const words = tokenizer.tokenize(text);
  const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
  const analysis = analyzer.getSentiment(words);
  return analysis > 0 ? 'Positive' : analysis < 0 ? 'Negative' : 'Neutral';
}

module.exports = { analyzeSentiment };
