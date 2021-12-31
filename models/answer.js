module.exports = (sequelize, DataTypes)=>{
    const Answer = sequelize.define("Answer", {
        answerTag:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                isAlpha: true,
                notEmpty: true
            }
        },
        answerTime:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        isFavourite: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        isModeration: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        isReported: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        userAnswer: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        userVote:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: true,
                isNumeric: true,
                notEmpty: true
            }
        },
    });
    return Answer;
};