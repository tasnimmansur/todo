var mongoose = require( 'mongoose' );
var Todo     = mongoose.model( 'Todo' );

/*exports.index = function ( req, res ){
    res.render( 'index', { title : 'Nodejs Demo' });
};*/

exports.create = function ( req, res, next){
    new Todo({
        content    : req.body.content,
        updated_at : Date.now()
    }).save( function( err, todo, count){
        res.redirect( '/' );
        if(err) return next(err);
    });
};

exports.index = function ( req, res ){
    Todo.find().sort( '-updated_at').exec( function ( err, todos ){
        res.render( 'index', {
            title : 'Node_js Demo',
            todos : todos
        });
    });
};

exports.destroy = function ( req, res ){
    Todo.findById( req.params.id, function ( err, todo ){
        todo.remove( function ( err, todos ){
            res.redirect( '/' );
        });
    });
};

exports.edit = function ( req, res){
    Todo.find().sort( '-updated_at').exec( function ( err, todos ){
        res.render( 'edit', {
            title   : 'Node_js Demo',
            todos   : todos,
            current : req.params.id
        });
    });
};

exports.update = function ( req, res, next ){
    Todo.findById( req.params.id, function ( err, todo ){
        todo.content    = req.body.content;
        todo.updated_at = Date.now();
        todo.save( function ( err, todo, count ){
            res.redirect( '/' );
            if(err) return next(err);
        });
    });
};



