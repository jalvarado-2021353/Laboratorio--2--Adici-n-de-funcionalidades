//Validar rol de client para citas
export const validateClientRole = (req, res, next) => {
    try {
        if (req.user?.role !== 'CLIENT') {
            return res.status(403).send({ message: 'Access denied, only clients can create appointments' });
        }
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'General Error', err });
    }
}

