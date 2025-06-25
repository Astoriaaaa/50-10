import User, { UserLoginDTO } from '../models/user';


export async function loginOrCreateUser(user: UserLoginDTO) {
  try {
    return await User.findOneAndUpdate(
      { googleId: user.googleId },                
      { 
        googleId: user.googleId, 
        email: user.email, 
        name: user.name 
      },                                          
      { upsert: true, new: true }                 
    );
  } catch (error) {
    console.error('[UserService][loginOrCreateUser] Error:', error);
    throw new Error('Could not login or create user');
  }
}

export async function getUserById(id: string) {
  try {
    return await User.findById(id);
  } catch (error) {
    console.error('[UserService][getUserById] Error:', error);
    throw new Error('Could not get user');
  }
}

export async function deleteUser(id: string) {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    console.error('[UserService][deleteUser] Error:', error);
    throw new Error('Could not delete user');
  }
}
