const { Schema, model} = require('mongoose');

const defaultRoles = [
    { role: 'TEACHER_ROLE'},
    { role: 'STUDENTE_ROLE'}
];

const RoleSchema = Schema({
    role: {
        type: String,
        require: [true, "El rol es obligatorio"]
    }
});

const Role = model('Role', RoleSchema);

defaultRoles.forEach(async (defaultRole) => {
    try {
        const existeRole = await Role.findOne({ role: defaultRole.role });
        if(!existeRole) {
            await Role.create(defaultRole);
            console.log(`Rol preterminado ${defaultRole.role} creado`)
        }
    } catch (e) {
        console.error('Error al crear los roles preterminados: ', e)
    }
});

module.exports = Role;