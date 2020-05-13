const {Schema, model} = require('mongoose');

const ProductSchema = new Schema ({

    Titulo: {type: String,
            require:true},

    DescripcionCorta:{
        type: String,
         require:true },

    DescripcionLarga:{
        type: String,
         require:true },

    Detalles:{
        type: String,
         require:false },
    LinkDePago:{
        type: String,
         require:true 
        },
    Precio:{
        type: String,
        require:true },

    Categoria:{
            type: String,
            require:false,
        enum: ['Cat1','Cat2','Cat3','Cat4','Cat5','Cat6'] },

    image:{
            type: String,
            required: true },

     created_at: {type: Date, default: Date.now()}
})

module.exports = model( 'producto' , ProductSchema);