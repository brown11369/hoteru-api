const allowedRoles = {
    admin: 1984,
    editor: 1994,
    author: 1996,
    noob: 2050,
    editorUser: [1994, 1996, 2050],
    authorUser: [ 1996, 2050],
    noobUser:[2050]
}

module.exports = allowedRoles;