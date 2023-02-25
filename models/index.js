const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Post.belongsTo(User, {
    foreignKey: 'post_id',
    onDelete: 'cascade'
})


Post.hasMany(Comment, {
    foreignKey: 'comment_id',
    onDelete: 'cascade'
})

Comment.belongsTo(User, {
    foreignKey: 'comment_id',
    onDelete: 'cascade'
})

Comment.belongsTo(Post, {
    foreignKey: 'comment_id',
    onDelete: 'cascade'
})

User.hasMany(Post, {
    foreignKey: 'post_id',
    onDelete: 'cascade'
})

User.hasMany(Comment, {
    foreignKey: 'comment_id',
    onDelete: 'cascade'
})



module.exports = {
    User,
    Post,
    Comment
}