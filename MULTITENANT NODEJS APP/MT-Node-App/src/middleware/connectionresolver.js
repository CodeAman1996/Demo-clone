const { createNamespace } = require('continuation-local-storage');

const { getConnectionByuuid } = require('../../Utils/connectionManager');
// Create a namespace for the application.
let nameSpace = createNamespace('unique context');

/**
 * Get the connection instance for the given tenant's slug and set it to the current context.
**/
exports.resolve = (req, res, next) => {
    const uuid = req.query.uuid;
    //const uuid = req.params.uuid;

    console.log('uuidnamespace', uuid);
    if (!uuid) {
        res.json({ message: `Please provide tenant's slug to connect.` });
        return;
    }

    // Run the application in the defined namespace. It will contextualize every underlying function calls.
    nameSpace.run(() => {
        nameSpace.set('connection', getConnectionByuuid(uuid)); // This will set the knex instance to the 'connection'
        next();
    });

}

