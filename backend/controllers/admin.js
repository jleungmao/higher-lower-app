// const axios = require('axios').default;


exports.getMain = (req, res, next) => {
    res.status(200).json({ location: "we are at the main admin page" });
};
