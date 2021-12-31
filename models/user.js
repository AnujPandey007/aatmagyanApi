module.exports = (sequelize, DataTypes)=>{
    const User = sequelize.define("User", {
        firstName:{
            type: DataTypes.STRING,
            validate: {
                // notNull: true,// won't allow null
                isAlpha: true,// will only allow letters
                notEmpty: true// don't allow empty strings
            }
        },
        lastName:{
            type: DataTypes.STRING,
            validate: {
                // notNull: true,// won't allow null
                isAlpha: true,// will only allow letters
                notEmpty: true// don't allow empty strings
            }
        },
        userEmail:{
            type: DataTypes.STRING,
            unique: true,
            validate: {
                // notNull: true,// won't allow null
                isEmail: true,// checks for email format (foo@bar.com)
                notEmpty: true// don't allow empty strings
            }
        },
        userPassword:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,// won't allow null
                notContains: 'hi',// don't allow specific substrings
                notEmpty: true// don't allow empty strings
            }
        },
        userAge:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 13,
            validate: {
                notNull: true,// won't allow null
                max: 23,// only allow values <= 23
                min: 10,// only allow values >= 10
                isNumeric: true,// will only allow numbers
                notEmpty: true,// don't allow empty strings
                
                // Examples of custom validators:
                isEven(value) {
                    if (parseInt(value) % 2 !== 0) {
                        throw new Error('Only even values are allowed!');
                    }
                }
            }
        },
    });
    return User;
};