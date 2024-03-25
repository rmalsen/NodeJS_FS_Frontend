const {postRegister, postLogin} = require('./userService')

jest.mock('./__mocks__/userService');

describe('Test Service calls backend', ()=>{
    test('Post Register should return a user', async ()=>{
        let id = Math.floor(Math.random() * 100);
        const body = {
            firstName: 'Eric',
            lastName: 'Clarke',
            address: '123 Mile Road',
            city: 'Topeka',
            state: 'KS',
            zipCode: '12345',
            email: `cryptoboy${id}@gmail.com`,
            password: 'Kahli1994'
        };
        const user = await postRegister(body);
        expect(user.data.message).toEqual('Successful Registration');
        expect(user.data.user.firstName).toEqual('Eric');
        expect(user.data.user.lastName).toEqual('Clarke');
        expect(user.data.user.address).toEqual('123 Mile Road');
        expect(user.data.user.city).toEqual('Topeka');
        expect(user.data.user.state).toEqual('KS');
        expect(user.data.user.zipCode).toEqual('12345');
    });

    test('Post Login should return a user', async ()=>{
        const body = {
            email: 'rmalsen@yahoo.co.uk',
            password: 'Rvm65Laan'
        };
        const user = await postLogin(body);
        expect(user.data.message).toEqual('Login Successful');
        expect(user.data.user.firstName).toEqual('Rik');
        expect(user.data.user.lastName).toEqual('Malsen');
        expect(user.data.user.address).toEqual('Strijlant');
        expect(user.data.user.city).toEqual('Eindhoven');
        expect(user.data.user.state).toEqual('AK');
        expect(user.data.user.zipCode).toEqual('12345');
        expect(user.data.logged).toBe(true)
    }) 
})