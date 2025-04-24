import client from "../apollo/client";
import { gql } from "@apollo/client";


// GraphQL query to get user profile
export const GET_USER = gql`
  query UserProfile {
    userProfile {
      User {
        id
        name
        email
        phone
        address
      }
      message
    }
  }
`;


// GraphQL mutation to update user profile
export const UPDATE_USER_PROFILE = gql`
  mutation UpdateProfile($name: String, $phone: String, $address: String) {
    updateProfile(name: $name, phone: $phone, address: $address) {
      message
      User {
        id
        name
        phone
        address
      }
    }
  }
`;


// GraphQL mutation to change user password
export const CHANGE_USER_PASSWORD = gql`
  mutation ChangePassword($oldpassword:String!,$newpassword:String!) {
    changePassword(oldpassword:$oldpassword,newpassword:$newpassword) {
      id
      name
    }
  }
`;

// GraphQL mutation to upload profile picture
export const UPLOAD_PROFILE_PICTURE = gql`
  mutation UploadProfilePicture($file: Upload!) {
    uploadProfilePicture(file: $file) {
      id
      avatar
    }
  }
`;

export const getUserProfile = async () => {
  try{
    const response = await client.query({
      query: GET_USER,
    });
    console.log(response.data.userProfile.User);
    return response.data.userProfile.User;
  }catch(error){
 console.error("Error fetching user profile:", error);
 throw new Error("Failed to fetch user profile");
}
};

export const updateUserProfile = async (
  name?: string,
  phone?: string,
  address?: string,
) => {
  try{
  const response = await client.mutate({
    mutation: UPDATE_USER_PROFILE,
    variables: { name,phone, address},
  });

   if (!response.data || !response.data.updateProfile) {
      throw new Error("Failed to update profile");
    }

   console.log(response.data.updateProfile.User);
  return response.data.updateProfile.User;
 
  }catch(error){
    console.error("Error updating Profile ",error);
    throw error;
  }
};


export const changeUserPassword = async (
 oldpassword:string,newpassword:string
) => {
  const response = await client.mutate({
    mutation: CHANGE_USER_PASSWORD,
    variables: { oldpassword,newpassword },
  });
  return response.data.changePassword;
};

export const uploadProfilePicture = async (file: File) => {
  const response = await client.mutate({
    mutation: UPLOAD_PROFILE_PICTURE,
    variables: { file },
    context: {
      hasUpload: true,
    },
  });
  return response.data.uploadProfilePicture;
};
