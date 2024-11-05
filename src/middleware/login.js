const config = require("../config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = new Sequelize(config.development);

function isLogin(req, res, next) {
    if (!req.session.user) {
        req.flash("error", "Silahkan login terlebih dahulu!");
        return res.redirect("/login");
    }
    next();
}

// Tambahkan middleware untuk mengecek kepemilikan blog
function checkBlogOwner(req, res, next) {
    const user = req.session.user;
    const blogId = req.params.id;

    const query = `SELECT author_id FROM blogs WHERE id = ?`;
    sequelize
        .query(query, {
            replacements: [blogId],
            type: QueryTypes.SELECT,
        })
        .then((blog) => {
            if (!blog.length || blog[0].author_id !== user.id) {
                req.flash("error", "Anda tidak memiliki akses untuk blog ini!");
                return res.redirect("/blog");
            }
            next();
        });
}

module.exports = { isLogin, checkBlogOwner };