import { gql } from "@apollo/client";
import client from "../apollo/client";

// Define interfaces for the payloads
export interface SignupPayload {
  email: string;
  password: string;
}

export interface ConfirmSignupPayload {
  email: string;
  code: string;
}

export interface ResendOtpPayload {
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ResetPasswordPayload {
  email: string;
  password: string;
}


// Define GraphQL mutations
const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      message
      user {
        id
        email
        name
        role
      }
    }
  }
`;

const CONFIRM_SIGNUP_MUTATION = gql`
  mutation ConfirmSignup($email: String!, $code: String!) {
    confirmSignup(email: $email, code: $code) {
      message
      user {
        id
        email
        name
        role
      }
    }
  }
`;

const RESEND_OTP_MUTATION = gql`
  mutation ResendOtp($email: String!) {
    resendOtp(email: $email) {
      message
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      message
      user {
        id
        email
        name
        role
      }
      token
    }
  }
`;


const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      message
    }
  }
`;

const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      message
    }
  }
`;

const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($email: String!, $password: String!) {
    resetPassword(email: $email, password: $password) {
      message
    }
  }
`;

// API functions

export const signup = async (data: SignupPayload) => {
  const response = await client.mutate({
    mutation: SIGNUP_MUTATION,
    variables: data,
  });
  return response.data.signup;
};

export const confirmSignup = async (data: ConfirmSignupPayload) => {
  const response = await client.mutate({
    mutation: CONFIRM_SIGNUP_MUTATION,
    variables: data,
  });
  return response.data.confirmSignup;
};

export const resendOtp = async (data: ResendOtpPayload) => {
  const response = await client.mutate({
    mutation: RESEND_OTP_MUTATION,
    variables: data,
  });
  return response.data.resendOtp;
};

export const login = async (data: LoginPayload) => {
  const response = await client.mutate({
    mutation: LOGIN_MUTATION,
    variables: data,
  });
  // console.log(response)
  return response.data.login;
};

export const logout = async () => {
  const response = await client.mutate({
    mutation: LOGOUT_MUTATION,
  });
  return response.data.logout;
};

export const forgotPassword = async (email: string) => {
  const response = await client.mutate({
    mutation: FORGOT_PASSWORD_MUTATION,
    variables: { email },
  });
  return response.data.forgotPassword;
};

export const resetPassword = async (data: ResetPasswordPayload) => {
  const response = await client.mutate({
    mutation: RESET_PASSWORD_MUTATION,
    variables: data,
  });
  return response.data.resetPassword;
};
