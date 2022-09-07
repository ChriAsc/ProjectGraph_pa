export const checkAdmin = (req, res, next) => {
    try {
        if (req.user.main_role === 2) {
            next();
        } else {
            var err = new Error('Ammesso solo ruolo admin!');
            next(err);
        }
    } catch(err) {
        next(err);
    }
}

export const checkMail = (req, res, next) => {
    try {
        // TODO
    } catch (err) {
        next(err);
    }
}