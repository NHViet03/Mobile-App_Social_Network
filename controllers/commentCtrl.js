const Comments = require("../models/commentModel");
const Posts = require("../models/postModel");

const commentCtrl = {
    createComment: async (req, res) => {
        
        try{
            const {postId, content} = req.body

            const newComment = Comments({
                user: req.user._id,
                content
            })

            await Posts.findOneAndUpdate({_id: postId}, {
                $push: {comments: newComment._id}
            }, {new : true})
            
            await newComment.save()

            res.json({
                newComment
            })

        }catch(err){

        }
    }
}

module.exports = commentCtrl;