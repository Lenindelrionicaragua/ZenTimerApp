
import bcrypt from "bcrypt";
import User from '../../models/userModels';

describe('User Model Middleware', () => {
    // test('should fail if the request is missing required fields', async () => {
    //     const user = new User({
    //         email: "test@example.com",
    //         password: ""
    //     });
   
    //     try {
    //         await user.save();
    //     } catch (error) {
    //         expect(error).toBeDefined();
    //         expect(error.message).toContain('user validation failed');
    //         expect(error.errors).toHaveProperty('password');
    //         expect(error.errors.password.kind).toBe('required');
    //         return;
    //     }

    //     throw new Error('Expected the user save operation to fail, but it succeeded.');
    // });
    

    it('should hash the password before saving to the database', async () => {
      const user = new User({
        email: 'test@example.com',
        password: 'Password123!'
      });
 
      const genSaltMock = jest.spyOn(bcrypt, 'genSalt').mockResolvedValue('salt123');
      const hashMock = jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword123');
  
      await user.save();

      expect(genSaltMock).toHaveBeenCalledTimes(1);
      expect(genSaltMock).toHaveBeenCalledWith(10);
      expect(hashMock).toHaveBeenCalledTimes(1);
      expect(hashMock).toHaveBeenCalledWith('password123', 'salt123');

      genSaltMock.mockRestore();
      hashMock.mockRestore();
    });
  });