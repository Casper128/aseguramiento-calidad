const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async( req, res = response ) => {
    try {
        const eventos = await Evento.find()
                                  .populate('user', 'name');

        // Asegurarse de que todos los eventos tienen los campos necesarios
        const eventosFormateados = eventos.map(evento => ({
            id: evento._id,  // Asegurarse de que siempre haya un id
            title: evento.title || '',
            start: evento.start,
            end: evento.end,
            notes: evento.notes || '',
            user: {
                _id: evento.user._id,
                name: evento.user.name
            }
        }));

        res.json({
            ok: true,
            eventos: eventosFormateados
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const crearEvento = async ( req, res = response ) => {
    const evento = new Evento( req.body );

    try {
        evento.user = req.uid;
        
        const eventoGuardado = await evento.save();
        
        // Formatear la respuesta
        const eventoFormateado = {
            id: eventoGuardado._id,
            title: eventoGuardado.title,
            start: eventoGuardado.start,
            end: eventoGuardado.end,
            notes: eventoGuardado.notes || '',
            user: {
                _id: req.uid,
                name: req.name // Asumiendo que tienes el nombre en el request
            }
        };

        res.status(201).json({
            ok: true,
            evento: eventoFormateado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const actualizarEvento = async( req, res = response ) => {
    
    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

        res.json({
            ok: true,
            evento: eventoActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const eliminarEvento = async( req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            });
        }


        await Evento.findByIdAndDelete( eventoId );

        res.json({ ok: true });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}