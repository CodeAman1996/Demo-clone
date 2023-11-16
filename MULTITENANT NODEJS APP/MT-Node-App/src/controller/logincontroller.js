
const { sequelize } = require('../../src/config/commonDBconnection');
const { getConnection } = require('../../Utils/connectionManager');
const { getNamespace } = require('continuation-local-storage');

exports.login = async (req, res, next) => {
    console.log('gfygdfygjyu');
    try {
        const { uuid } = req.body;
        console.log('uuid', uuid);
        const user = await User.findOne({ where: { uuid: uuid }, });
        console.log('usermodel', user);
        const rest = await resolve(uuid);
        if (!user) return res.status(404).json({ body: 'not found' });

        res.status(200).json({ body: await getConnection().query("SELECT * FROM `users`", { type: QueryTypes.SELECT }) });

    }
    catch (err) {
        console.log(err)
        next(err)
    }
};


