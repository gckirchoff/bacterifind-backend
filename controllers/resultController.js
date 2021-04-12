const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Result = require('../models/resultModel');
const axios = require('axios');
const { htmlToText } = require('html-to-text');

exports.getAllResults = catchAsync(async (req, res) => {
  res.status(200).json({
    status: 'success',
  });
});

exports.createResult = catchAsync(async (req, res) => {
  const newResult = await Result.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      newResult,
    },
  });
});

exports.getResult = catchAsync(async (req, res) => {
  const resultId = req.params.resultId;
  const result = await Result.findOne({ codeNumber: resultId });

  await Promise.all(
    result.microorganisms.map(async (bacteria) => {
      const wikiText = await axios.get(
        `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=6&exlimit=1&titles=${bacteria.microorganism}&explaintext=1&formatversion=2&format=json`
      );

      if (wikiText.data.query.pages[0].extract) {
        bacteria.snippet = wikiText.data.query.pages[0].extract;
        bacteria.wikiTitle = wikiText.data.query.pages[0].title;
      }

      if (!wikiText.data.query.pages[0].extract) {
        const wikiSnippet = await axios.get(
          `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${bacteria.microorganism}&utf8=&format=json`
        );
        const text = htmlToText(wikiSnippet.data.query.search[0].snippet, {
          wordwrap: null,
        });
        bacteria.snippet = text + '...';
        bacteria.wikiTitle = wikiSnippet.data.query.search[0].title;
      }
    })
  );

  res.status(200).json({
    status: 'success',
    data: {
      result,
    },
  });
});
