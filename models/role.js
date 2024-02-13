const { Schema, model} = require('mongoose');

const RoleSchema = Schem({
    role: {
        type: String,
        require: [true, "El rol es obligatorio"]
    }
});

module.exports = model ('Role', RoleSchema);