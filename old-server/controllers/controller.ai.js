"use strict";

const { openai } = require("../services/service.ai");

exports.sendMessage = async (req, res) => {
  try {
    const { chats } = req.body;
    const result = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You can help with life admin management tasks and should send very short messages",
        },
        ...chats,
      ],
    });

    res.send({
      output: result.data.choices[0].message,
    });
    res.status(202);
  } catch (error) {
    res.body({ output: { role: "Error", content: "AI response went wrong" } });
    res.status(500);
  }
};
