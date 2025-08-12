import './UserProfile.css';
import userData from '../../data/Account.json'
const UserProfile = () => {
  return (
      <div className="profile-card">
        <div className="profile-header">
          <img src={userData.avatar} alt="User Avatar" className="avatar" />
          <h2>{userData.name}</h2>
          <p className="email">{userData.gmail}</p>
        </div>
        
        <div className="profile-details">
          <div className="detail-row">
            <span className="detail-label">Gender:</span>
            <span className="detail-value">{userData.gender}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Age:</span>
            <span className="detail-value">{userData.age}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Phone:</span>
            <span className="detail-value">{userData.phone}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Social ID:</span>
            <span className="detail-value">{userData.socialId}</span>
          </div>
        </div>
      </div>
  );
};

export default UserProfile;