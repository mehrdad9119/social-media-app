const { db } = require('../utils/admin')

exports.getAllScreams = (req, res) => {
    db
    .collection('screams')
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
        let screams = [];
        data.forEach(doc => {
            screams.push({
                screamId: doc.id,
                body: doc.data().body,
                userHandle: doc.data().userHandle,
                createdAt: doc.data().createdAt
            });
        })
        return res.json(screams);
    })
    .catch(err => console.log(err))
}

exports.postOneScream = (req, res) => {
    if (req.body.body.trim() === '') {
        return res.status(400).json({ body: 'Body must not be empty' })
    }
    const newScream = {
        body: req.body.body,
        userHandle: req.user.handle,
        createdAt: new Date().toISOString()
    }
    db
    .collection('Screams')
    .add(newScream)
    .then(doc => {
        return res.json({ message: `document ${doc.id} created!` })    
    }).catch(err => {
        console.log(err)
        res.status(500).json({ error: 'something went wrong' })
    })
}