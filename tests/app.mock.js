const { default: axios } = require('axios');

// Axios instance
const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 20000
});


/**
 * Get authorization token
 * @returns token
 */
 const token = async () => {
    // console.log('Token');
    try {
        // user and pass
        const user = {
            email: "mail1@test.com",
            password: "123456"
        };
        // Invoke /auth/token
        const { data: response } = await instance.post('/auth/token', user, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response;
    } catch (error) {
        const { response } = error
        console.log(response.data);
        return response.data
    }
}

/**
 * Return total of users and array of users
 * @returns users
 */
 const readUsers = async () => {
    try {
        const { data: response } = await instance.get('/users', {
            params: {
                limit: 10,
                startAt: 0
            }
        });
        // console.log(response);
        return response;
    } catch (error) {
        const { response } = error
        // console.log(response.data);
        return response
    }
}

/**
 * Create a new user
 * @returns user created
 */
 const createUser = async (user) => {
    /* const user = {
        "name": "Oz 3",
        "email": "mail3@test.com",
        "password": "123456"
    }; */
    try {
        const { data: response } = await instance.post('/users', user, {
            headers: { 'Content-Type': 'application/json' }
        });
        // console.log(response);
        return response;
    } catch (error) {
        const { response } = error
        // console.log(response.data);
        // console.log(response);
        return response.data
    }
}

/**
 * Update user
 * @returns user updated
 */
const updateUser = async () => {
    try {
        const id = '62214d779f78bfb285bcf391'; // Mongo _id
        const user = {
            name: 'OGE',
            status: true
        };

        const { token: tkn } = await token();
        // console.log(tkn);
    
        const { data: response } = await instance.put(`/users/${id}`, user, {
            headers: {
                'Authorization': `Bearer ${tkn}`,
                'Content-Type': 'application/json'
            }
        });
        
        console.log(response);
        return response;

    } catch (error) {
        const { response } = error
        console.log(response.data);
        // console.log(response);
        return response.data
    }
}

/**
 * Disable user
 * @returns user disabled
 */
const deleteUser = async() => {
    try {
        const id = '62214d779f78bfb285bcf391'
        const { token: tkn } = await token();
    
        const { data: response } = await instance.delete(`/users/${id}`, {
            headers: { 'Authorization': `Bearer ${tkn}` }
        });
    
        console.log(response);
        return response        
    } catch (error) {
        const { response } = error
        console.log(response.data);
        // console.log(response);
        return response.data
    }
}

module.exports = {
    createUser,
    readUsers,
    updateUser,
    deleteUser
}