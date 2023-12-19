const Conversations = require("../models/conversationModel");
const Messages = require("../models/messageModel");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  paginating() {
    const limit = this.queryString.limit * 1 || 10;
    this.query = this.query.limit(limit);
    return this;
  }
}

const messageCtrl = {
  getConversations: async (req, res) => {
    try {
      const features = new APIfeatures(
        Conversations.find({
          recipients: req.user._id,
        }),
        req.query
      ).paginating();

      const conversations = await features.query
        .populate("recipients", "avatar fullname username")
        .sort("-updatedAt");

      return res.json({ conversations, result: conversations.length });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getMessages: async (req, res) => {
    try {
      const { id } = req.params;

      const features = new APIfeatures(
        Messages.find({ conversation: id }),
        req.query
      ).paginating();

      const messages = await features.query
        .populate("sender recipient", "avatar")
        .sort("-createdAt")
        .lean();

      return res.json({ messages });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = messageCtrl;
