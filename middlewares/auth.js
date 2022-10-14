module.exports = (req, res, next) => {
    if(!req.session.item) { //una es persona y otra es persona
        res.json({ msg: "there is not user on session"})
    }
    else { next() }
}