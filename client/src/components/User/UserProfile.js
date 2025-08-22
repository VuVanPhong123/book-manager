import './UserProfile.css';
import { useState, useEffect } from 'react';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    gender: '',
    age: '',
    phone: '',
    socialId: '',
  });

  useEffect(() => {
    // Lấy thông tin user từ localStorage
    const userInfo = {
      name: localStorage.getItem('user_name') || '',
      email: localStorage.getItem('user_email') || '',
      gender: localStorage.getItem('user_gender') || '',
      age: localStorage.getItem('user_age') || '',
      phone: localStorage.getItem('user_phone') || '',
      socialId: localStorage.getItem('user_socialId') || '',
    };
    setUserData(userInfo);
  }, []);

  return (
    <div className="profile-card">
      <div className="profile-header">
        <img 
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQevRvDobkg5KIs_paumfBgU5smn4-gD5JT2zyTih3ZgLaho23pBzo_yhAI_YRs920Fvv-e-UdGSGa-DcLDWGECyQ'
          alt="User Avatar" 
          className="avatar" 
          onError={(e) => {
            e.target.src = '/default-avatar.png';
          }}
        />
        <h2>{userData.name || 'No Name'}</h2>
        <p className="email">{userData.email}</p>
      </div>
      
      <div className="profile-details">
        <div className="detail-row">
          <span className="detail-label">Gender:</span>
          <span className="detail-value">{userData.gender || 'Not specified'}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Age:</span>
          <span className="detail-value">{userData.age || 'Not specified'}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Phone:</span>
          <span className="detail-value">{userData.phone || 'Not provided'}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Social ID:</span>
          <span className="detail-value">{userData.socialId || 'Not provided'}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;