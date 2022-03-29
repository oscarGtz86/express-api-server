const apiServer = require('./app.mock');

const expectedResult = {
    "total": 3,
    "users": [
        {
            "name": "Oz 1",
            "email": "mail1@test.com",
            "status": true,
            "password": "123456"
            // "uid": "62214d6f9f78bfb285bcf38d"
        },
        {
            "name": "OGE",
            "email": "mail2@test.com",
            "status": false,
            "password": "123456"
            // "uid": "62214d779f78bfb285bcf391"
        },
        {
            "name": "Oz 3",
            "email": "mail3@test.com",
            "status": true,
            "password": "123456"
            // "uid": "62226a28a0b1cdbc0f79af0f"
        }
    ]
};

expectedResult.users.forEach( async u => {
    try {
        const createdUser = await apiServer.createUser(u);
        console.log(createdUser);
        /* expect( createdUser ).toEqual( expect.objectContaining({
            'name': u.name,
            'email': u.email,
            'status': u.status
        })); */
    } catch (error) {
        console.log(error);
    }
    
});


/******************************* */

describe('API Server', () => {

    test('Should create 3 users (POST)', async () => {
        // Invoke POST
        expectedResult.users.forEach( async u => {
            try {
                const createdUser = await apiServer.createUser(u);
                console.log(createdUser);
                /* expect( createdUser ).toEqual( expect.objectContaining({
                    'name': u.name,
                    'email': u.email,
                    'status': u.status
                })); */
            } catch (error) {
                console.log(error);
            }
            
        });
        // done();
     });

    /* test('Should returns users (GET)', async () => {
        // Invoke GET
        const users = await apiServer.readUsers();
        expect( users.total ).toBe( expectedResult.total ); // Should returns total of 3

        expect( users.users ).toEqual( // Should returns array of users
            expect.arrayContaining(
                expectedResult.users.map( u => { return expect.objectContaining({
                    'name': u.name,
                    'email': u.email,
                    'status': u.status
                })})
            )
        );
    }); */
});