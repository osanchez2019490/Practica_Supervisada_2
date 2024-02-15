const { response } =  require('express');

const tieneRolAutorizado = (...roles) => {
    return (req = request, res = response, next) => {
        if(!req.profesor){
            return res.status(500).json({
                msg: "Se desaea validar un profesor sin validar token"
            });
        };

        if(!roles.includes(req.profesor.role)){
            return res.status(401).json({
                msg: `El servicio requiere uno de los siguientes roles autorizados ${roles}`
            });
        };
        next();
    };
}