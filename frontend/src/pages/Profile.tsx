import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/user"; 
import UserProfile from "../components/users/UserProfile";


const Profile = () => {
  const { loading, error, data } = useQuery(GET_USER);

  console.log("GraphQL Response:", data);

  if (loading) return <p className="text-center">Loading user profile...</p>;
  if (error) return <p className="text-center">Error fetching user data</p>;

  const user = data?.userProfile?.User; 

  return (
    <div className="container mx-auto">
      {user ? (
        <UserProfile />
      ) : (
        <p className="text-center">No user data available</p>
      )}
    </div>
  );
};
 
export default Profile;
