db.createUser(
    {
        user: "root",
        pwd: "Shipan@138278",
        roles: [
            {
                role: "readWrite",
                db: "ems"
            }
        ]
    }
);