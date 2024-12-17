import supabase  from 'supabase-client';

export default async (jwt: string) => {
  try {
    // Validate the JWT
    const { data, error } = await supabase.auth.getUser(jwt);

    if (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }

    const user = data?.user;

    if (!user) {
      throw new Error('No user found with the provided JWT.');
    }

    return user;
  } catch (error) {
    console.error('Error in getUserFromJwt:', error.message);
    throw error; // Re-throw the error for handling at a higher level
  }
};
