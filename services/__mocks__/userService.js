const postRegister = async (body) => {


      return await Promise.resolve({
        data:{
          firstName: 'Eric',
          lastName: 'Clarke',
          address: '123 Mile Road',
          city: 'Topeka',
          state: 'KS',
          zipCode: '12345',
        },
        message: 'Successful Registration',
      });
    
}

const postLogin = async (body)=>{
 
   //   console.log(result);
 
      return await Promise.resolve({
        data:{
              firstName: 'Rik',
              lastName: 'Malsen',
              address: 'Strijlant',
              city: 'Eindhoven',
              state: 'AK',
              zipCode: '12345',
        },
        message: 'Login Successful',
        logged: true,
      })
}

module.exports = {postRegister, postLogin}