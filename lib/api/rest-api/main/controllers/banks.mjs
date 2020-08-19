export function create(req, res) {
    res.send({ called: 'CREATE', params: req.params, body: req.body });
}

export function show(req, res) {
    res.send({ called: 'SHOW', params: req.params, body: req.body });
}

export function list(req, res) {
    res.send({ called: 'LIST', params: req.params, body: req.body });
}

export function update(req, res) {
    res.send({ called: 'UPDATE', params: req.params, body: req.body });
}

export function remove(req, res) {
    res.send({ called: 'REMOVE', params: req.params, body: req.body });
}
